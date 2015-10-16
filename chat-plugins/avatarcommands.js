var uninstalled = false;
var fs = require('fs');
var request;
var fileExists = true;
try {
	request = require('request');
} catch (err) {
	uninstalled = true;
}

var avatarlist = JSON.parse(fs.readFileSync('storage-files/customavatars.json'));

exports.commands = {
	setavatar: function (target, room, user, connection, cmd) {
		if (!toId(target)) return this.sendReply('/setavatar URL - Sets a custom avatar.');
		if (uninstalled) return this.sendReply("|html|You must have the node.js 'request' module installed to use this command. Run <code>npm install request</code> in your command prompt to install it. You'd first need to shut down the server, though.");
		if (!this.can('hotpatch')) return false;
		var formatList = ['png', 'jpg', 'gif', 'jpeg', 'bmp'];
		var format = target.substr(-3);
		if (formatList.indexOf(format) === -1) return this.sendReply('The format of your avatar is not supported. The allowed formats are ' + formatList.join(', ') + '.');
		if (target.indexOf('https://') === 0) target = 'http://' + target.substr(8);
		if (target.indexOf('http://') !== 0) target = 'http://' + target;

		var self = this;
		request.get(target).on('error', function () {
			return self.sendReply("The avatar you picked doesn\'t exist. Try picking a new avatar.");
		}).on('response', function (response) {
			if (response.statusCode == 404) return self.sendReply("The avatar you picked is unavailable. Try picking a new avatar.");
			avatarlist[user.userid] = user.userid + '.' + format;
			fs.writeFile('storage-files/customavatars.json', JSON.stringify(avatarlist));
			user.avatar = avatarlist[user.userid];
			self.sendReply('|html|Your new avatar has been set to-<br/><img src = "' + target + '" width = 80 height = 80>');
			response.pipe(fs.createWriteStream('config/avatars/' + user.userid + '.' + format));
		});
	},

	removeavatar: function (target, room, user, connection, cmd) {
		if (typeof user.avatar === 'Number') return this.sendReply('You do not own a custom avatar.');
		if (toId(target) !== 'confirm')
			this.sendReply('WARNING: If you choose to delete your avatar now, it cannot be recovered later. If you\'re sure you want to do this, enter \'/removeavatar confirm.\'');
		delete avatarlist[user.userid];
		fs.unlink('config/avatars/' + user.avatar);
		user.avatar = 1;
		fs.writeFile('storage-files/customavatars.json', JSON.stringify(avatarlist));
		this.sendReply('Your custom avatar has been successfully removed.');
	}
};
