import { Router } from 'express';
const routes = Router();

async function field_get(req, res, next) {}

async function field_get_by_id(req, res, next) {}

async function field_create(req, res, next) {
    const {
        title,
        description,
        years_length,
        isFree,
        number_of_free_topics
    } = req.body;

    if (!title || !years_length || !number_of_free_topics) {
        
    }
}

async function field_update(req, res, next) {}

async function field_delete(req, res, next) {}

async function field_course(req, res, next) {}

async function field_subscription_status(req, res, next) {}

export {
    field_get,
    field_get_by_id,
    field_create,
    field_update,
    field_delete,
    field_course,
    field_subscription_status
}