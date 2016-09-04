'Use Strict';

/* Original code by panpawn! Modified for Dragon Heaven by Paul☯71◕‿◕!*/

var color = require('../config/color');
hashColor = function(name, bold) {
	return (bold ? "<b>" : "") + "<font color=" + color(name) + ">" + (Users(name) && Users(name).connected && Users.getExact(name) ? Tools.escapeHTML(Users.getExact(name).name) : Tools.escapeHTML(name)) + "</font>" + (bold ? "</b>" : "");
}

exports.commands = {
	credit: 'credits',
	credits: function (target, room, user) {
		this.popupReply("|html|" + "<font size=4><center><u><b>Dragon Heaven Credits!</b></u></center></font><br />" +
					"<u>Owner:</u><br />" +
					"- " + hashColor('XpRienzo', true) + " (Founder, Host, Sysadmin)<br />" +
                                        "<br />" +
					"<u>Lead Development Team:</u><br />" +
                    "- " + hashColor('Alpha Paul☯71◕‿◕', true) + " (Development, Lead Policy)<br />" +
                    "- " + hashColor('Snaq', true) + " (Major Contributor, Formats, Development)<br />" +
                    "- " + hashColor('Spandan', true) + " (Format Development)<br />" +
					"<br />" +
					"<u>Development:</u><br />" +
					"- " + hashColor('charizard8888', true) + " (Roomintro's)<br />" +
                    "- " + hashColor('ClassyZ', true) + " (DHSSB, Development)<br />" +
                    "- " + hashColor('Diarmuid O\'Dyna', true) + " (Art)<br />" +
                    "- " + hashColor('Eternal Mayhem', true) + " (Roomintro's)<br />" +
					"<br />" +
					"<u>Special Thanks:</u><br />" +
					"- Current staff team<br />" +
					"- Our regular users<br />");
	},
};
