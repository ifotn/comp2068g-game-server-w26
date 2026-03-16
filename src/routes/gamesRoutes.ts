// npm imports
import express, { Router } from 'express';

// local file imports
import { getGames, createGame, updateGame, deleteGame, createReview, getGame } from '../controllers/gamesController';
import { verifyToken } from '../middleware/auth';

// instantiate router to map url requests to the correct methods
const router: Router = express.Router();

// map standard REST API url's to the CRUD functions in controller. reads are public
router.get('/', getGames);
router.get('/:id', getGame);

// private methods, call auth middleware first to verify cookie w/valid jwt and user id inside
router.post('/', verifyToken, createGame);  
router.put('/:id/reviews', verifyToken, createReview);
router.put('/:id', verifyToken, updateGame);
router.delete('/:id', verifyToken, deleteGame);

// make router public
export default router;