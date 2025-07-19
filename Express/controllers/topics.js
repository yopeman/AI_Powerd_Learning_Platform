import { Interactions, Topics } from '../models/index.js';
import ai from '../utilities/ai-service.js';
import fs from 'fs';
import { and, Op } from 'sequelize';
import { find_topics } from '../utilities/contents.js';
import path from 'path';

async function topic_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('topic id are required');
        e.status = 400;
        return next(e);
    }

    const topics = await Topics.findByPk(id);
    if (!topics) {
        const e = new Error('topic are not found');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'topic are fetched',
        data: topics,
        success: true
    });
}

async function topic_create(req, res, next) {
    const {
        chapterId,
        titles
    } = req.body;

    if (!chapterId) {
        const e = new Error('chapter id are required');
        e.status = 400;
        return next(e);
    }

    titles.map(title => {
        if (!title) {
            const e = new Error('title are required');
            e.status = 400;
            return next(e);
        }

        const new_topics = async () => await Topics.create({
            chapterId: chapterId,
            title: title
        });
        new_topics();
    });
}

async function topic_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('topic id are required');
        e.status = 400;
        return next(e);
    }

    const updated_topics = await Topics.update({
        values: req.body,
        where: { id: id }
    });

    if (!updated_topics) {
        const e = new Error('topic are not updated');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'topic are updated',
        data: updated_topics,
        success: true
    });
}

async function topic_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('topic id are required');
        e.status = 400;
        return next(e);
    }

    const deleted_topic = await Topics.destroy({
        where: { id: id }
    });

    if (!deleted_topic) {
        const e = new Error('topic are not deleted');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'topic are deleted',
        success: true
    });
}

// async function topic_generate_content(req, res, next) {
//     topic_content(req, res, next);
// }

async function topic_content(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('topic id are required');
        e.status = 400;
        return next(e);
    }

    const topic = await Topics.findByPk(id);
    if (!topic) {
        const e = new Error('topic are not found');
        e.status = 400;
        return next(e);
    }

    if (topic.content_file_path) {
        const contents = fs.readFileSync(topic.content_file_path, 'utf8');
        res.status(200).json({
            message: 'data is fetched',
            data: contents,
            success: true
        });
    } else {
        const topic_detail = await find_topics(id);
        const generated_content = ai(topic.title);
        const dir_path = `/public/Fields_${topic_detail.fields.id}/Courses_${topic_detail.courses.id}/Chapters_${topic_detail.chapters.id}/Topics_${topic_detail.topics.id}`;
        const file_path = `${dir_path}/Contents/${topic_detail.topics.title}.md`;
        fs.mkdir(
            path('../', dir_path),
            { recursive: true },
            (err) => {
                if (err) {
                    return next(err);
                }
                fs.writeFile(
                    path('../', file_path),
                    generated_content,
                    (err) => {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json({
                            message: 'data is generated',
                            data: generated_content,
                            success: true
                        });
                    }
                );
            }
        );
    }
}

async function topic_ask(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('topic id are required');
        e.status = 400;
        return next(e);
    }

    const { question } = req.body;
    if (!question) {
        const e = new Error('question are required');
        e.status = 400;
        return next(e);
    }

    let interaction;
    interaction = await Interactions.findOne({
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
        res.status(200).json({
            message: 'data is fetched',
            data: contents,
            success: true
        });
    } else {
        const topic_detail = await find_topics(id);
        const generated_content = ai(topic_detail.topics.title);
        const dir_path = `/public/Fields_${topic_detail.fields.id}/Courses_${topic_detail.courses.id}/Chapters_${topic_detail.chapters.id}/Topics_${topic_detail.topics.id}`;
        const file_path = `${dir_path}/Interactions/${question}.md`;
        fs.mkdir(
            path('../', dir_path),
            { recursive: true },
            (err) => {
                if (err) {
                    return next(err);
                }
                fs.writeFile(
                    path('../', file_path),
                    generated_content,
                    (err) => {
                        if (err) {
                            return next(err);
                        }
                        res.status(200).json({
                            message: 'data is generated',
                            data: generated_content,
                            success: true
                        });
                    }
                );
            }
        );
    }
}

export {
    topic_get_by_id,
    topic_create,
    topic_update,
    topic_delete,
    // topic_generate_content,
    topic_content,
    topic_ask
}