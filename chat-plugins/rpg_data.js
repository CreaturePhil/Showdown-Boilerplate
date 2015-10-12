// rpg_data.js

var Data = {};

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 * All parameters are numbers.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

Data.getRandomInt = getRandomInt;

Data.Calc = {
  darkpoo: function (src, target) {
    return this.hit(src, target) * 3;
  },

  hit: function (src, target) {
    var dmg = getRandomInt(Math.floor(target.defense / 2), target.defense);
    if (dmg < 0) dmg = 0;
    return src.attack - dmg;
  }
};

Data.dungeon = {
  dark: ['minion:bandi', 'minion:princesshigh', 'boss:stevo']
};

Data.dungeons = Object.keys(Data.dungeon);

Data.baseCharacter = function () {
  return { health: 10, mana: 0, attack: 10, defense: 10, speed: 10, weapon: 'wood sword', moves: ['hit'], level: 1, exp: 0 };
};

Data.boss = {
  stevo: function () {
    return { name: 'StevoDuhHero', avatar: 'http://i.imgur.com/dd69y4W.png', description: 'A powerful human being that became a pokemon called swalot.',
             health: 18, mana: 0, attack: 8, defense: 11, speed: 5, weapon: 'chopstick', moves: ['hit', 'darkpoo'] };
  }
};

// scale images
Data.minion = {
  bandi: function () {
    return { name: 'bandi', avatar: 'http://i.imgur.com/MGjFaMm.png', description: 'Some kind of shit user.',
             health: 5, mana: 0, attack: 3, defense: 0, speed: 8, weapon: 'chopstick', moves: ['hit'] };
  },
  princesshigh: function () {
    return { name: 'PrincessHigh', avatar: 'http://i.imgur.com/4Z4AlDu.gif', description: 'Hard Hitting Bitch',
             health: 1, mana: 0, attack: 13, defense: 5, speed: 11, weapon: 'chopstick', moves: ['hit'] };
  }
};

module.exports = Data;
