/**
 * Chat
 * Pokemon Showdown - http://pokemonshowdown.com/
 *
 * This handles chat and chat commands sent from users to chatrooms
 * and PMs. The main function you're lookoing for is Chat.parse
 * (scroll down to its definition for details)
 *
 * Individual commands are put in:
 *   chat-commands.js - "core" commands that shouldn't be modified
 *   chat-plugins/ - other commands that can be safely modified
 *
 * The command API is (mostly) documented in chat-plugins/COMMANDS.md
 *
 * @license MIT license
 */

/*

To reload chat commands:

/hotpatch chat

*/

'use strict';

let Chat = module.exports;

const MAX_MESSAGE_LENGTH = 300;

const BROADCAST_COOLDOWN = 20 * 1000;
const MESSAGE_COOLDOWN = 5 * 60 * 1000;

const MAX_PARSE_RECURSION = 10;

const VALID_COMMAND_TOKENS = '/!';
const BROADCAST_TOKEN = '!';

const fs = require('fs');
const path = require('path');
const parseEmoticons = require('./chat-plugins/emoticons').parseEmoticons;

class PatternTester {
	// This class sounds like a RegExp
	// In fact, one could in theory implement it as a RegExp subclass
	// However, ES2016 RegExp subclassing is a can of worms, and it wouldn't allow us
	// to tailor the test method for fast command parsing.
	constructor() {
		this.elements = [];
		this.fastElements = new Set();
		this.regexp = null;
	}
	fastNormalize(elem) {
		return elem.slice(0, -1);
	}
	update() {
		const slowElements = this.elements.filter(elem => !this.fastElements.has(this.fastNormalize(elem)));
		if (slowElements.length) {
			this.regexp = new RegExp('^(' + slowElements.map(elem => '(?:' + elem + ')').join('|') + ')', 'i');
		}
	}
	register(...elems) {
		for (let elem of elems) {
			this.elements.push(elem);
			if (/^[^ \^\$\?\|\(\)\[\]]+ $/.test(elem)) {
				this.fastElements.add(this.fastNormalize(elem));
			}
		}
		this.update();
	}
	test(text) {
		const spaceIndex = text.indexOf(' ');
		if (this.fastElements.has(spaceIndex >= 0 ? text.slice(0, spaceIndex) : text)) {
			return true;
		}
		if (!this.regexp) return false;
		return this.regexp.test(text);
	}
}

Chat.multiLinePattern = new PatternTester();

/*********************************************************
 * Load command files
 *********************************************************/

Chat.baseCommands = undefined;
Chat.commands = undefined;

/*********************************************************
 * Parser
 *********************************************************/

class CommandContext {
	constructor(options) {
		this.message = options.message || ``;
		this.recursionDepth = 0;

		// message context
		this.room = options.room;
		this.user = options.user;
		this.connection = options.connection;
		this.pmTarget = options.pmTarget;

		// command context
		this.cmd = options.cmd || '';
		this.cmdToken = options.cmdToken || '';
		this.target = options.target || ``;
		this.fullCmd = options.fullCmd || '';

		// target user
		this.targetUser = null;
		this.targetUsername = "";
		this.inputUsername = "";
	}

	parse(message) {
		if (message) {
			// spawn subcontext
			let subcontext = new CommandContext(this);
			subcontext.recursionDepth++;
			if (subcontext.recursionDepth > MAX_PARSE_RECURSION) {
				throw new Error("Too much command recursion");
			}
			subcontext.message = message;
			return subcontext.parse();
		}
		message = this.message;

		let originalRoom = this.room;
		if (this.room && !(this.user.userid in this.room.users)) {
			this.room = Rooms.global;
		}

		let commandHandler = this.splitCommand(message);

		if (typeof commandHandler === 'function') {
			message = this.run(commandHandler);
		} else {
			if (commandHandler === '!') {
				if (originalRoom === Rooms.global) {
					return this.popupReply(`You tried use "${message}" as a global command, but it is not a global command.`);
				} else if (originalRoom) {
					return this.popupReply(`You tried to send "${message}" to the room "${originalRoom.id}" but it failed because you were not in that room.`);
				}
				return this.errorReply(`The command "${this.cmdToken}${this.fullCmd}" is unavailable in private messages. To send a message starting with "${this.cmdToken}${this.fullCmd}", type "${this.cmdToken}${this.cmdToken}${this.fullCmd}".`);
			}
			if (this.cmdToken) {
				// To guard against command typos, show an error message
				if (this.cmdToken === BROADCAST_TOKEN) {
					if (/[a-z0-9]/.test(this.cmd.charAt(0))) {
						return this.errorReply(`The command "${this.cmdToken}${this.fullCmd}" does not exist.`);
					}
				} else {
					return this.errorReply(`The command "${this.cmdToken}${this.fullCmd}" does not exist. To send a message starting with "${this.cmdToken}${this.fullCmd}", type "${this.cmdToken}${this.cmdToken}${this.fullCmd}".`);
				}
			} else if (!VALID_COMMAND_TOKENS.includes(message.charAt(0)) && VALID_COMMAND_TOKENS.includes(message.trim().charAt(0))) {
				message = message.trim();
				if (message.charAt(0) !== BROADCAST_TOKEN) {
					message = message.charAt(0) + message;
				}
			}

			message = this.canTalk(message);
		}

		// Output the message

		if (message && message !== true && typeof message.then !== 'function') {
			if (this.pmTarget) {
				const parsedMsg = parseEmoticons(message, this.room, this.user, true);
				if (parsedMsg) message = '/html ' + parsedMsg;
				let buf = `|pm|${this.user.getIdentity()}|${this.pmTarget.getIdentity()}|${message}`;
				this.user.send(buf);
				if (this.pmTarget !== this.user) this.pmTarget.send(buf);

				this.pmTarget.lastPM = this.user.userid;
				this.user.lastPM = this.pmTarget.userid;
			} else {
				if (parseEmoticons(message, this.room, this.user)) return;
				this.room.add(`|c|${this.user.getIdentity(this.room.id)}|${message}`);
			}
		}


		this.update();

		return message;
	}
	splitCommand(message = this.message, recursing) {
		this.cmd = '';
		this.cmdToken = '';
		this.target = '';
		if (!message || !message.trim().length) return;

		// hardcoded commands
		if (message.startsWith(`>> `)) {
			message = `/eval ${message.slice(3)}`;
		} else if (message.startsWith(`>>> `)) {
			message = `/evalbattle ${message.slice(4)}`;
		} else if (message.startsWith(`/me`) && /[^A-Za-z0-9 ]/.test(message.charAt(3))) {
			message = `/mee ${message.slice(3)}`;
		} else if (message.startsWith(`/ME`) && /[^A-Za-z0-9 ]/.test(message.charAt(3))) {
			message = `/MEE ${message.slice(3)}`;
		}

		let cmdToken = message.charAt(0);
		if (!VALID_COMMAND_TOKENS.includes(cmdToken)) return;
		if (cmdToken === message.charAt(1)) return;
		if (cmdToken === BROADCAST_TOKEN && /[^A-Za-z0-9]/.test(message.charAt(1))) return;

		let cmd = '', target = '';

		let spaceIndex = message.indexOf(' ');
		if (spaceIndex > 0) {
			cmd = message.slice(1, spaceIndex).toLowerCase();
			target = message.slice(spaceIndex + 1);
		} else {
			cmd = message.slice(1).toLowerCase();
			target = '';
		}

		let curCommands = Chat.commands;
		let commandHandler;
		let fullCmd = cmd;

		do {
			if (curCommands.hasOwnProperty(cmd)) {
				commandHandler = curCommands[cmd];
			} else {
				commandHandler = undefined;
			}
			if (typeof commandHandler === 'string') {
				// in case someone messed up, don't loop
				commandHandler = curCommands[commandHandler];
			} else if (Array.isArray(commandHandler) && !recursing) {
				return this.splitCommand(cmdToken + 'help ' + fullCmd.slice(0, -4), true);
			}
			if (commandHandler && typeof commandHandler === 'object') {
				let spaceIndex = target.indexOf(' ');
				if (spaceIndex > 0) {
					cmd = target.substr(0, spaceIndex).toLowerCase();
					target = target.substr(spaceIndex + 1);
				} else {
					cmd = target.toLowerCase();
					target = '';
				}

				fullCmd += ' ' + cmd;
				curCommands = commandHandler;
			}
		} while (commandHandler && typeof commandHandler === 'object');

		if (!commandHandler && curCommands.default) {
			commandHandler = curCommands.default;
			if (typeof commandHandler === 'string') {
				commandHandler = curCommands[commandHandler];
			}
		}

		if (!commandHandler && !recursing) {
			for (let g in Config.groups) {
				let groupid = Config.groups[g].id;
				target = toId(target);
				if (cmd === groupid) {
					return this.splitCommand(`/promote ${target}, ${g}`, true);
				} else if (cmd === 'global' + groupid) {
					return this.splitCommand(`/globalpromote ${target}, ${g}`, true);
				} else if (cmd === 'de' + groupid || cmd === 'un' + groupid || cmd === 'globalde' + groupid || cmd === 'deglobal' + groupid) {
					return this.splitCommand(`/demote ${target}`, true);
				} else if (cmd === 'room' + groupid) {
					return this.splitCommand(`/roompromote ${target}, ${g}`, true);
				} else if (cmd === 'roomde' + groupid || cmd === 'deroom' + groupid || cmd === 'roomun' + groupid) {
					return this.splitCommand(`/roomdemote ${target}`, true);
				}
			}
		}

		this.cmd = cmd;
		this.cmdToken = cmdToken;
		this.target = target;
		this.fullCmd = fullCmd;

		if (typeof commandHandler === 'function' && (this.pmTarget || this.room === Rooms.global)) {
			if (!curCommands['!' + (typeof curCommands[cmd] === 'string' ? curCommands[cmd] : cmd)]) {
				return '!';
			}
		}

		return commandHandler;
	}
	run(commandHandler) {
		if (typeof commandHandler === 'string') commandHandler = Chat.commands[commandHandler];
		let result;
		try {
			result = commandHandler.call(this, this.target, this.room, this.user, this.connection, this.cmd, this.message);
		} catch (err) {
			require('./crashlogger')(err, 'A chat command', {
				user: this.user.name,
				room: this.room && this.room.id,
				pmTarget: this.pmTarget && this.pmTarget.name,
				message: this.message,
			});
			Rooms.global.reportCrash(err);
			this.sendReply(`|html|<div class="broadcast-red"><b>Pokemon Showdown crashed!</b><br />Don't worry, we\'re working on fixing it.</div>`);
		}
		if (result === undefined) result = false;

		return result;
	}

	checkFormat(room, user, message) {
		if (!room) return true;
		if (!room.filterStretching && !room.filterCaps) return true;

		if (room.filterStretching && user.name.match(/(.+?)\1{5,}/i)) {
			return this.errorReply(`Your username contains too much stretching, which this room doesn't allow.`);
		}
		if (room.filterCaps && user.name.match(/[A-Z\s]{6,}/)) {
			return this.errorReply(`Your username contains too many capital letters, which this room doesn't allow.`);
		}
		// Removes extra spaces and null characters
		message = message.trim().replace(/[ \u0000\u200B-\u200F]+/g, ' ');

		if (room.filterStretching && message.match(/(.+?)\1{7,}/i) && !user.can('mute', null, room)) {
			return this.errorReply(`Your message contains too much stretching, which this room doesn't allow.`);
		}
		if (room.filterCaps && message.match(/[A-Z\s]{18,}/) && !user.can('mute', null, room)) {
			return this.errorReply(`Your message contains too many capital letters, which this room doesn't allow.`);
		}

		return true;
	}

	checkSlowchat(room, user) {
		if (!room || !room.slowchat) return true;
		let lastActiveSeconds = (Date.now() - user.lastMessageTime) / 1000;
		if (lastActiveSeconds < room.slowchat) return false;
		return true;
	}

	checkBanwords(room, message) {
		if (!room) return true;
		if (!room.banwordRegex) {
			if (room.banwords && room.banwords.length) {
				room.banwordRegex = new RegExp('(?:\\b|(?!\\w))(?:' + room.banwords.join('|') + ')(?:\\b|\\B(?!\\w))', 'i');
			} else {
				room.banwordRegex = true;
			}
		}
		if (!message) return true;
		if (room.banwordRegex !== true && room.banwordRegex.test(message)) {
			return false;
		}
		return true;
	}
	pmTransform(message) {
		let prefix = `|pm|${this.user.getIdentity()}|${this.pmTarget.getIdentity()}|`;
		return message.split('\n').map(message => {
			if (message.startsWith('||')) {
				return prefix + '/text ' + message.slice(2);
			} else if (message.startsWith('|html|')) {
				return prefix + '/raw ' + message.slice(6);
			} else if (message.startsWith('|raw|')) {
				return prefix + '/raw ' + message.slice(5);
			} else if (message.startsWith('|c~|')) {
				return prefix + message.slice(4);
			} else if (message.startsWith('|c|~|/')) {
				return prefix + message.slice(5);
			}
			return prefix + '/text ' + message;
		}).join('\n');
	}
	sendReply(data) {
		if (this.broadcasting) {
			// broadcasting
			if (this.pmTarget) {
				data = this.pmTransform(data);
				this.user.send(data);
				if (this.pmTarget !== this.user) this.pmTarget.send(data);
			} else {
				this.room.add(data);
			}
		} else {
			// not broadcasting
			if (this.pmTarget) {
				data = this.pmTransform(data);
				this.connection.send(data);
			} else {
				this.connection.sendTo(this.room, data);
			}
		}
	}
	errorReply(message) {
		if (this.pmTarget && this.pmTarget.getIdentity) {
			let prefix = '|pm|' + this.user.getIdentity() + '|' + this.pmTarget.getIdentity() + '|/error ';
			this.connection.send(prefix + message.replace(/\n/g, prefix));
		} else {
			this.sendReply('|html|<div class="message-error">' + Chat.escapeHTML(message).replace(/\n/g, '<br />') + '</div>');
		}
	}
	addBox(html) {
		this.add('|html|<div class="infobox">' + html + '</div>');
	}
	sendReplyBox(html) {
		this.sendReply('|html|<div class="infobox">' + html + '</div>');
	}
	popupReply(message) {
		this.connection.popup(message);
	}
	add(data) {
		if (this.pmTarget) {
			data = this.pmTransform(data);
			this.user.send(data);
			if (this.pmTarget !== this.user) this.pmTarget.send(data);
			return;
		}
		this.room.add(data);
	}
	send(data) {
		if (this.pmTarget) {
			data = this.pmTransform(data);
			this.user.send(data);
			if (this.pmTarget !== this.user) this.pmTarget.send(data);
			return;
		}
		this.room.send(data);
	}
	sendModCommand(data) {
		this.room.sendModCommand(data);
	}
	privateModCommand(data) {
		this.room.sendModCommand(data);
		this.logEntry(data);
		this.room.modlog(data);
	}
	globalModlog(action, user, text) {
		let buf = "(" + this.room.id + ") " + action + ": ";
		if (typeof user === 'string') {
			buf += "[" + toId(user) + "]";
		} else {
			let userid = user.getLastId();
			buf += "[" + userid + "]";
			if (user.autoconfirmed && user.autoconfirmed !== userid) buf += " ac:[" + user.autoconfirmed + "]";
		}
		buf += text;
		Rooms.global.modlog(buf);
	}
	logEntry(data) {
		if (this.pmTarget) return;
		this.room.logEntry(data);
	}
	addModCommand(text, logOnlyText) {
		this.room.addLogMessage(this.user, text);
		this.room.modlog(text + (logOnlyText || ""));
	}
	logModCommand(text) {
		this.room.modlog(text);
	}
	update() {
		if (this.room) this.room.update();
	}
	can(permission, target, room) {
		if (!this.user.can(permission, target, room)) {
			this.errorReply(this.cmdToken + this.fullCmd + " - Access denied.");
			return false;
		}
		return true;
	}
	canBroadcast(suppressMessage) {
		if (!this.broadcasting && this.cmdToken === BROADCAST_TOKEN) {
			let message = this.canTalk(suppressMessage || this.message);
			if (!message) return false;
			if (!this.pmTarget && !this.user.can('broadcast', null, this.room)) {
				this.errorReply("You need to be voiced to broadcast this command's information.");
				this.errorReply("To see it for yourself, use: /" + this.message.substr(1));
				return false;
			}

			// broadcast cooldown
			let broadcastMessage = message.toLowerCase().replace(/[^a-z0-9\s!,]/g, '');

			this.message = message;
			this.broadcastMessage = broadcastMessage;
		}
		return true;
	}
	runBroadcast(suppressMessage) {
		if (this.broadcasting || this.cmdToken !== BROADCAST_TOKEN) {
			// Already being broadcast, or the user doesn't intend to broadcast.
			return true;
		}

		if (!this.broadcastMessage) {
			// Permission hasn't been checked yet. Do it now.
			if (!this.canBroadcast(suppressMessage)) return false;
		}

		if (this.pmTarget) {
			this.add('|c~|' + (suppressMessage || this.message));
		} else {
			this.add('|c|' + this.user.getIdentity(this.room.id) + '|' + (suppressMessage || this.message));
		}
		if (!this.pmTarget) {
			this.room.lastBroadcast = this.broadcastMessage;
			this.room.lastBroadcastTime = Date.now();
		}

		this.broadcasting = true;

		return true;
	}
	canTalk(message, room, targetUser) {
		if (room === undefined) room = this.room;
		if (targetUser === undefined && this.pmTarget) {
			room = undefined;
			targetUser = this.pmTarget;
		}
		let user = this.user;
		let connection = this.connection;

		if (room && room.id === 'global') {
			// should never happen
			// console.log(`Command tried to write to global: ${user.name}: ${message}`);
			return false;
		}
		if (!user.named) {
			connection.popup(`You must choose a name before you can talk.`);
			return false;
		}
		if (!user.can('bypassall')) {
			let lockType = (user.namelocked ? `namelocked` : user.locked ? `locked` : ``);
			let lockExpiration = Punishments.checkLockExpiration(user.namelocked || user.locked);
			if (room) {
				if (lockType) {
					this.errorReply(`You are ${lockType} and can't talk in chat. ${lockExpiration}`);
					return false;
				}
				if (room.isMuted(user)) {
					this.errorReply(`You are muted and cannot talk in this room.`);
					return false;
				}
				if (room.modchat && !user.authAtLeast(room.modchat, room)) {
					if (room.modchat === 'autoconfirmed') {
						this.errorReply(`Because moderated chat is set, your account must be at least one week old and you must have won at least one ladder game to speak in this room.`);
						return false;
					}
					const groupName = Config.groups[room.modchat] && Config.groups[room.modchat].name || room.modchat;
					this.errorReply(`Because moderated chat is set, you must be of rank ${groupName} or higher to speak in this room.`);
					return false;
				}
				if (!(user.userid in room.users)) {
					connection.popup("You can't send a message to this room without being in it.");
					return false;
				}
			}
			if (targetUser) {
				if (lockType && !targetUser.can('lock')) {
					return this.errorReply(`You are ${lockType} and can only private message members of the global moderation team (users marked by @ or above in the Help room). ${lockExpiration}`);
				}
				if (targetUser.locked && !user.can('lock')) {
					return this.errorReply(`The user "${targetUser.name}" is locked and cannot be PMed.`);
				}
				if (Config.pmmodchat && !user.authAtLeast(Config.pmmodchat)) {
					let groupName = Config.groups[Config.pmmodchat] && Config.groups[Config.pmmodchat].name || Config.pmmodchat;
					return this.errorReply(`Because moderated chat is set, you must be of rank ${groupName} or higher to PM users.`);
				}
				if (targetUser.ignorePMs && targetUser.ignorePMs !== user.group && !user.can('lock')) {
					if (!targetUser.can('lock')) {
						return this.errorReply(`This user is blocking private messages right now.`);
					} else if (targetUser.can('bypassall')) {
						return this.errorReply(`This admin is too busy to answer private messages right now. Please contact a different staff member.`);
					}
				}
				if (user.ignorePMs && user.ignorePMs !== targetUser.group && !targetUser.can('lock')) {
					return this.errorReply(`You are blocking private messages right now.`);
				}
			}
		}

		if (typeof message === 'string') {
			if (!message) {
				connection.popup("Your message can't be blank.");
				return false;
			}
			let length = message.length;
			length += 10 * message.replace(/[^\ufdfd]*/g, '').length;
			if (length > MAX_MESSAGE_LENGTH && !user.can('ignorelimits')) {
				this.errorReply("Your message is too long: " + message);
				return false;
			}

			// remove zalgo
			message = message.replace(/[\u0300-\u036f\u0483-\u0489\u0610-\u0615\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06ED\u0E31\u0E34-\u0E3A\u0E47-\u0E4E]{3,}/g, '');
			if (/[\u239b-\u23b9]/.test(message)) {
				this.errorReply("Your message contains banned characters.");
				return false;
			}

			if (!this.checkFormat(room, user, message)) {
				return false;
			}

			if (!this.checkSlowchat(room, user) && !user.can('mute', null, room)) {
				this.errorReply("This room has slow-chat enabled. You can only talk once every " + room.slowchat + " seconds.");
				return false;
			}

			if (!this.checkBanwords(room, user.name)) {
				this.errorReply(`Your username contains a phrase banned by this room.`);
				return false;
			}
			if (!this.checkBanwords(room, message) && !user.can('mute', null, room)) {
				this.errorReply("Your message contained banned words.");
				return false;
			}

			if (room) {
				let normalized = message.trim();
				user.lastMessage = message;
				user.lastMessageTime = Date.now();
			}

			if (Config.chatfilter) {
				return Config.chatfilter.call(this, message, user, room, connection, targetUser);
			}
			return message;
		}

		return true;
	}
	canEmbedURI(uri, isRelative) {
		if (uri.startsWith('https://')) return uri;
		if (uri.startsWith('//')) return uri;
		if (uri.startsWith('data:')) return uri;
		if (!uri.startsWith('http://')) {
			if (/^[a-z]+\:\/\//.test(uri) || isRelative) {
				return this.errorReply("URIs must begin with 'https://' or 'http://' or 'data:'");
			}
		} else {
			uri = uri.slice(7);
		}
		let slashIndex = uri.indexOf('/');
		let domain = (slashIndex >= 0 ? uri.slice(0, slashIndex) : uri);

		// heuristic that works for all the domains we care about
		let secondLastDotIndex = domain.lastIndexOf('.', domain.length - 5);
		if (secondLastDotIndex >= 0) domain = domain.slice(secondLastDotIndex + 1);

		let approvedDomains = {
			'imgur.com': 1,
			'gyazo.com': 1,
			'puu.sh': 1,
			'rotmgtool.com': 1,
			'pokemonshowdown.com': 1,
			'nocookie.net': 1,
			'blogspot.com': 1,
			'imageshack.us': 1,
			'deviantart.net': 1,
			'd.pr': 1,
			'pokefans.net': 1,
		};
		if (domain in approvedDomains) {
			return '//' + uri;
		}
		if (domain === 'bit.ly') {
			return this.errorReply("Please don't use URL shorteners.");
		}
		// unknown URI, allow HTTP to be safe
		return 'http://' + uri;
	}
	canHTML(html) {
		html = ('' + (html || '')).trim();
		if (!html) return '';
		let images = /<img\b[^<>]*/ig;
		let match;
		while ((match = images.exec(html))) {
			if (this.room.isPersonal && !this.user.can('announce')) {
				this.errorReply("Images are not allowed in personal rooms.");
				return false;
			}
			if (!/width=([0-9]+|"[0-9]+")/i.test(match[0]) || !/height=([0-9]+|"[0-9]+")/i.test(match[0])) {
				// Width and height are required because most browsers insert the
				// <img> element before width and height are known, and when the
				// image is loaded, this changes the height of the chat area, which
				// messes up autoscrolling.
				this.errorReply('All images must have a width and height attribute');
				return false;
			}
			let srcMatch = /src\s*\=\s*"?([^ "]+)(\s*")?/i.exec(match[0]);
			if (srcMatch) {
				let uri = this.canEmbedURI(srcMatch[1], true);
				if (!uri) return false;
				html = html.slice(0, match.index + srcMatch.index) + 'src="' + uri + '"' + html.slice(match.index + srcMatch.index + srcMatch[0].length);
				// lastIndex is inaccurate since html was changed
				images.lastIndex = match.index + 11;
			}
		}
		if ((this.room.isPersonal || this.room.isPrivate === true) && !this.user.can('lock') && html.replace(/\s*style\s*=\s*\"?[^\"]*\"\s*>/g, '>').match(/<button[^>]/)) {
			this.errorReply('You do not have permission to use scripted buttons in HTML.');
			this.errorReply('If you just want to link to a room, you can do this: <a href="/roomid"><button>button contents</button></a>');
			return false;
		}
		if (/>here.?</i.test(html) || /click here/i.test(html)) {
			this.errorReply('Do not use "click here"');
			return false;
		}

		// check for mismatched tags
		let tags = html.toLowerCase().match(/<\/?(div|a|button|b|strong|em|i|u|center|font|marquee|blink|details|summary|code|table|td|tr)\b/g);
		if (tags) {
			let stack = [];
			for (let i = 0; i < tags.length; i++) {
				let tag = tags[i];
				if (tag.charAt(1) === '/') {
					if (!stack.length) {
						this.errorReply("Extraneous </" + tag.substr(2) + "> without an opening tag.");
						return false;
					}
					if (tag.substr(2) !== stack.pop()) {
						this.errorReply("Missing </" + tag.substr(2) + "> or it's in the wrong place.");
						return false;
					}
				} else {
					stack.push(tag.substr(1));
				}
			}
			if (stack.length) {
				this.errorReply("Missing </" + stack.pop() + ">.");
				return false;
			}
		}

		return html;
	}
	targetUserOrSelf(target, exactName) {
		if (!target) {
			this.targetUsername = this.user.name;
			this.inputUsername = this.user.name;
			return this.user;
		}
		this.splitTarget(target, exactName);
		return this.targetUser;
	}
	splitOne(target) {
		let commaIndex = target.indexOf(',');
		if (commaIndex < 0) {
			return [target, ''];
		}
		return [target.substr(0, commaIndex), target.substr(commaIndex + 1).trim()];
	}
	splitTarget(target, exactName) {
		let [name, rest] = this.splitOne(target);

		this.targetUser = Users.get(name, exactName);
		this.inputUsername = name.trim();
		this.targetUsername = this.targetUser ? this.targetUser.name : this.inputUsername;
		return rest;
	}
	splitTargetText(target) {
		let [first, rest] = this.splitOne(target);

		this.targetUsername = first.trim();
		return rest.trim();
	}
}
Chat.CommandContext = CommandContext;

/**
 * Command parser
 *
 * Usage:
 *   Chat.parse(message, room, user, connection)
 *
 * Parses the message. If it's a command, the command is executed, if
 * not, it's displayed directly in the room.
 *
 * Examples:
 *   Chat.parse("/join lobby", room, user, connection)
 *     will make the user join the lobby.
 *
 *   Chat.parse("Hi, guys!", room, user, connection)
 *     will return "Hi, guys!" if the user isn't muted, or
 *     if he's muted, will warn him that he's muted.
 *
 * The return value is the return value of the command handler, if any,
 * or the message, if there wasn't a command. This value could be a success
 * or failure (few commands report these) or a Promise for when the command
 * is done executing, if it's not currently done.
 *
 * @param {string} message - the message the user is trying to say
 * @param {Room} room - the room the user is trying to say it in
 * @param {User} user - the user that sent the message
 * @param {Connection} connection - the connection the user sent the message from
 */
Chat.parse = function (message, room, user, connection) {
	Chat.loadCommands();
	let context = new CommandContext({message, room, user, connection});

	return context.parse();
};

Chat.package = {};

Chat.uncacheTree = function (root) {
	let uncache = [require.resolve(root)];
	do {
		let newuncache = [];
		for (let i = 0; i < uncache.length; ++i) {
			if (require.cache[uncache[i]]) {
				newuncache.push.apply(newuncache,
					require.cache[uncache[i]].children
						.filter(cachedModule => !cachedModule.id.endsWith('.node'))
						.map(cachedModule => cachedModule.id)
				);
				delete require.cache[uncache[i]];
			}
		}
		uncache = newuncache;
	} while (uncache.length > 0);
};

Chat.loadCommands = function () {
	if (Chat.commands) return;

	fs.readFile(path.resolve(__dirname, 'package.json'), (err, data) => {
		if (err) return;
		Chat.package = JSON.parse(data);
	});

	let baseCommands = Chat.baseCommands = require('./chat-commands').commands;
	let commands = Chat.commands = Object.assign({}, baseCommands);

	// Install plug-in commands

	// info always goes first so other plugins can shadow it
	Object.assign(commands, require('./chat-plugins/info').commands);

	for (let file of fs.readdirSync(path.resolve(__dirname, 'chat-plugins'))) {
		if (file.substr(-3) !== '.js' || file === 'info.js') continue;
		Object.assign(commands, require('./chat-plugins/' + file).commands);
	}
};

/**
 * Escapes HTML in a string.
 *
 * @param  {string} str
 * @return {string}
 */
Chat.escapeHTML = function (str) {
	if (!str) return '';
	return ('' + str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/\//g, '&#x2f;');
};

/**
 * Template string tag function for escaping HTML
 *
 * @param  {string[]} strings
 * @param  {...any} values
 * @return {string}
 */
Chat.html = function (strings, ...args) {
	let buf = strings[0];
	let i = 0;
	while (i < args.length) {
		buf += Chat.escapeHTML(args[i]);
		buf += strings[++i];
	}
	return buf;
};

/**
 * Returns singular (defaulting to '') if num is 1, or plural
 * (defaulting to 's') otherwise. Helper function for pluralizing
 * words.
 *
 * @param  {any} num
 * @param  {?string} plural
 * @param  {?string} singular
 * @return {string}
 */
Chat.plural = function (num, plural = 's', singular = '') {
	if (num && typeof num.length === 'number') {
		num = num.length;
	} else if (num && typeof num.size === 'number') {
		num = num.size;
	} else {
		num = Number(num);
	}
	return (num !== 1 ? plural : singular);
};

/**
 * Returns a timestamp in the form {yyyy}-{MM}-{dd} {hh}:{mm}:{ss}.
 *
 * options.hour12 = true will reports hours in mod-12 format.
 *
 * @param  {Date} date
 * @param  {object} options
 * @return {string}
 */
Chat.toTimestamp = function (date, options) {
	const isHour12 = options && options.hour12;
	let parts = [date.getFullYear(), date.getMonth() + 1, date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()];
	if (isHour12) {
		parts.push(parts[3] >= 12 ? 'pm' : 'am');
		parts[3] = parts[3] % 12 || 12;
	}
	parts = parts.map(val => val < 10 ? '0' + val : '' + val);
	return parts.slice(0, 3).join("-") + " " + parts.slice(3, 6).join(":") + (isHour12 ? " " + parts[6] : "");
};

/**
 * Takes a number of milliseconds, and reports the duration in English: hours, minutes, etc.
 *
 * options.hhmmss = true will instead report the duration in 00:00:00 format
 *
 * @param  {number} number
 * @param  {object} options
 * @return {string}
 */
Chat.toDurationString = function (number, options) {
	// TODO: replace by Intl.DurationFormat or equivalent when it becomes available (ECMA-402)
	// https://github.com/tc39/ecma402/issues/47
	const date = new Date(+number);
	const parts = [date.getUTCFullYear() - 1970, date.getUTCMonth(), date.getUTCDate() - 1, date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds()];
	const roundingBoundaries = [6, 15, 12, 30, 30];
	const unitNames = ["second", "minute", "hour", "day", "month", "year"];
	const positiveIndex = parts.findIndex(elem => elem > 0);
	const precision = (options && options.precision ? options.precision : parts.length);
	if (options && options.hhmmss) {
		let string = parts.slice(positiveIndex).map(value => value < 10 ? "0" + value : "" + value).join(":");
		return string.length === 2 ? "00:" + string : string;
	}
	// round least significant displayed unit
	if (positiveIndex + precision < parts.length && precision > 0 && positiveIndex >= 0) {
		if (parts[positiveIndex + precision] >= roundingBoundaries[positiveIndex + precision - 1]) {
			parts[positiveIndex + precision - 1]++;
		}
	}
	return parts.slice(positiveIndex).reverse().map((value, index) => value ? value + " " + unitNames[index] + (value > 1 ? "s" : "") : "").reverse().slice(0, precision).join(" ").trim();
};


Chat.getPokemonIcon = function (pokemon, facingLeft) {
	let num = 0;
	if (pokemon === 'pokeball') {
		return 'background:transparent url(https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png) no-repeat scroll -0px 4px';
	} else if (pokemon === 'pokeball-statused') {
		return 'background:transparent url(https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png) no-repeat scroll -40px 4px';
	} else if (pokemon === 'pokeball-none') {
		return 'background:transparent url(https://play.pokemonshowdown.com/sprites/smicons-pokeball-sheet.png) no-repeat scroll -80px 4px';
	}
	let id = toId(pokemon);
	if (pokemon && pokemon.num !== undefined) {
		num = pokemon.num;
	} else if (this.data.Pokedex && this.data.Pokedex[id] && this.data.Pokedex[id].num) {
		num = this.data.Pokedex[id].num;
	}
	if (num < 0 || num > 802) num = 0;
	let altNums = {
		egg: 804 + 1,
		pikachubelle: 804 + 2,
		pikachulibre: 804 + 3,
		pikachuphd: 804 + 4,
		pikachupopstar: 804 + 5,
		pikachurockstar: 804 + 6,
		pikachucosplay: 804 + 7,
		castformrainy: 804 + 35,
		castformsnowy: 804 + 36,
		castformsunny: 804 + 37,
		deoxysattack: 804 + 38,
		deoxysdefense: 804 + 39,
		deoxysspeed: 804 + 40,
		burmysandy: 804 + 41,
		burmytrash: 804 + 42,
		wormadamsandy: 804 + 43,
		wormadamtrash: 804 + 44,
		cherrimsunshine: 804 + 45,
		shelloseast: 804 + 46,
		gastrodoneast: 804 + 47,
		rotomfan: 804 + 48,
		rotomfrost: 804 + 49,
		rotomheat: 804 + 50,
		rotommow: 804 + 51,
		rotomwash: 804 + 52,
		giratinaorigin: 804 + 53,
		shayminsky: 804 + 54,
		unfezantf: 804 + 55,
		basculinbluestriped: 804 + 56,
		darmanitanzen: 804 + 57,
		deerlingautumn: 804 + 58,
		deerlingsummer: 804 + 59,
		deerlingwinter: 804 + 60,
		sawsbuckautumn: 804 + 61,
		sawsbucksummer: 804 + 62,
		sawsbuckwinter: 804 + 63,
		frillishf: 804 + 64,
		jellicentf: 804 + 65,
		tornadustherian: 804 + 66,
		thundurustherian: 804 + 67,
		landorustherian: 804 + 68,
		kyuremblack: 804 + 69,
		kyuremwhite: 804 + 70,
		keldeoresolute: 804 + 71,
		meloettapirouette: 804 + 72,
		vivillonarchipelago: 804 + 73,
		vivilloncontinental: 804 + 74,
		vivillonelegant: 804 + 75,
		vivillonfancy: 804 + 76,
		vivillongarden: 804 + 77,
		vivillonhighplains: 804 + 78,
		vivillonicysnow: 804 + 79,
		vivillonjungle: 804 + 80,
		vivillonmarine: 804 + 81,
		vivillonmodern: 804 + 82,
		vivillonmonsoon: 804 + 83,
		vivillonocean: 804 + 84,
		vivillonpokeball: 804 + 85,
		vivillonpolar: 804 + 86,
		vivillonriver: 804 + 87,
		vivillonsandstorm: 804 + 88,
		vivillonsavanna: 804 + 89,
		vivillonsun: 804 + 90,
		vivillontundra: 804 + 91,
		pyroarf: 804 + 92,
		flabebeblue: 804 + 93,
		flabebeorange: 804 + 94,
		flabebewhite: 804 + 95,
		flabebeyellow: 804 + 96,
		floetteblue: 804 + 97,
		floetteeternal: 804 + 98,
		floetteorange: 804 + 99,
		floettewhite: 804 + 100,
		floetteyellow: 804 + 101,
		florgesblue: 804 + 102,
		florgesorange: 804 + 103,
		florgeswhite: 804 + 104,
		florgesyellow: 804 + 105,
		meowsticf: 804 + 115,
		aegislashblade: 804 + 116,
		hoopaunbound: 804 + 118,
		rattataalola: 804 + 119,
		raticatealola: 804 + 120,
		raichualola: 804 + 121,
		sandshrewalola: 804 + 122,
		sandslashalola: 804 + 123,
		vulpixalola: 804 + 124,
		ninetalesalola: 804 + 125,
		diglettalola: 804 + 126,
		dugtrioalola: 804 + 127,
		meowthalola: 804 + 128,
		persianalola: 804 + 129,
		geodudealola: 804 + 130,
		graveleralola: 804 + 131,
		golemalola: 804 + 132,
		grimeralola: 804 + 133,
		mukalola: 804 + 134,
		exeggutoralola: 804 + 135,
		marowakalola: 804 + 136,
		greninjaash: 804 + 137,
		zygarde10: 804 + 138,
		zygardecomplete: 804 + 139,
		oricoriopompom: 804 + 140,
		oricoriopau: 804 + 141,
		oricoriosensu: 804 + 142,
		lycanrocmidnight: 804 + 143,
		wishiwashischool: 804 + 144,
		miniormeteor: 804 + 145,
		miniororange: 804 + 146,
		minioryellow: 804 + 147,
		miniorgreen: 804 + 148,
		miniorblue: 804 + 149,
		miniorviolet: 804 + 150,
		miniorindigo: 804 + 151,
		magearnaoriginal: 804 + 152,
		pikachuoriginal: 804 + 153,
		pikachuhoenn: 804 + 154,
		pikachusinnoh: 804 + 155,
		pikachuunova: 804 + 156,
		pikachukalos: 804 + 157,
		pikachualola: 804 + 158,

		venusaurmega: 972 + 0,
		charizardmegax: 972 + 1,
		charizardmegay: 972 + 2,
		blastoisemega: 972 + 3,
		beedrillmega: 972 + 4,
		pidgeotmega: 972 + 5,
		alakazammega: 972 + 6,
		slowbromega: 972 + 7,
		gengarmega: 972 + 8,
		kangaskhanmega: 972 + 9,
		pinsirmega: 972 + 10,
		gyaradosmega: 972 + 11,
		aerodactylmega: 972 + 12,
		mewtwomegax: 972 + 13,
		mewtwomegay: 972 + 14,
		ampharosmega: 972 + 15,
		steelixmega: 972 + 16,
		scizormega: 972 + 17,
		heracrossmega: 972 + 18,
		houndoommega: 972 + 19,
		tyranitarmega: 972 + 20,
		sceptilemega: 972 + 21,
		blazikenmega: 972 + 22,
		swampertmega: 972 + 23,
		gardevoirmega: 972 + 24,
		sableyemega: 972 + 25,
		mawilemega: 972 + 26,
		aggronmega: 972 + 27,
		medichammega: 972 + 28,
		manectricmega: 972 + 29,
		sharpedomega: 972 + 30,
		cameruptmega: 972 + 31,
		altariamega: 972 + 32,
		banettemega: 972 + 33,
		absolmega: 972 + 34,
		glaliemega: 972 + 35,
		salamencemega: 972 + 36,
		metagrossmega: 972 + 37,
		latiasmega: 972 + 38,
		latiosmega: 972 + 39,
		kyogreprimal: 972 + 40,
		groudonprimal: 972 + 41,
		rayquazamega: 972 + 42,
		lopunnymega: 972 + 43,
		garchompmega: 972 + 44,
		lucariomega: 972 + 45,
		abomasnowmega: 972 + 46,
		gallademega: 972 + 47,
		audinomega: 972 + 48,
		dianciemega: 972 + 49,

		syclant: 1140 + 0,
		revenankh: 1140 + 1,
		pyroak: 1140 + 2,
		fidgit: 1140 + 3,
		stratagem: 1140 + 4,
		arghonaut: 1140 + 5,
		kitsunoh: 1140 + 6,
		cyclohm: 1140 + 7,
		colossoil: 1140 + 8,
		krilowatt: 1140 + 9,
		voodoom: 1140 + 10,
		tomohawk: 1140 + 11,
		necturna: 1140 + 12,
		mollux: 1140 + 13,
		aurumoth: 1140 + 14,
		malaconda: 1140 + 15,
		cawmodore: 1140 + 16,
		volkraken: 1140 + 17,
		plasmanta: 1140 + 18,
		naviathan: 1140 + 19,
		crucibelle: 1140 + 20,
		crucibellemega: 1140 + 21,
		kerfluffle: 1140 + 22,
	};

	if (altNums[id]) {
		num = altNums[id];
	}

	if (pokemon && pokemon.gender === 'F') {
		if (id === 'unfezant' || id === 'frillish' || id === 'jellicent' || id === 'meowstic' || id === 'pyroar') {
			num = altNums[id + 'f'];
		}
	}

	if (facingLeft) {
		altNums = {
			pikachubelle: 1032 + 0,
			pikachupopstar: 1032 + 1,
			clefairy: 1032 + 2,
			clefable: 1032 + 3,
			jigglypuff: 1032 + 4,
			wigglytuff: 1032 + 5,
			dugtrioalola: 1032 + 6,
			poliwhirl: 1032 + 7,
			poliwrath: 1032 + 8,
			mukalola: 1032 + 9,
			kingler: 1032 + 10,
			croconaw: 1032 + 11,
			cleffa: 1032 + 12,
			igglybuff: 1032 + 13,
			politoed: 1032 + 14,
			// unown gap
			sneasel: 1032 + 35,
			teddiursa: 1032 + 36,
			roselia: 1032 + 37,
			zangoose: 1032 + 38,
			seviper: 1032 + 39,
			castformrainy: 1032 + 40,
			absolmega: 1032 + 41,
			absol: 1032 + 42,
			regirock: 1032 + 43,
			torterra: 1032 + 44,
			budew: 1032 + 45,
			roserade: 1032 + 46,
			magmortar: 1032 + 47,
			togekiss: 1032 + 48,
			rotomwash: 1032 + 49,
			shayminsky: 1032 + 50,
			emboar: 1032 + 51,
			pansear: 1032 + 52,
			simisear: 1032 + 53,
			drilbur: 1032 + 54,
			excadrill: 1032 + 55,
			sawk: 1032 + 56,
			lilligant: 1032 + 57,
			garbodor: 1032 + 58,
			solosis: 1032 + 59,
			vanilluxe: 1032 + 60,
			amoonguss: 1032 + 61,
			klink: 1032 + 62,
			klang: 1032 + 63,
			klinklang: 1032 + 64,
			litwick: 1032 + 65,
			golett: 1032 + 66,
			golurk: 1032 + 67,
			kyuremblack: 1032 + 68,
			kyuremwhite: 1032 + 69,
			kyurem: 1032 + 70,
			keldeoresolute: 1032 + 71,
			meloetta: 1032 + 72,
			greninja: 1032 + 73,
			greninjaash: 1032 + 74,
			// furfroudebutante: 1032 + 75,
			barbaracle: 1032 + 76,
			clauncher: 1032 + 77,
			clawitzer: 1032 + 78,
			sylveon: 1032 + 79,
			klefki: 1032 + 80,
			zygarde: 1032 + 81,
			zygarde10: 1032 + 82,
			zygardecomplete: 1032 + 83,
			dartrix: 1032 + 84,
			steenee: 1032 + 85,
			tsareena: 1032 + 86,
			comfey: 1032 + 87,
			miniormeteor: 1032 + 88,
			minior: 1032 + 89,
			miniororange: 1032 + 90,
			minioryellow: 1032 + 91,
			miniorgreen: 1032 + 92,
			miniorblue: 1032 + 93,
			miniorviolet: 1032 + 94,
			miniorindigo: 1032 + 95,
			dhelmise: 1032 + 96,
			necrozma: 1032 + 97,
			marshadow: 1032 + 98,
			pikachuoriginal: 1032 + 99,
		};
		if (altNums[id]) {
			num = altNums[id];
		}
	}

	let top = Math.floor(num / 12) * 30;
	let left = (num % 12) * 40;
	return 'background:transparent url(https://play.pokemonshowdown.com/sprites/smicons-sheet.png?a1) no-repeat scroll -' + left + 'px -' + top + 'px';
};

Chat.getDataPokemonHTML = function (template) {
	if (typeof template === 'string') template = Object.assign({}, Tools.getTemplate(template));
	let buf = '<li class="result">';
	buf += '<span class="col numcol">' + (template.tier) + '</span> ';
	buf += '<span class="col iconcol"><span style="' + Chat.getPokemonIcon(template) + '"></span></span> ';
	buf += '<span class="col pokemonnamecol" style="white-space:nowrap"><a href="https://pokemonshowdown.com/dex/pokemon/' + template.id + '" target="_blank">' + template.species + '</a></span> ';
	buf += '<span class="col typecol">';
	if (template.types) {
		for (let i = 0; i < template.types.length; i++) {
			buf += `<img src="https://play.pokemonshowdown.com/sprites/types/${template.types[i]}.png" alt="${template.types[i]}" height="14" width="32">`;
		}
	}
	buf += '</span> ';
	buf += '<span style="float:left;min-height:26px">';
	if (template.abilities['1']) {
		buf += '<span class="col twoabilitycol">' + template.abilities['0'] + '<br />' + template.abilities['1'] + '</span>';
	} else {
		buf += '<span class="col abilitycol">' + template.abilities['0'] + '</span>';
	}
	if (template.abilities['S']) {
		buf += '<span class="col twoabilitycol' + (template.unreleasedHidden ? ' unreleasedhacol' : '') + '"><em>' + template.abilities['H'] + '<br />' + template.abilities['S'] + '</em></span>';
	} else if (template.abilities['H']) {
		buf += '<span class="col abilitycol' + (template.unreleasedHidden ? ' unreleasedhacol' : '') + '"><em>' + template.abilities['H'] + '</em></span>';
	} else {
		buf += '<span class="col abilitycol"></span>';
	}
	buf += '</span>';
	buf += '<span style="float:left;min-height:26px">';
	buf += '<span class="col statcol"><em>HP</em><br />' + template.baseStats.hp + '</span> ';
	buf += '<span class="col statcol"><em>Atk</em><br />' + template.baseStats.atk + '</span> ';
	buf += '<span class="col statcol"><em>Def</em><br />' + template.baseStats.def + '</span> ';
	buf += '<span class="col statcol"><em>SpA</em><br />' + template.baseStats.spa + '</span> ';
	buf += '<span class="col statcol"><em>SpD</em><br />' + template.baseStats.spd + '</span> ';
	buf += '<span class="col statcol"><em>Spe</em><br />' + template.baseStats.spe + '</span> ';
	let bst = 0;
	for (let i in template.baseStats) {
		bst += template.baseStats[i];
	}
	buf += '<span class="col bstcol"><em>BST<br />' + bst + '</em></span> ';
	buf += '</span>';
	buf += '</li>';
	return `<div class="message"><ul class="utilichart">${buf}<li style="clear:both"></li></ul></div>`;
};

Chat.getDataMoveHTML = function (move) {
	if (typeof move === 'string') move = Object.assign({}, Tools.getMove(move));
	let buf = `<ul class="utilichart"><li class="result">`;
	buf += `<a data-entry="move|${move.name}"><span class="col movenamecol">${move.name}</span> `;
	buf += `<span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/${move.type}.png" alt="${move.type}" width="32" height="14">`;
	buf += `<img src="//play.pokemonshowdown.com/sprites/categories/${move.category}.png" alt="${move.category}" width="32" height="14"></span> `;
	if (move.basePower) buf += `<span class="col labelcol"><em>Power</em><br>${typeof move.basePower === 'number' ? move.basePower : '—'}</span> `;
	buf += `<span class="col widelabelcol"><em>Accuracy</em><br>${typeof move.accuracy === 'number' ? (move.accuracy + '%') : '—'}</span> `;
	buf += `<span class="col pplabelcol"><em>PP</em><br>${move.pp ? move.pp : 1}</span> `;
	buf += `<span class="col movedesccol">${move.shortDesc || move.desc}</span> `;
	buf += `</a></li><li style="clear:both"></li></ul>`;
	return buf;
};

Chat.getDataAbilityHTML = function (ability) {
	if (typeof ability === 'string') ability = Object.assign({}, Tools.getAbility(ability));
	let buf = `<ul class="utilichart"><li class="result">`;
	buf += `<a data-entry="ability|${ability.name}"><span class="col namecol">${ability.name}</span> `;
	buf += `<span class="col abilitydesccol">${ability.desc || ability.shortDesc}</span> `;
	buf += `</a></li><li style="clear:both"></li></ul>`;
	return buf;
};

Chat.getDataItemHTML = function (item) {
	if (typeof item === 'string') item = Object.assign({}, Tools.getItem(item));
	let top = Math.floor(item.spritenum / 16) * 24;
	let left = (item.spritenum % 16) * 24;
	let buf = `<ul class="utilichart"><li class="result">`;
	buf  += `<a data-entry="item|${item.name}"><span class="col itemiconcol"><span style="background:transparent url(//play.pokemonshowdown.com/sprites/itemicons-sheet.png) no-repeat scroll -${left}px -${top}px"></span></span> <span class="col namecol">${item.name}</span> `;
	buf += `<span class="col itemdesccol">${item.desc || item.shortDesc}</span> `;
	buf += `</a></li><li style="clear:both"></li></ul>`;
	return buf;
};
