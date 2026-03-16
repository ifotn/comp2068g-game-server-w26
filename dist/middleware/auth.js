"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyToken = (req, res, next) => {
    try {
        // fetch cookie containing jwt
        const token = req.cookies.authToken;
        console.log(`${token}: token`);
        // no authToken cookie, so no jwt
        if (!token)
            throw new Error();
        const decode = jsonwebtoken_1.default.verify(token, process.env.PASSPORT_SECRET);
        req.user = decode;
        next(); // continue to private method that was invoked
    }
    catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.verifyToken = verifyToken;
