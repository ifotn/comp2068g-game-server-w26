"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
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
        return res.status(201).json(user);
    }
    catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
exports.register = register;
