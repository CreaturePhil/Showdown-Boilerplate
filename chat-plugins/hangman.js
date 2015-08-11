var hangedMan =
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_______&nbsp;<br />" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|/&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(_)<br/>" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;\\|/<br/>" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;\\<br/>" +
"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|<br/>" +
"___|___&nbsp;<br/>";

exports.commands = {
	hang: 'hangman',
	hangman: function (target, room, user) {
		if (!this.canTalk()) return this.sendReply("You are unable to talk in this room.");
		if (!target) target = 'view';
		var cmd = (~target.indexOf(',') ? target.substr(0, target.indexOf(',')) : target).trim();
		var targetSplit = target.split(',');
		for (var u in targetSplit) targetSplit[u] = targetSplit[u].trim();

		switch (cmd) {
		case 'help':
			if (!this.canBroadcast()) return false;
			this.sendReplyBox(
				"<b>Hangman commands:</b> <br />" +
				"- /hang command - Short alias for /hangman.<br />" +
				"- /hangman new/create/start, [word], [topic] - Creates a game of hangman.<br />" +
				"- /hangman view - Shows the current state of the hangman game.<br />" +
				"- /hangman topic/changetopic, [newtopic] - Changes the topic of the hangman game.<br />" +
				"- /hangman word - View the current word.<br />" +
				"- /hangman guess, [letter] - Guess a letter. Alias: /g<br />" +
				"- /hangman guessword, [word] - Guess the word. Alias: /gw<br />" +
				"- /hangman enable/disable - Enables/disables hangman in the current room."
			);
			break;
		case 'new':
		case 'start':
		case 'create':
			if (!user.can('broadcast', null, room)) return this.sendReply("/hangman create - Access denied.");
			if (!room.hangmanEnabled) return this.sendReply("Hangman is disabled in this room.");
			if (!targetSplit || !targetSplit[2]) return this.sendReply("Usage: /hangman [create], [word], [topic]");
			var word = toId(targetSplit[1]);
			if (!word || word.length < 2) return this.sendReply("Hangman must have more than 2 characters.");
			word = word.replace(/[^a-z]+/g, '');
			if (word.length > 10) return this.sendReply("Words may not be longer than 10 characters.");
			targetSplit.splice(0, 2);
			var topic = targetSplit.join(' ');
			if (topic.length > 30) return this.sendReply("The topic may not be longer than 30 characters.");

			room.hangman = {};
			room.hangman.word = word;
			room.hangman.topic = topic;
			room.hangman.hangmaner = user.userid;
			room.hangman.guessWord = [];
			room.hangman.guessedLetters = [];
			room.hangman.guessedWords = [];
			room.hangman.guesses = 8;

			for (var i = 0; i < word.length; i++) {
				room.hangman.guessWord.push('_');
			}
			room.add(
				"|raw|<div class =\"infobox\"><div class=\"broadcast-green\"><center><font size=2><b>" + Tools.escapeHTML(user.name) +
				"</b> started a game of hangman! The word has <b>" + word.length + "</b> letters.<br />" + room.hangman.guessWord.join(" ") +
				"<br />Topic: " + Tools.escapeHTML(room.hangman.topic) + "</font><br>" +
				"Use <b>/g <i>letter</i></b> to guess a letter or <b>/gw <i>word</i></b> to guess a word</div></div>"
			);
			room.update();
			break;
		case 'view':
			if (!room.hangman) return this.sendReply("There's no game of hangman in this room.");
			if (!this.canBroadcast()) return;
			this.sendReplyBox(
				"<center><font size=2>" + room.hangman.guessWord.join(" ") + "<br />Guesses left: " + room.hangman.guesses +
				"<br />Topic: " + Tools.escapeHTML(room.hangman.topic) + "</font></center>"
			);
			break;
		case 'topic':
		case 'changetopic':
			if (!room.hangman) return this.sendReply("There's no game of hangman in this room.");
			if (user.userid !== room.hangman.hangmaner) return this.sendReply("You can't change the topic if you're not running hangman.");
			if (!targetSplit || !targetSplit[1]) return this.sendReply("Usage: /hangman [topic], [newtopic]");
			targetSplit.splice(0, 1);
			var topic = targetSplit.join(' ');
			if (topic.length > 30) return this.sendReply("The topic may not be longer than 30 characters.");

			room.hangman.topic = topic;
			room.add("<div class=\"infobox\">The hangman topic has been changed to '" + Tools.escapeHTML(topic) + "'.");
			room.update();
			break;
		case 'word':
		case 'viewword':
			if (!room.hangman) return this.sendReply("There's no game of hangman in this room.");
			if (user.userid !== room.hangman.hangmaner) return this.sendReply("You're not the user who started this game.");
			this.sendReply("Your word is '" + room.hangman.word + "'.");
			break;
		case 'guess':
			if (!room.hangman) return this.sendReply("There's no game of hangman in this room.");
			if (user.userid === room.hangman.hangmaner) return this.sendReply("You can't guess a letter because you're running hangman.");
			if (!targetSplit || !targetSplit[1]) return this.sendReply("Usage: /hangman [guess], [letter]");
			if (targetSplit[1].length > 1) return this.sendReply("Please specify a letter to guess. To guess the word use /hangman [guessword], [word]");
			var letter = targetSplit[1];
			if (~room.hangman.guessedLetters.indexOf(letter)) return this.sendReply("Someone has already guessed that letter.");
			var found = false;
			room.hangman.guessedLetters.push(letter);

			for (var u in room.hangman.word) {
				if (room.hangman.word[u] === letter) {
					room.hangman.guessWord[u] = room.hangman.word[u];
					found = true;
				}
			}

			room.hangman.guesses--;

			if (found) {
				if (!~room.hangman.guessWord.indexOf('_')) {
					room.add("|raw|<div class=\"infobox\">Congratulations! <b>" + Tools.escapeHTML(user.name) + "</b> has guessed the word, which was: <b>" + room.hangman.word + "</b></div>");
					room.update();
					delete room.hangman;
					return;
				}

				room.add("|raw|<div class=\"infobox\">" + Tools.escapeHTML(user.name) + " guessed the letter '" + letter + "'<br />Word: " + room.hangman.guessWord.join(' ') + "</div>");
				room.update();
				return;
			}

			if (room.hangman.guesses < 1) {
				room.add(
					"|raw|<div class=\"infobox\"><b>" + Tools.escapeHTML(user.name) + "</b> guessed the letter '" + letter + "', but it was not in the word.<br />" +
					"You have failed to guess the word, so the man has been hanged.<br />" +
					"The word was '" + room.hangman.word + "'.<br />" + hangedMan + "</div>"
				);
				room.update();
				delete room.hangman;
				return;
			}

			room.add("|raw|<div class=\"infobox\"><b>" + Tools.escapeHTML(user.name) + "</b> guessed the letter '" + letter + "' but it was not in the word.<br />Guesses left: " + room.hangman.guesses + "</div>");
			room.update();
			break;
		case 'guessword':
			if (!room.hangman) return this.sendReply("There's no game of hangman in this room.");
			if (user.userid === room.hangman.hangmaner) return this.sendReply("You can't guess the word because you're running hangman.");
			if (!targetSplit || !targetSplit[1]) return this.sendReply("Usage: /hangman [guessword], [word]");
			if (targetSplit[1].length !== room.hangman.word.length) return this.sendReply("You can't guess a word that doesn't match the length of the hangman word.");
			var word = targetSplit[1];
			if (~room.hangman.guessedWords.indexOf(word.toLowerCase())) return this.sendReply("That word has already been guessed.");
			room.hangman.guessedWords.push(word.toLowerCase());
			room.hangman.guesses--;

			if (word.toLowerCase() === room.hangman.word.toLowerCase()) {
				room.add("|raw|<div class=\"infobox\">Congratulations! <b>" + Tools.escapeHTML(user.name) + "</b> guessed the word, which was: " + room.hangman.word + "</div>");
				room.update();
				delete room.hangman;
				return;
			}

			if (room.hangman.guesses < 1) {
				room.add(
					"|raw|<div class=\"infobox\"><b>" + Tools.escapeHTML(user.name) + "</b> guessed the word '" + Tools.escapeHTML(word) +
					"', but it was not the word. You have failed to guess the word, so the man has been hanged.<br />" + hangedMan
				);
				room.update();
				delete room.hangman;
				return;
			}

			room.add("|raw|<div class=\"infobox\"><b>" + Tools.escapeHTML(user.name) + "</b> guessed the word '" + word + "' but it was not in the word.<br />Guesses left: " + room.hangman.guesses + "</div>");
			room.update();
			break;
		case 'on':
		case 'enable':
			if (!user.can('roommod', null, room)) return this.sendReply("/hangman on - Access denied.");
			if (room.hangmanEnabled) return this.sendReply("Hangman is already enabled in this room.");
			room.hangmanEnabled = true;
			room.chatRoomData.hangmanEnabled = true;
			Rooms.global.writeChatRoomData();
			this.sendReply("Hangman has been enabled.");
			break;
		case 'off':
		case 'disable':
			if (!user.can('roommod', null, room)) return this.sendReply("/hangman off - Access denied.");
			if (!room.hangmanEnabled) return this.sendReply("Hangman is already disabled in this room.");
			room.hangmanEnabled = false;
			room.chatRoomData.hangmanEnabled = false;
			Rooms.global.writeChatRoomData();
			this.sendReply("Hangman has been disabled.");
			break;
		case 'end':
			if (!user.can('broadcast', null, room)) return this.sendReply("/hangman end - Access denied.");
			if (!room.hangman) return this.sendReply("There is no hangman game in this room.");
			room.add("|raw|<b>Hangman has been ended by " + Tools.escapeHTML(user.name) + "</b>.");
			room.update();
			delete room.hangman;
			break;
		}
	},

	g: function (target, room, user) {
		this.parse('/hangman guess,' + target);
	},

	gw: function (target, room, user) {
		this.parse('/hangman guessword,' + target);
	}
};
