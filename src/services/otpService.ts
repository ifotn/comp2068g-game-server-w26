import crypto from 'crypto';

interface OtpRecord {
    code: string;
    expiresAt: Date;
    attempts: number;
    maxAttempts: number;
};

// store otp codes in server memory not db
const otpStore = new Map<string, OtpRecord>();

export const generateOtp = (length: number = 6): string => {
    const len: number = Math.max(1, Math.min(9, Math.trunc(Number(length) || 6)));
    const max: number = 10 ** len;
    const n: number = crypto.randomInt(0, max);
    return String(n).padStart(len, '0');
}

export const storeOtp = (username: string, code: string) => {
    const expiresAt = new Date(Date.now() + parseInt(process.env.OTP_EXPIRES_IN));
    otpStore.set(username, { code, expiresAt, attempts: 0, maxAttempts: 5 });
}

export const verifyOtp = (username: string, code: string): boolean => {
    // search for codes for this user
    const record = otpStore.get(username);
    record.attempts++;

    // validate
    if (!record) throw new Error('OTP not found or expired');
    if (record.expiresAt < new Date()) throw new Error('Otp expired');
    if (record.attempts >= record.maxAttempts) throw new Error('Max attempts exceeded');
    if (record.code != code) throw new Error('OTP not found');

    // success
    clearOtp(username);
    return true;
}

export const clearOtp = (username: string) => {
    otpStore.delete(username);
}