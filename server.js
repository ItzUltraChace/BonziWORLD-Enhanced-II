// Filesystem reading functions
const fs = require('fs-extra', 'fs');
const path = require('path');



// Load settings
try {
  stats = fs.lstatSync(`${__dirname}/json/settings.json`);
} catch (err) {
  // If settings do not yet exist
  if (err.code == "ENOENT") {
    try {
      fs.copySync(`${__dirname}/json/settings.example.json`, `${__dirname}/json/settings.json`);
      console.log("Created new settings file.");
    } catch (err) {
      console.log(err);
      throw "Could not create new settings file.";
    }
    // Else, there was a misc error (permissions?)
  } else {
    console.log(err);
    throw "Could not read 'settings.json'.";
  }
}

// Load settings into memory
const settings = require(`${__dirname}/json/settings.json`);

// Setup basic express server
var express = require("express");
var app = express();
if (settings.sv.express.serveStatic) app.use(express.static(`${__dirname}/web/www`));

app.get('/readme.html', (req, res) => {
  res.sendFile(`${__dirname}/web/www/readme/index.html`);
});
app.get('/rules.html', (req, res) => {
  res.sendFile(`${__dirname}/web/www/rules/index.html`);
});

var server = require("http").createServer(app);


// Init socket.io
var io = require('socket.io')(server, {
	allowEIO3: false, allowEIO2: false, allowEIO1: false,
	maxHttpBufferSize: 8389000,
	transports: ["websocket"],
});


// Variable for toggling Replit mode
const isReplit = settings.sv.info.isReplit;

if (isReplit === true) {
	var port = 80;
} else {
	var port = process.env.port || settings.sv.express.port;
}
exports.io = io;


// Init sanitize-html
var sanitize = require("sanitize-html");

// Init winston loggers (hi there)
const Log = require("./svnet/log.js");
Log.init();
const log = Log.log;


// Load punishment data (bans, mutes, shadows, warns, user reports, etc.)
const pData = require("./svnet/punish.js");
pData.init();

// Start actually listening
server.listen(port, function() {
  console.log(` Welcome to ${settings.sv.info.name}!!\n`, `HTTP Express Server listening on port ${port}\n`, "=+.----------------*-<|{ Logs }|>-*----------------.+=\n");
});
app.use(express.static(`${__dirname}/public`));

// Load the BonziWORLD Enhanced 2 libs
const Utils = require("./svnet/utils.js");
const Main = require("./svnet/main.js");
Main.exec();
const Console = require("./svnet/console.js");
Console.listen();
