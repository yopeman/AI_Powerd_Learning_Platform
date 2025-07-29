import { Op } from "sequelize";
import { Assistants, Fields, Users } from "../models/index.js";

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
        next(createError(500, `Error fetching assistants. ${error.message}`));
    }
}

async function assistant_get_by_id(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'Assistant ID is required.'));
    }

    try {
        const assistant = await Assistants.findByPk(id);

        if (!assistant) {
            return next(createError(404, 'Assistant not found.'));
        }

        res.status(200).json({
            message: 'Assistant fetched successfully.',
            data: assistant,
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error fetching assistant.'));
    }
}

async function assistant_update(req, res, next) {
    const { id } = req.params;
    const { fieldId, userId } = req.body;

    if (!id || !fieldId || !userId) {
        return next(createError(400, 'Assistant ID, User ID and Field ID are required.'));
    }

    try {
        const updated_assistant = await Assistants.update({ fieldId, userId }, { where: { id } });

        if (!updated_assistant[0]) {
            return next(createError(404, 'Assistant not found.'));
        }

        res.status(200).json({
            message: 'Assistant updated successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, 'Error updating assistant.'));
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
async function assistant_current_fields(req, res, next) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return next(createError(401, 'Unauthorized: User ID not found.'));
        }

        const assistants = await Assistants.findAll({ where: { userId } });

        if (!assistants.length) {
            return next(createError(404, 'No assistants found for the current user.'));
        }

        const fieldIds = assistants.map(a => a.fieldId);
        const fields = await Fields.findAll({
            where: { id: { [Op.in]: fieldIds } }
        });

        if (!fields.length) {
            return next(createError(404, 'No assistants fields found for the current user.'));
        }

        res.status(200).json({
            message: 'Assistant fields fetched successfully.',
            data: { assistants, fields },
            success: true
        });
    } catch (error) {
        next(createError(500, `Error fetching assistant fields for current user. ${error.message}`));
    }
}

export {
    assistant_create,
    assistant_get,
    assistant_get_by_id,
    assistant_update,
    assistant_delete,
    assistant_current_fields
}