const ranksDataFile = DATA_DIR + 'superranks.json';

var fs = require('fs');

global.SuperRanks = {
	ranks: {},
	isHoster: function (userid) {
		if (userid === 'ecuacion') return true;
		if (this.ranks[userid] && this.ranks[userid] === "h") return true;
		return false;
	},
	isOwner: function (userid) {
		if (this.ranks[userid] && this.ranks[userid] === "o") return true;
		return false;
	},
	isAdmin: function (userid) {
		if (this.ranks[userid] && this.ranks[userid] === "a") return true;
		return false;
	}
};

if (!fs.existsSync(ranksDataFile))
	fs.writeFileSync(ranksDataFile, JSON.stringify(SuperRanks.ranks));

SuperRanks.ranks = JSON.parse(fs.readFileSync(ranksDataFile).toString());

function writeRankData() {
	try {
		fs.writeFileSync(ranksDataFile, JSON.stringify(SuperRanks.ranks));
	} catch (e) {}
}

exports.commands = {
	ga: 'giveaccess',
	giveaccess: function (target, room, user) {
		if (!SuperRanks.isHoster(user.userid) && !SuperRanks.isOwner(user.userid)) return this.sendReply('/giveaccess - access denied');
		if (!target) return this.sendReply('Usage: /giveaccess user, [hoster/owner/admin]');
		target = this.splitTarget(target, true);
		var targetUser = this.targetUser;
		var userid = toId(this.targetUsername);
		var name = targetUser ? targetUser.name : this.targetUsername;
		if (!userid) return this.sendReply('Usage: /giveaccess user, [hoster/owner/admin]');
		if (!SuperRanks.ranks[userid]) {
			if (!targetUser) {
				return this.sendReply("User '" + name + "' is offline and unauthed, and so can't be promoted.");
			}
			if (!targetUser.registered) {
				return this.sendReply("User '" + name + "' is unregistered, and so can't be promoted.");
			}
		}
		var currentRank = SuperRanks.ranks[userid] || ' ';
		var toRank = target.trim() ? target.trim().charAt(0) : 'none';
		if (!(toRank in {h: 1, o: 1, a: 1})) return this.sendReply('Usage: /giveaccess user, [hoster/owner/admin]');
		if ((toRank === 'h' || toRank === 'o' || currentRank === 'h' || currentRank === 'o') && !SuperRanks.isHoster(user.userid)) return this.sendReply('/giveaccess - access denied');
		SuperRanks.ranks[userid] = toRank;
		writeRankData();
		var nameTable = {
			h: "Hoster",
			o: "Owner",
			a: "Admin Director"
		};
		this.sendReply("User " + name + " is now " + nameTable[toRank]);
	},
	ra: 'removeaccess',
	removeaccess: function (target, room, user) {
		if (!SuperRanks.isHoster(user.userid) && !SuperRanks.isOwner(user.userid)) return this.sendReply('/removeaccess - access denied');
		if (!target) return this.sendReply('Usage: /removeaccess user');
		var userid = toId(target);
		if (!SuperRanks.ranks[userid]) return this.sendReply("User " + userid + " does not have access");
		var currentRank = SuperRanks.ranks[userid];
		if ((currentRank === 'h' || currentRank === 'o') && !SuperRanks.isHoster(user.userid)) return this.sendReply('/removeaccess - access denied');
		delete SuperRanks.ranks[userid];
		writeRankData();
		this.sendReply("User " + userid + " removed from excepted users");
	},
	hosters: function (target, room, user, connection) {
		var ranks = SuperRanks.ranks;
		var hosters = [], owners = [], admins = [];
		for (var i in ranks) {
			switch (ranks[i]) {
				case 'h':
					hosters.push(i);
					break;
				case 'o':
					owners.push(i);
					break;
				case 'a':
					admins.push(i);
					break;
			}
		}
		connection.popup("**Hosters:** " + (hosters.length ? hosters.join(", ") : "__(ninguno)__") + "\n\n" + "**Owners:** " + (owners.length ? owners.join(", ") : "__(ninguno)__") + "\n\n" + "**Admin Directors:** " + (admins.length ? admins.join(", ") : "__(ninguno)__"));
	}
};
