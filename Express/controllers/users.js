import { Users } from "../models/index.js";
import bcrypt from 'bcrypt';

async function user_current_get(req, res, next) {
    const user = await Users.findByPk(req.user.id, {
        attributes: { exclude: ['password'] }
    });

    res.status(200).json({
        message: 'Current user fetched successfully.',
        data: user,
        success: true
    });
}

async function user_current_update(req, res, next) {
    const { first_name, last_name, email, phone, password } = req.body;
    const id = req.user.id;
    const user = await Users.findByPk(id);

    try {
        const updates = {
            first_name: first_name || user.first_name,
            last_name: last_name || user.last_name,
            email: email || user.email,
            phone: phone || user.phone,
        };

        if (password) {
            const salt = await bcrypt.genSalt(12);
            updates.password = await bcrypt.hash(password, salt);
        }

        const [updated] = await Users.update(updates, { where: { id } });

        if (updated === 0) {
            return next(createError(500, 'User not updated.'));
        }

        res.status(200).json({
            message: 'User updated successfully.',
            data: updates,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error updating user: ${error.message}`));
    }
}

async function user_get(req, res, next) {
    try {
        const users = await Users.findAll();

        if (users.length === 0) {
            return next(createError(404, 'No users found.'));
        }

        res.status(200).json({
            message: 'Users fetched successfully.',
            data: users,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error fetching users: ${error.message}`));
    }
}

async function user_get_by_id(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'User ID is required.'));
    }

    try {
        const user = await Users.findByPk(id);
        
        if (!user) {
            return next(createError(404, 'User not found.'));
        }

        res.status(200).json({
            message: 'User fetched successfully.',
            data: user,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error fetching user: ${error.message}`));
    }
}

async function user_update(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'User ID is required.'));
    }

    if (!req.body) {
        return next(createError(400, 'User data is required.'));
    }

    if (req.body.password) {
        const salt = await bcrypt.genSalt(12);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }

    delete req.body.id; // Ensure ID is not updated
    delete req.body.createdAt; // Prevent updating createdAt field
    delete req.body.updatedAt; // Prevent updating updatedAt field
    
    try {
        const [updated] = await Users.update(req.body, { where: { id } });

        if (updated === 0) {
            return next(createError(500, 'User not updated.'));
        }

        res.status(200).json({
            message: 'User updated successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, `Error updating user: ${error.message}`));
    }
}

async function user_delete(req, res, next) {
    const { id } = req.params;

    if (!id) {
        return next(createError(400, 'User ID is required.'));
    }

    try {
        const deleted = await Users.destroy({ where: { id } });

        if (deleted === 0) {
            return next(createError(404, 'User not found or already deleted.'));
        }

        res.status(200).json({
            message: 'User deleted successfully.',
            success: true
        });
    } catch (error) {
        next(createError(500, `Error deleting user: ${error.message}`));
    }
}

async function user_create(req, res, next) {
    const { first_name, last_name, email, phone, password, role } = req.body;
    if (!first_name || !last_name || !email || !password) {
        return next(createError(400, 'All fields are required.'));
    }
    try {
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await Users.create({
            first_name,
            last_name,
            email,
            phone,
            password: hashedPassword,
            role
        });

        res.status(201).json({
            message: 'User created successfully.',
            data: newUser,
            success: true
        });
    } catch (error) {
        next(createError(500, `Error creating user: ${error.message}`));
    }
}

function createError(status, message) {
    const error = new Error(message);
    error.status = status;
    return error;
}

export {
    user_current_get,
    user_current_update,
    user_get,
    user_get_by_id,
    user_update,
    user_delete,
    user_create
}