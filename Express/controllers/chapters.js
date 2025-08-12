import { uuidv7 } from '../models/config.js';
import { Chapters, Courses, Topics } from '../models/index.js';
import {hasAssistantChapterPermission, hasAssistantCoursePermission} from "../utilities/assistant-permissions.js";

// Helper function to create standardized errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

async function chapter_get(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Chapter ID is required.'));
    }

    try {
        const chapter = await Chapters.findByPk(id);
        if (!chapter) {
            return next(createError(404, 'Chapter not found.'));
        }
        res.status(200).json({
            message: 'Chapter fetched successfully.',
            data: chapter,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching chapter.'));
    }
}

async function chapter_topics(req, res, next) {
    const { chapterId } = req.params;
    
    if (!chapterId) {
        return next(createError(400, 'Chapter ID is required.'));
    }

    try {
        const topics = await Topics.findAll({ where: { chapterId } });

        if (!topics.length) {
            return next(createError(404, 'No topics found in this chapter.'));
        }

        res.status(200).json({
            message: 'Topics fetched successfully.',
            data: topics,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching topics.'));
    }
}

async function chapter_create(req, res, next) {
    const { courseId, chapters } = req.body;

    try {
        const course = await Courses.findByPk(courseId);
        if (!course) {
            return next(createError(404, 'Course not found.'));
        }

        const permissionMsg = await hasAssistantCoursePermission(req.user.id, courseId);
        if (permissionMsg !== true) {
            return next(createError(400, permissionMsg));
        }

        if (course.chapters_length !== chapters.length) {
            return next(createError(400, 'Chapters length does not match.'));
        }

        for (const chapter of chapters) {
            const { title, description, order } = chapter;
            if (!title || !order) {
                return next(createError(400, 'All chapter data is required.'));
            }

            await Chapters.create({
                id: uuidv7(),
                courseId,
                title,
                description,
                order
            });
        }

        res.status(201).json({
            message: 'Chapters created successfully.',
            success: true
        });
    } catch (error) {
        console.log(error);
        
        next(createError(500, 'Error creating chapters.'));
    }
}

async function chapter_update(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
        return next(createError(400, 'Chapter ID is required.'));
    }

    const permissionMsg = await hasAssistantChapterPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const [updated] = await Chapters.update(req.body, { where: { id } });

        if (!updated) {
            return next(createError(404, 'Chapter not found or not updated.'));
        }

        res.status(200).json({
            message: 'Chapter updated successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error updating chapter.'));
    }
}

async function chapter_delete(req, res, next) {
    const { id } = req.params;
    
    if (!id) {
        return next(createError(400, 'Chapter ID is required.'));
    }

    const permissionMsg = await hasAssistantChapterPermission(req.user.id, id);
    if (permissionMsg !== true) {
        return next(createError(400, permissionMsg));
    }

    try {
        const deleted = await Chapters.destroy({ where: { id } });

        if (!deleted) {
            return next(createError(404, 'Chapter not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Chapter deleted successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error deleting chapter.'));
    }
}

export {
    chapter_get,
    chapter_topics,
    chapter_create,
    chapter_update,
    chapter_delete
}