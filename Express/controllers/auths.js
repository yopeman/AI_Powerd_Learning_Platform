import { Router } from 'express';
const routes = new Router();

async function auth_register(req, res, next) {}
async function auth_login(req, res, next) {}
async function auth_logout(req, res, next) {}

export {
    auth_register,
    auth_login,
    auth_logout
}