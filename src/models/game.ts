import mongoose, { Model, Schema } from 'mongoose';

interface IGame {
    title: string;
    developer: string;
    genre: string;
    price: number;
    rating: string;
}

const GameSchema = new Schema<IGame>({
    title: {
        type: String,
        required: [true, 'Title Required']
    },
    developer: {
        type: String,
        required: [true, 'Developer Required']
    },
    genre: {
        type: String,
        required: [true, 'Genre Required']
    },
    price: {
        type: Number
    },
    rating: {
        type: String
    }
});

// create Model def and make public
const Game = mongoose.model<IGame>('Game', GameSchema);
export default Game;