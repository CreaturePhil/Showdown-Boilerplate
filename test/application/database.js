var assert = require('assert');
var database = require('../../database');
var fs = require('fs');
var path = require('path');

var Database, file;
describe('lowdb', function () {
	before(function () {
		Database = database('lowdb');
		file = path.join(__dirname, '../../config/db.json');
	});

	it('should create a user when reading', function (done) {
		Database.read('money', 'testuser', function(err, value) {
			assert.deepEqual(typeof err, 'string');
			assert.deepEqual(err, 'Key does not exist.');
			assert.deepEqual(value, undefined);

			setTimeout(function() {
				fs.readFile(file, 'utf8', function(err, data) {
					if (err) return done(err);
					assert.deepEqual(data.indexOf('testuser') >= 0, true);
					var json = JSON.parse(data);
					assert.deepEqual(typeof json, 'object');
					assert.deepEqual(json.users.length, 1);
					done();
				});
			}, 50);
		});
	});

	it('should create a user when writing', function (done) {
		Database.write('money', 1, 'testuser2', function(err, value) {
			assert.deepEqual(typeof err, 'object');
			assert.deepEqual(typeof value, 'object');

			setTimeout(function() {
				fs.readFile(file, 'utf8', function(err, data) {
					if (err) return done(err);
					assert.deepEqual(data.indexOf('testuser2') >= 0, true);
					var json = JSON.parse(data);
					assert.deepEqual(typeof json, 'object');
					assert.deepEqual(json.users.length, 2);
					done();
				});
			}, 100);
		});
	});

	after(function (done) {
		fs.unlink(file, function (err) {
			if (err) return done(err);
			done();
		});
	});
});
