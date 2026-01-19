"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// controllers
const games_1 = __importDefault(require("./controllers/games"));
const app = (0, express_1.default)();
// configure app globally to parse http request bodies as json
app.use(body_parser_1.default.json());
// url dispatching
app.use('/api/v1/games', games_1.default);
app.listen(4000, () => { console.log('Server running on port 4000'); });
