import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs/promises'; // Use promises API for file system operations
import { createError } from '../utilities/error-handlers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dir_path = path.join(__dirname, 'public', 'uploads'); // Set directory path once

async function upload_get(req, res, next) {
    try {
        const files = await fs.readdir(dir_path);
        res.status(200).json({
            message: 'Uploaded files fetched successfully',
            data: files,
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function upload_download(req, res, next) {
    const { name } = req.params;
    const filePath = path.join(dir_path, name);

    try {
        await res.sendFile(filePath);
    } catch (err) {
        return next(err);
    }
}

async function upload_new(req, res, next) {
    if (!req.file) {
        return next(createError(400, 'No file uploaded'));
    }

    res.status(201).json({
        message: 'File uploaded successfully',
        data: { file: req.file.filename },
        success: true
    });
}

async function upload_delete(req, res, next) {
    const { name } = req.params;
    const filePath = path.join(dir_path, name);

    try {
        await fs.unlink(filePath);
        res.status(200).json({
            message: 'File deleted successfully',
            success: true
        });
    } catch (err) {
        if (err.code === 'ENOENT') {
            return next(createError(404, 'File not found or already deleted'));
        }
        return next(err);
    }
}

export {
    upload_get,
    upload_download,
    upload_new,
    upload_delete
};