var low = require('lowdb');
var path = require('path');

var lowFile = path.join(__dirname, 'config/db.json');

var databases = {};

databases.lowdb = function () {
	var db = low(lowFile);
	var methods = {};

	/**
	 * Reads a key in the database.
	 *
	 * @param {String} key
	 * @param {String} user
	 * @param {Function} callback(err, value)
	 */
	methods.read = function (key, username, callback) {
		var user = db('users').find({username: username});
		if (!user) user = db('users').push({username: username})[0];
		if (!user[key]) return callback('Key does not exist.');
		callback(null, user[key]);
	};

	/**
	 * Writes a key to value in the database.
	 *
	 * @param {String} key
	 * @param {String} user
	 * @param {Function} callback(err, value)
	 */
	methods.write = function (key, value, username, callback) {
		var user = db('users').find({username: username});
		if (!user) db('users').push({username: username});
		var obj = {};
		obj[key] = value;
		var val = db('users')
						.chain()
						.find({username: username})
						.assign(obj)
						.value();

		callback(null, val);
	};

	/**
	 * Combined value from all rows.
	 *
	 * @param {String} key
	 * @param {Function} callback(err, total)
	 */
	methods.total = function (key, callback) {
		var total = db('users').reduce(function (total, obj) {
			return total + obj[key];
		});
		callback(null, total);
	};

	/**
	 * Gets how many users there are.
	 *
	 * @param {Function} callback(err, size)
	 */
	methods.countUsers = function (callback) {
		return callback(null, db('users').size());
	};

	return methods;
};

function Database (database) {
	return databases[database]();
}

module.exports = Database;
