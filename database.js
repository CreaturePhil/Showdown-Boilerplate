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
		if (!user) return callback(null);
		callback(null, user[key]);
	};

	/**
	 * Writes a key to value in the database.
	 *
	 * @param {String} key
	 * @param {*} value
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

		callback(null, val[key]);
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

	/**
	 * Sort by a key in descending order.
	 *
	 * @param {String} key
	 * @param {Number} amount
	 * @param {Function} callback(err, array)
	 */
	methods.sortDesc = function (key, amount, callback) {
		var value = db('users')
						.chain()
						.filter(function (user) {
							return user.money >= 0;
						})
						.sortByOrder('money', ['desc'])
						.take(amount)
						.value();

		callback(null, value);
	};

	/**
	* Get a key in the database.
	*
	* @param {String} key
	* @param {Function} callback(err, key)
	*/
	methods.get = function (key, callback) {
		if (key === 'users') return callback(new Error('Cannot overwrite users'));
		callback(null, db.object[key]);
	};

	/**
	* Set a key in the database.
	*
	* @param {String} key
	* @param {Number} value
	* @param {Function} callback(err, newKey)
	*/
	methods.set = function (key, value, callback) {
		if (key === 'users') return callback(new Error('Cannot overwrite users'));
		db.object[key] = value;
		callback(null, db.object[key]);
	};

	/**
	* Get the users array in the database.
	*
	* @param {Function} callback(err, users)
	*/
	methods.users = function (callback) {
		callback(null, db('users').value());
	};

	return methods;
};

function Database (database) {
	return databases[database]();
}

module.exports = Database;
