import { Interactions, Topics } from '../models/index.js';
import ai from '../utilities/ai-service.js';
import fs from 'fs';
import { Op } from 'sequelize';
import { find_topics } from '../utilities/finds.js';
import path from 'path';
import { uuidv4 } from '../models/config.js';

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
                success: true
            });
        } else {
            const topic_detail = await find_topics(id);
            const generated_content = ai(topic.title);
            const dir_path = path.join(__dirname, `../public/Fields_${topic_detail.fields.id}/Courses_${topic_detail.courses.id}/Chapters_${topic_detail.chapters.id}/Topics_${topic_detail.topics.id}/Contents`);
            const file_path = path.join(dir_path, `${topic_detail.topics.title}.md`);

            await fs.promises.mkdir(dir_path, { recursive: true });
            await fs.promises.writeFile(file_path, generated_content);

            res.status(200).json({
                message: 'Data generated successfully.',
                data: generated_content,
                success: true
            });
        }
    } catch (error) {
        next(createError(500, 'Error generating or fetching topic content.'));
    }
}

async function topic_ask(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Topic ID is required.'));
    }

    const { question } = req.body;
    if (!question) {
        return next(createError(400, 'Question is required.'));
    }

    try {
        let interaction = await Interactions.findOne({
            where: {
                [Op.and]: [
                    { topicId: id },
                    { questions: question }
                ]
            }
        });

        if (!interaction) {
            interaction = await Interactions.create({
                userId: req.user.id,
                topicId: id,
                questions: question
            });
        }

        if (interaction.response_file_path) {
            const contents = fs.readFileSync(interaction.response_file_path, 'utf8');
            return res.status(200).json({
                message: 'Data fetched successfully.',
                data: contents,
                success: true
            });
        } else {
            const topic_detail = await find_topics(id);
            const generated_content = ai(topic_detail.topics.title);
            const dir_path = path.join(__dirname, `../public/Fields_${topic_detail.fields.id}/Courses_${topic_detail.courses.id}/Chapters_${topic_detail.chapters.id}/Topics_${topic_detail.topics.id}/Interactions`);
            const file_path = path.join(dir_path, `${question}.md`);

            await fs.promises.mkdir(dir_path, { recursive: true });
            await fs.promises.writeFile(file_path, generated_content);

            res.status(200).json({
                message: 'Data generated successfully.',
                data: generated_content,
                success: true
            });
        }
    } catch (error) {
        next(createError(500, 'Error asking topic question.'));
    }
}

export {
    topic_get_by_id,
    topic_create,
    topic_update,
    topic_delete,
    topic_content,
    topic_ask
}