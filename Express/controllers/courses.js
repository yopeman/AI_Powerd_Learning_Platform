import { Chapters, Courses } from '../models/index.js';

async function course_chapter(req, res, next) {
    const { courseId } = req.params;
    if (!courseId) {
        const e = new Error('course id is required');
        e.status = 400;
        return next(e);
    }

    const chapters = await Chapters.findAll({
        where: { courseId: courseId }
    })

    if (!chapters) {
        const e = new Error('Chapter not found in this courses');
        e.status = 404;
        next(e);
    }

    res.status(200).json({
        message: 'course chapters are fetched',
        data: chapters,
        success: true
    })
}

async function course_create(req, res, next) {
    const {
        title,
        description,
        fieldId,
        year,
        semester,
        chapters_length
    } = req.body;

    if (!title || !fieldId || !year || !semester || !chapters_length) {
        const e = new Error('all field are required');
        e.status = 400;
        return next(e);
    }

    const new_course = await Courses.create({
        title: title,
        description: description,
        fieldId: fieldId,
        year: year,
        semester: semester,
        chapters_length: chapters_length
    });

    if (!new_course) {
        const e = new Error('course are not created');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'course are created',
        data: new_course,
        success: true
    })
}

async function course_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('course id are required');
        e.status(400);
        return next(e);
    }

    const updated_course = await Courses.update({
        values: req.body,
        where: { id: id }
    });

    if (!updated_course) {
        const e = new Error('course are not updated');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'course are updated',
        data: updated_course,
        success: true
    });
}

async function course_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('course id are required');
        e.status(400);
        return next(e);
    }

    const delete_course = await Courses.destroy({
        where: { id: id }
    });

    if (!delete_course) {
        const e = new Error('course are not deleted');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'course are deleted',
        success: true
    });
}

export {
    course_chapter,
    course_create,
    course_update,
    course_delete
}