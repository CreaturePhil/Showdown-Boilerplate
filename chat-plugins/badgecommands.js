var badgeList = {palude:'Palude', piuma:'Piuma', voltaggio:'Voltaggio', folletto:'Folletto', minerale:'Minerale', 
            pugno:'Pugno', buio:'Buio', vulcano:'Vulcano', sisma:'Sisma', piana:'Piana', acqu:'Acquitrino', 
            leggenda:'Leggenda', arcobaleno:'Arcobaleno'};
var badgeDetails = {
	palude: '<img src="http://i.imgur.com/rbTvB69.png" title="Medaglia Palude(GL Lugas)">',
	piuma: '<img src="http://i.imgur.com/5kqnG06.png" title="Medaglia Piuma(GL Pokébattler)">',
	voltaggio: '<img src="http://i.imgur.com/AZv3xbh.png" title="Medaglia Voltaggio(GL DaniPika97)">',
	folletto: '<img src="http://i.imgur.com/QmFZC87.png" title="Medaglia Folletto(GL Andry)">',
	minerale: '<img src="http://i.imgur.com/i3pWRI9.png" title="Medaglia Minerale(GL Dina)">',
	pugno: '<img src="http://i.imgur.com/zTNE3Gx.png" title="Medaglia Pugno(GL Livius)">',
	buio: '<img src="http://i.imgur.com/ldoxXEU.png" title="Medaglia Buio(GL Peter Pan)">',
	vulcano: '<img src="http://i.imgur.com/sq6Gyx6.png" title="Medaglia Vulcano(GL Wilfire70)">',
	sisma: '<img src="http://i.imgur.com/xfNFh2U.png" title="Medaglia Sisma(E4 Chue)">',
	piana: '<img src="http://i.imgur.com/DpFfu08.png" title="Medaglia Piana(E4 Ashachu)">',
	acqu: '<img src="http://i.imgur.com/HBzn0HK.png" title="Medaglia Acquitrino(E4 Roxas)">',
	leggenda: '<img src="http://i.imgur.com/ufkE2d7.png" title="Medaglia Leggenda(E4 Flareninja)">',
	arcobaleno: '<img src="http://i.imgur.com/4dOwacR.png" title="Medaglia Arcobaleno(Campione)">',
};

var comm = {
	'': 'info',
	info: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<a><font size= 4><marquee><b>Badges</b></marquee></font></a><br />' +
			'<b>What are Badges:</b><br />' +
			'Badges are prestigious achievements awarded on the user\'s trainer card and usually come with varying bucks award.<br />' +
			'They are awarded for league activity and vary in difficulty.<br />' +
	},

	help: function (target, room, user) {
		if (!this.canBroadcast()) return;
		this.sendReplyBox('<strong>Badge commands (Can only be used by Frontier Blade and ~):</strong><br />' +
		'- /badge give or /givebadge <i>User</i>, <i>Badge Name</i> - Gives the specified badge to the specified user. <br />' +
		'- /badge remove or /takebadge <i>User</i>, <i>Badge Name</i> - Removes the specified badge from the specified user. <br />' +
		'- /badge removeall or /removeallbadges <i>User</i> - Removes all of the specified user\'s badges. <br />' +
		'- /badge transfer or /transferbadges <i>User 1</i>, <i>User 2</i> - Moves all of user 1\'s badges to another user, user 2. If user 2 already has badges, this command transfers all badges user 2 does not have. <br />' +
		'- /badges view or /badgecase <i>User</i> - Shows all the badges owned by the user, or the specified user. <br />');
	},
	
	forcegive: 'give',
	award: 'give',
    give: function (target, room, user, connection, cmd) {
        if (user.userid !== 'frntierblade' && !this.can('hotpatch')) return this.sendReply('Only Frontier Blade and Admins can give badges.');
        target = target.split(",");
		var targetUser = target[0].trim();
        var badge = toId(target[1]);
        if (!badge || !toId(targetUser)) return this.sendReply('|raw|/badge ' + cmd + ' <i>User</i>, <i>Badge Name</i> - Gives a specified user the specified badge.');
        if (!Users.get(targetUser) && cmd !== 'forcegive') return this.sendReply('The user \'' + targetUser + '\' was not found. If you would still like to give this user a badge, use /forcegivebadge or /badge forcegive instead.');
        badge.replace(/badge/g, '');
        
        if (!(badge in badgeList)) return this.sendReply('That is not a valid badge.');
        Core.write('badges', toId(targetUser), badgeDetails[badge], undefined, badge);
        if (Users.get(targetUser) && Users.get(targetUser).connected && cmd !== 'forcegive') {
            Users.get(targetUser).send('Congratulations! You have been awarded the ' + badgeList[badge] + ' Badge!');
        }
        this.sendReply('You have successfully given ' + (Users.get(targetUser) ? Users.get(targetUser).name : targetUser) + ' the ' + badgeList[badge] + ' Badge.');
    },
	
	remove: 'take',
	take: function (target, room, user, connection, cmd) {
		if (user.userid !== 'frntierblade' && !this.can('hotpatch')) return this.sendReply('Only Frontier Blade and Admins can remove badges.');
        target = target.split(",");
		var targetUser = target[0].trim();
        var badge = toId(target[1]);
        if (!badge || !toId(targetUser)) return this.sendReply('|raw|/badge ' + cmd + ' <i>User</i>, <i>Badge Name</i> - Removes a specified badge from the specified user.');
        badge.replace(/badge/g, '');
		
		if (!(badge in badgeList)) return this.sendReply('That is not a valid badge.');
		var name = Users.get(targetUser) ? Users.get(targetUser).name : targetUser;
		if (!Core.read('badges', toId(targetUser))) return this.sendReply("User " + name + " doesn't have any badges.");
		if (!Core.read('badges', toId(targetUser), badge)) return this.sendReply(name + " doesn't have the " + badgeList[badge] + " badge.");
		
		Core.Delete('badges', toId(targetUser), badge);
		if (Users.get(name)&& Users.get(name).connected) Users.get(name).send('The ' + badgeList[badge] + ' has been removed from you.');
		this.sendReply('You have successfully removed the ' + badgeList[badge] + ' badge from ' + name + '.');
	},
	
	removeall: 'takeall',
	'delete': 'takeall',
	takeall: function (target, room, user, connection, cmd) {
		if (user.userid !== 'frntierblade' && !this.can('hotpatch')) return this.sendReply('Only Frontier Blade and Admins can remove badges.');
        if (!toId(target)) return this.sendReply('|raw|/badge ' + cmd + ' <i>User</i> - Removes all badges from the specified user.');
		var name = Users.get(target) ? Users.get(target).name : target.trim();
		if (!Core.read('badges', toId(target))) return this.sendReply("User " + name + " doesn't have any badges.");
		if (!user.confirm) {
			user.confirm = true;
			this.sendReply('WARNING: You are about to delete ALL of ' + name + '\'s badges. If you\'re sure you want to do this, use this command again.');
		} else {
			Core.Delete('badges', toId(target));
			this.sendReply('You have successfully removed all badges from ' + name + '.');
			if (Users.get(name)&& Users.get(name).connected) Users.get(name).send('All of your badges have been removed.');
			user.confirm = false;
		}
	},
	
	move: 'transfer',
	transfer: function (target, room, user, connection, cmd) {
		if (user.userid !== 'frntierblade' && !this.can('hotpatch')) return this.sendReply('Only Frontier Blade and Admins can remove badges.');
        if (!toId(target)) return this.sendReply('|raw|/badge ' + cmd + ' <i>User 1</i>, <i>User 2</i> - Moves all of user 1\'s badges to user 2. If user 2 already has badges, this command transfers all badges user 2 does not have.');
		target = target.split(',');
		var user1 = (Users.get(target[0]) ? Users.get(target[0]).name : target[0].trim());
        var user2 = (Users.get(target[1]) ? Users.get(target[1]).name : target[1].trim());
		
		var user1Badges = Core.read('badges', toId(user1));
		var user2Badges = Core.read('badges', toId(user2));
		if (Object.keys(user1Badges).length < 1) return this.sendReply("User " + user1 + " doesn't have any badges to transfer.");
		if (!user2Badges || !Object.keys(user2Badges).length) {
			var list = Core.read('badges', toId(user1));
			Core.write('badges', toId(user2), list);
			Core.Delete('badges', toId(user1));
		} else {
			var list = Core.read('badges', toId(user1));
			for (var i in list) {
				if (user2Badges[i]) continue;
				user2Badges[i] = list[i];
			}
			Core.write('badges', toId(user2), user2Badges);
			Core.Delete('badges', toId(user1));
		}
		return this.sendReply(user1 + '\'s badges have successfully been transferred to ' + user2);
	},
	
	display: 'show', 
	view: 'show',
	show: function (target, room, user, connection, cmd) {
		if (!this.canBroadcast()) return;
		if (!toId(target)) target = user.userid;
		var file = Core.read('badges', toId(target));
		target = Users.get(target) ? Users.get(target).name : target;
		if (!file) return this.sendReplyBox(target + " doesn't have any badges...");
		var list = target + '\'s Badges:';
		if (this.broadcasting) list = '<summary>' + list + '</summary>';
		else list += '<br/>';
		for (var i in file) {
			list += file[i] + ' ';
		}
		if (this.broadcasting) return this.sendReplyBox('<details>' + list + '</details>');
		this.sendReplyBox(list);
	}
};
        
exports.commands = {
	badge: 'badges',
	badges: comm,
	givebadge: comm.give,
	forcegivebadge: function (target, room, user) {
		this.parse('/badge forcegive');
	},
	takebadge: comm.take,
	removebadge: comm.take,
	removeallbadges: comm.takeall,
	transferbadges: 'movebadges',
	transferbadge: 'movebadges',
	movebadge: 'movebadges',
	movebadges: comm.transfer,
	badgecase: 'viewbadges',
	viewbadges: comm.show
};
