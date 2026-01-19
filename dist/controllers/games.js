"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// instantiate router to map url requests to the correct methods
const router = express_1.default.Router();
;
let games = [
    { id: 1, title: 'SpongeBob Cosmic Shake' },
    { id: 2, title: 'Roblox' },
    { id: 3, title: 'Donkey Kong Country Returns' }
];
/**
 * @swagger
 * /api/v1/games:
 *   get:
 *     summary: Retrieve all games
 *     responses:
 *       200:
 *         description: A list of games
 */
router.get('/', (req, res) => {
    return res.status(200).json(games);
});
/**
 * @swagger
 * /api/v1/games:
 *   post:
 *     summary: Create a new game
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: integer
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Game created
 *       400:
 *         description: Bad request
 */
router.post('/', (req, res) => {
    if (!req.body) {
        return res.status(400).json({ 'err': 'Invalid Request Body' }); // 400: Bad Request
    }
    // add new game to array from request body
    games.push(req.body);
    return res.status(201).json(); // 201: resource created
});
/* PUT: /api/v1/games/35 */
router.put('/:id', (req, res) => {
    // search array for id in url param.  Use == as req.params has a type of "any"
    const index = games.findIndex(g => g.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ 'err': 'Game Not Found' });
    }
    games[index].title = req.body.title; // update array element from http request body
    return res.status(204).json({ 'msg': 'Game Updated' }); // 204: No Content
});
/* DELETE: /api/v1/games/35 */
router.delete('/:id', (req, res) => {
    // search array for id in url param.  Use == as req.params has a type of "any"
    const index = games.findIndex(g => g.id == req.params.id);
    if (index === -1) {
        return res.status(404).json({ 'err': 'Game Not Found' });
    }
    games.splice(index, 1);
    return res.status(204).json({ 'msg': 'Game Deleted' }); // 204: No Content
});
// make controller public
exports.default = router;
