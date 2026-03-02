// npm imports
import express, { Router } from 'express';

// local file imports
import { getGames, createGame, updateGame, deleteGame, createReview, getGame } from '../controllers/gamesController';

// instantiate router to map url requests to the correct methods
const router: Router = express.Router();

// map standard REST API url's to the CRUD functions in controller
router.get('/', getGames);
router.get('/:id', getGame);
router.post('/', createGame);
router.put('/:id/reviews', createReview);
router.put('/:id', updateGame);
router.delete('/:id', deleteGame);

// make router public
export default router;