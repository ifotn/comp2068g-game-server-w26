import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser'; // accept json body in POST / PUT requests
import swaggerJsDoc from 'swagger-jsdoc'; // api doc generator
import swaggerUi from 'swagger-ui-express';
import mongoose from 'mongoose';  // mongodb access lib
import passport from 'passport';
import { Strategy , ExtractJwt } from 'passport-jwt';
import cookieParser from 'cookie-parser';

// routers
import gamesRouter from './routes/gamesRoutes';
import usersRouter from './routes/usersRoutes';

// models
import { User } from './models/user';

const app: Application = express();

// configure app globally to parse http request bodies as json
app.use(bodyParser.json());

// configure cookie parsing so we can read jwt in cookies for auth
app.use(cookieParser());

// db connection
const dbUri = process.env.DB!;

mongoose.connect(dbUri)
.then(() => { console.log('Connected to MongoDB') })
.catch((err: Error) => { console.log(`Connection Failed: ${err.message}`) });

// passport auth config BEFORE routers that will use passport as auth middleware
app.use(passport.initialize());

passport.use(User.createStrategy());

// link passport to session mgmt
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// jwt config
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.PASSPORT_SECRET
};

const strategy = new Strategy(jwtOptions, async (jwtPayload, done) => {
    try {
        // decrypt token and look up user inside it
        const user = await User.findById(jwtPayload.id);

        if (!user) throw new Error('Invalid User in Token');

        // user id exists in db, return no error but the user data instead
        return done(null, user);
    }
    catch (error) {
        // finish callback, returning error but no user data
        return done(error, null)
    }
});

passport.use(strategy);

// url dispatching
app.use('/api/v1/games', gamesRouter);
app.use('/api/v1/users', usersRouter);

// swagger api doc config
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Games API',
            version: '1.0.0'
        }
    },
    apis: ['./dist/controllers/*.js'] // location of api methods
}

const openApiSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUi.serve);

// hard-code swagger css & js links using public Content Delivery Network (CDN)
app.get('/api-docs', (req: Request, res: Response) => {
    const html: string = swaggerUi.generateHTML(openApiSpecs, {
        customCssUrl: 'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
        customJs: [
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.js',
            'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-standalone-preset.js'
        ]
    });

    res.send(html);
});

app.listen(4000, () => { console.log('Server running on port 4000') });