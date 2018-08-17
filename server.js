"use strict";
exports.__esModule = true;
// These are important and needed before anything else
require("zone.js/dist/zone-node");
require("reflect-metadata");
var platform_server_1 = require("@angular/platform-server");
var core_1 = require("@angular/core");
var express = require("express");
var path_1 = require("path");
var fs_1 = require("fs");
// Required for Firebase
global.WebSocket = require('ws');
global.XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
// Faster renders in prod mode
core_1.enableProdMode();
// Express server
var app = express();
var PORT = process.env.PORT || 4000;
var DIST_FOLDER = path_1.join(process.cwd(), 'dist');
var APP_NAME = 'afdocsite';
var AppServerModuleNgFactory = require("./dist/" + APP_NAME + "-server/main").AppServerModuleNgFactory;
// index.html template
var template = fs_1.readFileSync(path_1.join(DIST_FOLDER, APP_NAME, 'index.html')).toString();
app.engine('html', function (_, options, callback) {
    platform_server_1.renderModuleFactory(AppServerModuleNgFactory, {
        document: template,
        url: options.req.url
    }).then(function (html) {
        callback(null, html);
    });
});
app.set('view engine', 'html');
app.set('views', path_1.join(DIST_FOLDER, APP_NAME));
// Serve static files 
app.get('*.*', express.static(path_1.join(DIST_FOLDER, APP_NAME)));
// All regular routes use the Universal engine
app.get('*', function (req, res) {
    res.render(path_1.join(DIST_FOLDER, APP_NAME, 'index.html'), { req: req });
});
// Start up the Node server
app.listen(PORT, function () {
    console.log("Node server listening on http://localhost:" + PORT);
});
