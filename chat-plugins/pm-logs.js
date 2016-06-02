"use strict";
// pm log age in hours
const PM_LOG_AGE = 2;
const reportRoom = "upperstaffroom";
const rRoom = Rooms.get(reportRoom);

class PmLogger {
	constructor() {
		this.logs = {};
		this.reports = {};
		this.initFilter();
	}

	log(user, target, message) {
		if (!user || !target || !message) return false;
		let now = Date.now();
		// get user-target id
		let logId = user.userid + "-" + target.userid;
		// check for other way around.
		if (this.logs[target.userid + "-" + user.userid]) logId = target.userid + "-" + user.userid;
		if (!this.logs[logId]) this.logs[logId] = {};
		this.logs[logId][now] = user.name + " -> " + target.name + " | " + message.split("|").slice(4).join("|");
	}

	initFilter() {
		let self = this;
		setInterval(() => {
			self.filterLogs();
		}, /*arbitrary period of cleaning every 5 minutes*/ 300000);
	}

	filterLogs() {
		let cutOffAge = Date.now() - (3600000 * PM_LOG_AGE);
		let self = this;
		for (let id in this.logs) {
			// for each item in logs
			let buffer =  {};
			Object.keys(this.logs[id]).filter(d => {
				// filter out old logs
				if (d >= cutOffAge) return d;
			}).forEach(l => {
				// save the ones that are left
				buffer[l] = self.logs[id][l];
			});
			// put back in this.logs
			this.logs[id] = buffer;
		}
	}

	saveReport(id) {
		// check if there is a report
		if (!this.reports[id] || this.reports[id].saved) return false;
		// save to database
		// set id, date to database

		Db("pms").set([id, new Date().toLocaleString()], this.reports[id]);
		// mark report as saved
		this.reports[id].saved = true;
		// success
		return true;
	}

	resolve(id) {
		if (!this.reports[id]) return false;
		let reporter = this.reports[id].reporter;
		// remove their filedReports
		let regex = new RegExp("(^" + reporter + "\-|\-" + reporter + "$)", "i");
		let reportTarget = id.replace(regex, "");
		let user = Users.get(reporter);
		if (user) {
			if (!user.filedReports || !user.filedReports[reportTarget]) return false;
			// remove the filedReport
			// useful in situations where the logs have progressed more, and you would like to have more logs reported
			delete user.filedReports[reportTarget];
			// let the user know the issue is taken care of
			user.popup("Your report has been taken care of and resolved.");
			return true;
		}
		return false;
	}

	report(user, target, targetUser) {
		// get user-target id
		let logId = user.userid + "-" + target;
		// check for other way around.
		if (this.logs[target + "-" + user.userid]) logId = target + "-" + user.userid;
		// search for PM logs, if not report has failed;
		if (!this.logs[logId]) return false;
		// check if user has already reported;
		if (this.reports[logId]) {
			// if so merge logs;
			this.reports[logId] = Object.assign({}, this.reports[logId], this.logs[logId]);
		} else {
			// save a copy in this.reports
			// use Object.assign() to break all ties to the original this.logs() object
			this.reports[logId] = Object.assign({}, this.logs[logId]);
		}
		// set reporter
		this.reports[logId].reporter = user.userid;
		this.reports[logId].saved = false;
		// send a message to the targetted staff room.
		rRoom.addRaw("<div class=\"broadcast-red\"><font color=\"black\"><b>" + user.name + "</b> has reported <b>" + targetUser.name + "</b> for PM harrassment.<br>Logs: <button name=\"send\" value=\"/viewreport " + logId + "\">View</button>&nbsp;<button name=\"send\" value=\"/savereport " + logId + "\">Save</button>&nbsp;<button name=\"send\" value=\"/resolvereport " + logId + "\">Resolve</button>");
		// update staff room so it shows on time
		rRoom.update();
		// success!
		return true;
	}

	viewReport(user, reportId) {
		// check for valid reportId
		if (!reportId || !this.reports[reportId]) return false;
		let report = this.reports[reportId];
		let logs = Object.keys(report).sort().filter(id => {
			// filter out trivia details
			return !isNaN(id);
		}).map(l => {
			// create logs
			return "[" + new Date(Number(l)).toLocaleString() + "] " + report[l];
		}).join("||");
		// send popup
		user.popup("|wide|Report: " + reportId + "||||" + logs);
		return true;
	}
}

if (!Rooms.global.pmLogger) {
	Rooms.global.pmLogger = new PmLogger();
}
let PML = Rooms.global.pmLogger;

exports.commands = {
	report: function (target, room, user) {
		if (user.locked) this.errorReply("You cannot report users when you are locked!");
		if (!target) return this.errorReply("Please include the user you are reporting.");
		let targetUser = Users.get(target);
		// get the toId(target) so changing names wont affect reporting.
		let targetId = toId(target);
		if (!targetUser) return this.errorReply("The user does not exist on the server.");
		// prevent reports from getting spammed
		if (user.filedReports && user.filedReports[targetId]) {
			// dont allow it to be spammed
			return this.errorReply("You have already reported that user.");
		} else {
			// set it in the user's report data
			if (!user.filedReports) user.filedReports = {};
			user.filedReports[targetId] = 1;
		}
		// check for target rather than target user, since /trn would cause it to direct to the new name's userid
		let reportSuccess = PML.report(user, targetId, targetUser);
		if (!reportSuccess) return this.errorReply("You do not have any recent PMs with this user.");
		this.sendReply("You have reported user " + targetUser.name);
	},
	viewreport: function (target, room, user) {
		if (!this.can("declare")) return false;
		if (!target) return this.errorReply("Please include the report id you want to view.");
		let reportExists = PML.viewReport(user, target);
		if (!reportExists) this.errorReply("That is not a valid report.");
	},
	savereport: function (target, room, user) {
		if (!this.can("declare")) return false;
		if (!target) return this.errorReply("Please include the report id you want to save.");
		let reportExists = PML.saveReport(target);
		if (!reportExists) return this.errorReply("That is not a valid report or it has already been saved.");
		this.sendReply("You have saved the report.");
	},
	resolvereport: function (target, room, user) {
		if (!this.can("declare")) return false;
		if (!target) return this.errorReply("Please include the report id you want to view.");
		let resolveSuccess = PML.resolve(target);
		if (!resolveSuccess) return this.errorReply("Report was not found or is already resolved.");
		rRoom.add(user.name + " has resolved report " + target + ".");
		// make sure it shows in room
		rRoom.update();
	},
	searchreports: function (target, room, user) {
		if (!this.can("declare")) return false;
		if (!target) return this.errorReply("Please include which user to search for");
		target = toId(target);
		let found = {};
		// search
		let savedReports = Db("pms").object();
		for (let id in savedReports) {
			// dont waste time searching
			let regex = new RegExp("(^" + target + "\-|\-" + target + "$)", "i");
			if (!regex.test(id)) continue;
			for (let d in savedReports[id]) {
				found[d] = {
					data: savedReports[id][d],
					id: id,
				};
			}
		}
		// create table with way of viewing
		let tableContents = Object.keys(found).map(d => {
			let logId = found[d].id;
			let reporter = found[d].data.reporter;
			return "<tr><td>&nbsp;" + d + "&nbsp;</td><td>&nbsp;" + reporter + "&nbsp;</td><td>&nbsp;<button name=\"send\" value=\"/viewsavedreport " + logId + "," + d + "\">View</button>&nbsp;</td></tr>";
		}).join("");
		this.sendReply("|raw|<table border=1 style=\"border-collapse: collapse;\"><tr><td>Date</td><td>Reporter</td><td>Logs</td></tr>" + tableContents + "</table>");
	},
	viewsavedreport: function (target, room, user) {
		if (!this.can("declare")) return false;
		// you're only viewing this via the button, there's no way you can get the data without the button
		if (!target) return false;
		let parts = target.split(",");
		if (parts.length !== 3) return false;
		let logId = parts[0];
		let date = parts.slice(1).join(",");
		let targetReport = Db("pms").get([logId, date]);
		if (!targetReport) return this.errorReply("Log not found.");
		let reporter = targetReport.reporter;
		// popup contents
		let popup = "|wide|Reported by " + reporter + "||||" + Object.keys(targetReport).filter(d => {
			return !isNaN(d);
		}).map(l => {
			return "[" + new Date(Number(l)).toLocaleString() + "] " + targetReport[l];
		}).join("||");
		// send popup
		user.popup(popup);
	},
};
