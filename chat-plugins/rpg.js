// rpg.js

var Data = require('./rpg_data');
var Calc = Data.Calc;


// event emitter handles dungeon loss and shit
// use a callback

var dungeons = {};
var battles = {};

/**
 * Creates an image element.
 * All parameters are strings.
 */
function img(src, title, style, attributes) {
  if (!title) title = "";
  if (!style) style = "";
  if (!attributes) attributes = "";
  return "<img src='" + src  + "' title='" + title + "' style='" + style + "' " + attributes + ">";
}

/**
 * Creates a element.
 * All parameters are strings.
 */
function tag(name, content, attributes) {
  if (!attributes) attributes = "";
  return "<" + name + " " + attributes + ">" + content + "</" + name + ">";
}

/**
 * RPG Visuals.
 */
var View = {
  // scale images
  startBattle: function (user, opp) {
    var userVisual =  img(user.avatar, user.name, null, "align:'left");
    var oppVisual =  img(opp.avatar, opp.name, "margin-left:2em");
    this.send(tag("center", tag("h1", "A new battle has started!") + userVisual + tag("b", "VS") +  oppVisual));
  },

  battleTurn: function (context) {
    this.send(tag("div", tag("h1", context.turn) + img(context.opp.avatar, context.opp.name), "style:'float:right'"));
  },

  move: function (src, target, move, damage) {
    this.send(src.name + " use " + move + "! " + target.name + " loss " + damage + " of health and now has " + target.health + " left.");
  }
};

/**
 * RPG Battle.
 *
 * @param {object} context
 * @param {object} player
 * @param {object} opponent
 * @param {boolean} isDungeonOver
 */
function Battle(context, player, opponent, isDungeonOver) {
  this.player = player;
  this.opp = opponent;
  this.turn = 0;
  // waiting for user to make a move then make the opponent move
  this.await = false;
  this.isDungeonOver = isDungeonOver;

  View.send = function (content) {
    context.sendReplyBox.call(context, content);
  };

  View.startBattle(player, this.opp);

  this.nextTurn();
}

Battle.prototype.isOver = function() {
  if (this.player.health <= 0 || this.opp.health <= 0) {
      delete battles[this.player.userid];
      console.log(battles);
      var winner = this.player.health > this.opp.health ? this.player.name : this.opp.name;
      if (winner === this.player.name) this.earnExp();
      //View.endBattle();
      View.send('it is over! ' + winner + ' has won!');
      if (this.isDungeonOver) delete dungeons[this.player.userid];
      return true;
  } else {
      return false;
  }
};

Battle.prototype.nextTurn = function() {
  this.turn++;

  View.battleTurn(this);
  if (this.player.speed > this.opp.speed) {
    this.await = true;
  } else {
    this.handleOpponent();
  }
};

Battle.prototype.handleOpponent = function() {
  var move = this.opp.moves[Data.getRandomInt(0, this.opp.moves.length - 1)]
  this.choose('opp', 'player', move);
};

Battle.prototype.choose = function(src, target, move, next) {
  var dmg = Calc[move](this[src], this[target]);
  if (dmg < 0) dmg = 0;
  this[target].health -= dmg;
  View.move(this[src], this[target], move, dmg);
  if (this.isOver()) return;
  if (this.await) {
    this.await = false;
    this.handleOpponent();
  }
  if (next) this.nextTurn();
};

Battle.prototype.earnExp = function() {
  var level = {
    1: 100,
    2: 210,
    3: 300
  };
  // calculate exp earned based on dungeon
  this.player.exp += 100;
  // do level up and shit here if the meet the levels exp measure
  // call the view to say how much exp they earned and if they level up or not
  // do database stuff here
};

exports.commands = {
  // maybe after a battle use event emitter to tell status of a dungeon
  dungeon: function (target, room, user) {
    if (dungeons[user.userid]) return this.errorReply("You are already in the " + dungeons[user.userid].name + " dungeon.");
    if (Data.dungeons.indexOf(toId(target)) < 0) return this.errorReply("This dungeon does not exist.");
    dungeons[user.userid] = {name: toId(target), count: 1};
    this.sendReply("|raw|<b>You have enter the <i>" + target + "</i> dungeon.</b>");
  },

  startbattle: function (target, room, user) {
    if (!dungeons[user.userid]) return this.errorReply("You are not in a dungeon.");
    if (battles[user.userid]) return this.errorReply("You are already in a battle.");
    Database.read('rpg', user.userid, function (err, data) {
      if (err) throw err;
      if (!data) {
        var defaultUser = Data.baseCharacter();
        defaultUser.avatar = 'http://play.pokemonshowdown.com/sprites/trainers/' + user.avatar + '.png';
        defaultUser.userid = user.userid;
        defaultUser.name = user.name;
        var dungeon = Data.dungeon[dungeons[user.userid].name];
        if (dungeons[user.userid].count === 3) {
          dungeon.forEach(function (monster) {
            if (monster.indexOf('boss') < 0) return;
            battles[user.userid] = new Battle(this, defaultUser, Data.boss[monster.split(':')[1]](), true);
          }.bind(this));
        } else {
          var monsters = dungeon.filter(function (monster) {
            return monster.indexOf('minion') >= 0;
          }).map(function (monster) {
            return monster.split(':')[1];
          });
          var rng = Math.floor(Math.random() * monsters.length);
          dungeons[user.userid].count++;
          battles[user.userid] = new Battle(this, defaultUser, Data.minion[monsters[rng]]());
        }
      }
    }.bind(this));
  },

  c: function (target, room, user) {
    if (!battles[user.userid]) return this.errorReply("You are not in a battle.");
    if (battles[user.userid].player.moves.indexOf(toId(target)) < 0) return this.errorReply("You do not have this move.");
    battles[user.userid].choose('player', 'opp', toId(target), true);
  },

  h: function (target, room, user) {
    this.parse('/hotpatch chat');
  }
};
