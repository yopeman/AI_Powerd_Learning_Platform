import jwt from 'jsonwebtoken';
const SECRET_KEY = process.env.JWT_SECRET;

async function isAuth(req, res, next) {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).json({
            message: 'No Authorization Header'
        });
    }
    try {
        const token = authorization.split('Bearer ')[1];
        if (!token) {
            return res.status(401).json({
                message: 'Invalid Token Format'
            });
        }
        const decode = jwt.verify(token, SECRET_KEY);
        req.user = decode.login_user;
        console.log('Current user', req.user);
        
        next();
    } catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                message: 'Session Expired',
                error: error.message,
            });
        }
        if (error instanceof jwt.JsonWebTokenError || error instanceof TokenError) {
            return res.status(401).json({
                message: 'Invalid Token',
                error: error.message,
            });
        }
        res.status(500).json({
            message: 'Internal server Error',
            error: error.message,
            stack: error.stack
        });
    }
}

async function isAdmin(req, res, next) {
    if (!req.user) {
        const e = new Error('unauthorized users');
        e.status = 401;
        return next(e);
    }

    if (req.user.role !== 'admin') {
        const e = new Error('you have no admin privilage');
        e.status = 401;
        return next(e);
    }
    next();
}

async function isStudent(req, res, next) {
    if (!req.user) {
        const e = new Error('unauthorized users');
        e.status = 401;
        return next(e);
    }

    if (req.user.role !== 'student') {
        const e = new Error('you have no student privilage');
        e.status = 401;
        return next(e);
    }
    next();
}

async function isAssistant(req, res, next) {
    if (!req.user) {
        const e = new Error('unauthorized users');
        e.status = 401;
        return next(e);
    }

    if (req.user.role !== 'assistant') {
        const e = new Error('you have no assistant privilage');
        e.status = 401;
        return next(e);
    }
    next();
}

export default isAuth;
export {
    isAdmin,
    isStudent,
    isAssistant
}