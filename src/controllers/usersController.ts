import express, { Request, Response } from 'express';
import { User } from '../models/user';
import jwt from 'jsonwebtoken';

// jwt fns

// creates jwt and returns it as a string
const generateToken = (user: any): string => {
    const payload = { 
        id: user._id,
        username: user.username
    };

    const jwtOptions = { expiresIn: '1hr' };

    // create & return jwt, using content in payload, expiry above, and secret for encryption
    return jwt.sign(payload, process.env.PASSPORT_SECRET, jwtOptions);
}

// save jwt to HttpOnly cookie - visible in browser but not modifiable by JS
const setTokenCookie = (res: Response, token: string) => {
    res.cookie('authToken', token, {
        httpOnly: true,
        secure: true,
        sameSite: 'None'
    });
}

// remove jwt on logout
const clearTokenCookie = (res: Response): void => {
    res.clearCookie('authToken');
}

export const register = async (req: Request, res: Response) => {
    try {
        // duplicate username check
        const duplicateUser = await User.findOne({ username: req.body.username });

        if (duplicateUser) {
            throw new Error('User already exists');
        }

        // manual password val. can add regex later
        if (req.body.password.length < 8) {
            throw new Error('Password must be min 8 characters');
        }

        // create new user first from username
        const user = new User({ username: req.body.username });

        // hash password
        await user.setPassword(req.body.password);

        // save new user
        await user.save();

        // return response
        return res.status(201).json({ _id: user._id, username: user.username });
        }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        // check username first
        const user = await User.findOne({ username: req.body.username });

        if (!user) throw new Error();

        // call passport authenticate() fn
        const result = await user.authenticate(req.body.password);

        if (!result.user) throw new Error;

        // create jwt containing user info
        const authToken: string = generateToken(result.user);

        // create httponly cookie containing jwt
        setTokenCookie(res, authToken);

        return res.status(200).json({ success: true });
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid Login' });
    }
};

export const logout = async(req: Request, res: Response) => {
    clearTokenCookie(res);
    return res.status(200).json({ message: 'User Logged Out' });
}