import { Router } from 'express';
const routes = Router();

async function topic_get_by_id(req, res, next) {}
async function topic_create(req, res, next) {}
async function topic_update(req, res, next) {}
async function topic_delete(req, res, next) {}
async function topic_generate_content(req, res, next) {}
async function topic_content(req, res, next) {}
async function topic_ask(req, res, next) {}

export {
    topic_get_by_id,
    topic_create,
    topic_update,
    topic_delete,
    topic_generate_content,topic_content,
    topic_ask
}