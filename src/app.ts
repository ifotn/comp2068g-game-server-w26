import express, { Application } from 'express';

const app: Application = express();

app.listen(4000, () => { console.log('Server running on port 4000') });