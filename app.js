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
 *   Handles getting data about Pokemon, items, etc. *
 *
 * Simulator - from simulator.js
 *
 *   Used to access the simulator itself.
 *
 * CommandParser - from command-parser.js
 *
 *   Parses text commands like /me
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

/*********************************************************
 * Make sure we have everything set up correctly
 *********************************************************/

// Make sure our dependencies are available, and install them if they
// aren't

function runNpm(command) {
	if (require.main !== module) throw new Error("Dependencies unmet");

	command = 'npm ' + command + ' && ' + process.execPath + ' app.js';
	console.log('Running `' + command + '`...');
	require('child_process').spawn('sh', ['-c', command], {stdio: 'inherit', detached: true});
	process.exit(0);
}

var isLegacyEngine = !(''.includes);

var fs = require('fs');
var path = require('path');
try {
	require('sugar');
	if (isLegacyEngine) require('es6-shim');
} catch (e) {
	runNpm('install --production');
}
if (isLegacyEngine && !(''.includes)) {
	runNpm('update --production');
}

/*********************************************************
 * Load configuration
 *********************************************************/

try {
	global.Config = require('./config/config.js');
} catch (err) {
	if (err.code !== 'MODULE_NOT_FOUND') throw err;

	// Copy it over synchronously from config-example.js since it's needed before we can start the server
	console.log("config.js doesn't exist - creating one with default settings...");
	fs.writeFileSync(path.resolve(__dirname, 'config/config.js'),
		fs.readFileSync(path.resolve(__dirname, 'config/config-example.js'))
	);
	global.Config = require('./config/config.js');
}

if (Config.watchconfig) {
	fs.watchFile(path.resolve(__dirname, 'config/config.js'), function (curr, prev) {
		if (curr.mtime <= prev.mtime) return;
		try {
			delete require.cache[require.resolve('./config/config.js')];
			global.Config = require('./config/config.js');
			if (global.Users) Users.cacheGroupData();
			console.log('Reloaded config/config.js');
		} catch (e) {}
	});
}

// Autoconfigure the app when running in cloud hosting environments:
try {
	var cloudenv = require('cloud-env');
	Config.bindaddress = cloudenv.get('IP', Config.bindaddress || '');
	Config.port = cloudenv.get('PORT', Config.port);
} catch (e) {}

if (require.main === module && process.argv[2] && parseInt(process.argv[2])) {
	Config.port = parseInt(process.argv[2]);
	Config.ssl = null;
}

global.ResourceMonitor = {
	connections: {},
	connectionTimes: {},
	battles: {},
	battleTimes: {},
	battlePreps: {},
	battlePrepTimes: {},
	groupChats: {},
	groupChatTimes: {},
	networkUse: {},
	networkCount: {},
	cmds: {},
	cmdsTimes: {},
	cmdsTotal: {lastCleanup: Date.now(), count: 0},
	teamValidatorChanged: 0,
	teamValidatorUnchanged: 0,
	/**
	 * Counts a connection. Returns true if the connection should be terminated for abuse.
	 */
	log: function (text) {
		console.log(text);
		if (Rooms.get('staff')) {
			Rooms.get('staff').add('|c|~|' + text).update();
		}
	},
	adminlog: function (text) {
		console.log(text);
		if (Rooms.get('upperstaff')) {
			Rooms.get('upperstaff').add('|c|~|' + text).update();
		}
	},
	logHTML: function (text) {
		console.log(text);
		if (Rooms.get('staff')) {
			Rooms.get('staff').add('|html|' + text).update();
		}
	},
	countConnection: function (ip, name) {
		var now = Date.now();
		var duration = now - this.connectionTimes[ip];
		name = (name ? ': ' + name : '');
		if (ip in this.connections && duration < 30 * 60 * 1000) {
			this.connections[ip]++;
			if (this.connections[ip] === 500) {
				this.adminlog('[ResourceMonitor] IP ' + ip + ' has been banned for connection flooding (' + this.connections[ip] + ' times in the last ' + duration.duration() + name + ')');
				return true;
			} else if (this.connections[ip] > 500) {
				if (this.connections[ip] % 500 === 0) {
					var c = this.connections[ip] / 500;
					if (c < 5 || c % 2 === 0 && c < 10 || c % 5 === 0) {
						this.adminlog('[ResourceMonitor] Banned IP ' + ip + ' has connected ' + this.connections[ip] + ' times in the last ' + duration.duration() + name);
					}
				}
				return true;
			}
		} else {
			this.connections[ip] = 1;
			this.connectionTimes[ip] = now;
		}
	},
	/**
	 * Counts a battle. Returns true if the connection should be terminated for abuse.
	 */
	countBattle: function (ip, name) {
		var now = Date.now();
		var duration = now - this.battleTimes[ip];
		name = (name ? ': ' + name : '');
		if (ip in this.battles && duration < 30 * 60 * 1000) {
			this.battles[ip]++;
			if (duration < 5 * 60 * 1000 && this.battles[ip] % 15 === 0) {
				this.log('[ResourceMonitor] IP ' + ip + ' has battled ' + this.battles[ip] + ' times in the last ' + duration.duration() + name);
			} else if (this.battles[ip] % 75 === 0) {
				this.log('[ResourceMonitor] IP ' + ip + ' has battled ' + this.battles[ip] + ' times in the last ' + duration.duration() + name);
			}
		} else {
			this.battles[ip] = 1;
			this.battleTimes[ip] = now;
		}
	},
	/**
	 * Counts battle prep. Returns true if too much
	 */
	countPrepBattle: function (ip) {
		var now = Date.now();
		var duration = now - this.battlePrepTimes[ip];
		if (ip in this.battlePreps && duration < 3 * 60 * 1000) {
			this.battlePreps[ip]++;
			if (this.battlePreps[ip] > 6) {
				return true;
			}
		} else {
			this.battlePreps[ip] = 1;
			this.battlePrepTimes[ip] = now;
		}
	},
	/**
	 * Counts group chat creation. Returns true if too much.
	 */
	countGroupChat: function (ip) {
		var now = Date.now();
		var duration = now - this.groupChatTimes[ip];
		if (ip in this.groupChats && duration < 60 * 60 * 1000) {
			this.groupChats[ip]++;
			if (this.groupChats[ip] > 4) {
				return true;
			}
		} else {
			this.groupChats[ip] = 1;
			this.groupChatTimes[ip] = now;
		}
	},
	/**
	 * data
	 */
	countNetworkUse: function (size) {
		if (this.activeIp in this.networkUse) {
			this.networkUse[this.activeIp] += size;
			this.networkCount[this.activeIp]++;
		} else {
			this.networkUse[this.activeIp] = size;
			this.networkCount[this.activeIp] = 1;
		}
	},
	writeNetworkUse: function () {
		var buf = '';
		for (var i in this.networkUse) {
			buf += '' + this.networkUse[i] + '\t' + this.networkCount[i] + '\t' + i + '\n';
		}
		fs.writeFile(path.resolve(__dirname, 'logs/networkuse.tsv'), buf);
	},
	clearNetworkUse: function () {
		this.networkUse = {};
		this.networkCount = {};
	},
	/**
	 * Counts roughly the size of an object to have an idea of the server load.
	 */
	sizeOfObject: function (object) {
		var objectList = [];
		var stack = [object];
		var bytes = 0;

		while (stack.length) {
			var value = stack.pop();
			if (typeof value === 'boolean') {
				bytes += 4;
			} else if (typeof value === 'string') {
				bytes += value.length * 2;
			} else if (typeof value === 'number') {
				bytes += 8;
			} else if (typeof value === 'object' && objectList.indexOf(value) < 0) {
				objectList.push(value);
				for (var i in value) stack.push(value[i]);
			}
		}

		return bytes;
	},
	/**
	 * Controls the amount of times a cmd command is used
	 */
	countCmd: function (ip, name) {
		var now = Date.now();
		var duration = now - this.cmdsTimes[ip];
		name = (name ? ': ' + name : '');
		if (!this.cmdsTotal) this.cmdsTotal = {lastCleanup: 0, count: 0};
		if (now - this.cmdsTotal.lastCleanup > 60 * 1000) {
			this.cmdsTotal.count = 0;
			this.cmdsTotal.lastCleanup = now;
		}
		this.cmdsTotal.count++;
		if (ip in this.cmds && duration < 60 * 1000) {
			this.cmds[ip]++;
			if (duration < 60 * 1000 && this.cmds[ip] % 5 === 0) {
				if (this.cmds[ip] >= 3) {
					if (this.cmds[ip] % 30 === 0) this.log('CMD command from ' + ip + ' blocked for ' + this.cmds[ip] + 'th use in the last ' + duration.duration() + name);
					return true;
				}
				this.log('[ResourceMonitor] IP ' + ip + ' has used CMD command ' + this.cmds[ip] + ' times in the last ' + duration.duration() + name);
			} else if (this.cmds[ip] % 15 === 0) {
				this.log('CMD command from ' + ip + ' blocked for ' + this.cmds[ip] + 'th use in the last ' + duration.duration() + name);
				return true;
			}
		} else if (this.cmdsTotal.count > 8000) {
			// One CMD check per user per minute on average (to-do: make this better)
			this.log('CMD command for ' + ip + ' blocked because CMD has been used ' + this.cmdsTotal.count + ' times in the last minute.');
			return true;
		} else {
			this.cmds[ip] = 1;
			this.cmdsTimes[ip] = now;
		}
	}
};

/*********************************************************
 * Set up most of our globals
 *********************************************************/

/**
 * Converts anything to an ID. An ID must have only lowercase alphanumeric
 * characters.
 * If a string is passed, it will be converted to lowercase and
 * non-alphanumeric characters will be stripped.
 * If an object with an ID is passed, its ID will be returned.
 * Otherwise, an empty string will be returned.
 */
global.toId = function (text) {
	if (text && text.id) {
		text = text.id;
	} else if (text && text.userid) {
		text = text.userid;
	}
	if (typeof text !== 'string' && typeof text !== 'number') return '';
	return ('' + text).toLowerCase().replace(/[^a-z0-9]+/g, '');
};

global.Tools = require('./tools.js').includeFormats();

global.LoginServer = require('./loginserver.js');

global.Ladders = require(Config.remoteladder ? './ladders-remote.js' : './ladders.js');

global.Users = require('./users.js');

global.Rooms = require('./rooms.js');

Rooms.global.formatListText = Rooms.global.getFormatListText();

global.Tells = require('./tells.js');

global.Database = require('./database.js')(Config.database);

try {
	global.Seen = JSON.parse(fs.readFileSync('config/seen.json', 'utf8'));
} catch (e) {
	if (e instanceof SyntaxError) e.message = 'Malformed JSON in seen.json: \n' + e.message;
	if (e.code !== 'ENOENT') throw e;
	global.Seen = {};
}

delete process.send; // in case we're a child process
global.Verifier = require('./verifier.js');

global.CommandParser = require('./command-parser.js');

global.Simulator = require('./simulator.js');

global.Tournaments = require('./tournaments');

try {
	global.Dnsbl = require('./dnsbl.js');
} catch (e) {
	global.Dnsbl = {query:function () {}};
}

global.Cidr = require('./cidr.js');

if (Config.crashguard) {
	// graceful crash - allow current battles to finish before restarting
	var lastCrash = 0;
	process.on('uncaughtException', function (err) {
		var dateNow = Date.now();
		var quietCrash = require('./crashlogger.js')(err, 'The main process', true);
		quietCrash = quietCrash || ((dateNow - lastCrash) <= 1000 * 60 * 5);
		lastCrash = Date.now();
		if (quietCrash) return;
		var stack = ("" + err.stack).escapeHTML().split("\n").slice(0, 2).join("<br />");
		if (Rooms.lobby) {
			Rooms.lobby.addRaw('<div class="broadcast-red"><b>THE SERVER HAS CRASHED:</b> ' + stack + '<br />Please restart the server.</div>');
			Rooms.lobby.addRaw('<div class="broadcast-red">You will not be able to talk in the lobby or start new battles until the server restarts.</div>');
		}
		Rooms.global.lockdown = true;
	});
}

/*********************************************************
 * Start networking processes to be connected to
 *********************************************************/

global.Sockets = require('./sockets.js');

/*********************************************************
 * Set up our last global
 *********************************************************/

global.TeamValidator = require('./team-validator.js');

// load ipbans at our leisure
fs.readFile(path.resolve(__dirname, 'config/ipbans.txt'), function (err, data) {
	if (err) return;
	data = ('' + data).split("\n");
	var rangebans = [];
	for (var i = 0; i < data.length; i++) {
		data[i] = data[i].split('#')[0].trim();
		if (!data[i]) continue;
		if (data[i].includes('/')) {
			rangebans.push(data[i]);
		} else if (!Users.bannedIps[data[i]]) {
			Users.bannedIps[data[i]] = '#ipban';
		}
	}
	Users.checkRangeBanned = Cidr.checker(rangebans);
});

/*********************************************************
 * Start up the REPL server
 *********************************************************/

require('./repl.js').start('app', function (cmd) { return eval(cmd); });
