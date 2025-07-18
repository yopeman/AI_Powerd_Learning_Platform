import { Chapters, Courses, Topics } from '../models/index.js';
const routes = Router();

async function chapter_topics(req, res, next) {
    const { chapterId } = req.params;
    if (!chapterId) {
        const e = new Error('chapter id are not required');
        e.status = 400;
        return next(e);
    }

    const topics = await Topics.findAll({
        where: { chapterId: chapterId }
    });

    if (!topics) {
        const e = new Error('topics are not found in chapters');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'topics are fetched',
        data: topics,
        success: true
    });
}

async function chapter_create(req, res, next) {
    const {
        courseId,
        chapters
    } = req.body;

    const courses = await Courses.findByPk(courseId);
    if (courses.chapters_length !== chapters.length) {
        const e = new Error('chapters length are not matched');
        e.status = 400;
        return next(e);
    }

    chapters.map(chapter => {
        const { title, description, order } = chapter;
        if (!title || !description || !order) {
            const e = new Error('all data are required');
            e.status = 400;
            return next(e);
        }

        const new_chapter = async () => await Chapters.create({
            courseId,
            title,
            description,
            order
        });
        new_chapter();
    });
}

async function chapter_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('chapter id are not required');
        e.status = 400;
        return next(e);
    }

    const updated_chapter = await Chapters.update({
        value: req.body,
        where: { id: id }
    });

    if (!updated_chapter) {
        const e = new Error('chapter are not updated');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'chapter are updated',
        data: updated_chapter,
        success: true
    });
}

async function chapter_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('chapter id are not required');
        e.status = 400;
        return next(e);
    }

    const deleted_chapter = await Chapters.destroy({
        where: { id: id }
    });

    if (!deleted_chapter) {
        const e = new Error('chapter are not deleted');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'chapter are deleted',
        success: true
    });
}

export {
    chapter_topics,
    chapter_create,
    chapter_update,
    chapter_delete
}