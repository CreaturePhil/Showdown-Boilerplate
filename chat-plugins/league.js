/**
exports.commands = {
	/*********************************************************
	 * League commands
	 *********************************************************/
	 
	ayudaliga: 'leaguehelp',
	leaguehelp: function (target, room, user) {
		return this.sendReplyBox(
			"<center><h3><b><u>League commands list</u></b></h3></center>" +
			"<br /><b>Users' commands</b><br />" +
			"/medallas [user] - Show user's badges.<br />" +
			"/liga [name] - Show League informations.<br />" +
			"/darmedalla [user] - Give a Badge as league's member.<br />"  +
			"/quitarmedalla [user] - Take a Badge as league's member.<br />" +
			"<br /><b>Administrative commands</b><br />" +
			"/medallist - Show Badge's list.<br />" +
			"/medaldata [id] - Show a Badge by its ID.<br />" +
			"/addmedal [id], [name], [width], [height], [image] - Add a badge.<br />" +
			"/deletemedal [id] - Delete a badge.<br />" +
			"/editmedal [id], [name/image/width/height], [data] - Modifies Badge's properties.<br />" +
			"/leguelist - Show League's list.<br />"  +
			"/addleague [id], [name], [room] - Add a League.<br />"  +
			"/deleteleague [id] - Delete a League.<br />"  +
			"/editleague [id], [name/room], [data] - Edits league informations.<br />"  +
			"/setgymleader [id-league], [user], [id-medal] - Add a user as gym leader.<br />"  +
			"/setelite [id-league], [user], [id-medal] - Add a user as elite.<br />"  +
			"/removegymleader [id-league], [id-medal] - Remove league's member.<br />"  +
			"/darmedalla [user], (id) - Give a Badge.<br />"  +
			"/quitarmedalla [user], (id) - Take a Badge.<br />"
		);
	},
	
	medallist: function (target, room, user) {
		if (!this.can("league")) return false;
		return this.sendReplyBox("Medallas (ID): " + League.getAllMedals());
	},
	
	medaldata: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("You have not specified any badge.");
		var medalData = League.getMedalData(target);
		if (!medalData) return this.sendReply("The badge doesn't exist.");
		return this.sendReplyBox('<b>' + Tools.escapeHTML(medalData.name) + ':</b><br /><img src="' + encodeURI(medalData.image) + '" title="' + Tools.escapeHTML(medalData.name) + '" width="' + Tools.escapeHTML(medalData.width) + '" height="' + Tools.escapeHTML(medalData.height) + '" />&nbsp;');
	},
	
	newmedal: 'addmedal',
	addmedal: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("You have not specified any badge.");
		var params = target.split(',');
		if (!params || params.length < 5) return this.sendReply("Usage: /addmedal [id], [name], [width], [height], [image]");
		if (League.newMedal(params[0], params[1], params[4], params[2], params[3])) return this.sendReply("Badge: " + toId(params[0]) + " successful created.");
		this.sendReply("The badge already exist.");
	},
	
	deletemedal: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("You have not specified any badge.");
		if (League.deleteMedal(target)) return this.sendReply("Badge: " + toId(target) + " successful deleted.");
		this.sendReply("The badge doesn't exist.");
	},
	
	medaledit: 'editmedal',
	editmedal: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("You have not specified any badge.");
		var params = target.split(',');
		if (!params || params.length < 3) return this.sendReply("Usage: /editmedal [id], [name/image/width/height], [data]");
		var opc = toId(params[1]).substr(0,1);
		if (League.editMedal(params[0], opc, params[2])) return this.parse("/medaldata " + params[0]);
		this.sendReply("Some of this dates is incorrect.");
	},
	
	medals: 'medallas',
	vermedallas: 'medallas',
	medallas: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		var autoData = false;
		var targetUser = toId(user.name);
		if (target) targetUser = toId(target);
		var userT = Users.get(targetUser);
		if (userT) {
			userT = userT.name;
		} else {
			userT = targetUser;
		}
		var html = '<center><h2>Badges de ' + userT + '</h2><center>';
		html += League.getMedalRaw(userT);
		return this.sendReplyBox(html);
	},
	
	leaguemedal: 'medallaliga',
	medallaliga: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		var autoData = false;
		var targetUser = toId(user.name);
		if (target) targetUser = toId(target);
		var userT = Users.get(targetUser);
		if (userT) {
			userT = userT.name;
		} else {
			userT = targetUser;
		}
		var medalId = League.findMedal(userT);
		if (medalId) return this.sendReply(userT + " no es miembro de ninguna liga del servidor.");
		var medalData = League.getMedalData(medalId);
		if (!medalData) return this.sendReply("The badge doesn't exist.");
		return this.sendReplyBox(userT + ' puede hacer entrega de: <b>' + Tools.escapeHTML(medalData.name) + ':</b><br /><br /><img src="' + encodeURI(medalData.image) + '" title="' + Tools.escapeHTML(medalData.name) + '" width="' + Tools.escapeHTML(medalData.width) + '" height="' + Tools.escapeHTML(medalData.height) + '" />&nbsp;');
	},
	
	qmedals: function (target, room, user, connection) {
		//low level commmand
		if (Config.emergency && ResourceMonitor.countCmd(connection.ip, user.name)) return false;
		connection.send('|queryresponse|userdetails|' + JSON.stringify({
			medals: League.getMedalQuery(user.name),
		}));
		return false;
	},
	
	league: 'liga',
	lideres: 'liga',
	liga: function (target, room, user) {
		if (!this.canBroadcast()) return false;
		var leagueId = League.findLeague(target, room.id);
		if (!leagueId) return this.sendReply("La liga especificada no está registrada en el servidor.");
		return this.sendReplyBox(League.getLeagueTable(leagueId));
	},
	
	leaguelist: function (target, room, user) {
		if (!this.can("league")) return false;
		return this.sendReplyBox("Ligas (ID): " + League.getAllLeagues());
	},
	
	newleague: 'addleague',
	addleague: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("No has especificado ninguna liga.");
		var params = target.split(',');
		if (!params || params.length < 3) return this.sendReply("Usage: /addleague [id], [name], [room]");
		if (League.newLeague(params[0], params[1], params[2])) return this.sendReply("Liga: " + toId(params[0]) + " creada con exito.");
		this.sendReply("La liga especificada ya existía.");
	},
	
	deleteleague: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("No has especificado ninguna liga.");
		if (League.deleteLeague(target)) return this.sendReply("Liga: " + toId(target) + " eliminada con exito.");
		this.sendReply("La liga especificada no existe.");
	},
	
	eleague: 'editleague',
	editleague: function (target, room, user) {
		if (!this.can("league")) return false;
		if (!target) return this.sendReply("No has especificado ninguna liga.");
		var params = target.split(',');
		if (!params || params.length < 3) return this.sendReply("Usage: /editleague [id], [name/room], [data]");
		var opc = toId(params[1]).substr(0,1);
		if (League.editLeague(params[0], opc, params[2])) return this.parse("/liga " + params[0]);
		this.sendReply("Alguno de los datos no es correcto.");
	},
	
	setgymleader: function (target, room, user) {
		if (!this.can('league')) return false;
		if (!target) return this.sendReply('Usage: /setgymleader [id-league], [user], [id-medal]');
		var params = target.split(',');
		if (!params || params.length < 3) return this.sendReply("Usage: /setgymleader [id-league], [user], [id-medal]");
		if (!Users.get(params[1])) this.sendReply('Warning: ' + toId(params[1]) + ' is offline.');
		if (League.addLeader(params[0], params[1], 'g', params[2])) return this.sendReply('Usuario ' + toId(params[1]) + ' asignado en el puesto correspondiente.');
		this.sendReply("Alguno de los datos no es correcto.");
	},
	
	setelite: function (target, room, user) {
		if (!this.can('league')) return false;
		if (!target) return this.sendReply('Usage: /setelite [id-league], [user], [id-medal]');
		var params = target.split(',');
		if (!params || params.length < 3) return this.sendReply("Usage: /setelite [id-league], [user], [id-medal]");
		if (!Users.get(params[1])) this.sendReply('Warning: ' + toId(params[1]) + ' is offline.');
		if (League.addLeader(params[0], params[1], 'e', params[2])) return this.sendReply('Usuario ' + toId(params[1]) + ' asignado en el puesto correspondiente.');
		this.sendReply("Alguno de los datos no es correcto.");
	},
	
	removegymleader: function (target, room, user) {
		if (!this.can('league')) return false;
		if (!target) return this.sendReply('Usage: /removegymleader [id-league], [id-medal]');
		var params = target.split(',');
		if (!params || params.length < 2) return this.sendReply("Usage: /removegymleader [id-league], [id-medal]");
		if (League.removeLeader(params[0], params[1])) return this.sendReply('Puesto de la liga especificada borrado con exito.');
		this.sendReply("Alguno de los datos no es correcto.");
	},

	givemedal: 'darmedalla',
	concedemedal: 'darmedalla',
	darmedalla: function (target, room, user) {
		if (!target) return this.sendReply('Usage: /darmedalla [user], (id)');
		var params = target.split(',');
		if (params.length === 1) {
			var userT = Users.get(params[0]);
			if (!userT) return this.sendReply('El usuario ' + toId(target) + ' no existe o no está disponible.');
			var league = League.findLeagueFromRoom(room.id);
			if (!league) return this.sendReply('Este comando solo puede ser usado en la Sala correspondiente a la liga.');
			var medalId = League.findMedal(user.name, league);
			if (!medalId) return this.sendReply('No estas registrado como miembro de la liga ' + league);
			var medalData = League.getMedalData(medalId);
			if (!League.giveMedal(medalId, params[0])) return this.sendReply('El usuario ya poseía la medalla que intentas entregar.');
			userT.popup(user.name + " te ha entregado la siguiente medalla: " + medalData.name + "\nRecuerda que puedes comproar tus medallas con el comando /medallas");
			this.addModCommand(user.name + " ha entregado su medalla (" + medalData.name + ") a " + toId(target) + '.');
			return;
		} else if(params.length > 1){
			if (!this.can('league')) return false;
			var userT = Users.get(params[0]);
			if (!userT) return this.sendReply('El usuario ' + toId(params[0]) + ' no existe o no está disponible.');
			if (!League.giveMedal(params[1], params[0])) return this.sendReply('El usuario ya poseía dicha medalla o el Id es incorrecto.');
			return this.sendReply('Medalla (' + League.getMedalData(params[1]).name + ') entregada a ' + toId(params[0]) + '.');
		}
		return this.sendReply('Usage: /darmedalla [user], (id)');
	},

	removemedal: 'quitarmedalla',
	quitarmedalla: function (target, room, user) {
	if (!target) return this.sendReply('Usage: /quitarmedalla [user], (id)');
		var params = target.split(',');
		if (params.length === 1) {
			var league = League.findLeagueFromRoom(room.id);
			if (!league) return this.sendReply('This command can only be used in a league room.');
			var medalId = League.findMedal(user.name, league);
			if (!medalId) return this.sendReply('Isn't registered as league's member ' + league);
			if (!League.removeMedal(medalId, params[0])) return this.sendReply('El usuario ya poseía la medalla que intentas entregar.');
			this.addModCommand(user.name + " has taken his badge a " + toId(target) + '.');
			return;
		} else if(params.length > 1){
			if (!this.can('league')) return false;
			if (!League.removeMedal(params[1], params[0])) return this.sendReply('The user hasn't this badge.');
			return this.sendReply('Badge (' + League.getMedalData(params[1]).name + ') taked a ' + toId(params[0]) + '.');
		}
		return this.sendReply('Usage: /quitarmedalla [user], (id)');
	}
};
**/
