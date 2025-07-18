import { Router } from 'express';
import { Courses, Fields, Subscriptions } from '../models';
const routes = Router();

async function field_get(req, res, next) {
    const all_fields = await Fields.findAll();
    if (!all_fields) {
        const e = new Error('field not found');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'field are fetched',
        success: true,
        data: all_fields
    });
}

async function field_get_by_id(req, res, next) {
    const { fieldId } = req.params;
    if (!fieldId) {
        const e = new Error('field id is required');
        e.status = 400;
        return next(e);
    }

    const field = await Fields.findByPk(fieldId);
    if (!field) {
        const e = new Error('field not found');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'field is fetched',
        success: true,
        data: field
    });
}

async function field_create(req, res, next) {
    const {
        title,
        description,
        years_length,
        isFree,
        number_of_free_topics
    } = req.body;

    if (!title || !years_length || !number_of_free_topics) {
        const e = new Error('all required field are must be fulfield');
        e.status = 400;
        return next(e);
    }

    const new_field = await Fields.create({
        title: title,
        description: description,
        years_length: years_length,
        isFree: isFree,
        number_of_free_topics: number_of_free_topics
    })

    if (!new_field) {
        const e = new Error('field are not be created');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'field are created',
        success: true,
        data: new_field
    });
}

async function field_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('field id are must be provided');
        e.status = 400;
        return next(e);
    }

    const updated_field = await Fields.update({
        values: req.body,
        where: { id: id }
    });

    if (!updated_field) {
        const e = new Error('field are not updated');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'field is updated',
        success: true,
        data: updated_field,
    });
}

async function field_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('field id are must be provided');
        e.status = 400;
        return next(e);
    }

    const delete_count = await Fields.destroy({
        where: { id: id }
    });

    if (!delete_count) {
        const e = new Error('field are not deleted');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'field are deleted',
        success: true
    })
}

async function field_course(req, res, next) {
    const { fieldId } = req.params;
    if (!fieldId) {
        const e = new Error('field id are required');
        e.status = 400;
        return next(e);
    }

    const courses = await Courses.findAll({
        where: { fieldId: fieldId }
    });

    if (!courses) {
        const e = new Error('no fields are avilable in this fields');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'field course are fetched',
        success: true,
        data: courses
    });
}

async function field_subscription_status(req, res, next) {
    const { userId } = req.user;
    const { fieldId } = req.params;
    if (!userId || fieldId) {
        const e = new Error('field id and user id is required');
        e.status = 400;
        return next(e);
    }

    const sub_status = await Subscriptions.findOne({
        where: {
            userId: userId,
            fieldId: fieldId
        }
    });

    if (!sub_status) {
        const e = new Error('no subscription is found');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'subscription status are fetched',
        success: true,
        data: sub_status.status
    });
}

export {
    field_get,
    field_get_by_id,
    field_create,
    field_update,
    field_delete,
    field_course,
    field_subscription_status
}