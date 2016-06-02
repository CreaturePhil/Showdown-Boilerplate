'use strict';
/*
    UNO Game for PS
    by sparkychild
*/
//data for all rooms
global.UNO = {};
//for each room
const deck = ["R1",
	"R2",
	"R3",
	"R4",
	"R5",
	"R6",
	"R7",
	"R8",
	"R9",
	"RS",
	"RR",
	"R+2",
	"W+4",
	"Y1",
	"Y2",
	"Y3",
	"Y4",
	"Y5",
	"Y6",
	"Y7",
	"Y8",
	"Y9",
	"YS",
	"YR",
	"Y+2",
	"W+4",
	"G1",
	"G2",
	"G3",
	"G4",
	"G5",
	"G6",
	"G7",
	"G8",
	"G9",
	"GS",
	"GR",
	"G+2",
	"W+4",
	"B1",
	"B2",
	"B3",
	"B4",
	"B5",
	"B6",
	"B7",
	"B8",
	"B9",
	"BS",
	"BR",
	"B+2",
	"W+4",
	"R1",
	"R2",
	"R3",
	"R4",
	"R5",
	"R6",
	"R7",
	"R8",
	"R9",
	"RS",
	"RR",
	"R+2",
	"WW",
	"R0",
	"Y1",
	"Y2",
	"Y3",
	"Y4",
	"Y5",
	"Y6",
	"Y7",
	"Y8",
	"Y9",
	"YS",
	"YR",
	"Y+2",
	"WW",
	"Y0",
	"G1",
	"G2",
	"G3",
	"G4",
	"G5",
	"G6",
	"G7",
	"G8",
	"G9",
	"GS",
	"GR",
	"G+2",
	"WW",
	"G0",
	"B1",
	"B2",
	"B3",
	"B4",
	"B5",
	"B6",
	"B7",
	"B8",
	"B9",
	"BS",
	"BR",
	"B+2",
	"WW",
	"B0",
];
const drawButton = '<center><button style="background: black; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 56px ; border-radius: 5px , auto" name="send" value="/uno draw"><font color="white">Draw</font></button></center>';
const passButton = '<center><button style="background: red; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 56px ; border-radius: 5px , auto" name="send" value="/uno pass"><font color="white">PASS</font></button></center>';

function buildCard(id) {
	let colourTable = {
		"R": "red",
		"Y": "yellow",
		"B": "blue",
		"G": "green",
		"W": "black",
	};
	let colour = colourTable[id.charAt(0)];
	let value = id.slice(1);
	let fontColour = colour === "yellow" ? "black" : "white";
	let command = "/uno play " + id;
	let buttonFace = value === "W" ? '<font color="red" size=4>W</font><font color="yellow" size=4>i</font><font color="blue" size=4><b>l</b></font><font color="green" size=4><b>d</b></font>' : '<font color="' + fontColour + "\" size=6>" + value + "</font>";
	let button = "<button style=\"background: " + colour + "; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; height: 80px ; width: 56px ; border-radius: 5px , auto\" name=\"send\" value=\"" + command + "\">" + buttonFace + "</button>";
	return button;
}

function getCard(id) {
	let colourTable = {
		"R": "red",
		"Y": "yellow",
		"B": "blue",
		"G": "green",
		"W": "black",
	};
	let colour = colourTable[id.charAt(0)];
	let value = id.slice(1);
	let fontColour = colour === "yellow" ? "black" : "white";
	let buttonFace = value === "W" ? '<font color="red" size=4>W</font><font color="yellow" size=4>i</font><font color="blue" size=4><b>l</b></font><font color="green" size=4><b>d</b></font>' : '<font color="' + fontColour + "\" size=6>" + value + "</font>";
	let button = "<button style=\"background: " + colour + "; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; height: 80px ; width: 56px ; border-radius: 5px , auto\">" + buttonFace + "</button>";
	return button;
}

function buildHand(array) {
	let hand = [];
	array.sort(function (a, b) {
		if (a.replace("W", "Z").replace("R", "A").replace("Y", "C").replace("B", "D") > b.replace("W", "Z").replace("R", "A").replace("Y", "C").replace("B", "D")) return 1;
		return -1;
	}).forEach(function (c) {
		hand.push(buildCard(c));
	});
	return hand.join("&nbsp;");
}

function getCardArray(array) {
	let hand = [];
	array.sort(function (a, b) {
		if (a.replace("W", "Z").replace("R", "A").replace("Y", "C").replace("B", "D") > b.replace("W", "Z").replace("R", "A").replace("Y", "C").replace("B", "D")) return 1;
		return -1;
	}).forEach(function (c) {
		hand.push(getCard(c));
	});
	return hand.join("&nbsp;");
}

function getTopCard(roomid) {
	if (!UNO[roomid] || !UNO[roomid].top) return "UH OH!";
	let colourTable = {
		"R": "red",
		"Y": "yellow",
		"B": "blue",
		"G": "green",
	};
	return getCard(UNO[roomid].top) + (UNO[roomid].change ? "<br>Change to: <font color=\"" + colourTable[UNO[roomid].change] + "\">" + colourTable[UNO[roomid].change].toUpperCase() + "</font>" : "");
}

function buildGameScreen(user, roomid, hand, uhtmlid, message, pass) {
	let html = (message ? "|uhtmlchange|" + uhtmlid : "|uhtml|" + uhtmlid) + "|";
	let topCard = "<center>" + getTopCard(roomid) + "</center>";
	let yourHand = buildHand(hand);
	message = message ? "<font color=\"red\"><b>" + message + "</b></font>" : "";
	return html + "<table border=1 style=\"border-collapse: collapse;\"><tr><td>&nbsp;<b>Top Card</b>&nbsp;</td><td>&nbsp;<b>Your Hand</b>&nbsp;</td></tr>" + "<tr><td>" + topCard + "</td><td>" + yourHand + "</td></tr><tr><td>" + (pass ? passButton : drawButton) + "</td><td>" + message + "</td></tr></table>";
}

function getColourChange(buffer, hand, id) {
	return "|uhtmlchange|" + id + "|<table border=1 style=\"border-collapse: collapse;\"><tr><td>Choose which colour to change to:<br>" + '<button style="background: red; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' R"><font color="white" size=4>Red</font></button></center>' + '<button style="background: yellow; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' Y"><font color="black" size=4>Yellow</font></button></center>' + '<button style="background: blue; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' B"><font color="white" size=4>Blue</font></button></center>' + '<button style="background: green; border: 2px solid rgba(33 , 68 , 72 , 0.59) ; width: 80px ; border-radius: 5px , auto" name="send" value="' + buffer + ' G"><font color="white" size=4>Green</font></button></td></tr>' + '<tr><td>Your Cards: <br>' + getCardArray(hand) + '</td></tr></table>';
}

function getCardName(id) {
	let colourTable = {
		"R": "red",
		"Y": "orange",
		"B": "blue",
		"G": "green",
		"W": "black",
	};
	let colour = colourTable[id.charAt(0)];
	let cardName = id.replace(/^R/i, "Red ").replace(/^B/i, "Blue ").replace(/^Y/i, "Yellow ").replace(/^G/i, "Green ").replace("W+4", "Wild Draw Four").replace("WW", "Wildcard");
	return "<font color=\"" + colour + "\">" + cardName + "</font>";
}

function invertArray(array) {
	let buffer = [];
	for (let i = array.length - 1; i >= 0; i--) {
		buffer.push(array[i]);
	}
	return buffer;
}

function initTopCard(roomid) {
	UNO[roomid].top = UNO[roomid].deck.shift();
	UNO[roomid].discard.push(UNO[roomid].top);
}

function playVerifier(topCard, card, hand, change, special) {
	//this function returns false if there is nothing wrong;
	if (special) {
		if (card !== special) return "You have to play the card you drew last! (" + special.replace(/^R/i, "Red ").replace(/^B/i, "Blue ").replace(/^Y/i, "Yellow ").replace(/^G/i, "Green ").replace("W+4", "Wild Draw Four").replace("WW", "Wildcard") + ")";
	}
	let currentColour = change || topCard.charAt(0);
	let currentValue = topCard.slice(1);
	if (hand.indexOf(card) === -1) return "You do not have that card!";
	if (card === "W+4") {
		for (let i = 0; i < hand.length; i++) {
			if (hand[i].charAt(0) === currentColour) return "You cannot play this when you still have a card with the same colour as the top card.";
		}
		return false;
	}
	if (card === "WW") return false;
	if (card.charAt(0) === currentColour || card.slice(1) === currentValue) return false;
	return "The card has to either match the top card's colour or face value.";
}

function destroy(roomid) {
	delete UNO[roomid];
}

function verifyAlts(id, users) {
	let user = Users(id);
	for (let i = 0; i < users.length; i++) {
		if (Users(users[i]).latestIp === user.latestIp) {
			return false;
		}
	}
	return true;
}

function initDeck(playerCount) {
	playerCount = Math.ceil(playerCount / 7);
	let tDeck = [];
	for (let i = 0; i < playerCount; i++) {
		tDeck = tDeck.concat(deck);
	}
	return tDeck;
}

function shuffleDeck(dArray) {
	let tDeck = [];
	let reiterations = dArray.length;
	for (let i = 0; i < reiterations; i++) {
		let rand = ~~(dArray.length * Math.random());
		tDeck.push(dArray[rand]);
		dArray.splice(rand, 1);
	}
	return tDeck;
}

function receiveCard(userid, roomid, times, display) {
	if (!times) times = 1;
	let newCards = [];
	for (let i = 0; i < times; i++) {
		let newCard = UNO[roomid].deck.shift();
		UNO[roomid].data[userid].push(newCard);
		newCards.push(newCard);
		if (UNO[roomid].deck.length === 0) {
			if (UNO[roomid].discard.length === 0) UNO[roomid].discard = initDeck(1);
			UNO[roomid].deck = shuffleDeck(UNO[roomid].discard);
			UNO[roomid].discard = [];
		}
	}
	if (display) Users(userid).sendTo(roomid, "|raw|You received the following card(s): " + getCardArray(newCards));
	return newCards;
}

function getNextPlayer(roomid, number) {
	//number is number to go; 2 is skipping the next one;
	if (!number) number = 1;
	let list = UNO[roomid].list;
	let playerList = list.concat(list);
	let current = UNO[roomid].player;
	let index = playerList.indexOf(current);
	UNO[roomid].player = playerList[index + number];
}

function applyEffects(context, roomid, userid, card, init) {
	let effect = card.slice(1);
	switch (effect) {
	case "R":
		UNO[roomid].list = invertArray(UNO[roomid].list);
		if (init) {
			context.add("The direction has been switched!");
			break;
		} else if (UNO[roomid].list.length === 2) {
			getNextPlayer(roomid);
		} else {
			getNextPlayer(roomid, 2);
		}
		context.add("The direction has been switched!");
		break;
	case "S":
		getNextPlayer(roomid);
		context.add((Users(userid) ? Users(userid).name : userid) + "'s turn has been skipped!");
		break;
	case "+2":
		receiveCard(userid, roomid, 2, true);
		context.add((Users(userid) ? Users(userid).name : userid) + "'s turn has been skipped, and is forced to draw 2 cards!");
		getNextPlayer(roomid);
		break;
	case "+4":
		receiveCard(userid, roomid, 4, true);
		context.add((Users(userid) ? Users(userid).name : userid) + "'s turn has been skipped, and is forced to draw 4 cards!");
		getNextPlayer(roomid);
		break;
	}
}

function runDQ(context, roomid) {
	UNO[roomid].timer = setTimeout(function () {
		let currentPlayer = UNO[roomid].player;
		getNextPlayer(roomid);
		UNO[roomid].list.splice(UNO[roomid].list.indexOf(currentPlayer), 1);
		Users(currentPlayer).sendTo(roomid, "|uhtmlchange|" + UNO[roomid].rand.toString() + UNO[roomid].id + "|");
		delete UNO[roomid].data[currentPlayer];
		UNO[roomid].lastDraw = null;
		if (UNO[roomid].list.length === 1) {
			let finalPlayer = Users(UNO[roomid].player) ? Users(UNO[roomid].player).name : UNO[roomid].player;
			context.add(UNO[roomid].lastplay);
			context.add("|raw|<b>" + finalPlayer + "</b> has won the game!");
			if (UNO[roomid].pot) {
				let winnings = UNO[roomid].start * UNO[roomid].pot;
				Db("money").set(toId(finalPlayer), Db("money").get(toId(finalPlayer), 0) + winnings);
				this.add(finalPlayer + " has won " + winnings + " bucks!");
			}
			Rooms(roomid).update();
			clearDQ(roomid);
			destroy(roomid);
			return false;
		} else {
			initTurn(context, roomid);
		}
	}, 90000);
}

function clearDQ(roomid) {
	clearTimeout(UNO[roomid].timer);
}

function initTurn(context, roomid, repost) {
	let currentPlayer = UNO[roomid].player;
	UNO[roomid].id++;
	let playerName = Users(currentPlayer) ? Users(currentPlayer).name : currentPlayer;
	//announce the turn
	if (!repost) {
		context.add("|raw|" + playerName + "'s turn!");
		UNO[roomid].lastDraw = null;
		runDQ(context, roomid);
	}
	Rooms(roomid).update();
	//show the card control center
	let CCC = buildGameScreen(currentPlayer, roomid, UNO[roomid].data[currentPlayer], UNO[roomid].rand.toString() + UNO[roomid].id);
	Users(currentPlayer).sendTo(roomid, CCC);
}
/*
- top (top card);
- data (playerdata);
- list (playerlist);
- player (current player)
- change (what it's changed to);
- id (for checking the id for uhtml and uhtmlchange)
- deck (list of cards still to be drawn)
- discard (discard pile, for the purpose of shuffling)
- pot (gaming for bucks)
- timer (autodq)
*/

exports.commands = {
	uno: function (target, room, user) {
		if (!target) target = " ";
		let parts = target.split(" ");
		let action = parts.shift();
		let userid = user.userid;
		let roomid = room.id;
		let self = this;
		switch (action) {
		case "new":
			if (!this.can("mute", null, room)) return false;
			if (UNO[roomid]) return this.errorReply("There is already a game going on.");
			let pot = null;
			if (parseInt(parts[0])) {
				pot = parseInt(parts[0]);
			}
			UNO[roomid] = {
				top: null,
				data: {},
				list: [],
				player: null,
				start: false,
				change: null,
				id: 0,
				deck: null,
				discard: [],
				"pot": pot && pot > 0 ? pot : null,
				timer: null,
				rand: ~~(Math.random() * 1000000),
				lastDraw: null,
				passed: false,
				postuhtml: 0,
				lastplay: null,
			};
			if (pot && room.id !== 'uno') return this.errorReply('You cannot start a game with bets in rooms besides Uno');
			if (Db('money').get(user.userid, 0) < pot) return this.errorReply('You cannot start a game with a pot that has more bucks than you.');
			this.add("|raw|<center><img src=\"http://www.theboardgamefamily.com/wp-content/uploads/2010/12/uno-mobile-game1.jpg\" height=300 width=320><br><br><b>A new game of UNO is starting!</b><br><br><button style=\"height: 30px ; width: 60px ;\" name=\"send\" value=\"/uno join\">Join</button></center>");
			if (pot) {
				this.add("|raw|<br><center><font color=\"red\"><b>You will need " + pot + " bucks to join this game.</b></font></center>");
			}
			this.privateModCommand(user.name + " has created a game of UNO");
			break;
		case "join":
			if (!UNO[roomid] || UNO[roomid].start) return false;
			if (!verifyAlts(userid, UNO[roomid].list) || UNO[roomid].list.indexOf(userid) > -1) return this.errorReply("You already have an alt joined.");
			if (UNO[roomid].list.length >= 30) return this.errorReply('There cannot be more than 30 players');
			if (UNO[roomid].pot) {
				if (Db("money").get(userid, 0) < UNO[roomid].pot) return this.errorReply("You do not have enough bucks to join.");
				Db("money").set(userid, Db("money").get(userid, 0) - UNO[roomid].pot);
			}
			UNO[roomid].list.push(userid);
			UNO[roomid].data[userid] = [];
			this.add(user.name + " has joined the game!");
			break;
		case "leave":
			if (!UNO[roomid] || UNO[roomid].start) return false;
			if (!UNO[roomid].data[userid]) return false;
			if (UNO[roomid].pot) return this.errorReply("You cannot leave a game with bucks involved.");
			UNO[roomid].list.splice(UNO[roomid].list.indexOf(userid), 1);
			delete UNO[roomid].data[userid];
			break;
		case "dq":
			if (!UNO[roomid] || !UNO[roomid].start) return false;
			let targetUser = toId(parts.join(" ") || " ");
			if (!targetUser) return false;
			if (!(targetUser in UNO[roomid].data) || !this.can("mute", null, room)) return;
			if (UNO[roomid].pot) return this.errorReply("You cannot disqualify players in a game with bucks involved.");
			if (UNO[roomid].list.length !== 2 && targetUser === UNO[roomid].player) {
				clearDQ(roomid);
				getNextPlayer(roomid);
				initTurn(this, roomid);
			}
			UNO[roomid].list.splice(UNO[roomid].list.indexOf(targetUser), 1);
			delete UNO[roomid].data[targetUser];
			this.add(targetUser + " has been disqualified!");
			if (UNO[roomid].list.length === 1) {
				this.add(UNO[roomid].list[0] + " has won!");
				clearDQ(roomid);
				destroy(roomid);
			}
			break;
		case "start":
			if (!UNO[roomid] || UNO[roomid].start) return this.errorReply("No game of UNO in this room to start");
			if (!this.can("mute", null, room)) return this.errorReply('You must be @ or higher to start a game');
			if (UNO[roomid].list.length < 2) return this.errorReply("There aren't enough players to start!");
			this.privateModCommand(user.name + " has started the game");
			//start the game!
			UNO[roomid].start = UNO[roomid].list.length;
			//create deck
			UNO[roomid].deck = shuffleDeck(initDeck(UNO[roomid].list.length));
			//deal the cards
			UNO[roomid].list.forEach(function (u) {
				receiveCard(u, room.id, 7);
			}); //get first player;
			UNO[roomid].player = UNO[roomid].list[~~(Math.random() * UNO[roomid].list)];
			let playerName = Users(UNO[roomid].player) ? Users(UNO[roomid].player).name : UNO[roomid].player;
			this.add("The first player is: " + playerName);
			//get top card
			initTopCard(roomid);
			while (UNO[roomid].top === "WW" || UNO[roomid].top === "W+4") {
				initTopCard(roomid);
			}
			//announce top card
			this.add("|uhtml|post" + UNO[roomid].postuhtml + "|<b>The top card is:</b> " + getCard(UNO[roomid].top));
			UNO[roomid].lastplay = "|uhtmlchange|post" + UNO[roomid].postuhtml + "|The top card is <b>" + getCardName(UNO[roomid].top) + "</b>";
			room.update();
			//add top card to discard pile
			//apply the effects if applicable;
			applyEffects(this, roomid, UNO[roomid].player, UNO[roomid].top);
			if (/R$/i.test(UNO[roomid].top)) getNextPlayer(roomid);
			//start the first turn!
			setTimeout(function () {
				initTurn(self, roomid);
			}, 200);
			break;
		case "play":
			if (!UNO[roomid] || !UNO[roomid].start || userid !== UNO[roomid].player) return false;
			let issues = playVerifier(UNO[roomid].top, parts[0], UNO[roomid].data[userid], UNO[roomid].change, UNO[roomid].lastDraw);
			if (issues) return user.sendTo(room, buildGameScreen(userid, roomid, UNO[roomid].data[userid], UNO[roomid].rand.toString() + UNO[roomid].id, issues, UNO[roomid].lastDraw));
			if (parts[0].charAt(0) === "W" && (!parts[1] || ["Y", "B", "G", "R"].indexOf(parts[1]) === -1)) return user.sendTo(roomid, getColourChange("/uno play " + parts[0], UNO[roomid].data[userid], UNO[roomid].rand.toString() + UNO[roomid].id));
			UNO[roomid].change = null;
			//apply colour change
			let colourChanged = false;
			let colourTable = {
				"R": "RED",
				"Y": "YELLOW",
				"B": "BLUE",
				"G": "GREEN",
				"W": "BLACK",
			};
			if (parts[0].charAt(0) === "W") {
				UNO[roomid].change = parts[1];
				colourChanged = true;
			}
			//make last card less spammy
			this.add(UNO[roomid].lastplay); //set current card and add to discard pile
			UNO[roomid].top = parts[0];
			UNO[roomid].discard.push(parts[0]);
			//remove card from ahnd
			UNO[roomid].data[userid].splice(UNO[roomid].data[userid].indexOf(parts[0]), 1);
			//set next player
			getNextPlayer(roomid);
			//apply the effects of the card
			applyEffects(this, roomid, UNO[roomid].player, parts[0]);
			//clear the previous timer
			clearDQ(roomid);
			user.sendTo(roomid, "|uhtmlchange|" + UNO[roomid].rand.toString() + UNO[roomid].id + "|");
			UNO[roomid].postuhtml++;
			this.add("|uhtml|post" + UNO[roomid].postuhtml + "|<b>" + user.name + " played </b> " + getCard(UNO[roomid].top));
			UNO[roomid].lastplay = "|uhtmlchange|post" + UNO[roomid].postuhtml + "|" + user.name + " played <b>" + getCardName(UNO[roomid].top) + "</b>";
			room.update();
			//check for a winner or UNO
			if (UNO[roomid].data[userid].length === 0) {
				//clear out last card
				this.add(UNO[roomid].lastplay);
				//announce winner
				this.add("|raw|<b>Congratulations to " + user.name + " for winning!</b>");
				//give pot
				if (UNO[roomid].pot) {
					let winnings = UNO[room].start * UNO[room].pot;
					Db("money").set(userid, Db("money").get(userid, 0) + winnings);
					this.add(user.name + " has won " + winnings + " bucks!");
				}
				room.update();
				//end game
				destroy(roomid);
				return;
			}
			if (UNO[roomid].data[userid].length === 1) {
				this.add("|raw|<font size=6><b>UNO!</b></font>");
			}
			if (colourChanged) this.add("|raw|<font color=\"" + colourTable[parts[1]].toLowerCase().replace("yellow", "orange") + "\">The colour has been changed to <b>" + colourTable[parts[1]] + "</b></font>.");
			setTimeout(function () {
				initTurn(self, roomid);
			}, 200);
			break;
		case "draw":
			if (!UNO[roomid] || !UNO[roomid].start || userid !== UNO[roomid].player) return false;
			if (UNO[roomid].lastDraw) return false;
			let receivedCards = receiveCard(userid, roomid);
			let CCC = buildGameScreen(userid, roomid, UNO[roomid].data[userid], UNO[roomid].rand.toString() + UNO[roomid].id, "You have drawn a " + receivedCards.join(" ").replace(/^R/i, "Red ").replace(/^B/i, "Blue ").replace(/^Y/i, "Yellow ").replace(/^G/i, "Green ").replace("W+4", "Wild Draw Four").replace("WW", "Wildcard") + " card", true);
			UNO[roomid].lastDraw = receivedCards.join("");
			Users(userid).sendTo(roomid, CCC);
			this.add("|raw|</b>" + user.name + "</b> has drawn a card!");
			room.update();
			break;
		case "display":
		case "repost":
			if (!UNO[roomid] || !UNO[roomid].start || userid !== UNO[roomid].player) return false;
			user.sendTo(roomid, "|uhtmlchange|" + UNO[roomid].rand.toString() + UNO[roomid].id + "|");
			initTurn(this, roomid, true);
			break;
		case "pass":
			if (!UNO[roomid] || !UNO[roomid].start || userid !== UNO[roomid].player) return false;
			if (!UNO[roomid].lastDraw) return false;
			this.add("|raw|</b>" + user.name + "</b> has passed!");
			user.sendTo(roomid, "|uhtmlchange|" + UNO[roomid].rand.toString() + UNO[roomid].id + "|");
			if (UNO[roomid].lastplay) {
				this.add(UNO[roomid].lastplay);
			}
			clearDQ(roomid);
			getNextPlayer(roomid);
			initTurn(this, roomid);
			room.update();
			break;
		case "end":
			if (!UNO[roomid] || !this.can("mute", null, room)) return false;
			if (UNO[roomid].pot && !this.can('ban')) return this.errorReply("You cannot end a game that is for bucks!");
			if (UNO[roomid].lastplay) this.add(UNO[roomid].lastplay);
			clearDQ(roomid);
			destroy(roomid);
			this.privateModCommand(user.name + " has ended the game");
			this.add("The game was forcibly ended.");
			room.update();
			break;
		case "getusers":
			if (!UNO[roomid]) return false;
			if (!this.canBroadcast()) return;
			this.sendReplyBox("Players: (" + UNO[roomid].list.length + ")<br />" + UNO[roomid].list.join(", "));
			break;
		default:
			if (UNO[roomid] && UNO[roomid].start && userid === UNO[roomid].player) return this.parse("/uno display");
			this.parse("/help uno");
			break;
		}
	},
	unohelp: ["/uno new (entrance fee) - starts a new game, with an optional fee + jackpot",
		"/uno start - starts the game",
		"/uno end - ends the game",
		"/uno dq [player] - disqualifies the player from the game",
		"Games with a bucks involved cannot be ended, and players can not be dq'd or leave from the game.",
	],
};
