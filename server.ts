// These are important and needed before anything else
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';
import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';
import { readFileSync, writeFileSync, existsSync } from 'fs';
import { renderModuleFactory } from '@angular/platform-server';
import { mkdirSync } from 'mkdir-recursive';

import * as express from 'express';
import { join } from 'path';

// Required for Firebase
(global as any).WebSocket = require('ws');
(global as any).XMLHttpRequest = require('xhr2');

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

if (process.env.PRERENDER) {

  const routes = require('./static.paths').default;
  Promise.all(
      routes.map(route =>
          renderModuleFactory(AppServerModuleNgFactory, {
              document: template,
              url: route,
              extraProviders: [
                  provideModuleMap(LAZY_MODULE_MAP)
              ]
          }).then(html => [route, html])
      )
  ).then(results => {
      results.forEach(([route, html]) => {
          const fullPath = join('./public', route);
          if (!existsSync(fullPath)) { mkdirSync(fullPath) }
          writeFileSync(join(fullPath, 'index.html'), html);
      });
      process.exit();
  });

} else if (!process.env.FUNCTION_NAME) {

  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Node server listening on http://localhost:${PORT}`);
  });

}