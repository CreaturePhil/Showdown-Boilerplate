var fs = require('fs');
var path = require('path');
var request = require('request');

const AVATAR_PATH = path.join(__dirname, '../config/avatars/');

function download_image(image_url, name) {
	return new Promise(function (resolve, reject) {
		request
			.get(image_url)
			.on('error', function (err) {
				console.error(err);
				reject("Avatar unavailable. Try choosing a different one.");
			})
			.on('response', function (response) {
				if (response.statusCode !== 200) reject("Avatar unavailable. Try choosing a different one.");
				var type = response.headers['content-type'].split('/');
				if (type[0] !== 'image') reject("Link is not an image link.");
				var allowedFormats = ['jpg', 'jpeg', 'png', 'gif'];
				if (!~allowedFormats.indexOf(type[1])) {
					reject("Format not supported. The supported formats are " + allowedFormats.join(', '));
				}

				var file = toId(name) + '.' + type[1];
				response.pipe(fs.createWriteStream(AVATAR_PATH + file));
				resolve(file);
			});
	});
}

function load_custom_avatars() {
	fs.readdir(AVATAR_PATH, function (err, files) {
		files
			.filter(function (file) {
				return ['.jpg', '.jpeg', '.png', '.gif'].indexOf(path.extname(file)) >= 0;
			})
			.forEach(function (file) {
				var name = path.basename(file, path.extname(file));
				Config.customavatars[name] = file;
			});
	});
}

load_custom_avatars();

exports.commands = {
	customavatar: {
		set: function (target, room, user) {
			if (!this.can('customavatar')) return false;

			var parts = target.split(',');

			if (parts.length < 2) return this.parse('/help customavatar');

			var name = parts[0];
			var image_url = parts[1];
			if (image_url.match(/^https?:\/\//i)) image_url = 'http://' + image_url;

			if (!name || !image_url) return this.parse('/help customavatar');

			download_image(image_url, name)
				.then(function (file) {
					Config.customavatars[toId(name)] = file;
					this.sendReply(name + "'s avatar has been set.")
				}.bind(this))
				.catch(function (err) {
					this.errorReply('Error setting ' + name + '\'s avatar: ' + err);
				}.bind(this));
		},

		delete: function (target, room, user) {
			if (!this.can('customavatar')) return false;

			var userid = toId(target);
			var image = Config.customavatars[userid];

			if (!image) {
				return this.errorReply("This user does not have a custom avatar");
			}

			delete Config.customavatars[userid];

			fs.unlink(AVATAR_PATH + image, function (err) {
				if (err && err.code === 'ENOENT') {
					this.errorReply("This user's avatar does not exist.");
				} else if (err) {
					console.error(err);
				}
				this.sendReply("This user's avatar has been successfully removed.");
			}.bind(this));
		},

		'': 'help',
		help: function (target, room, user) {
			this.parse('/help customavatar');
		}
	},
	customavatarhelp: ["Commands for /customavatar are:",
	"/customavatar set [username], [image link] - Set a user's avatar.",
	"/customavatar delete [username] - Delete a user's avatar."]
};
