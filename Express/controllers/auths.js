import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Users } from '../models/index.js';

async function auth_register(req, res, next) {
    const {
        first_name,
        last_name,
        email,
        phone,
        password
    } = req.body;

    if (!first_name || !last_name || !email || !phone || !password) {
        const e = new Error('user data are required');
        e.status = 400;
        return next(e);
    }

    const salt = await bcrypt.genSalt(12);
    const hash_password = await bcrypt.hash(password, salt);
    const new_user = await Users.create({
        first_name: first_name,
        last_name: last_name,
        email: email,
        phone: phone,
        password: hash_password
    });

    if (!new_user) {
        const e = new Error('user are not created');
        e.status = 500;
        return next(e);
    }

    const token = jwt.sign(
        { new_user }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
    res.status(201).json({
        message: 'user are created',
        data: {
            ...new_user,
            token: token
        },
        success: true
    });
}

async function auth_login(req, res, next) {
    const { email, password } = req.body;
    const login_user = await Users.findOne({
        where: { email: email }
    });

    if (!login_user) {
        const e = new Error('email or password are incorrect');
        e.status = 400;
        return next(e);
    }

    const isMatch = await bcrypt.compare(password, login_user.password);
    if (!isMatch) {
        const e = new Error('you entered invalid credentials');
        e.status = 400;
        return next(e);
    }
    
    const token = jwt.sign(
        { login_user }, 
        process.env.JWT_SECRET, 
        { expiresIn: '30d' }
    );
    res.status(201).json({
        message: 'user are created',
        data: {
            ...login_user,
            token: token
        },
        success: true
    });
}

async function auth_logout(req, res, next) {}

export {
    auth_register,
    auth_login,
    auth_logout
}