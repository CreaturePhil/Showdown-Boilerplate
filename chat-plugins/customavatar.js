var fs = require('fs');
var path = require('path');
var request = require('request');

const AVATAR_PATH = path.join(__dirname, '../config/avatars/');

function download_image(image_url, name, extension) {
	request
		.get(image_url)
		.on('error', function (err) {
			console.error(err);
		})
		.on('response', function (response) {
			if (response.statusCode !== 200) return;
			var type = response.headers['content-type'].split('/');
			if (type[0] !== 'image') return;

			response.pipe(fs.createWriteStream(AVATAR_PATH + name + extension));
		});
}

function load_custom_avatars() {
	fs.readdir(AVATAR_PATH, function (err, files) {
		files
			.filter(function (file) {
				return ['.jpg', '.png', '.gif'].indexOf(path.extname(file)) >= 0;
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

			var name = toId(parts[0]);
			var image_url = parts[1];
			if (image_url.match(/^https?:\/\//i)) image_url = 'http://' + image_url;
			var ext = path.extname(image_url);

			if (!name || !image_url) return this.parse('/help customavatar');
			if (['.jpg', '.png', '.gif'].indexOf(ext) < 0) {
				return this.errorReply("Image url must have .jpg, .png, or .gif extension.");
			}

			Config.customavatars[name] = name + ext;

			download_image(image_url, name, ext);
			this.sendReply(parts[0] + "'s avatar has been set.");
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
