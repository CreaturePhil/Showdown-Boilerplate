var uninstalled = false;
var fs = require('fs');
var http = require('http');
var request;
var fileExists = true;
try {
	request = require('request');
} catch (err) {
	uninstalled = true;
}

var avatarlist = JSON.parse(fs.readFileSync('config/customavatars.json'));

exports.commands = {
	setavatar: function (target, room, user, connection, cmd) {
		if (!toId(target)) return this.sendReply('/setavatar [user], URL - Sets a custom avatar.');
		if (uninstalled) return this.sendReply("|html|You must have the node.js 'request' module installed to use this command. Run <code>npm install request</code> in your command prompt to install it. You'd first need to shut down the server, though.");
		if (!this.can('declare')) return false;
		var targetArray = target.split(',');
		targetArray[0] = toId(targetArray[0]);
		var formatList = ['png', 'gif'];
		var format = targetArray[1].substr(-3);
		if (formatList.indexOf(format) === -1) return this.sendReply('The format of your avatar is not supported. The allowed formats are ' + formatList.join(', ') + '.');
		if(targetArray[1].charAt(0) === ' ') targetArray[1] = targetArray[1].slice(1);
		if (targetArray[1].indexOf('https://') === 0) targetArray[1] = 'http://' + targetArray[1].substr(8);
		if (targetArray[1].indexOf('http://') !== 0) targetArray[1] = 'http://' + targetArray[1];

		var self = this;
		request.get(targetArray[1]).on('error', function () {
			return self.sendReply("The avatar you picked doesn\'t exist. Try picking a new avatar.");
		}).on('response', function (response) {
			if (response.statusCode == 404) return self.sendReply("The avatar you picked is unavailable. Try picking a new avatar.");
			avatarlist[targetArray[0]] = targetArray[0] + '.' + format;
			fs.writeFile('config/customavatars.json', JSON.stringify(avatarlist));
			Users.get(targetArray[0]).avatar = avatarlist[targetArray[0]];
			self.sendReply('|html|Your new avatar has been set to-<br/><img src = "' + targetArray[1] + '" width = 80 height = 80>');
			response.pipe(fs.createWriteStream('config/avatars/' + targetArray[0] + '.' + format));
		});
	},

	removeavatar: function (target, room, user, connection, cmd) {
		if (typeof user.avatar === 'Number') return this.sendReply('You do not own a custom avatar.');
		if (toId(target) !== 'confirm')
			return this.sendReply('WARNING: If you choose to delete your avatar now, it cannot be recovered later. If you\'re sure you want to do this, enter \'/removeavatar confirm.\'');
		delete avatarlist[user.userid];
		fs.unlink('config/config/avatars/' + user.avatar);
		user.avatar = 1;
		fs.writeFile('config/customavatars.json', JSON.stringify(avatarlist));
		this.sendReply('Your custom avatar has been successfully removed.');
	}
};
