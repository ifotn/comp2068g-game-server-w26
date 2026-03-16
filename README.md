# COMP2068G - Game Library Server API

## NPM Commands

`npm init -y` - inititalize npm

`npm i typescript ts-node`

`npm i express`

`npm audit fix --force` - update npm vulnerabilities

`npm run dev` - run app in dev mode using nodemon to watch for changes

`npm i body-parser` - needed to read body of HTTP POST & PUT requests

`npm i swagger-jsdoc swagger-ui-express` - Swagger API doc generator

## Lesson 4 NPM Commands

`npm i mongoose` - data access lib for MongoDB.  Used in Models

`npm i @types/node --save-dev` - to access "process" obj when reading env vars

## Lesson 5 Notes and NPM Commands

When adding / editing / delete variables from .env, we have to make the same changes in Vercel under Settings / Environment Variables as .env is exculded from GitHub.

Refactored to add Routes dir + files to separate URL mapping from CRUD logic functions in Controllers.  Follows standard REST API practices in JS/TS dev.

We added child documents in our Game model to nest multiple Reviews inside each Game doc.

## Lesson 10 Notes and NPM Commands

Add PASSPORT_SECRET string var to .env

Libraries for local auth
```bash
npm i passport passport-local passport-local-mongoose
```

Libraries for JSON Web Token (JWT) auth
```bash
npm i jsonwebtoken passport-jwt cookie-parser
```
