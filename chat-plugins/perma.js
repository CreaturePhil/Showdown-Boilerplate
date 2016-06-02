'use strict';
let fs = require("fs");
let permaUsers;
try {
	permaUsers = JSON.parse(fs.readFileSync("config/perma.json"));
} catch (e) {
	permaUsers = {};
	console.log("Unable to load config/perma.txt; creating empty object.");
}
Users.parsePerma = function (userid, targetUser) {
	if (!userid) return;
	if (userid in permaUsers) {
		try {
			targetUser[permaUsers[userid]](false, userid);
		} catch (e) {
			console.log("ERROR: unable to apply perma to " + userid);
		}
	}
};

exports.commands = {
	plock: "permalock",
	permalock: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help permalock");
		let userid = toId(target);
		if (userid in permaUsers) return this.errorReply("User " + userid + " is already perma" + permaUsers[userid] + (permaUsers[userid] === "ban" ? "ned" : "ed") + ".");
		permaUsers[userid] = "lock";
		try {
			Users.get(userid).lock(false, userid);
		} catch (e) {}
		this.addModCommand(userid + " was permalocked by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},
	unplock: "unpermalock",
	unpermalock: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help unpermalock");
		let userid = toId(target);
		if (!(userid in permaUsers) || permaUsers[userid] !== "lock") return this.errorReply(userid + " is not permalocked!");
		try {
			Users.unlock(userid);
		} catch (e) {}
		delete permaUsers[userid];
		this.addModCommand(userid + " was unpermalocked by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},
	pban: "permaban",
	permaban: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help permaban");
		let userid = toId(target);
		if (userid in permaUsers && permaUsers[userid] === "ban") return this.errorReply("User " + userid + " is already permabanned.");
		permaUsers[userid] = "ban";
		try {
			Users.get(userid).ban(false, userid);
		} catch (e) {}
		this.addModCommand(userid + " was permabanned by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},
	unpban: "unpermaban",
	unpermaban: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		if (!target) return this.parse("/help unpermaban");
		let userid = toId(target);
		if (!(userid in permaUsers) || permaUsers[userid] !== "ban") return this.errorReply(userid + " is not permabanned!");
		try {
			Users.unban(userid);
		} catch (e) {}
		delete permaUsers[userid];
		this.addModCommand(userid + " was unpermabanned by " + user.name + ".");
		fs.writeFileSync("config/perma.json", JSON.stringify(permaUsers));
	},
	plist: "permalist",
	permalist: function (target, room, user, connection) {
		if (!this.can('declare')) return false;
		let buffer = ["<b>Perma'd users:</b>", ""];
		Object.keys(permaUsers).sort().forEach(function (u) {
			buffer.push("<b>" + u + "</b> - " + permaUsers[u]);
		});
		if (buffer.length === 2) buffer.push("There are currently no perma'd users!");
		this.sendReplyBox(buffer.join("<br>"));
	},
	permalockhelp: ["/permalock [user] - permanantly locks the user."],
	permabanhelp: ["/permaban [user] - permanently bans the user."],
	unpermabanhelp: ["/unpermaban [user] - lifts a permaban."],
	unpermalockhelp: ["/unpermalock [user] - lifts a permalock."],
};
