/**
 * Tells
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * Tells are the offline messaging system for PS. They are received when a
 * user successfully connects under a name that has tells waiting, and are
 * sent when a pm is sent to a user who does not exist or is not online.
 *
 * Tells are cleared after they have existed for a certain length of time
 * in order to remove any inactive messages. This length of time can be
 * specified in config.js
 *
 * @license MIT license
 */

'use strict';

let fs = require('fs');
let color = require('./config/color');

let tells = {inbox: {}, outbox: {}};
try {
	tells = JSON.parse(fs.readFileSync('config/tells.json'));
} catch (e) {} // file doesn't exist (yet)

/**
 * Purge expired messages from those stored
 * @param threshold	The age limit of an "old" tell, in ms
 */
let pruneOld = exports.pruneOld = function (threshold) {
	let now = Date.now();
	let receivers = Object.keys(Tells.inbox);
	for (let i = 0; i < receivers.length; i++) {
		for (let n = 0; n < Tells.inbox[receivers[i]].length; n++) {
			if ((now - Tells.inbox[receivers[i]][n].time) >= threshold) {
				let ips = Object.keys(Tells.inbox[receivers[i]][n].ips);
				for (let ip = 0; ip < ips.length; ip++) {
					if (Tells.outbox[ips[ip]]) Tells.outbox[ips[ip]]--;
					if (Tells.outbox[ips[ip]] <= 0) delete Tells.outbox[ips[ip]];
				}
				Tells.inbox[receivers[i]].splice(n, 1);
				n--;
			}
		}
		if (!Tells.inbox[receivers[i]].length) delete Tells.inbox[receivers[i]];
	}
	Tells.writeTells();
};

exports.inbox = tells.inbox || {};
exports.outbox = tells.outbox || {};

/**
 * Write the inbox and outbox to file
 */
exports.writeTells = (function () {
	let writing = false;
	let writePending = false; // whether or not a new write is pending
	let finishWriting = function () {
		writing = false;
		if (writePending) {
			writePending = false;
			Tells.writeTells();
		}
	};
	return function () {
		if (writing) {
			writePending = true;
			return;
		}
		writing = true;
		let data = JSON.stringify({inbox: Tells.inbox, outbox: Tells.outbox});
		fs.writeFile('config/tells.json.0', data, function () {
			// rename is atomic on POSIX, but will throw an error on Windows
			fs.rename('config/tells.json.0', 'config/tells.json', function (err) {
				if (err) {
					// This should only happen on Windows.
					fs.writeFile('config/tells.json', data, finishWriting);
					return;
				}
				finishWriting();
			});
		});
	};
})();

/**
 * Format a user's inbox and send it on to the client to be delivered
 * @param userid	The userid whose tells to send
 * @param user		The User object to send the tells to
 */
exports.sendTell = function (userid, user) {
	let buffer = '|raw|';
	let tellsToSend = Tells.inbox[userid];
	for (let i = 0; i < tellsToSend.length; i++) {
		let ips = Object.keys(tellsToSend[i].ips);
		for (let ip = 0; ip < ips.length; ip++) {
			if (Tells.outbox[ips[ip]]) Tells.outbox[ips[ip]]--;
			if (Tells.outbox[ips[ip]] <= 0) delete Tells.outbox[ips[ip]];
		}
		let timeStr = Tells.getTellTime(tellsToSend[i].time);
		buffer += '<div class="chat"><font color="gray">[' + timeStr + ' ago]</font> <b><font color="' + color(toId(tellsToSend[i].sender)) + '">' + tellsToSend[i].sender + ':</font></b> ' + Tools.escapeHTML(tellsToSend[i].msg.replace(/\|/g, '&#124;')) + '</div>';
	}
	user.send(buffer);
	delete Tells.inbox[userid];
	Tells.writeTells();
};

/**
 * Store a tell to be received later
 * @param sender	The User object of the sender
 * @param receiver	The target userid
 * @param msg		The message to be send
 * @return		false if the receiver has a full inbox
 *			null if the sender has a full outbox
 *			otherwise true
 */
exports.addTell = function (sender, receiver, msg) {
	if (Tells.inbox[receiver] && Tells.inbox[receiver].length >= 5) return false;
	let ips = Object.keys(sender.ips);
	for (let i = 0; i < ips.length; i++) {
		if (!Tells.outbox[ips[i]]) {
			Tells.outbox[ips[i]] = 1;
		} else {
			if (Tells.outbox[ips[i]] >= 10) return null;
			Tells.outbox[ips[i]]++;
		}
	}
	if (!Tells.inbox[receiver]) Tells.inbox[receiver] = [];
	let newTell = {
		'sender': sender.name,
		time: Date.now(),
		'msg': msg,
		ips: sender.ips
	};
	Tells.inbox[receiver].push(newTell);
	Tells.writeTells();
	return true;
};

/**
 * Converts a UNIX timestamp into 'x minutes, y seconds ago' form
 * @param time	UNIX timestamp (e.g., 1405460769855)
 * @return 	A human readable time difference between now and the given time
 */
exports.getTellTime = function (time) {
	time = Date.now() - time;
	time = Math.round(time / 1000); // rounds to nearest second
	let seconds = time % 60;
	let times = [];
	if (seconds) times.push(String(seconds) + (seconds === 1 ? ' second' : ' seconds'));
	let minutes, hours, days;
	if (time >= 60) {
		time = (time - seconds) / 60; // converts to minutes
		minutes = time % 60;
		if (minutes) times.unshift(String(minutes) + (minutes === 1 ? ' minute' : ' minutes'));
		if (time >= 60) {
			time = (time - minutes) / 60; // converts to hours
			hours = time % 24;
			if (hours) times.unshift(String(hours) + (hours === 1 ? ' hour' : ' hours'));
			if (time >= 24) {
				days = (time - hours) / 24; // you can probably guess this one
				if (days) times.unshift(String(days) + (days === 1 ? ' day' : ' days'));
			}
		}
	}
	if (!times.length) times.push('0 seconds');
	return times.join(', ');
};

// clear old messages every two hours
exports.pruneOldTimer = setInterval(pruneOld, 1000 * 60 * 60 * 2,
        Config.tellsexpiryage || 1000 * 60 * 60 * 24 * 7);
