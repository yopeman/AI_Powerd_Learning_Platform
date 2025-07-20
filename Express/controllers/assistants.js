import { Op } from "sequelize";
import { Assistants, Users } from "../models/index.js";

// Helper function to create standardized errors
function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

async function assistant_create(req, res, next) {
    const { userId, fieldId } = req.body;

    if (!userId || !fieldId) {
        return next(createError(400, 'User ID and Field ID are required.'));
    }

    try {
        await Users.update({ role: 'assistant' }, { where: { id: userId } });
        const new_assistant = await Assistants.create({ userId, fieldId });

        res.status(201).json({
            message: 'Assistant created successfully.',
            data: new_assistant,
            success: true
        });
    } catch (error) {
        console.log(error);
        
        next(createError(500, 'Error creating assistant.'));
    }
}

async function assistant_get(req, res, next) {
    try {
        const assistants = await Assistants.findAll();

        if (!assistants.length) {
            return next(createError(404, 'No assistants found.'));
        }

        res.status(200).json({
            message: 'Assistants fetched successfully.',
            data: assistants,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching assistants.'));
    }
}

async function assistant_delete(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Assistant ID are required.'));
    }

    try {
        const deleted_assistant = await Assistants.destroy({ where: { id } });

        if (!deleted_assistant) {
            return next(createError(404, 'Assistant not found or already deleted.'));
        }

        res.status(200).json({
            message: 'Assistant deleted successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error deleting assistant.'));
    }
}

export {
    assistant_create,
    assistant_get,
    assistant_delete
}