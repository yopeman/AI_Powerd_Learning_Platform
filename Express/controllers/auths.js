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

    // Validate user input
    if (!first_name || !last_name || !email || !phone || !password) {
        return next(createError(400, 'User data is required.'));
    }

    try {
        const salt = await bcrypt.genSalt(12);
        const hash_password = await bcrypt.hash(password, salt);

        const new_user = await Users.create({
            first_name,
            last_name,
            email,
            phone,
            password: hash_password
        });

        const token = jwt.sign(
            { id: new_user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '30d' }
        );

        res.status(201).json({
            message: 'User created successfully.',
            data: {
                user: new_user,
                token
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

async function auth_login(req, res, next) {
    const { email, password } = req.body;

    // Validate user input
    if (!email || !password) {
        return next(createError(400, 'Email and password are required.'));
    }

    try {
        const login_user = await Users.findOne({ where: { email } });

        if (!login_user) {
            return next(createError(400, 'Email or password is incorrect.'));
        }

        const isMatch = await bcrypt.compare(password, login_user.password);
        if (!isMatch) {
            return next(createError(400, 'Invalid credentials.'));
        }
        
        const token = jwt.sign(
            { id: login_user.id }, 
            process.env.JWT_SECRET, 
            { expiresIn: '30d' }
        );

        res.status(200).json({
            message: 'User logged in successfully.',
            data: {
                user: login_user,
                token
            },
            success: true
        });
    } catch (err) {
        return next(err);
    }
}

export {
    auth_register,
    auth_login
};