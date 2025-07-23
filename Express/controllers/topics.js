import { Interactions, Subscriptions, Topics } from '../models/index.js';
import { generateContent_By_OpenAI, generateContent_By_GoogleGenAI } from '../utilities/ai-service.js';
import { generateAnswer_By_OpenAI, generateAnswer_By_GoogleGenAI } from '../utilities/ai-service.js';
import fs from 'fs';
import { Op } from 'sequelize';
import { find_topics } from '../utilities/finds.js';
import hasPermission from '../utilities/permissions.js';
import { uuidv4 } from '../models/config.js';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import sanitize from 'sanitize-filename';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Helper function to create standardized errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

async function topic_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    try {
        const topic = await Topics.findByPk(id);
        if (!topic) {
            return next(createError(404, 'Topic not found.'));
        }

        res.status(200).json({
            message: 'Topic fetched successfully.',
            data: topic,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching topic.'));
    }
}

async function topic_create(req, res, next) {
    const { chapterId, titles } = req.body;

    if (!chapterId || !titles || !Array.isArray(titles) || titles.length === 0) {
        return next(createError(400, 'Chapter ID and titles are required.'));
    }

    try {
        const topicPromises = titles.map(title => {
            if (!title) {
                return Promise.reject(createError(400, 'All titles are required.'));
            }
            return Topics.create({
                id: uuidv4(),
                chapterId, 
                title 
            });
        });

        await Promise.all(topicPromises);

        res.status(201).json({
            message: 'Topics created successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
        
        next(createError(500, 'Error creating topics.'));
    }
}

async function topic_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    try {
        const [updated] = await Topics.update(req.body, { where: { id } });

        if (!updated) {
            return next(createError(404, 'Topic not found or not updated.'));
        }

        res.status(200).json({
            message: 'Topic updated successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error updating topic.'));
    }
}

async function topic_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    try {
        const deleted = await Topics.destroy({ where: { id } });

        if (!deleted) {
            return next(createError(404, 'Topic not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Topic deleted successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error deleting topic.'));
    }
}

async function topic_content(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const topic = await Topics.findByPk(id);
        if (!topic) {
            return next(createError(404, 'Topic not found.'));
        }

        if (topic.content_file_path) {
            const contents = fs.readFileSync(topic.content_file_path, 'utf8');
            return res.status(200).json({
                message: 'Data fetched successfully.',
                data: contents,
                success: true,
            });
        } 

        const topicDetail = await find_topics(id);
        const context = {
            field: topicDetail.fields.title,
            course: topicDetail.courses.title,
            year: topicDetail.courses.year,
            semester: topicDetail.courses.semester
        };

        const generatedContent = await generateContent(topicDetail.topics.title, context);
        const dirPath = path.join(__dirname, `../public/Fields_${topicDetail.fields.id}/Courses_${topicDetail.courses.id}/Chapters_${topicDetail.chapters.id}/Topics_${topicDetail.topics.id}/Contents`);
        const filePath = path.join(dirPath, `${sanitize(topicDetail.topics.title)}_${topicDetail.topics.id}.md`);

        await fs.promises.mkdir(dirPath, { recursive: true });
        await fs.promises.writeFile(filePath, generatedContent);
        await Topics.update({ content_file_path: filePath }, { where: { id } });

        const subscription = await Subscriptions.findOne({
            where: {
                [Op.and]: [
                    { userId: req.user.id },
                    { fieldId: topicDetail.fields.id }
                ]
            }
        });
        
        subscription.learned_topic_numbers += 1;
        await subscription.save();

        res.status(200).json({
            message: 'Data generated successfully.',
            data: generatedContent,
            success: true,
        });
    } catch (error) {
        console.log(error);
        
        next(createError(500, 'Error generating or fetching topic content.'));
    }
}

async function topic_ask(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const permissionMsg = await hasPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    const { question } = req.body;
    if (!question) {
        return next(createError(400, 'Question is required.'));
    }

    try {
        let interaction = await Interactions.findOne({
            where: {
                topicId: id,
                questions: question,
            },
        });

        if (!interaction) {
            interaction = await Interactions.create({
                userId: req.user.id,
                topicId: id,
                questions: question,
            });
        }

        if (interaction.response_file_path) {
            const contents = fs.readFileSync(interaction.response_file_path, 'utf8');
            return res.status(200).json({
                message: 'Data fetched successfully.',
                data: contents,
                success: true,
            });
        }

        const topicDetail = await find_topics(id);
        const history = fs.readFileSync(topicDetail.topics.content_file_path, 'utf8');
        const context = {
            question,
            history
        };

        const generatedContent = await generateAnswer(question, context);
        const dirPath = path.join(__dirname, `../public/Fields_${topicDetail.fields.id}/Courses_${topicDetail.courses.id}/Chapters_${topicDetail.chapters.id}/Topics_${topicDetail.topics.id}/Interactions`);
        const filePath = path.join(dirPath, `${sanitize(question)}_${topicDetail.topics.id}.md`);

        await fs.promises.mkdir(dirPath, { recursive: true });
        await fs.promises.writeFile(filePath, generatedContent);
        interaction.response_file_path = filePath;
        await interaction.save();

        res.status(200).json({
            message: 'Data generated successfully.',
            data: generatedContent,
            success: true,
        });
    } catch (error) {
        next(createError(500, 'Error asking topic question.'));
    }
}

async function topic_current_interactions(req, res, next) {
    const { topicId } = req.params;
    const userId = req.user.id;

    if (!topicId) {
        return next(createError(400, 'Topic ID is required.'));
    }

    try {
        const interactions = await Interactions.findAll({
            where: {
                [Op.and]: [
                    { topicId },
                    { userId }
                ]
            },
        });

        if (interactions.length === 0) {
            return next(createError(404, 'No interactions found for this user and topic.'));
        }

        res.status(200).json({
            message: 'Interactions fetched successfully.',
            data: interactions,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error fetching topic interactions: ${error.message}`));
    }
}

async function generateContent(topicTitle, context) {
    // return await generateContent_By_OpenAI(topicTitle, context);
    // return await generateContent_By_GoogleGenAI(topicTitle, context);
    return `# ${JSON.stringify(topicTitle)} => ${JSON.stringify(context)}`;
}

async function generateAnswer(question, history) {
    // return await generateAnswer_By_OpenAI(question, history);
    // return await generateAnswer_By_GoogleGenAI(question, history);
    return `# ${JSON.stringify(question)} => ${JSON.stringify(history)}`;
}

export {
    topic_get_by_id,
    topic_create,
    topic_update,
    topic_delete,
    topic_content,
    topic_ask,
    topic_current_interactions
}