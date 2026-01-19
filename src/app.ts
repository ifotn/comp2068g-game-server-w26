import express, { Application } from 'express';
import bodyParser from 'body-parser';

// controllers
import games from './controllers/games';

const app: Application = express();

// configure app globally to parse http request bodies as json
app.use(bodyParser.json());

// url dispatching
app.use('/api/v1/games', games);

app.listen(4000, () => { console.log('Server running on port 4000') });