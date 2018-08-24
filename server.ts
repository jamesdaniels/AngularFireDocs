// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import { readFileSync } from 'fs';

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');
(global as any).XMLHttpRequestEventTarget = require('xhr2').XMLHttpRequestEventTarget;
(global as any).XMLHttpRequestUpload = require('xhr2').XMLHttpRequestUpload;

// Faster renders in prod mode
enableProdMode();

// Express server
export const app = express();

const DIST_FOLDER = join(process.cwd(), 'dist');
const APP_NAME = 'afdocsite';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require(`./dist/${APP_NAME}-server/main`);

// index.html template
const template = readFileSync(join(DIST_FOLDER, APP_NAME, 'index.html')).toString();

app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, APP_NAME));

// Serve static files 
app.get('*.*', express.static(join(DIST_FOLDER, APP_NAME)));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render(join(DIST_FOLDER, APP_NAME, 'index.html'), { req });
});