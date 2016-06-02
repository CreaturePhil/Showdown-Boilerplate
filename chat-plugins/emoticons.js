'use strict';

const color = require('../config/color');
let demFeels = function () {};
demFeels.getEmotes = function () {
	return {};
};
try {
	demFeels = require('dem-feels');
} catch (e) {
	console.error(e);
}

exports.parseEmoticons = parseEmoticons;

// for travis build
if (typeof demFeels.extendEmotes === 'function') {
	// example extending emotes
	demFeels.extendEmotes({
	'(ditto)': 'https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/2x',
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'feelsackbr': 'http://i.imgur.com/BzZJedC.jpg?1',
	'feelsbebop': 'http://i.imgur.com/TDwC3wL.png',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbirb': 'http://i.imgur.com/o4KxmWe.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsbt': 'http://i.imgur.com/rghiV9b.png',
	'feelschime': 'http://i.imgur.com/uIIBChH.png',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'feelscx': 'http://i.imgur.com/zRSUw2n.gif',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsfro': 'http://i.imgur.com/ijJakJT.png',
	'feelsgay': 'http://i.imgur.com/zQAacwu.png?1',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png?1',
	'feelshigh': 'http://i.imgur.com/s9I2bxp.jpg?1',
	'feelshlwn': 'http://i.imgur.com/OHMDVNJ.jpg',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsho': 'http://i.imgur.com/J4oUHm2.png?1',
	'feelsilum': 'http://i.imgur.com/CnyGTTD.png',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png?1',
	'feelsjpn': 'http://i.imgur.com/Zz2WrQf.jpg',
	'feelskawaii': 'http://i.imgur.com/kLnDaYD.png', 
	'feelsky': 'http://i.imgur.com/BtATPId.png?1',
	'feelslelouch': 'http://i.imgur.com/qZrV75o.png',
	'feelslot': 'http://i.imgur.com/tl88F7i.png?1',
	'feelslu': 'http://i.imgur.com/REEBSOT.png?1',
	'feelsmixtape': 'http://i.imgur.com/7lncwng.png',
	'feelsns': 'http://i.imgur.com/jYRFUYW.jpg?1',
	'feelsorange': 'http://i.imgur.com/3fxXP16.jpg',
	'feelspanda': 'http://i.imgur.com/qi7fue9.png',
	'feelspaul': 'http://imgur.com/KuDZMJR.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelsPika': 'http://i.imgur.com/eoTrTkn.png?1',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelspoli': 'http://i.imgur.com/FnzhrWa.jpg?1',
	'feelsPoli': 'http://i.imgur.com/sbKhXZE.jpg?1',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelsseis': 'http://i.imgur.com/gGGYxrE.png?1',
	'feelsshi': 'http://i.imgur.com/VzlGZ1M.jpg',
	'feelsslo': 'http://i.imgur.com/iQuToJf.jpg?1',
	'feelssnake': 'http://i.imgur.com/xoJnDUD.png',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'feelsdrg': 'http://i.imgur.com/UZzWcA3.png',
	'feelsvolc': 'http://i.imgur.com/QXlKzZd.png?1',
	'feelsvpn': 'http://i.imgur.com/ODTZISl.gif',
	'feelswin': 'http://i.imgur.com/rbs9pZG.png?1',
	'feelswnk': 'http://i.imgur.com/K1GhJaN.png', 
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'Kappa': 'http://i.imgur.com/ZxRU4z3.png?1',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'MingLee': 'https://static-cdn.jtvnw.net/emoticons/v1/68856/2.0',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'PeoplesChamp': 'http://i.imgur.com/QMiMBKe.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'stevo': 'http://imgur.com/Gid6Zjy.png',
	'thumbsup': 'http://i.imgur.com/eWcFLLn.jpg',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'trumpW': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/2.0',
	'xoxo': 'http://orig00.deviantart.net/b49d/f/2014/220/5/3/ichigo_not_impressed_icon_by_magical_icon-d7u92zg.png',
	'youdontsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'gudone': 'http://i.imgur.com/USkp1b9.png',
	'feelsfloat': 'http://i.imgur.com/XKP1Kpf.gif'
	});
}

const emotes = demFeels.getEmotes();

const emotesKeys = Object.keys(emotes).sort();

/**
* Parse emoticons in message.
*
* @param {String} message
* @param {Object} room
* @param {Object} user
* @param {Boolean} pm - returns a string if it is in private messages
* @returns {Boolean|String}
*/
function parseEmoticons(message, room, user, pm) {
	if (typeof message !== 'string' || (!pm && room.disableEmoticons)) return false;

	let match = false;
	let len = emotesKeys.length;

	while (len--) {
		if (message && message.indexOf(emotesKeys[len]) >= 0) {
			match = true;
			break;
		}
	}

	if (!match) return false;
	
	//shadowbanroom message
	let sbanmsg = message;

	// escape HTML
	message = Tools.escapeHTML(message);

	// add emotes
	message = demFeels(message);

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');

	let group = user.getIdentity().charAt(0);
	if (room.auth) group = room.auth[user.userid] || group;

	let style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";

	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + color(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";
	if (pm) return message;
	if (Users.ShadowBan.checkBanned(user)) {
		user.sendTo(room, '|html|' + message);
		Users.ShadowBan.addMessage(user, "To " + room, sbanmsg);
	}
	if (!Users.ShadowBan.checkBanned(user)) room.addRaw(message);

	room.addRaw(message);

	return true;
}

/**
* Create a two column table listing emoticons.
*
* @return {String} emotes table
*/
function create_table() {
	let emotes_name = Object.keys(emotes);
	let emotes_list = [];
	let emotes_group_list = [];
	let len = emotes_name.length;

	for (let i = 0; i < len; i++) {
		emotes_list.push("<td style='padding: 5px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5) inset; border-radius: 5px;'>" + "<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' style='vertical-align: middle;  padding-right: 5px;' />" + emotes_name[i] + "</td>");
	}

	for (let i = 0; i < len; i += 4) {
		let emoteOutput = [emotes_list[i], emotes_list[i + 1], emotes_list[i + 2], emotes_list[i + 3]];
		if (i < len) emotes_group_list.push("<tr>" + emoteOutput.join('') + "</tr>");
	}

	return (
		"<div class='infobox'><center><font style='font-weight: bold; text-decoration: underline; color: #555;'>List of Emoticons</font></center>" +
		"<div style='max-height: 300px; overflow-y: scroll; padding: 5px 0px;'><table style='background: rgba(245, 245, 245, 0.4); border: 1px solid #BBB;' width='100%'>" +
		emotes_group_list.join("") +
		"</table></div></div>"
	);
}

let emotes_table = create_table();

exports.commands = {
	blockemote: 'blockemoticons',
	blockemotes: 'blockemoticons',
	blockemoticon: 'blockemoticons',
	blockemoticons: function (target, room, user) {
		if (user.blockEmoticons === (target || true)) return this.sendReply("You are already blocking emoticons in private messages! To unblock, use /unblockemoticons");
		user.blockEmoticons = true;
		return this.sendReply("You are now blocking emoticons in private messages.");
	},
	blockemoticonshelp: ["/blockemoticons - Blocks emoticons in private messages. Unblock them with /unblockemoticons."],

	unblockemote: 'unblockemoticons',
	unblockemotes: 'unblockemoticons',
	unblockemoticon: 'unblockemoticons',
	unblockemoticons: function (target, room, user) {
		if (!user.blockEmoticons) return this.sendReply("You are not blocking emoticons in private messages! To block, use /blockemoticons");
		user.blockEmoticons = false;
		return this.sendReply("You are no longer blocking emoticons in private messages.");
	},
	unblockemoticonshelp: ["/unblockemoticons - Unblocks emoticons in private messages. Block them with /blockemoticons."],

	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return false;
		room.disableEmoticons = !room.disableEmoticons;
		this.sendReply("Disallowing emoticons is set to " + room.disableEmoticons + " in this room.");
		if (room.disableEmoticons) {
			this.add("|raw|<div class=\"broadcast-red\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],

	rande: 'randemote',
	randemote: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let rng = Math.floor(Math.random() * emotesKeys.length);
		let randomEmote = emotesKeys[rng];
		this.sendReplyBox("<img src='" + emotes[randomEmote] + "' title='" + randomEmote + "' height='50' width='50' />");
	},
	randemotehelp: ["/randemote - Get a random emote."],
};
