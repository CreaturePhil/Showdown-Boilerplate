// Code by Guard FieryNnight

"use strict";

let id = 0;

function genJobTable(completionButton) {
	let display = "<table border='1' cellspacing='0' cellpadding='5' width='100%'>" +
					"<tbody><tr><th>Employer</th><th>Description</th><th>Reward</th>" + (completionButton ? "<th>Completed</th>" : "") + "</tr>";
	for (let id in Db("jobs").object()) {
		display += "<tr>" +
						"<td align='center'><button name='send' value='/profile " + Db("jobs").get([id, "owner"]) + "'><b>" + Db("jobs").get([id, "owner"]) + "</b></button>" + "</td>" +
						"<td align='center'>" + Db("jobs").get([id, "description"]) + "</td>" +
						"<td align='center'>" + Db("jobs").get([id, "reward"]) + "</td>" +
						(completionButton ? "<td align='center'><button name='send' value='/jobs delete " + id + "'>" + "Completed" + "</td>" : "") +
					"</tr>";
	}
	return display;
}

let commands = {
	add: function (target, room, user) {
		if (!target) return this.parse("/help jobs");
		// Driver and up only
		if (!this.can('lock')) return false;
		let args = target.split(",");
		while (Db("jobs").get(id)) {
			id++;
		}
		// allow a possibility of no reward.
		let reward = parseInt(args[args.length - 1]) || "None";
		// allow commas in description
		let description = typeof reward === "number" ? args.slice(0, args.length - 1).join(",") : args.slice(0, args.length - 0).join(",");
		// Do some checks
		if (description.length > 200) return this.errorReply('Description must be 200 characters or less.');
		// Create job in database
		Db("jobs").set(id, {
			'description':description,
			'reward': reward,
			'owner': user.userid,
		});

		// Send reply back to user
		this.sendReply("Successfully added job " + id + ".");
	},
	delete: function (target, room, user) {
		if (!target) return this.parse("/help jobs");
		// Do some checks
		if (!this.can('lock')) return false;
		if (!Db("jobs").get(target)) return this.errorReply('Job not found');

		// Delete job and send reply back to user
		Db("jobs").delete(target);
		this.sendReply("Job " + target + " deleted.");
	},
	list: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		// dont broadcast complete button, only show that button for staff.
		this.sendReplyBox(genJobTable(!this.broadcasting && ["%", "@", "&", "~"].indexOf(user.group) > -1));
	},
	"": function (target, room, user) {
		this.parse("/help jobs");
	},
};
exports.commands = {
	jobs: commands,
	jobshelp: [
		"/jobs add [description], [optional reward] - Adds a new job to the list of jobs; requires % @ & ~.",
		"/jobs delete [id] - Deletes the specified job from the list of jobs; requires % @ & ~.",
		"/jobs list - views the list of jobs.",
	],
};
