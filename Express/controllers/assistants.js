import { Op } from "sequelize";
import { Assistants } from "../models/index.js";

async function assistant_create(req, res, next) {
    const {
        userId,
        fieldId
    } = req.body;

    if (!userId || !fieldId) {
        const e = new Error('assistant information are required');
        e.status = 400;
        return next(e);
    }

    const new_assistant = await Assistants.create({
        userId: userId,
        fieldId: fieldId
    });

    if (!new_assistant) {
        const e = new Error('assistant are not created');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'assistant are created',
        data: new_assistant,
        success: true
    });
}

async function assistant_get(req, res, next) {
    const assistants = await Assistants.findAll();
    if (!assistants) {
        const e = new Error('assistants are not found');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'assistants are fetched',
        data: assistants,
        success: true
    });
}

async function assistant_delete(req, res, next) {
    const { userId, fieldId } = req.params;
    if (!userId || !fieldId) {
        const e = new Error('user id and field id are required');
        e.status = 400;
        return next(e);
    }

    const deleted_assistant = await Assistants.destroy({
        where: {
            [Op.and]: [
                { userId: userId },
                { fieldId: fieldId }
            ]
        }
    });

    if (!deleted_assistant) {
        const e = new Error('assistant are not deleted');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'assistant are deleted',
        success: true
    });
}

export {
    assistant_create,
    assistant_get,
    assistant_delete
}