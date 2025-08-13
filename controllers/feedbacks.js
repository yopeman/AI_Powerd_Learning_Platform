import {Feedbacks} from '../models/index.js';
import { createError } from '../utilities/error-handlers.js';

async function feedback_get(req, res, next) {
    try {
        const feedbacks = await Feedbacks.findAll();
        if (!feedbacks.length) {
            return next(createError(404, 'No feedback found.'));
        }

        res.status(200).json({
            message: 'Feedbacks fetched successfully.',
            data: feedbacks,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function feedback_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Feedback ID is required.'));
    }

    try {
        const feedback = await Feedbacks.findByPk(id);
        if (!feedback) {
            return next(createError(404, 'Feedback not found.'));
        }

        res.status(200).json({
            message: 'Feedback fetched successfully.',
            data: feedback,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function feedback_create(req, res, next) {
    const { content, rating } = req.body; // Changed from req.params to req.body
    const userId = req.user?.id;

    if (!content) {
        return next(createError(400, 'Feedback content and rating is required.'));
    }

    try {
        const feedback = await Feedbacks.create({
            userId,
            content,
            rating
        });

        res.status(201).json({
            message: 'Feedback created successfully.',
            data: feedback,
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

async function feedback_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        return next(createError(400, 'Feedback ID is required.'));
    }

    try {
        const deletedFeedbackCount = await Feedbacks.destroy({ where: { id } });

        if (!deletedFeedbackCount) {
            return next(createError(404, 'Feedback not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Feedback deleted successfully.',
            success: true,
        });
    } catch (err) {
        return next(err);
    }
}

export {
    feedback_get,
    feedback_get_by_id,
    feedback_create,
    feedback_delete,
};