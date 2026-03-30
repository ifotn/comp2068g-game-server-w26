"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearOtp = exports.verifyOtp = exports.storeOtp = exports.generateOtp = void 0;
const crypto_1 = __importDefault(require("crypto"));
;
// store otp codes in server memory not db
const otpStore = new Map();
const generateOtp = (length = 6) => {
    const len = Math.max(1, Math.min(9, Math.trunc(Number(length) || 6)));
    const max = 10 ** len;
    const n = crypto_1.default.randomInt(0, max);
    return String(n).padStart(len, '0');
};
exports.generateOtp = generateOtp;
const storeOtp = (username, code) => {
    const expiresAt = new Date(Date.now() + parseInt(process.env.OTP_EXPIRES_IN));
    otpStore.set(username, { code, expiresAt, attempts: 0, maxAttempts: 5 });
};
exports.storeOtp = storeOtp;
const verifyOtp = (username, code) => {
    // search for codes for this user
    const record = otpStore.get(username);
    record.attempts++;
    // validate
    if (!record)
        throw new Error('OTP not found or expired');
    if (record.expiresAt < new Date())
        throw new Error('Otp expired');
    if (record.attempts >= record.maxAttempts)
        throw new Error('Max attempts exceeded');
    if (record.code != code)
        throw new Error('OTP not found');
    // success
    (0, exports.clearOtp)(username);
    return true;
};
exports.verifyOtp = verifyOtp;
const clearOtp = (username) => {
    otpStore.delete(username);
};
exports.clearOtp = clearOtp;
