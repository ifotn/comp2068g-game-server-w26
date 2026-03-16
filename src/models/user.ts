import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

// create schema, don't bother w/interface as plm doesn't support TS very well
const userSchema = new mongoose.Schema({
    username: { 
        type: String,
        required: [true, 'Username is required'],
        trim: true,
        minLength: 6
    },
    password: {  // will be validated in register method of controller
        type: String,
        trim: true
    }
});

// this model extends plm => tells passport this model is for user management
// inherits properties and methods of plm
userSchema.plugin(passportLocalMongoose);

// make public
export const User = mongoose.model('User', userSchema) as any;