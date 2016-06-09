/* * * * * * * * * * * *
*  Rock/Paper/Scissors *
*  by sparkychild      *
* * * * * * * * * * * */
'use strict';

let color = require('../config/color');
let rankLadder = require('../rank-ladder');

if (!Rooms.global.RPS) {
	Rooms.global.RPS = {
		searches: {},
		games: {},
		gameId: 0,
	};
}

let choiceNames = {
	"R": "Rock",
	"P": "Paper",
	"S": "Scissors",
};

class RPSGame {
	constructor(player1, player2, gameType) {
		this.p1 = player1;
		this.p2 = player2;
		this.p1choice = null;
		this.p2choice = null;
		Rooms.global.RPS.gameId++;
		this.gameId = "RPS-" + Rooms.global.RPS.gameId;
		this.gameType = gameType;
		// set inactivity timer
		this.timer = setTimeout(function () {
			this.onEnd(true);
		}.bind(this), 60000);
		this.onInit();
	}

	onInit() {
		// set game
		Rooms.global.RPS.games[this.gameId] = this;

		//delete searches
		delete Rooms.global.RPS.searches[this.p1.userid];
		delete Rooms.global.RPS.searches[this.p2.userid];

		//change users
		this.p1.RPSgame = this.gameId;
		this.p2.RPSgame = this.gameId;

		//send popups
		this.sendGameInformation(this.p1, this.p2);
		this.sendGameInformation(this.p2, this.p1);
	}

	sendGameInformation(player, opponent) {
		let pmPost = "/html <div class=\"broadcast-green\"><center> You have been matched up with <span class=\"username\">" + Tools.escapeHTML(opponent.name) + "</span><br>" +
			"<b>What is your choice?</b><br>" +
			'<button name="send" value="/rps choose R ' + this.gameId + '">Rock</button>' +
			'<button name="send" value="/rps choose P ' + this.gameId + '">Paper</button>' +
			'<button name="send" value="/rps choose S ' + this.gameId + '">Scissors</button></center><br><br>' +
			"You have 60 seconds to make your choice.</center></div>";
		player.send("|pm|~Rock/Paper/Scissors Host|" + player.userid + "|" + pmPost);
	}

	updateUsers() {
		//get the latest user...
		this.p1 = Users.get(this.p1.userid);
		this.p2 = Users.get(this.p2.userid);
	}

	onChoose(user, choice) {
		this.updateUsers();
		if (user.userid !== this.p1.userid && user.userid !== this.p2.userid) return false;
		let playerChoice = user.userid === this.p1.userid ? "p1choice" : "p2choice";
		if (this[playerChoice]) return user.send("|pm|~Rock/Paper/Scissors Host|" + user.userid + "|/html You have already chosen your move!");
		this[playerChoice] = choice;
		user.send("|pm|~Rock/Paper/Scissors Host|" + user.userid + "|/html You have chosen: " + choiceNames[choice] + ".");
		if (this.p1choice && this.p2choice) this.onEnd();
	}

	onEnd(inactivity) {
		clearTimeout(this.timer);
		// in the case of inactivity
		if (inactivity) {
			//determine winner
			if (this.p1choice && !this.p2choice) {
				this.p2.send("|pm|~Rock/Paper/Scissors Host|" + this.p2.userid + "|/html You have lost due to inactivity.");
				this.parseWin(this.p1, this.p2, true);
			} else if (!this.p1choice && this.p2choice) {
				this.p1.send("|pm|~Rock/Paper/Scissors Host|" + this.p1.userid + "|/html You have lost due to inactivity.");
				this.parseWin(this.p2, this.p1, true);
			} else {
				this.p1.send("|pm|~Rock/Paper/Scissors Host|" + this.p1.userid + "|/html You have lost due to inactivity.");
				this.p2.send("|pm|~Rock/Paper/Scissors Host|" + this.p2.userid + "|/html You have lost due to inactivity.");
			}
			this.p1.RPSgame = null;
			this.p2.RPSgame = null;
			delete Rooms.global.RPS.games[this.gameId];
			return;
		}
		let resultTable = {
			"rr": "pp",
			"rp": "p2",
			"rs": "p1",
			"pp": "pp",
			"pr": "p1",
			"ps": "p2",
			"ss": "pp",
			"sp": "p1",
			"sr": "p2",
		};
		let winner, loser;
		let gameResult = resultTable[this.p1choice.toLowerCase() + this.p2choice.toLowerCase()];
		if (gameResult === "pp") {
			//tie
			this.p1.send("|pm|~Rock/Paper/Scissors Host|" + this.p1.userid + "|/html The game with " + this.p2.name + " was a tie! " + this.p2.name + " has chosen " + choiceNames[this.p2choice] + ".");
			this.p2.send("|pm|~Rock/Paper/Scissors Host|" + this.p2.userid + "|/html The game with " + this.p1.name + " was a tie! " + this.p1.name + " has chosen " + choiceNames[this.p1choice] + ".");
			if (this.gameType === "bucks") {
				//return their 3 bucks each
				Db('money').set(this.p1.userid, Db('money').get(this.p1.userid, 0) + 3);
				Db('money').set(this.p2.userid, Db('money').get(this.p2.userid, 0) + 3);
			}
		} else if (gameResult === "p1") {
			winner = this.p1;
			loser = this.p2;
			this.parseWin(winner, loser);
		} else if (gameResult === "p2") {
			winner = this.p2;
			loser = this.p1;
			this.parseWin(winner, loser);
		}
		//destroy this object
		this.p1.RPSgame = null;
		this.p2.RPSgame = null;
		delete Rooms.global.RPS.games[this.gameId];
	}
	parseWin(winner, loser, inactivity) {
		winner.send("|pm|~Rock/Paper/Scissors Host|" + winner.userid + "|/html You have won the game against " + loser.name + "! " + (!inactivity ? loser.name + " has chosen " + choiceNames[(winner.userid === this.p1.userid ? this.p2choice : this.p1choice)] + "." : ""));
		loser.send("|pm|~Rock/Paper/Scissors Host|" + loser.userid + "|/html You have lost the game against " + winner.name + "! " + (!inactivity ? winner.name + " has chosen " + choiceNames[(loser.userid === this.p1.userid ? this.p2choice : this.p1choice)] + "." : ""));
		if (this.gameType === "bucks") {
			//set but bucks
			Db('money').set(winner.userid, Db('money').get(winner.userid, 0) + 6);
			winner.send("|pm|~Rock/Paper/Scissors Host|" + winner.userid + "|/html You have also won 6 bucks.");
		} else {
			//do rank change
			let winnerPoints = Db('rpsrank').get(winner.userid, 1000);
			let loserPoints = Db('rpsrank').get(loser.userid, 1000);
			let difference = Math.abs(winnerPoints - loserPoints);
			let winnerPointGain, loserPointGain;
			let pointGain = ~~(difference / 4) + 8;
			if (winnerPoints > loserPoints) {
				pointGain = 12;
			}
			winnerPointGain = pointGain;
			loserPointGain = -1 * pointGain;

			//give points to the winner;
			if (winnerPoints < 1050) {
				winnerPointGain = winnerPointGain >= 23 ? winnerPointGain : 23;
			}
			if (winnerPoints < 1125) {
				winnerPointGain *= 2;
			}
			//limit gains
			if (winnerPointGain < 12) winnerPointGain = 12;
			if (winnerPointGain > 75) winnerPointGain = 75;
			let winnerFinalPoints = winnerPoints + winnerPointGain;
			Db('rpsrank').set(winner.userid, winnerFinalPoints);

			//deduct points from loser
			if (winnerPoints > loserPoints) {
				loserPointGain = Math.ceil(loserPointGain / 2);
			}
			//limit losses
			if (loserPointGain > -6) loserPointGain = -6;
			if (loserPointGain < -50) loserPointGain = -50;
			let loserFinalPoints = loserPoints + loserPointGain;
			//unable to go below 1000;
			if (loserFinalPoints < 1000) loserFinalPoints = 1000;
			Db('rpsrank').set(loser.userid, loserFinalPoints);

			//announce the change in rank
			winner.send("|pm|~Rock/Paper/Scissors Host|" + winner.userid + "|/html " + winner.name + ": " + winnerPoints + " --> " + winnerFinalPoints + "<br>" + loser.name + ": " + loserPoints + " --> " + loserFinalPoints);
			loser.send("|pm|~Rock/Paper/Scissors Host|" + loser.userid + "|/html " + winner.name + ": " + winnerPoints + " --> " + winnerFinalPoints + "<br>" + loser.name + ": " + loserPoints + " --> " + loserFinalPoints);
		}
	}
}

function newSearch(user, gameTypeId) {
	for (let search in Rooms.global.RPS.searches) {
		if (Rooms.global.RPS.searches[search] === gameTypeId) {
			//same ip check
			if (Users.get(search).latestIp === user.latestIp && gameTypeId === "ladder") continue;
			delete Rooms.global.RPS.searches[search];
			return new RPSGame(user, Users.get(search), gameTypeId);
		}
	}
	//no search found
	Rooms.global.RPS.searches[user.userid] = gameTypeId;
	return false;
}

function updateSearches() {
	let updatedSearches = {};
	for (let userid in Rooms.global.RPS.searches) {
		let user = Users.get(userid);
		if (user && user.connected) {
			//get user's latest userid
			updatedSearches[user.userid] = Rooms.global.RPS.searches[userid];
		} else {
			//return bucks if it's a search for bucks
			if (updatedSearches[userid] === "bucks") Db('money').set(userid, Db('money').get(userid, 0) + 3);
		}
	}
	Rooms.global.RPS.searches = updatedSearches;
}

exports.commands = {
	rps: {
		search: function (target, room, user) {
			if (user.RPSgame) return this.errorReply("You are already have a game/searching for a game of Rock/Paper/Scissors!");
			updateSearches();
			let gameType = "ladder";
			if (target && target === "bucks") {
				if (Db('money').get(user.userid, 0) >= 3) {
					gameType = "bucks";
					Db('money').set(user.userid, (Db('money').get(user.userid, 0) - 3));
				} else {
					return this.errorReply("You do not have enough bucks (3) to search for a game of Rock/Paper/Scissors for bucks.");
				}
			}
			user.RPSgame = "searching";
			newSearch(user, gameType);
			this.sendReply("You are now searching for a game of Rock/Paper/Scissors (" + gameType + ").");
		},
		endsearch: function (target, room, user) {
			if (!user.RPSgame || user.RPSgame !== "searching") return this.errorReply("You are not searching for a game of Rock/Paper/Scissors!");
			updateSearches();
			if (Rooms.global.RPS.searches[user.userid] === "bucks") {
				Db('money').set(user.userid, Db('money').get(user.userid, 0) + 3);
			}
			delete Rooms.global.RPS.searches[user.userid];
			user.RPSgame = null;
			this.sendReply("You have cancelled your search for a game of Rock/Paper/Scissors.");
		},
		choose: function (target, room, user) {
			if (!target || !user.RPSgame) return false;
			let parts = target.split(" ");
			if (parts.length !== 2) return false;
			let choice = parts[0].toUpperCase();
			let gameId = parts[1];
			if (gameId !== user.RPSgame) return false;
			if (["R", "P", "S"].indexOf(choice) === -1) return false;
			if (Rooms.global.RPS.games[gameId]) {
				Rooms.global.RPS.games[gameId].onChoose(user, choice);
			}
		},
		rank: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			target = (toId(target) ? (Users.get(target) ? Users.get(target).name : target) : user.name);
			let userRank = Db('rpsrank').get(toId(target), 1000);
			this.sendReplyBox('<b><font color="' + color(target) + '">' + target + '</font></b>\'s RPS rank is: ' + userRank);
		},
		ladder: function (target, room, user) {
			if (!this.runBroadcast()) return false;
			let keys = Object.keys(Db('rpsrank').object()).map(function (name) {
				return {name: name, points: Db('rpsrank').get(name)};
			});
			if (!keys.length) return this.sendReplyBox("RPS ladder is empty.");
			keys.sort(function (a, b) { return b.points - a.points; });
			this.sendReplyBox(rankLadder('Rock/Paper/Scissors Ladder', 'RPS Points', keys.slice(0, 100), 'points'));
		},
		'': 'help',
		help: function (target, room, user) {
			this.parse('/help rps');
		},
	},
	rpshelp: ["/rps search (bucks) - searches for a game of Rock/Paper/Scissors either for ladder points or for bucks.",
		"/rps endsearch - stop searching for a game of Rock/Paper/Scissors.",
		"/rps rank [user] - shows rank for Rock/Paper/Scissors for either a user or yourself.",
		"/rps ladder - shows top 100 on the RPS ladder."],
};
