import { Users } from "../models/index.js";

async function user_current_get(req, res, next) {
    if (!req.user) {
        const e = new Error('user are unthorized');
        e.status = 401;
        return next(e);
    }

    res.status(200).json({
        message: 'current user are fetched',
        data: req.user,
        success: true
    });
}

async function user_current_update(req, res, next) {
    const {
        first_name,
        last_name,
        email,
        phone,
        password
    } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hash_password = await bcrypt.hash(password, salt);
    
    const updated_user = await Users.update({
        value: {
            first_name: first_name || req.user.first_name,
            last_name: last_name || req.user.last_name,
            email: email || req.user.email,
            phone: phone || req.user.phone,
            password: hash_password || req.user.password
        },
        where: { id: req.user.id }
    });

    if (!updated_user) {
        const e = new Error('user are not updated');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'user are updated successfully',
        data: updated_user,
        success: true
    });
}

async function user_get(req, res, next) {
    const users = await Users.findAll();
    if (!users) {
        const e = new Error('users are not found');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'users are fetched successfully',
        data: users,
        success: true
    });
}

async function user_get_by_id(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('user id are required');
        e.status = 400;
        return next(e);
    }

    const user = await Users.findByPk(id);
    if (!user) {
        const e = new Error('user are not found in this id');
        e.status = 404;
        return next(e);
    }

    res.status(200).json({
        message: 'user are fetched successfully',
        data: user,
        success: true
    });
}

async function user_update(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('user id are required');
        e.status = 400;
        return next(e);
    }

    if (!req.body) {
        const e = new Error('user data are required');
        e.status = 400;
        return next(e);
    }

    const updated_user = await Users.update({
        value: req.body,
        where: { id: id }
    });

    if (!updated_user) {
        const e = new Error('user are not updated');
        e.status = 500;
        return next(e);
    }

    res.status(201).json({
        message: 'user are updated',
        data: updated_user,
        success: true
    });
}

async function user_delete(req, res, next) {
    const { id } = req.params;
    if (!id) {
        const e = new Error('user id are required');
        e.status = 400;
        return next(e);
    }

    const deleted_user = await Users.destroy({
        where: { id: id }
    });

    if (!deleted_user) {
        const e = new Error('user are not deleted');
        e.status = 500;
        return next(e);
    }

    res.status(200).json({
        message: 'user are deleted',
        success: true
    });
}

export {
    user_current_get,
    user_current_update,
    user_get,
    user_get_by_id,
    user_update,
    user_delete
}