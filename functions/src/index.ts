import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

// tslint:disable:no-import-side-effect
import 'zone.js/dist/zone-node';
// tslint:disable:no-import-side-effect
import 'reflect-metadata';

import { renderModuleFactory } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;


// Faster renders in prod mode
enableProdMode();

// Express server
const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'afdocsite';

const { AppServerModuleNgFactory } = require(`./dist/${APP_NAME}-server/main`);

// index.html template
const template = readFileSync(join(DIST_FOLDER, APP_NAME, 'index.html')).toString();

app.engine('html', (_, options, callback) => {
  // tslint:disable:no-floating-promises
  renderModuleFactory(AppServerModuleNgFactory, {
    document: template,
    url: options.req.url,
  }).then(html => {
    callback(null, html);
  });
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Serve static files
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME)));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
    res.render(join(DIST_FOLDER, APP_NAME, 'index.html'), { req });
});


export const reference = functions.https.onRequest(app);