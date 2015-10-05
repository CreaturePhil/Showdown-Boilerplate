var Ladders = require('ladders.js');
var tourLadder = Ladders('tournaments');
Tournaments.Tournament.prototype.onBattleWin = function (room, winner) {
	var from = Users.get(room.p1);
	var to = Users.get(room.p2);
	var tourSize = this.generator.getUsers().length;

	var result = 'draw';
	if (from === winner) {
		result = 'win';
		if (this.room.isOfficial && tourSize >= 4 && room.battle.endType !== 'forced') tourLadder.updateRating(from.name, to.name, 1, room);
	} else if (to === winner) {
		result = 'loss';
		if (this.room.isOfficial && tourSize >= 4 && room.battle.endType !== 'forced') tourLadder.updateRating(from.name, to.name, 0, room);
	}

	if (result === 'draw' && !this.generator.isDrawingSupported) {
		this.room.add('|tournament|battleend|' + from.name + '|' + to.name + '|' + result + '|' + room.battle.score.join(',') + '|fail');

		this.generator.setUserBusy(from, false);
		this.generator.setUserBusy(to, false);
		this.inProgressMatches.set(from, null);

		this.isBracketInvalidated = true;
		this.isAvailableMatchesInvalidated = true;

		this.runAutoDisqualify();
		this.update();
		return this.room.update();
	}

	var error = this.generator.setMatchResult([from, to], result, room.battle.score);
	if (error) {
		return this.room.add("Unexpected " + error + " from setMatchResult([" + from.userid + ", " + to.userid + "], " + result + ", " + room.battle.score + ") in onBattleWin(" + room.id + ", " + winner.userid + "). Please report this to an admin.").update();
	}

	this.room.add('|tournament|battleend|' + from.name + '|' + to.name + '|' + result + '|' + room.battle.score.join(','));

	this.generator.setUserBusy(from, false);
	this.generator.setUserBusy(to, false);
	this.inProgressMatches.set(from, null);

	this.isBracketInvalidated = true;
	this.isAvailableMatchesInvalidated = true;

	if (this.generator.isTournamentEnded()) {
		this.onTournamentEnd();
	} else {
		this.runAutoDisqualify();
		this.update();
	}
	this.room.update();
};

exports.commands = {
	tourelo: 'tourladder',
	tourladder: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var self = this;
		if (!target || !target.trim()) {
			tourLadder.load().then(function (users) {
				if (!users.length) return self.sendReplyBox('No rated tournaments have been played yet.');
				users.sort(function (a, b) {
					return b[1] - a[1];
				});
				var table = '<center><b><u>Tournament Ladder</u></b><br>' +
					'<table border = "1" cellspacing = "0" cellpadding = "5"><tr><th>No.</th><th>User</th><th>Elo</th>';
				for (var i = 0; i < 10; i++) {
					if (!users[i] || users[i][1] <= 1000) break;
					var user = (Users.getExact(users[i][0]) ? Users.getExact(users[i][0]).name : users[i][0]);
					table += '<tr><td><center>' + (i + 1) + '</center></td><td style = "text-align: center">' + user + '</td><td style = "text-align: center">' + Math.round(users[i][1]) + '</td></tr>';
				}
				self.sendReplyBox(table + '</table>');
			});
			return;
		}

		target = (Users.getExact(target) ? Users.getExact(target).name : target);
		if (tourLadder.indexOfUser(target) === -1) return this.sendReplyBox(target + ' has not played any rated tournaments yet.');
		tourLadder.load().then(function (users) {
			var elo = users[tourLadder.indexOfUser(target)][1];
			self.sendReplyBox(target + '\'s Tournament Elo is <b>' + Math.round(elo) + '</b>.');
		});
	}
}
