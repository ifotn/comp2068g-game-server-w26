"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.login = exports.register = void 0;
const user_1 = require("../models/user");
const register = async (req, res) => {
    try {
        // duplicate username check
        const duplicateUser = await user_1.User.findOne({ username: req.body.username });
        if (duplicateUser) {
            throw new Error('User already exists');
        }
        // manual password val. can add regex later
        if (req.body.password.length < 8) {
            throw new Error('Password must be min 8 characters');
        }
        // create new user first from username
        const user = new user_1.User({ username: req.body.username });
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
exports.register = register;
const login = async (req, res) => {
    try {
        // check username first
        const user = await user_1.User.findOne({ username: req.body.username });
        if (!user)
            throw new Error();
        // call passport authenticate() fn
        const result = await user.authenticate(req.body.password);
        if (!result.user)
            throw new Error;
        return res.status(200).json({ _id: result.user._id, username: result.user.username });
    }
    catch (error) {
        return res.status(401).json({ error: 'Invalid Login' });
    }
};
exports.login = login;
const logout = async (req, res) => {
    return res.status(200).json({ message: 'User Logged Out' });
};
exports.logout = logout;
