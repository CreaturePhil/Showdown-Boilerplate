var pikachu = "http://www.pokestadium.com/assets/img/sprites/misc/trozei/pikachu.gif";
var bulbasaur = "http://www.pokestadium.com/assets/img/sprites/misc/trozei/bulbasaur.gif";
var squirtle = "http://www.pokestadium.com/assets/img/sprites/misc/trozei/squirtle.gif";
var charmander = "http://www.pokestadium.com/assets/img/sprites/misc/trozei/charmander.gif";
var eevee = "http://www.pokestadium.com/assets/img/sprites/misc/trozei/eevee.gif";

var randSlotArray = [pikachu,bulbasaur,squirtle,charmander,eevee];
var randSlotArrayTwo = [pikachu,bulbasaur,squirtle,charmander,eevee];
var randSlotArrayThree = [pikachu,bulbasaur,squirtle,charmander,eevee];

exports.commands = {
slots: function (target, room, user, connection) {
	
	if (room.id === "casino") {

	var _this = this;

	Database.read('money', user.userid, function (err, userMoney) {
			if (err) throw err;
			if (!userMoney) userMoney = 0;
			if (userMoney < 1) return _this.errorReply("You don't have enough bucks to play this game.");

	Database.write('money', userMoney - 1, user.userid, function (err) {
		if (err) throw err;
	//Gives A Bank The Money Used To Play Slots.
	Database.read('money', toId('safetydragon'), function (err, initial) {
			if (err) throw err;
			if (!initial) initial = 0;
	Database.write('money', initial + 1, toId('safetydragon'), function (err, total) {
				if (err) throw err;				
			});
		});

	var randomizer = randSlotArray[Math.floor(Math.random() * randSlotArray.length)];
	var randomizerTwo = randSlotArrayTwo[Math.floor(Math.random() * randSlotArrayTwo.length)];
	var randomizerThree = randSlotArrayThree[Math.floor(Math.random() * randSlotArrayThree.length)];

	var i;

	var chancesGenerator = Math.floor(Math.random() * 1000);

	var slotOne = [];
	var slotTwo = [];
	var slotThree = [];


	slotOne.push(randomizer);
	slotTwo.push(randomizerTwo);
	slotThree.push(randomizerThree);

	if (chancesGenerator > 750 && chancesGenerator < 800) {
		var winningSlot = [pikachu];

		_this.sendReply('|raw|<div style="background: url(&quot;https://s-media-cache-ak0.pinimg.com/736x/2a/d9/cc/2ad9cc5dc43e22f171e46b1b3aeb83ff.jpg&quot;); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 1px solid skyblue;"><center><img src="http://s17.postimg.org/k1buzif4v/cooltext142549968938162.png" width="300" height="80"></center><br><table width="100%" height="150%" style="padding: 0px 10px 0px 10px;"><tr style="border: 3px inset gold; width: 60%; height: 200%;"><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td></tr></table><br><br></div>');

		_this.sendReply("Pikachuuu!. Congratulations on winning 1 buck.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 1, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 1 Buck For Pikachuuu Streak!!.");
			});
		});
		
		
	}	else if (chancesGenerator > 820 && chancesGenerator < 850) {
		var winningSlot = [bulbasaur];

		_this.sendReply('|raw|<div style="background: url(&quot;https://s-media-cache-ak0.pinimg.com/736x/2a/d9/cc/2ad9cc5dc43e22f171e46b1b3aeb83ff.jpg&quot;); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 1px solid skyblue;"><center><img src="http://s17.postimg.org/k1buzif4v/cooltext142549968938162.png" width="300" height="80"></center><br><table width="100%" height="150%" style="padding: 0px 10px 0px 10px;"><tr style="border: 3px inset gold; width: 60%; height: 200%;"><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td></tr></table><br><br></div>');

		_this.sendReply("Bulbasauuur! Congratulations on winning 3 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 3, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 3 Bucks For Bulbasauuur Streak!!.");
			});
		});		
		
		
	}	else if (chancesGenerator > 860 && chancesGenerator < 880) {
		var winningSlot = [squirtle];
		
		_this.sendReply('|raw|<div style="background: url(&quot;https://s-media-cache-ak0.pinimg.com/736x/2a/d9/cc/2ad9cc5dc43e22f171e46b1b3aeb83ff.jpg&quot;); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 1px solid skyblue;"><center><img src="http://s17.postimg.org/k1buzif4v/cooltext142549968938162.png" width="300" height="80"></center><br><table width="100%" height="150%" style="padding: 0px 10px 0px 10px;"><tr style="border: 3px inset gold; width: 60%; height: 200%;"><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td></tr></table><br><br></div>');
	
		_this.sendReply("Squuuirtle!. Congratulations on winning 6 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 6, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 6 Bucks For Squirtle Streak!!.");
			});
		});
		
		
	}	else if (chancesGenerator > 885 && chancesGenerator < 900) {
		var winningSlot = [charmander]

		_this.sendReply('|raw|<div style="background: url(&quot;https://s-media-cache-ak0.pinimg.com/736x/2a/d9/cc/2ad9cc5dc43e22f171e46b1b3aeb83ff.jpg&quot;); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 1px solid skyblue;"><center><img src="http://s17.postimg.org/k1buzif4v/cooltext142549968938162.png" width="300" height="80"></center><br><table width="100%" height="150%" style="padding: 0px 10px 0px 10px;"><tr style="border: 3px inset gold; width: 60%; height: 200%;"><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td></tr></table><br><br></div>');
	
		_this.sendReply("Chaaarmander!. Congratulations on winning 9 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 9, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 9 Bucks For Charmander Streak!!.");

			});
		});
			
		
	}	else if (chancesGenerator > 995 && chancesGenerator < 999) {
		var winningSlot = [eevee]

		_this.sendReply('|raw|<div style="background: url(&quot;https://s-media-cache-ak0.pinimg.com/736x/2a/d9/cc/2ad9cc5dc43e22f171e46b1b3aeb83ff.jpg&quot;); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 1px solid skyblue;"><center><img src="http://s17.postimg.org/k1buzif4v/cooltext142549968938162.png" width="300" height="80"></center><br><table width="100%" height="150%" style="padding: 0px 10px 0px 10px;"><tr style="border: 3px inset gold; width: 60%; height: 200%;"><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + winningSlot + '" width="32" height="32"></center></td></tr></table><br><br></div>');

		_this.sendReply("Eeeveeee!. Congratulations on winning 12 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 12, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 12 Bucks For Eeveeeeeee Streak!!.");
			});
		});


	}	else	{

		_this.sendReply('|raw|<div style="background: url(&quot;https://s-media-cache-ak0.pinimg.com/736x/2a/d9/cc/2ad9cc5dc43e22f171e46b1b3aeb83ff.jpg&quot;); -webkit-background-size: cover; -moz-background-size: cover; -o-background-size: cover; background-size: cover; border: 1px solid skyblue;"><center><img src="http://s17.postimg.org/k1buzif4v/cooltext142549968938162.png" width="300" height="80"></center><br><table width="100%" height="150%" style="padding: 0px 10px 0px 10px;"><tr style="border: 3px inset gold; width: 60%; height: 200%;"><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + randomizer + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + randomizerTwo + '" width="32" height="32"></center></td><td style="background-color: white; box-shadow: 10px 10px 5px grey; border: 3px inset gold; padding: 10px 10px 10px 10px;"><center><img src="' + randomizerThree + '" width="32" height="32"></center></td></tr></table><br><br></div>');

		if (slotOne == pikachu && slotTwo == pikachu && slotThree == pikachu) {
			_this.sendReply("Pikachuuu!. Congratulations on winning 1 buck.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 1, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 1 Buck For Pikachuuu Streak!!.");
			});
		});

		}	else if (slotOne == bulbasaur && slotTwo == bulbasaur && slotThree == bulbasaur) {
			_this.sendReply("Bulbasauuur! Congratulations on winning 3 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 3, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 3 Bucks For Bulbasauuur Streak!!.");
			});
		});		

		}	else if (slotOne == squirtle && slotTwo == squirtle && slotThree == squirtle) {
			_this.sendReply("Squuuirtle!. Congratulations on winning 6 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 6, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 6 Bucks For Squirtle Streak!!.");
			});
		});

		}	else if (slotOne == charmander && slotTwo == charmander && slotThree == charmander) {
			_this.sendReply("Chaaarmander!. Congratulations on winning 9 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 9, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 9 Bucks For Charmander Streak!!.");

			});
		});

		}	else if (slotOne == eevee && slotTwo == eevee && slotThree == eevee) {
			_this.sendReply("Eeeveeee!. Congratulations on winning 12 bucks.")

		Database.read('money', user.userid, function (err, total) {
					if (err) throw err;
					if (!total) total = 0;
					Database.write('money', total + 12, user.userid, function (err) {
						if (err) throw err;
						if (Users.get(user.name)) Users.get(user.name).popup("You won 12 Bucks For Eeveeeeeee Streak!!.");
			});
		});

		}	else	{
			var loseMessageArray = ["Well that's a bit unlucky .... keep trying!!! Prizes await you!!.","Luck Gods probably have a grudge against you :@","Trying breaking a mirror for Good Luck.. oh wait.....","Go kiss Dragotic, that might increase your chances !!","Well this is bad :@, go blame dragotic for making it so hard!."];
			var loseMessage = loseMessageArray[Math.floor(Math.random() * loseMessageArray.length)];
			_this.sendReply(loseMessage);
		}

	}

		});	
		});
	
		
	}	else	{
		this.errorReply("This command can only be used in the room Casino.")
	}

},
slotshelp: ["|raw|/slots - It costs 1 buck to play and has many prizes.<ul><li>Pikachu Streak - This awards 1 buck and has a high chance.</li><li>Bulbasaur Streak - This awards 3 bucks and has less chance than Pikachu Streak.</li><li>Squirtle Streak - This awards 6 bucks and has a medium chance.</li><li>Charmander Streak - This awards 9 bucks and has a low chance.</li><li>Eevee Streak - This awards 12 bucks and you have to be really lucky for this one.</li><ul>"],
};
