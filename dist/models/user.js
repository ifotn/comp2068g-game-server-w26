"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const passport_local_mongoose_1 = __importDefault(require("passport-local-mongoose"));
// create schema, don't bother w/interface as plm doesn't support TS very well
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 6
    },
    password: {
        type: String,
        trim: true
    }
});
// this model extends plm => tells passport this model is for user management
// inherits properties and methods of plm
userSchema.plugin(passport_local_mongoose_1.default);
// make public
exports.User = mongoose_1.default.model('User', userSchema);
