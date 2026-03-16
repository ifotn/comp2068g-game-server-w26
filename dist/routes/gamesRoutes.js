"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// npm imports
const express_1 = __importDefault(require("express"));
// local file imports
const gamesController_1 = require("../controllers/gamesController");
const auth_1 = require("../middleware/auth");
// instantiate router to map url requests to the correct methods
const router = express_1.default.Router();
// map standard REST API url's to the CRUD functions in controller. reads are public
router.get('/', gamesController_1.getGames);
router.get('/:id', gamesController_1.getGame);
// private methods, call auth middleware first to verify cookie w/valid jwt and user id inside
router.post('/', auth_1.verifyToken, gamesController_1.createGame);
router.put('/:id/reviews', auth_1.verifyToken, gamesController_1.createReview);
router.put('/:id', auth_1.verifyToken, gamesController_1.updateGame);
router.delete('/:id', auth_1.verifyToken, gamesController_1.deleteGame);
// make router public
exports.default = router;
