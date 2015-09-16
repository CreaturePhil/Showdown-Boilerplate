exports.commands = {
	staff: 'leaguemembers',
	attendance: 'leaguemembers',
	leaguemembers: function (target, room, user) {
		if (!this.canBroadcast()) return;
		var total = '<table><tr><th>User</th><th>Last Seen</th></tr>';
		var list = ['Flareninja', 'Lugas', 'MagicianAyrton', 'Centypede', 'Pokekit'];
		for (var i = 0; i < list.length; i++) {
			var Seen = Users.get(list[i]) && Users.get(list[i]).connected ? '<font color = "green">Online</font>' : seen(list[i]).substr(18);
			if (Seen === 'never') Seen = '<font color = "red">Never</font>';

			total += '<tr><td>' + list[i] + '</td><td><center>' + Seen + '</center></td>';
		}
		this.sendReplyBox('<center><b>Admin Team</b><br />' + total + '</table></center>');
		var total = '<table><tr><th>User</th><th>Last Seen</th></tr>';
		var list = ['Flareninja', 'Centypede', 'AshachuPM', 'Roxas0000'];
		for (var i = 0; i < list.length; i++) {
			var Seen = Users.get(list[i]) && Users.get(list[i]).connected ? '<font color = "green">Online</font>' : seen(list[i]).substr(18);
			if (Seen === 'never') Seen = '<font color = "red">Never</font>';

			total += '<tr><td>' + list[i] + '</td><td><center>' + Seen + '</center></td>';
		}
		this.sendReplyBox('<details><summary><b>Elite 4\'s</b></summary><center>' + total + '</table></details></center>');
		var total = '<table><tr><th>User</th><th>Last Seen</th></tr>';
		var list = ['Lugas', 'Based Pokébattler', 'DaniPika97', 'AndryPM',
			'Dinamier', 'Livius I', 'Pete Pan PM', 'Wilfire70'
		];
		for (var i = 0; i < list.length; i++) {
			var Seen = Users.get(list[i]) && Users.get(list[i]).connected ? '<font color = "green">Online</font>' : seen(list[i]).substr(18);
			if (Seen === 'never') Seen = '<font color = "red">Never</font>';

			total += '<tr><td>' + list[i] + '</td><td><center>' + Seen + '</center></td>';
		}
		this.sendReplyBox('<details><summary><b>Gym Leaders</b></summary><center>' + total + '</table></details></center>');
	},
