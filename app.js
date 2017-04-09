/**
 * Main file
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This is the main Pokemon Showdown app, and the file you should be
 * running to start Pokemon Showdown if you're using it normally.
 *
 * This file sets up our SockJS server, which handles communication
 * between users and your server, and also sets up globals. You can
 * see details in their corresponding files, but here's an overview:
 *
 * Users - from users.js
 *
 *   Most of the communication with users happens in users.js, we just
 *   forward messages between the sockets.js and users.js.
 *
 * Rooms - from rooms.js
 *
 *   Every chat room and battle is a room, and what they do is done in
 *   rooms.js. There's also a global room which every user is in, and
 *   handles miscellaneous things like welcoming the user.
 *
 * Tools - from tools.js
 *
 *   Handles getting data about Pokemon, items, etc.
 *
 * Ladders - from ladders.js and ladders-remote.js
 *
 *   Handles Elo rating tracking for players.
 *
 * Chat - from chat.js
 *
 *   Handles chat and parses chat commands like /me and /ban
 *
 * Sockets - from sockets.js
 *
 *   Used to abstract out network connections. sockets.js handles
 *   the actual server and connection set-up.
 * Tells - from tells.js
 *
 *   Handles offline messaging.
 *
 * @license MIT license
 */

'use strict';

const fs = require('fs');
const path = require('path');

// Check for dependencies
try {
	require.resolve('sockjs');
} catch (e) {
	throw new Error("Dependencies unmet; run npm install");
}

/*********************************************************
 * Load configuration
 *********************************************************/

try {
	require.resolve('./config/config');
} catch (err) {
	if (err.code !== 'MODULE_NOT_FOUND') throw err; // should never happen

	// Copy it over synchronously from config-example.js since it's needed before we can start the server
	console.log("config.js doesn't exist - creating one with default settings...");
	fs.writeFileSync(path.resolve(__dirname, 'config/config.js'),
		fs.readFileSync(path.resolve(__dirname, 'config/config-example.js'))
	);
} finally {
	global.Config = require('./config/config');
}

if (Config.watchconfig) {
	let configPath = require.resolve('./config/config');
	fs.watchFile(configPath, (curr, prev) => {
		if (curr.mtime <= prev.mtime) return;
		try {
			delete require.cache[configPath];
			global.Config = require('./config/config');
			if (global.Users) Users.cacheGroupData();
			console.log('Reloaded config/config.js');
		} catch (e) {
			console.log('Error reloading config/config.js: ' + e.stack);
		}
	});
}

/*********************************************************
 * Set up most of our globals
 *********************************************************/

global.Monitor = require('./monitor');

global.Tools = require('./tools');
global.toId = Tools.getId;
global.uploadToHastebin = Tools.uploadToHastebin;

global.LoginServer = require('./loginserver');

global.Ladders = require(Config.remoteladder ? './ladders-remote' : './ladders');

global.Users = require('./users');

global.Punishments = require('./punishments');

global.Chat = require('./chat');

global.Rooms = require('./rooms');

global.Tells = require('./tells.js');

global.Db = require('nef')(require('nef-fs')('config/db'));

delete process.send; // in case we're a child process
global.Verifier = require('./verifier');
Verifier.PM.spawn();

global.Tournaments = require('./tournaments');

global.Dnsbl = require('./dnsbl');
Dnsbl.loadDatacenters();

if (Config.crashguard) {
	// graceful crash - allow current battles to finish before restarting
	process.on('uncaughtException', err => {
		let crashType = require('./crashlogger')(err, 'The main process');
		if (crashType === 'lockdown') {
			Rooms.global.startLockdown(err);
		} else {
			Rooms.global.reportCrash(err);
		}
	});
	process.on('unhandledRejection', err => {
		throw err;
	});
}

/*********************************************************
 * Start networking processes to be connected to
 *********************************************************/

global.Sockets = require('./sockets');

exports.listen = function (port, bindAddress, workerCount) {
	Sockets.listen(port, bindAddress, workerCount);
};

if (require.main === module) {
	// if running with node app.js, set up the server directly
	// (otherwise, wait for app.listen())
	let port;
	if (process.argv[2]) {
		port = parseInt(process.argv[2]); // eslint-disable-line radix
	}
	Sockets.listen(port);
}

/*********************************************************
 * Set up our last global
 *********************************************************/

// Generate and cache the format list.
Tools.includeFormats();

global.TeamValidator = require('./team-validator');
TeamValidator.PM.spawn();

/*********************************************************
 * Start up the REPL server
 *********************************************************/

require('./repl').start('app', cmd => eval(cmd));
