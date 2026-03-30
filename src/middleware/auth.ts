import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

// middleware to authenticate requests to private methods
// ensure jwt exists and inside it, user id exists in db

interface jwtPayload {
    id: string;
    username: string;
}

// extend Request object to include User property
declare global {
    namespace Express {
        interface Request {
            user?: jwtPayload
        }
    }
}

export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        // fetch cookie containing jwt
        const token = req.cookies.authToken;
        
        // no authToken cookie, so no jwt
        if (!token) throw new Error();
        
        const decode = jwt.verify(token, process.env.PASSPORT_SECRET) as jwtPayload;
        req.user = decode;
        next(); // continue to private method that was invoked
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
}