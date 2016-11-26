exports.commands = {
	gedge: function (target, room, user) {
		if (!target) return this.parse('/help gedge');
        if (user.userid != 'edgejs') return this.errorReply('/gedge - Sorry to tell you this mate, only Edge can use this this command. So access denied :]');
		target = this.canHTML(target);
		if (!target) return;

		Rooms.rooms.forEach((curRoom, id) => {
			if (id !== 'global') curRoom.addRaw('<div style="background: #ffb066; color: black; border: 2px solid black; border-radius: 15px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>global declare brought to you by <font color="#E33E51">edge</font> :3</i></b></font></center></div>').update();
		});
	},
	gedgehelp: ["/gedge [message] - Anonymously announces a message to every room on the server. Requires: edge :]"],

	 edge: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help edge');
        if (user.userid != 'edgejs') return this.errorReply('/gedge - Sorry to tell you this mate, only Edge can use this this command. So access denied :]');
		room.addRaw('<div style="background: #ffb066; color: black; border: 2px solid black; border-radius: 15px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>brought to you by <font color="#E33E51">edge</font> :3</i></b></font></center></div>');
		room.update();
},
	edgehelp: ["/gedge [message] - Anonymously announces a message to the current room. Requires: edge :]"],

	gaustin: function (target, room, user) {
		if (!target) return this.parse('/help gaustin');
        if (user.userid != 'austin0602') return this.errorReply('/gedge - Sorry to tell you this mate, only Edge can use this this command. So access denied :]');
		target = this.canHTML(target);
		if (!target) return;

		Rooms.rooms.forEach((curRoom, id) => {
			if (id !== 'global') curRoom.addRaw('<div style="background: #00ccff; color: black; border: 2px solid black; border-radius: 5px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>global declare from the <font color="#cc0099">austin</font></i></b></font></center></div>').update();
		});
	},
	gaustinhelp: ["/gaustin [message] - Anonymously announces a message to the all rooms. Requires: being the austin."],

	 austin: function (target, room, user, connection, cmd) {
		if (!target) return this.parse('/help gaustin');
        if (user.userid != 'austin0602') return this.errorReply('/gedge - Sorry to tell you this mate, only Edge can use this this command. So access denied :]');
		room.addRaw('<div style="background: #00ccff; color: black; border: 2px solid black; border-radius: 5px;"><center><font size="4"><b>' + target + '</b></font><br><br><br><font size="1"><b><i>declare from the <font color="#cc0099">austin</font></i></b></font></center></div>');
		room.update();
},
	austinhelp: ["/gaustin [message] - Anonymously announces a message to the current room. Requires: being the austin."],

    hope: function (target, room, user, connection, cmd) {
        if (user.userid != 'theforgottenhope') return this.errorReply('/hope - Access denied. Because you can\'t hope :]');
		room.addRaw('<div style="background-image: url(http://i.imgur.com/oafBxsf.png); background-size: cover; color: #10968c; border-radius: 1px"><center><font size="4">' + target + '</font><br><br><font color="#a010e1">hope:</font> :]</center></div>');
		room.update();
}
}
