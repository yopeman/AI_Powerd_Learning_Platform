import { Chapters, Courses } from '../models/index.js';

// Helper function to create standardized errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}
async function course_get(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Course ID is required.'));
    }

    try {
        const course = await Courses.findByPk(id);
        if (!course) {
            return next(createError(404, 'Course not found.'));
        }

        res.status(200).json({
            message: 'Course fetched successfully.',
            data: course,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching course.'));
    }
}

async function course_chapter(req, res, next) {
    const { courseId } = req.params;
    
    if (!courseId) {
        return next(createError(400, 'Course ID is required.'));
    }

    try {
        const chapters = await Chapters.findAll({ where: { courseId } });

        if (!chapters.length) {
            return next(createError(404, 'No chapters found for this course.'));
        }

        res.status(200).json({
            message: 'Course chapters fetched successfully.',
            data: chapters,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching chapters.'));
    }
}

async function course_create(req, res, next) {
    const { title, description, fieldId, year, semester, chapters_length } = req.body;

    if (!title || !fieldId || !year || !semester || !chapters_length) {
        return next(createError(400, 'All fields are required.'));
    }

    try {
        const new_course = await Courses.create({
            title,
            description,
            fieldId,
            year,
            semester,
            chapters_length
        });

        res.status(201).json({
            message: 'Course created successfully.',
            data: new_course,
            success: true
        });
    } catch (error) {
        console.log(error);
        
        next(createError(500, 'Error creating course.'));
    }
}

async function course_update(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
        return next(createError(400, 'Course ID is required.'));
    }

    try {
        const [updated] = await Courses.update(req.body, { where: { id } });

        if (!updated) {
            return next(createError(404, 'Course not found or not updated.'));
        }

        res.status(200).json({
            message: 'Course updated successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error updating course.'));
    }
}

async function course_delete(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
        return next(createError(400, 'Course ID is required.'));
    }

    try {
        const deleted_course = await Courses.destroy({ where: { id } });

        if (!deleted_course) {
            return next(createError(404, 'Course not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Course deleted successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error deleting course.'));
    }
}

export {
    course_get,
    course_chapter,
    course_create,
    course_update,
    course_delete
}