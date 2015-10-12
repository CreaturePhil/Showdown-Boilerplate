/*
 * Chat log viewer plugin by jd 
 */
var fs = require('fs');
var sanitizeHtml = require('sanitize-html');

function sanitizeHTML(html) {
	return sanitizeHtml(html, {
		allowedTags: [ 'h3', 'h4', 'h5', 'h6', 'blockquote', 'p', 'a', 'ul', 'ol', 'nl', 'li', 'b', 'i', 'strong', 'em',
			'strike', 'code', 'hr', 'br', 'div', 'table', 'thead', 'caption', 'tbody', 'tr', 'th', 'td', 'pre', 'img', 'font',
			'center', 'button'],
		allowedAttributes: {
		  a: [ 'href', 'name', 'target' ],
		  img: [ 'src' ],
		  br: ['clear'],
		  div: ['class'],
		  font: ['color', 'size'],
		  button: ['name', 'value', 'class']
		},
	});
}

exports.commands = {
	viewlogs: function(target, room, user) {
		if (!target) return this.sendReply("Usage: /viewlogs [room], [year-month-day / 2014-12-08] - Provides you with a temporary link to view the target rooms chat logs.");
		var targetSplit = target.split(',');
		if (!targetSplit[1]) return this.sendReply("Usage: /viewlogs [room], [year-month-day / 2014-12-08] -Provides you with a temporary link to view the target rooms chat logs.");
		for (var u in targetSplit) targetSplit[u] = targetSplit[u].trim();
		var targetRoom = targetSplit[0];
		if (!user.can('lock') && !user.can('roommod', null, Rooms(targetRoom))) return this.sendReply("/viewlogs - Access denied.");
		if (toId(targetRoom) === 'staff' && !user.can('warn')) return this.sendReply("/viewlogs - Access denied.");
		if (toId(targetRoom) === 'administrators' && !user.can('hotpatch')) return this.sendReply("/viewlogs - Access denied.");
		if (toId(targetRoom) === 'upperstaff' && !user.can('pban')) return this.sendReply("/viewlogs - Access denied.");
		if (Rooms(targetRoom) && Rooms(targetRoom).isPrivate && !user.can('warn', null, Rooms(targetRoom))) return this.sendReply("/viewlogs - Access denied.");
		var date = targetSplit[1];
		var splitDate = date.split('-');
		if (splitDate.length < 3) return this.sendReply("Usage: /viewlogs [room], [year-month-day / 2014-12-08] -Provides you with a temporary link to view the target rooms chat logs.");
		var self = this;

		fs.readFile('logs/chat/' + toId(targetRoom) + '/' + splitDate[0] + '-' + splitDate[1] + '/' + date + '.txt', 'utf8', function(err, data) {
			if (err) return self.sendReply("/viewlogs - Error: " + err);
			var filename = require('crypto').randomBytes(16).toString('hex') + '.html';
			var newDate = new Date();
			data = data.split('\n');
			var newFile = ['<html>',
			'<head><link rel="stylesheet" type="text/css" href="http://goldservers.info/style/client.css"><link rel="stylesheet" type="text/css" href="http://goldservers.info/js/style.css">' +
			'<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" /></head>',
			'<div class="header"><img class="logo" src="http://i.imgur.com/fJwCDif.png" height="45" alt="Gold!"><center><font color=red>Room: ' + Tools.escapeHTML(targetRoom) +
			' Date: ' + Tools.escapeHTML(date) + '</font><br />' ,
			'<font color=red>Logs obtained ' + newDate.toUTCString() + ' by ' + Tools.escapeHTML(user.name) + '</font></center><div class="maintabbarbottom"></div></div>',
			'<div class="ps-room ps-room-light">','<div class="chat-log" style="bottom:0px;">','<div class="inner">'];

			for (var u in data) {
				var timestamp = data[u].substr(0, 9).trim();
				var line = data[u].substr(9, data[u].length);
				if (timestamp.substr(0,1) === '|') line = data[u].trim();
				//if (data[u].substr(2,1) !== ':') line = ''+data[u];
				if (line.substr(0,1) !== '|') line = '||'+line;
				var lineSplit = line.substr(1).split('|');
				switch (lineSplit[0]) {
					case 'c':
						var name = lineSplit[1];
						if (name === '~') break;
						var highlight = new RegExp("\\b" + user.name.toLowerCase() + "\\b", 'gi');
						var div = "chat";
						if (lineSplit.slice(2).join('|').match(highlight)) div = "chat highlighted";
						var Gold = global.Gold;
						newFile.push('<div class="' + div + '"><small>[' + timestamp + ']</small> ' + '<small>' + name.substr(0,1) + '</small><b><font color="' + Gold.hashColor(name.substr(1, name.length)) + '">' + name.substr(1, name.length) + ':</font></b><em>' +
							Tools.escapeHTML(lineSplit.slice(2).join('|')) + '</em></div>');
						break;
					case 'raw':
					case 'html':
						var currentLine = lineSplit.splice(1).join('|').trim();
						newFile.push('<div class="notice">' + sanitizeHTML(currentLine) + '</div>');
						break;
					case 'j':
					case 'J':
					case 'l':
					case 'L':
					case 'N':
					case 'unlink':
					case 'userstats':
					case 'tournament':
						break;
					case '':
						if (lineSplit.slice(1).join('|').substr(0,1) === '(' && !user.can('warn')) break; 
						newFile.push('<div class="notice">' + Tools.escapeHTML(lineSplit.slice(1).join('|')) + '</div></b>');
						break;
					default:
						if (lineSplit.join('|').substr(0,1) === '(' && !user.can('warn')) break; 
						newFile.push('<div class="notice"><code>' + Tools.escapeHTML(lineSplit.join('|')) + '</code></div></b>');
						break;
				}
			}
			newFile.push('</div></div></div></div></html>');
			fs.writeFile('static/logs/' + filename, newFile.join('\n'), function(err) {
				if (err) return self.sendReply("/viewlogs - " + err);
				self.sendReply("|raw|You can view the logs at <a href=\"http://goldservers.info:" + Config.port + "/logs/" + filename + "\">http://goldservers.info:" + Config.port + "/logs/" + filename + "</a>");
				var deleteFile = setTimeout(function(){fs.unlink('static/logs/' + filename);},1*1000*60);
			});
		});
	},
};
