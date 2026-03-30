import express, { Request, Response, Router } from 'express';
import { register, login, logout, validateOtp } from '../controllers/usersController';

const router: Router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.post('/verify-otp', validateOtp);

export default router;