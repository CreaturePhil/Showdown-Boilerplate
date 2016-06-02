/*
  This is a module designed to prevent/minize the risk of hacking
  of auth members on the server.  While this is not a complete
  and foolproof system, it filters out users with unconfirmed ips
  autolocking if the ip is known to be a hacker.

  Made by: sparkychild
 */

"use strict";
// these ip ranges will be lock on sight when found on a staff member
const BLACKLISTED_RANGES = ["208.83.7.*"];
// this will show how strictly it will match ips
// at 3, it will match ips XXX.XXX.XXX.* as safe ips.
const IP_MATCH_STRICTNESS = 2;
// non staff users that require their ips checked - prominent roomauth and bots
const IP_CHECK_EXCEPTIONS = ["hayleysworld", "alainscharizard", "resourceful", "nineage"];
// these commands cannot be used when the user is in trouble
const IP_BLACKLISTED_COMMANDS = ["ban", "lock", "shadowban", "unban", "unbanall", "unlock", "unshadowban", "timedlock", "timedunlock", "permalock", "unpermalock", "permaban", "unpermaban", // global moderation commands
	"eval", "hotpatch", "lockdown", "prelockdown", "restart", "kill", "bash", "slowlockdown", "endlockdown", "refreshpage", "evalbattle", "updateserver", "editbattle", // dev/console/admin commands
	"makechatroom", "deleteroom", "deregisterroom", "backdoor", "resetladder", "resetbucks", "givebucks", "takebucks", // commands that affect the server badly and mess with it's data
	"banip", "unbanip", "rangelock", "rangeunlock"]; // extremely dangerous moderation commands that can ban the entire server

// Notes:
// Any staff member with an ip range of that WILL be automatically locked and demoted on sight
// Any staff member that comes on with an unrecognized ip will trigger an alert in the staff room.
// When first implemented this may cause a bit of issues.
// Any user whose ip is NOT confirmed will not be able to use the IP_BLACKLISTED_COMMANDS


class IPValidator {
	constructor() {
		this.ips = Db("ips").object();
	}

	updateUserIp(userid, ip) {
		let dbips = this.ips[userid] || {};
		let matchedIps = {};
		let updated = false;
		Object.keys(dbips).forEach(dbip => {
			let matched = false;
			if (ip === dbip) {
				matchedIps[dbip] = 1;
				updated = true;
				matched = true;
			}
			// when dbip is a range
			if (dbip.indexOf("*") > -1 && !matched) {
				let range = dbip.split("*")[0];
				if (ip.indexOf(range) === 0) {
					matchedIps[dbip] = 1;
					updated = true;
					matched = true;
				}
			}
			// turn ip into a range if possible
			let range = dbip.split(".").slice(0, IP_MATCH_STRICTNESS).join(".") + ".";
			if (ip.indexOf(range) === 0 && !matched) {
				matchedIps[range + "*"] = 1;
				updated = true;
				matched = true;
			}
			if (!matched) matchedIps[dbip] = 1;
		});
		if (!updated) matchedIps[ip] = 1;
		// update and SAVE
		Db("ips").object()[userid] = matchedIps;
		Db.save();
		this.ips[userid] = matchedIps;
	}

	validate(user) {
		// match only staff and special users
		if (!user.isStaff && IP_CHECK_EXCEPTIONS.indexOf(user.userid) === -1 && !user.isSysop) return true;

		// if the user has no IP previously recorded
		// record this new ip, and exit
		if (!this.ips[user.userid]) {
			this.updateUserIp(user.userid, user.latestIp);
			return true;
		}
		// matching
		let ips = Object.keys(user.ips);
		let dbips = Object.keys(this.ips[user.userid]);
		// match blacklisted ips
		let findBlacklisted = false;
		BLACKLISTED_RANGES.forEach(ip => {
			let range = ip.split("*")[0];
			for (let i = 0; i < ips.length; i++) {
				let userIp = ips[i];
				if (userIp.indexOf(range) === 0) {
					// match found!
					// ban user
					if (user.latestIp === userIp) {
						// ban if it's the most recent one
						user.ban(false, user.userid);
					} else {
						// simply lock if it is only still in the user's collection of ips
						user.lock(false, user.userid);
					}
					// deconfirm the user to keep him locked
					let from;
					if (user.confirmed) {
						from = user.deconfirm();
					}
					// monitor message
					Monitor.log("[IPMonitor] User " + user.name + " is suspected of being hacked (falls in a blacklisted ip range) and has been banned" + (from ? " and has been demoted from " + from.join(",") + "." : ".") + " IP matched: " + ip + " -> " + userIp);
					// remove user from staff room to prevent more leaking
					user.leaveRoom("staff");
					// no need to keep searching for this
					findBlacklisted = true;
					break;
				}
			}
		});
		// dont keep searching and adding new alerts to staff.
		if (findBlacklisted) return false;
		// next match and identify any new ips
		// log and display all unmatched ips
		let unmatched = [];
		let self = this;
		ips.forEach(ip => {
			// create a range to match
			// check if each ip is matched as a range, or if it's matched entirely
			let isMatched = false;
			let fullMatch = false;
			for (let i = 0; i < dbips.length; i++) {
				let sIp = dbips[i];
				// check for a match
				// if IP is a range
				if (sIp.indexOf("*") > -1) {
					let range = sIp.split("*")[0];
					if (ip.indexOf(range) === 0) {
						// acknowledge that it's a good match, no need to update database
						fullMatch = true;
						isMatched = true;
						continue;
					}
				}
				// if ip is not a range
				let range = sIp.split(".").slice(0, IP_MATCH_STRICTNESS).join(".") + ".";
				if (ip.indexOf(range) === 0) {
					if (sIp === ip) {
						fullMatch = true;
					}
					isMatched = true;
				}
			}
			// if not fully matched, but only partially matched as a range
			if (!fullMatch && isMatched) {
				// update ip into a range
				self.updateUserIp(user, ip);
			}
			if (!isMatched) {
				// push into unmatched
				unmatched.push(ip);
			}
		});
		// notify staff
		if (unmatched.length) {
			// if user is already confirmed to be unsafe, dont bother notifying staff room again.
			if (user.isNotSafe) return false;
			Monitor.log("[IPMonitor] " + user.name + " has unrecognized ips: " + unmatched.join(", "));
			let confirmationRow = unmatched.map(ip => {
				return ip + "&nbsp;<button name=\"send\" value=\"/confirmuserip " + user.userid + " " + ip + "\">Confirm</button>&nbsp;&nbsp;";
			}).join("");
			if (Rooms.get("staff")) {
				Rooms.get("staff").add("|raw|" + confirmationRow);
				Rooms.get("staff").update();
			}

			// make it not spam the staff room with alerts
			user.isNotSafe = true;
			// user cannot use commands still
			return false;
		} else {
			// no issues
			return true;
		}
	}

	check(user, message) {
		if (!user) return false;
		let safeIp = this.validate(user);
		if (!safeIp) {
			// block some commands from being used.
			if (message && ((message.indexOf("/") === 0 && message.indexOf("//") !== 0) || message.indexOf("!") === 0)) {
				// confirmed to be a command
				// find the actual command one
				let cmd = toId(message.split(" ")[0]);
				if (!CommandParser.commands[cmd]) return true;
				if (typeof CommandParser.commands[cmd] === "string") cmd = CommandParser.commands[cmd];
				// block it if it is blacklisted
				if (IP_BLACKLISTED_COMMANDS.indexOf(cmd) > -1) {
					return false;
				}
			}
		}
		return true;
	}
}

if (!Rooms.global.IPValidator) {
	Rooms.global.IPValidator = new IPValidator();
}

let IPV = Rooms.global.IPValidator;

exports.commands = {
	confirmuserip: function (target, room, user) {
		if (!this.can("declare")) return false;
		if (!target) return false;
		let parts = target.split(" ");
		if (parts.length !== 2) return false;
		let targetUser = Users.get(parts[0]);
		if (!targetUser) return false;
		let targetId = toId(parts[0]);
		// user cannot confirm him/herself
		if (targetId === user.userid && /*exception*/ user.userid !== "sparkychild") return this.errorReply("You cannot confirm your own IP for security reasons.");
		// check if next part is really an ip
		if (!/^[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}$/i.test(parts[1])) return this.errorReply("Invalid IP.");
		IPV.updateUserIp(targetId, parts[1]);
		targetUser.isNotSafe = false;
		if (Rooms.get("staff")) Rooms.get("staff").add(user.name + " has confirmed " + targetId + "'s ip - " + parts[1]);
	},
};
