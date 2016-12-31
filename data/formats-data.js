'use strict';

exports.BattleFormatsData = {
	bulbasaur: {
		randomBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "hiddenpowerice", "sludgebomb", "powerwhip", "leechseed", "synthesis"],
		randomDoubleBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "hiddenpowerice", "sludgebomb", "powerwhip", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["sweetscent", "growth", "solarbeam", "synthesis"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "growl", "leechseed", "vinewhip"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tackle", "growl", "leechseed", "vinewhip"]},
			{"generation": 5, "level": 1, "shiny": 1, "ivs": {"def": 31}, "isHidden": false, "moves":["falseswipe", "block", "frenzyplant", "weatherball"]},
			{"generation": 6, "level": 5, "isHidden": false, "moves":["growl", "leechseed", "vinewhip", "poisonpowder"], "pokeball": "cherishball"},
			{"generation": 6, "level": 5, "isHidden": true, "moves":["tackle", "growl", "celebrate"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	ivysaur: {
		randomBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "hiddenpowerice", "sludgebomb", "powerwhip", "leechseed", "synthesis"],
		randomDoubleBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "hiddenpowerice", "sludgebomb", "powerwhip", "protect"],
		tier: "Bank-NFE",
	},
	venusaur: {
		randomBattleMoves: ["sunnyday", "sleeppowder", "gigadrain", "hiddenpowerfire", "sludgebomb", "leechseed", "substitute"],
		randomDoubleBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "hiddenpowerice", "sludgebomb", "powerwhip", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 100, "isHidden": true, "moves":["solarbeam", "frenzyplant", "synthesis", "grasspledge"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	venusaurmega: {
		randomBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "sludgebomb", "leechseed", "synthesis", "earthquake", "knockoff"],
		randomDoubleBattleMoves: ["sleeppowder", "gigadrain", "hiddenpowerfire", "hiddenpowerice", "sludgebomb", "powerwhip", "protect"],
		requiredItem: "Venusaurite",
		tier: "Bank",
	},
	charmander: {
		randomBattleMoves: ["flamethrower", "overheat", "dragonpulse", "hiddenpowergrass", "fireblast"],
		randomDoubleBattleMoves: ["heatwave", "dragonpulse", "hiddenpowergrass", "fireblast", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "growl", "ember"]},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Mild", "moves":["return", "hiddenpower", "quickattack", "howl"], "pokeball": "cherishball"},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Naive", "moves":["return", "hiddenpower", "quickattack", "howl"], "pokeball": "cherishball"},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Naughty", "moves":["return", "hiddenpower", "quickattack", "howl"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["scratch", "growl", "ember", "smokescreen"]},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Hardy", "moves":["return", "hiddenpower", "quickattack", "howl"], "pokeball": "cherishball"},
			{"generation": 5, "level": 1, "shiny": 1, "ivs": {"spe": 31}, "isHidden": false, "moves":["falseswipe", "block", "blastburn", "acrobatics"]},
			{"generation": 6, "level": 5, "isHidden": false, "moves":["growl", "ember", "smokescreen", "dragonrage"], "pokeball": "cherishball"},
			{"generation": 6, "level": 5, "isHidden": true, "moves":["scratch", "growl", "celebrate"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	charmeleon: {
		randomBattleMoves: ["flamethrower", "overheat", "dragonpulse", "hiddenpowergrass", "fireblast", "dragondance", "flareblitz", "shadowclaw", "dragonclaw"],
		randomDoubleBattleMoves: ["heatwave", "dragonpulse", "hiddenpowergrass", "fireblast", "protect"],
		tier: "Bank-NFE",
	},
	charizard: {
		randomBattleMoves: ["fireblast", "airslash", "focusblast", "roost", "swordsdance", "flamecharge", "acrobatics", "earthquake", "willowisp"],
		randomDoubleBattleMoves: ["heatwave", "fireblast", "airslash", "overheat", "dragonpulse", "roost", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["wingattack", "slash", "dragonrage", "firespin"]},
			{"generation": 6, "level": 36, "gender": "M", "isHidden": false, "moves":["firefang", "flameburst", "airslash", "inferno"], "pokeball": "cherishball"},
			{"generation": 6, "level": 36, "gender": "M", "isHidden": false, "moves":["firefang", "airslash", "dragonclaw", "dragonrage"], "pokeball": "cherishball"},
			{"generation": 6, "level": 36, "shiny": true, "gender": "M", "isHidden": false, "moves":["overheat", "solarbeam", "focusblast", "holdhands"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "isHidden": true, "moves":["flareblitz", "blastburn", "scaryface", "firepledge"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	charizardmegax: {
		randomBattleMoves: ["dragondance", "flareblitz", "dragonclaw", "earthquake", "roost", "willowisp"],
		randomDoubleBattleMoves: ["dragondance", "flareblitz", "dragonclaw", "earthquake", "rockslide", "roost", "substitute"],
		requiredItem: "Charizardite X",
		tier: "Bank",
	},
	charizardmegay: {
		randomBattleMoves: ["fireblast", "airslash", "roost", "solarbeam", "focusblast", "dragonpulse"],
		randomDoubleBattleMoves: ["heatwave", "fireblast", "airslash", "roost", "solarbeam", "focusblast", "protect"],
		requiredItem: "Charizardite Y",
		tier: "Bank",
	},
	squirtle: {
		randomBattleMoves: ["icebeam", "hydropump", "rapidspin", "scald", "aquajet", "toxic"],
		randomDoubleBattleMoves: ["muddywater", "icebeam", "hydropump", "fakeout", "scald", "followme", "icywind", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "tailwhip", "bubble", "withdraw"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tackle", "tailwhip", "bubble", "withdraw"]},
			{"generation": 5, "level": 1, "shiny": 1, "ivs": {"hp": 31}, "isHidden": false, "moves":["falseswipe", "block", "hydrocannon", "followme"]},
			{"generation": 6, "level": 5, "isHidden": false, "moves":["tailwhip", "watergun", "withdraw", "bubble"], "pokeball": "cherishball"},
			{"generation": 6, "level": 5, "isHidden": true, "moves":["tackle", "tailwhip", "celebrate"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	wartortle: {
		randomBattleMoves: ["icebeam", "hydropump", "rapidspin", "scald", "aquajet", "toxic"],
		randomDoubleBattleMoves: ["muddywater", "icebeam", "hydropump", "fakeout", "scald", "followme", "icywind", "protect"],
		tier: "Bank-NFE",
	},
	blastoise: {
		randomBattleMoves: ["icebeam", "rapidspin", "scald", "toxic", "dragontail", "roar"],
		randomDoubleBattleMoves: ["muddywater", "icebeam", "hydropump", "fakeout", "scald", "followme", "icywind", "protect", "waterspout"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["protect", "raindance", "skullbash", "hydropump"]},
			{"generation": 6, "level": 100, "isHidden": true, "moves":["hydropump", "hydrocannon", "irondefense", "waterpledge"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	blastoisemega: {
		randomBattleMoves: ["icebeam", "hydropump", "rapidspin", "scald", "toxic", "dragontail", "darkpulse", "aurasphere"],
		randomDoubleBattleMoves: ["muddywater", "icebeam", "hydropump", "fakeout", "scald", "darkpulse", "aurasphere", "followme", "icywind", "protect"],
		requiredItem: "Blastoisinite",
		tier: "Bank",
	},
	caterpie: {
		randomBattleMoves: ["bugbite", "snore", "tackle", "electroweb"],
		tier: "LC",
	},
	metapod: {
		randomBattleMoves: ["snore", "bugbite", "tackle", "electroweb"],
		tier: "NFE",
	},
	butterfree: {
		randomBattleMoves: ["sleeppowder", "quiverdance", "bugbuzz", "airslash", "gigadrain", "substitute"],
		randomDoubleBattleMoves: ["quiverdance", "bugbuzz", "substitute", "sleeppowder", "airslash", "shadowball", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 30, "moves":["morningsun", "psychic", "sleeppowder", "aerialace"]},
		],
		tier: "New",
	},
	weedle: {
		randomBattleMoves: ["bugbite", "stringshot", "poisonsting", "electroweb"],
		tier: "Bank-LC",
	},
	kakuna: {
		randomBattleMoves: ["electroweb", "bugbite", "irondefense", "poisonsting"],
		tier: "Bank-NFE",
	},
	beedrill: {
		randomBattleMoves: ["toxicspikes", "tailwind", "uturn", "endeavor", "poisonjab", "knockoff"],
		randomDoubleBattleMoves: ["xscissor", "uturn", "poisonjab", "drillrun", "brickbreak", "knockoff", "protect", "stringshot"],
		eventPokemon: [
			{"generation": 3, "level": 30, "moves":["batonpass", "sludgebomb", "twineedle", "swordsdance"]},
		],
		tier: "Bank",
	},
	beedrillmega: {
		randomBattleMoves: ["xscissor", "swordsdance", "uturn", "poisonjab", "drillrun", "knockoff"],
		randomDoubleBattleMoves: ["xscissor", "uturn", "substitute", "poisonjab", "drillrun", "knockoff", "protect"],
		requiredItem: "Beedrillite",
		tier: "Unreleased",
	},
	pidgey: {
		randomBattleMoves: ["roost", "bravebird", "heatwave", "return", "workup", "uturn", "thief"],
		randomDoubleBattleMoves: ["bravebird", "heatwave", "return", "uturn", "tailwind", "protect"],
		tier: "Bank-LC",
	},
	pidgeotto: {
		randomBattleMoves: ["roost", "bravebird", "heatwave", "return", "workup", "uturn", "thief"],
		randomDoubleBattleMoves: ["bravebird", "heatwave", "return", "uturn", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 30, "abilities":["keeneye"], "moves":["refresh", "wingattack", "steelwing", "featherdance"]},
		],
		tier: "Bank-NFE",
	},
	pidgeot: {
		randomBattleMoves: ["roost", "bravebird", "heatwave", "return", "doubleedge", "uturn", "hurricane"],
		randomDoubleBattleMoves: ["bravebird", "heatwave", "return", "doubleedge", "uturn", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 61, "gender": "M", "nature": "Naughty", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "abilities":["keeneye"], "moves":["whirlwind", "wingattack", "skyattack", "mirrormove"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	pidgeotmega: {
		randomBattleMoves: ["roost", "heatwave", "uturn", "hurricane", "defog"],
		randomDoubleBattleMoves: ["tailwind", "heatwave", "uturn", "hurricane", "protect"],
		requiredItem: "Pidgeotite",
		tier: "Unreleased",
	},
	rattata: {
		randomBattleMoves: ["facade", "flamewheel", "suckerpunch", "uturn", "wildcharge", "thunderwave", "crunch", "revenge"],
		randomDoubleBattleMoves: ["facade", "flamewheel", "suckerpunch", "uturn", "wildcharge", "superfang", "crunch", "protect"],
		tier: "Bank-LC",
	},
	rattataalola: {
		tier: "LC",
	},
	raticate: {
		randomBattleMoves: ["protect", "facade", "flamewheel", "suckerpunch", "uturn", "swordsdance"],
		randomDoubleBattleMoves: ["facade", "flamewheel", "suckerpunch", "uturn", "crunch", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 34, "moves":["refresh", "superfang", "scaryface", "hyperfang"]},
		],
		tier: "Bank",
	},
	raticatealola: {
		randomBattleMoves: ["swordsdance", "return", "suckerpunch", "crunch", "doubleedge"],
		tier: "New",
	},
	spearow: {
		randomBattleMoves: ["return", "drillpeck", "doubleedge", "uturn", "quickattack", "pursuit", "drillrun", "featherdance"],
		randomDoubleBattleMoves: ["return", "drillpeck", "doubleedge", "uturn", "quickattack", "drillrun", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 22, "moves":["batonpass", "falseswipe", "leer", "aerialace"]},
		],
		tier: "LC",
	},
	fearow: {
		randomBattleMoves: ["return", "drillpeck", "doubleedge", "uturn", "pursuit", "drillrun"],
		randomDoubleBattleMoves: ["return", "drillpeck", "doubleedge", "uturn", "quickattack", "drillrun", "protect"],
		tier: "New",
	},
	ekans: {
		randomBattleMoves: ["coil", "gunkshot", "glare", "suckerpunch", "earthquake", "rest"],
		randomDoubleBattleMoves: ["gunkshot", "seedbomb", "suckerpunch", "aquatail", "earthquake", "rest", "rockslide", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 14, "gender": "F", "nature": "Docile", "ivs": {"hp": 26, "atk": 28, "def": 6, "spa": 14, "spd": 30, "spe": 11}, "abilities":["shedskin"], "moves":["leer", "wrap", "poisonsting", "bite"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["wrap", "leer", "poisonsting"]},
		],
		tier: "Bank-LC",
	},
	arbok: {
		randomBattleMoves: ["coil", "gunkshot", "suckerpunch", "aquatail", "earthquake", "rest"],
		randomDoubleBattleMoves: ["gunkshot", "suckerpunch", "aquatail", "crunch", "earthquake", "rest", "rockslide", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 33, "moves":["refresh", "sludgebomb", "glare", "bite"]},
		],
		tier: "Bank",
	},
	pichu: {
		randomBattleMoves: ["fakeout", "volttackle", "encore", "irontail", "toxic", "thunderbolt"],
		randomDoubleBattleMoves: ["fakeout", "volttackle", "encore", "irontail", "protect", "thunderbolt"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["thundershock", "charm", "surf"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["thundershock", "charm", "wish"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["thundershock", "charm", "teeterdance"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["thundershock", "charm", "followme"]},
			{"generation": 4, "level": 1, "moves":["volttackle", "thunderbolt", "grassknot", "return"]},
			{"generation": 4, "level": 30, "shiny": true, "gender": "M", "nature": "Jolly", "moves":["charge", "volttackle", "endeavor", "endure"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	pichuspikyeared: {
		eventPokemon: [
			{"generation": 4, "level": 30, "gender": "F", "nature": "Naughty", "moves":["helpinghand", "volttackle", "swagger", "painsplit"]},
		],
		eventOnly: true,
		gen: 4,
		tier: "Illegal",
	},
	pikachu: {
		randomBattleMoves: ["thunderbolt", "volttackle", "voltswitch", "grassknot", "hiddenpowerice", "brickbreak", "extremespeed", "encore", "substitute", "knockoff"],
		randomDoubleBattleMoves: ["fakeout", "thunderbolt", "volttackle", "voltswitch", "grassknot", "hiddenpowerice", "brickbreak", "extremespeed", "encore", "substitute", "knockoff", "protect", "discharge"],
		eventPokemon: [
			{"generation": 3, "level": 50, "moves":["thunderbolt", "agility", "thunder", "lightscreen"]},
			{"generation": 3, "level": 10, "moves":["thundershock", "growl", "tailwhip", "thunderwave"]},
			{"generation": 3, "level": 10, "moves":["fly", "tailwhip", "growl", "thunderwave"]},
			{"generation": 3, "level": 5, "moves":["surf", "growl", "tailwhip", "thunderwave"]},
			{"generation": 3, "level": 10, "moves":["fly", "growl", "tailwhip", "thunderwave"]},
			{"generation": 3, "level": 10, "moves":["thundershock", "growl", "thunderwave", "surf"]},
			{"generation": 3, "level": 70, "moves":["thunderbolt", "thunder", "lightscreen", "fly"]},
			{"generation": 3, "level": 70, "moves":["thunderbolt", "thunder", "lightscreen", "surf"]},
			{"generation": 3, "level": 70, "moves":["thunderbolt", "thunder", "lightscreen", "agility"]},
			{"generation": 4, "level": 10, "gender": "F", "nature": "Hardy", "moves":["surf", "volttackle", "tailwhip", "thunderwave"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["thundershock", "growl", "tailwhip", "thunderwave"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Hardy", "moves":["surf", "thunderbolt", "lightscreen", "quickattack"], "pokeball": "cherishball"},
			{"generation": 4, "level": 20, "gender": "F", "nature": "Bashful", "moves":["present", "quickattack", "thundershock", "tailwhip"], "pokeball": "cherishball"},
			{"generation": 4, "level": 20, "gender": "M", "nature": "Jolly", "moves":["grassknot", "thunderbolt", "flash", "doubleteam"], "pokeball": "cherishball"},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Modest", "moves":["surf", "thunder", "protect"], "pokeball": "cherishball"},
			{"generation": 4, "level": 20, "gender": "F", "nature": "Bashful", "moves":["quickattack", "thundershock", "tailwhip", "present"], "pokeball": "cherishball"},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Mild", "moves":["surf", "thunder", "protect"], "pokeball": "cherishball"},
			{"generation": 4, "level": 20, "gender": "F", "nature": "Bashful", "moves":["present", "quickattack", "thunderwave", "tailwhip"], "pokeball": "cherishball"},
			{"generation": 4, "level": 30, "gender": "M", "nature": "Naughty", "moves":["lastresort", "present", "thunderbolt", "quickattack"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Relaxed", "moves":["rest", "sleeptalk", "yawn", "snore"], "pokeball": "cherishball"},
			{"generation": 4, "level": 20, "gender": "M", "nature": "Docile", "moves":["present", "quickattack", "thundershock", "tailwhip"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Naughty", "moves":["volttackle", "irontail", "quickattack", "thunderbolt"], "pokeball": "cherishball"},
			{"generation": 4, "level": 20, "gender": "M", "nature": "Bashful", "moves":["present", "quickattack", "thundershock", "tailwhip"], "pokeball": "cherishball"},
			{"generation": 5, "level": 30, "gender": "F", "isHidden": true, "moves":["sing", "teeterdance", "encore", "electroball"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "isHidden": false, "moves":["fly", "irontail", "electroball", "quickattack"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "shiny": 1, "gender": "F", "isHidden": false, "moves":["thunder", "volttackle", "grassknot", "quickattack"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "shiny": 1, "gender": "F", "isHidden": false, "moves":["extremespeed", "thunderbolt", "grassknot", "brickbreak"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "gender": "F", "nature": "Timid", "isHidden": true, "moves":["fly", "thunderbolt", "grassknot", "protect"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["thundershock", "tailwhip", "thunderwave", "headbutt"]},
			{"generation": 5, "level": 100, "gender": "M", "isHidden": true, "moves":["volttackle", "quickattack", "feint", "voltswitch"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "gender": "M", "nature": "Brave", "isHidden": false, "moves":["thunderbolt", "quickattack", "irontail", "electroball"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "growl", "playnice", "quickattack"], "pokeball": "cherishball"},
			{"generation": 6, "level": 22, "isHidden": false, "moves":["quickattack", "electroball", "doubleteam", "megakick"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["thunderbolt", "quickattack", "surf", "holdhands"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "gender": "F", "isHidden": false, "moves":["thunderbolt", "quickattack", "heartstamp", "holdhands"], "pokeball": "healball"},
			{"generation": 6, "level": 36, "shiny": true, "isHidden": true, "moves":["thunder", "substitute", "playnice", "holdhands"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "gender": "F", "isHidden": false, "moves":["playnice", "charm", "nuzzle", "sweetkiss"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "gender": "M", "nature": "Naughty", "isHidden": false, "moves":["thunderbolt", "quickattack", "irontail", "electroball"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "shiny": true, "isHidden": false, "moves":["teeterdance", "playnice", "tailwhip", "nuzzle"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "perfectIVs": 2, "isHidden": true, "moves":["fakeout", "encore", "volttackle", "endeavor"], "pokeball": "cherishball"},
			{"generation": 6, "level": 99, "isHidden": false, "moves":["happyhour", "playnice", "holdhands", "flash"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["fly", "surf", "agility", "celebrate"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["bestow", "holdhands", "return", "playnice"], "pokeball": "healball"},
			{"generation": 7, "level": 10, "nature": "Jolly", "isHidden": false, "moves":["celebrate", "growl", "playnice", "quickattack"], "pokeball": "cherishball"},
		],
		tier: "NFE",
	},
	pikachucosplay: {
		eventPokemon: [
			{"generation": 6, "level": 20, "moves":["quickattack", "electroball", "thunderwave", "thundershock"]},
		],
		eventOnly: true,
		gen: 6,
		tier: "Illegal",
	},
	pikachurockstar: {
		eventPokemon: [
			{"generation": 6, "level": 20, "moves":["quickattack", "electroball", "thunderwave", "meteormash"]},
		],
		eventOnly: true,
		gen: 6,
		tier: "Illegal",
	},
	pikachubelle: {
		eventPokemon: [
			{"generation": 6, "level": 20, "moves":["quickattack", "electroball", "thunderwave", "iciclecrash"]},
		],
		eventOnly: true,
		gen: 6,
		tier: "Illegal",
	},
	pikachupopstar: {
		eventPokemon: [
			{"generation": 6, "level": 20, "moves":["quickattack", "electroball", "thunderwave", "drainingkiss"]},
		],
		eventOnly: true,
		gen: 6,
		tier: "Illegal",
	},
	pikachuphd: {
		eventPokemon: [
			{"generation": 6, "level": 20, "moves":["quickattack", "electroball", "thunderwave", "electricterrain"]},
		],
		eventOnly: true,
		gen: 6,
		tier: "Illegal",
	},
	pikachulibre: {
		eventPokemon: [
			{"generation": 6, "level": 20, "moves":["quickattack", "electroball", "thunderwave", "flyingpress"]},
		],
		eventOnly: true,
		gen: 6,
		tier: "Illegal",
	},
	raichu: {
		randomBattleMoves: ["nastyplot", "encore", "thunderbolt", "grassknot", "hiddenpowerice", "focusblast", "voltswitch"],
		randomDoubleBattleMoves: ["fakeout", "encore", "thunderbolt", "grassknot", "hiddenpowerice", "focusblast", "substitute", "extremespeed", "knockoff", "protect"],
		tier: "Bank",
	},
	raichualola: {
		randomBattleMoves: ["nastyplot", "encore", "thunderbolt", "psyshock", "focusblast", "voltswitch", "hiddenpowerice"],
		tier: "New",
	},
	sandshrew: {
		randomBattleMoves: ["earthquake", "rockslide", "swordsdance", "rapidspin", "xscissor", "stealthrock", "toxic", "knockoff"],
		randomDoubleBattleMoves: ["earthquake", "rockslide", "swordsdance", "xscissor", "knockoff", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 12, "gender": "M", "nature": "Docile", "ivs": {"hp": 4, "atk": 23, "def": 8, "spa": 31, "spd": 1, "spe": 25}, "moves":["scratch", "defensecurl", "sandattack", "poisonsting"]},
		],
		tier: "Bank-LC",
	},
	sandshrewalola: {
		tier: "LC",
	},
	sandslash: {
		randomBattleMoves: ["earthquake", "swordsdance", "rapidspin", "toxic", "stealthrock", "knockoff"],
		randomDoubleBattleMoves: ["earthquake", "rockslide", "stoneedge", "swordsdance", "xscissor", "knockoff", "protect"],
		tier: "Bank",
	},
	sandslashalola: {
		randomBattleMoves: ["substitute", "swordsdance", "iciclecrash", "ironhead", "earthquake", "rapidspin"],
		tier: "New",
	},
	nidoranf: {
		randomBattleMoves: ["toxicspikes", "crunch", "poisonjab", "honeclaws"],
		randomDoubleBattleMoves: ["helpinghand", "crunch", "poisonjab", "protect"],
		tier: "Bank-LC",
	},
	nidorina: {
		randomBattleMoves: ["toxicspikes", "crunch", "poisonjab", "honeclaws", "icebeam", "thunderbolt", "shadowclaw"],
		randomDoubleBattleMoves: ["helpinghand", "crunch", "poisonjab", "protect", "icebeam", "thunderbolt", "shadowclaw"],
		tier: "Bank-NFE",
	},
	nidoqueen: {
		randomBattleMoves: ["toxicspikes", "stealthrock", "fireblast", "icebeam", "earthpower", "sludgewave"],
		randomDoubleBattleMoves: ["protect", "fireblast", "icebeam", "earthpower", "sludgebomb"],
		eventPokemon: [
			{"generation": 6, "level": 41, "perfectIVs": 2, "isHidden": false, "abilities":["poisonpoint"], "moves":["tailwhip", "doublekick", "poisonsting", "bodyslam"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	nidoranm: {
		randomBattleMoves: ["suckerpunch", "poisonjab", "headsmash", "honeclaws", "shadowclaw"],
		randomDoubleBattleMoves: ["suckerpunch", "poisonjab", "shadowclaw", "helpinghand", "protect"],
		tier: "Bank-LC",
	},
	nidorino: {
		randomBattleMoves: ["suckerpunch", "poisonjab", "headsmash", "honeclaws", "shadowclaw"],
		randomDoubleBattleMoves: ["suckerpunch", "poisonjab", "shadowclaw", "helpinghand", "protect"],
		tier: "Bank-NFE",
	},
	nidoking: {
		randomBattleMoves: ["substitute", "fireblast", "icebeam", "earthpower", "sludgewave", "superpower"],
		randomDoubleBattleMoves: ["protect", "fireblast", "thunderbolt", "icebeam", "earthpower", "sludgebomb", "focusblast"],
		tier: "Bank",
	},
	cleffa: {
		randomBattleMoves: ["reflect", "thunderwave", "lightscreen", "toxic", "fireblast", "encore", "wish", "protect", "aromatherapy"],
		randomDoubleBattleMoves: ["reflect", "thunderwave", "lightscreen", "safeguard", "fireblast", "protect"],
		tier: "LC",
	},
	clefairy: {
		randomBattleMoves: ["healingwish", "reflect", "thunderwave", "lightscreen", "toxic", "fireblast", "encore", "wish", "protect", "aromatherapy", "stealthrock", "moonblast", "knockoff", "moonlight"],
		randomDoubleBattleMoves: ["reflect", "thunderwave", "lightscreen", "safeguard", "fireblast", "followme", "protect", "moonblast"],
		tier: "New",
	},
	clefable: {
		randomBattleMoves: ["calmmind", "softboiled", "fireblast", "moonblast", "stealthrock", "thunderwave"],
		randomDoubleBattleMoves: ["reflect", "thunderwave", "lightscreen", "safeguard", "fireblast", "followme", "protect", "moonblast", "dazzlinggleam", "softboiled"],
		tier: "New",
	},
	vulpix: {
		randomBattleMoves: ["flamethrower", "fireblast", "willowisp", "energyball", "substitute", "toxic", "hypnosis", "painsplit"],
		randomDoubleBattleMoves: ["heatwave", "fireblast", "willowisp", "energyball", "substitute", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 18, "gender": "F", "nature": "Quirky", "ivs": {"hp": 15, "atk": 6, "def": 3, "spa": 25, "spd": 13, "spe": 22}, "moves":["tailwhip", "roar", "quickattack", "willowisp"]},
			{"generation": 3, "level": 18, "moves":["charm", "heatwave", "ember", "dig"]},
		],
		tier: "Bank-LC",
	},
	vulpixalola: {
		eventPokemon: [
			{"generation": 7, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "babydolleyes", "iceshard"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	ninetales: {
		randomBattleMoves: ["fireblast", "willowisp", "solarbeam", "nastyplot", "substitute", "hiddenpowerice"],
		randomDoubleBattleMoves: ["heatwave", "fireblast", "willowisp", "solarbeam", "substitute", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "gender": "M", "nature": "Bold", "ivs": {"def": 31}, "isHidden": true, "moves":["heatwave", "solarbeam", "psyshock", "willowisp"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	ninetalesalola: {
		randomBattleMoves: ["nastyplot", "blizzard", "moonblast", "substitute", "hiddenpowerfire"],
		tier: "New",
	},
	igglybuff: {
		randomBattleMoves: ["wish", "thunderwave", "reflect", "lightscreen", "healbell", "seismictoss", "counter", "protect"],
		randomDoubleBattleMoves: ["wish", "thunderwave", "reflect", "lightscreen", "seismictoss", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["cutecharm"], "moves":["sing", "charm", "defensecurl", "tickle"]},
		],
		tier: "LC",
	},
	jigglypuff: {
		randomBattleMoves: ["wish", "thunderwave", "reflect", "lightscreen", "healbell", "seismictoss", "counter", "stealthrock", "protect", "knockoff", "dazzlinggleam"],
		randomDoubleBattleMoves: ["wish", "thunderwave", "reflect", "lightscreen", "seismictoss", "protect", "knockoff", "dazzlinggleam"],
		tier: "NFE",
	},
	wigglytuff: {
		randomBattleMoves: ["wish", "protect", "fireblast", "stealthrock", "dazzlinggleam", "hypervoice"],
		randomDoubleBattleMoves: ["thunderwave", "reflect", "lightscreen", "protect", "knockoff", "dazzlinggleam", "fireblast", "icebeam", "hypervoice"],
		tier: "New",
	},
	zubat: {
		randomBattleMoves: ["bravebird", "roost", "toxic", "taunt", "nastyplot", "gigadrain", "sludgebomb", "airslash", "uturn", "whirlwind", "heatwave", "superfang"],
		randomDoubleBattleMoves: ["bravebird", "taunt", "nastyplot", "gigadrain", "sludgebomb", "airslash", "uturn", "protect", "heatwave", "superfang"],
		tier: "LC",
	},
	golbat: {
		randomBattleMoves: ["bravebird", "roost", "toxic", "taunt", "defog", "superfang", "uturn"],
		randomDoubleBattleMoves: ["bravebird", "taunt", "nastyplot", "gigadrain", "sludgebomb", "airslash", "uturn", "protect", "heatwave", "superfang"],
		tier: "New",
	},
	crobat: {
		randomBattleMoves: ["bravebird", "roost", "toxic", "taunt", "defog", "uturn", "superfang"],
		randomDoubleBattleMoves: ["bravebird", "taunt", "tailwind", "crosspoison", "uturn", "protect", "superfang"],
		eventPokemon: [
			{"generation": 4, "level": 30, "gender": "M", "nature": "Timid", "moves":["heatwave", "airslash", "sludgebomb", "superfang"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	oddish: {
		randomBattleMoves: ["gigadrain", "sludgebomb", "synthesis", "sleeppowder", "stunspore", "toxic", "hiddenpowerfire", "leechseed", "dazzlinggleam", "sunnyday"],
		randomDoubleBattleMoves: ["gigadrain", "sludgebomb", "sleeppowder", "stunspore", "protect", "hiddenpowerfire", "leechseed", "dazzlinggleam", "sunnyday"],
		eventPokemon: [
			{"generation": 3, "level": 26, "gender": "M", "nature": "Quirky", "ivs": {"hp": 23, "atk": 24, "def": 20, "spa": 21, "spd": 9, "spe": 16}, "moves":["poisonpowder", "stunspore", "sleeppowder", "acid"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["absorb", "leechseed"]},
		],
		tier: "Bank-LC",
	},
	gloom: {
		randomBattleMoves: ["gigadrain", "sludgebomb", "synthesis", "sleeppowder", "stunspore", "toxic", "hiddenpowerfire", "leechseed", "dazzlinggleam", "sunnyday"],
		randomDoubleBattleMoves: ["gigadrain", "sludgebomb", "sleeppowder", "stunspore", "protect", "hiddenpowerfire", "leechseed", "dazzlinggleam", "sunnyday"],
		eventPokemon: [
			{"generation": 3, "level": 50, "moves":["sleeppowder", "acid", "moonlight", "petaldance"]},
		],
		tier: "Bank-NFE",
	},
	vileplume: {
		randomBattleMoves: ["gigadrain", "sludgebomb", "synthesis", "sleeppowder", "hiddenpowerfire", "aromatherapy"],
		randomDoubleBattleMoves: ["gigadrain", "sludgebomb", "sleeppowder", "stunspore", "protect", "hiddenpowerfire", "moonblast", "dazzlinggleam"],
		tier: "Bank",
	},
	bellossom: {
		randomBattleMoves: ["gigadrain", "sleeppowder", "hiddenpowerfire", "hiddenpowerrock", "quiverdance", "moonblast"],
		randomDoubleBattleMoves: ["gigadrain", "sludgebomb", "sleeppowder", "stunspore", "protect", "hiddenpowerfire", "moonblast", "dazzlinggleam", "sunnyday", "solarbeam"],
		tier: "Bank",
	},
	paras: {
		randomBattleMoves: ["spore", "stunspore", "xscissor", "seedbomb", "synthesis", "leechseed", "aromatherapy", "knockoff"],
		randomDoubleBattleMoves: ["spore", "stunspore", "xscissor", "seedbomb", "ragepowder", "leechseed", "protect", "knockoff", "wideguard"],
		eventPokemon: [
			{"generation": 3, "level": 28, "abilities":["effectspore"], "moves":["refresh", "spore", "slash", "falseswipe"]},
		],
		tier: "LC",
	},
	parasect: {
		randomBattleMoves: ["spore", "substitute", "xscissor", "seedbomb", "leechseed", "knockoff"],
		randomDoubleBattleMoves: ["spore", "stunspore", "xscissor", "seedbomb", "ragepowder", "leechseed", "protect", "knockoff", "wideguard"],
		tier: "New",
	},
	venonat: {
		randomBattleMoves: ["sleeppowder", "morningsun", "toxicspikes", "sludgebomb", "signalbeam", "stunspore", "psychic"],
		randomDoubleBattleMoves: ["sleeppowder", "morningsun", "ragepowder", "sludgebomb", "signalbeam", "stunspore", "psychic", "protect"],
		tier: "Bank-LC",
	},
	venomoth: {
		randomBattleMoves: ["sleeppowder", "quiverdance", "batonpass", "bugbuzz", "sludgebomb", "substitute"],
		randomDoubleBattleMoves: ["sleeppowder", "roost", "ragepowder", "quiverdance", "protect", "bugbuzz", "sludgebomb", "gigadrain", "substitute", "psychic"],
		eventPokemon: [
			{"generation": 3, "level": 32, "abilities":["shielddust"], "moves":["refresh", "silverwind", "substitute", "psychic"]},
		],
		tier: "Bank",
	},
	diglett: {
		randomBattleMoves: ["earthquake", "rockslide", "stealthrock", "suckerpunch", "reversal", "substitute", "shadowclaw"],
		randomDoubleBattleMoves: ["earthquake", "rockslide", "protect", "suckerpunch", "shadowclaw"],
		tier: "Bank-LC",
	},
	diglettalola: {
		tier: "LC",
	},
	dugtrio: {
		randomBattleMoves: ["earthquake", "stoneedge", "stealthrock", "suckerpunch", "reversal", "substitute"],
		randomDoubleBattleMoves: ["earthquake", "rockslide", "protect", "suckerpunch", "stoneedge"],
		eventPokemon: [
			{"generation": 3, "level": 40, "moves":["charm", "earthquake", "sandstorm", "triattack"]},
		],
		tier: "Bank",
	},
	dugtrioalola: {
		randomBattleMoves: ["earthquake", "ironhead", "substitute", "reversal"],
		tier: "New",
	},
	meowth: {
		randomBattleMoves: ["fakeout", "uturn", "thief", "taunt", "return", "hypnosis"],
		randomDoubleBattleMoves: ["fakeout", "uturn", "nightslash", "taunt", "return", "hypnosis", "feint", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["scratch", "growl", "petaldance"]},
			{"generation": 3, "level": 5, "moves":["scratch", "growl"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "growl", "bite"]},
			{"generation": 3, "level": 22, "moves":["sing", "slash", "payday", "bite"]},
			{"generation": 4, "level": 21, "gender": "F", "nature": "Jolly", "abilities":["pickup"], "moves":["bite", "fakeout", "furyswipes", "screech"], "pokeball": "cherishball"},
			{"generation": 4, "level": 10, "gender": "M", "nature": "Jolly", "abilities":["pickup"], "moves":["fakeout", "payday", "assist", "scratch"], "pokeball": "cherishball"},
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "abilities":["pickup"], "moves":["furyswipes", "sing", "nastyplot", "snatch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 20, "isHidden": false, "abilities":["pickup"], "moves":["happyhour", "screech", "bite", "fakeout"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	meowthalola: {
		tier: "LC",
	},
	persian: {
		randomBattleMoves: ["fakeout", "uturn", "taunt", "return", "knockoff"],
		randomDoubleBattleMoves: ["fakeout", "uturn", "knockoff", "taunt", "return", "hypnosis", "feint", "protect"],
		tier: "Bank",
	},
	persianalola: {
		randomBattleMoves: ["nastyplot", "darkpulse", "powergem", "hypnosis", "hiddenpowerfighting"],
		tier: "New",
	},
	psyduck: {
		randomBattleMoves: ["hydropump", "scald", "icebeam", "hiddenpowergrass", "crosschop", "encore", "psychic", "signalbeam"],
		randomDoubleBattleMoves: ["hydropump", "scald", "icebeam", "hiddenpowergrass", "crosschop", "encore", "psychic", "signalbeam", "surf", "icywind", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 27, "gender": "M", "nature": "Lax", "ivs": {"hp": 31, "atk": 16, "def": 12, "spa": 29, "spd": 31, "spe": 14}, "abilities":["damp"], "moves":["tailwhip", "confusion", "disable", "screech"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["watersport", "scratch", "tailwhip", "mudsport"]},
		],
		tier: "LC",
	},
	golduck: {
		randomBattleMoves: ["hydropump", "scald", "icebeam", "signalbeam", "encore", "calmmind", "substitute"],
		randomDoubleBattleMoves: ["hydropump", "scald", "icebeam", "hiddenpowergrass", "focusblast", "encore", "psychic", "surf", "icywind", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 33, "moves":["charm", "waterfall", "psychup", "brickbreak"]},
		],
		tier: "New",
	},
	mankey: {
		randomBattleMoves: ["closecombat", "uturn", "icepunch", "rockslide", "punishment", "earthquake", "poisonjab"],
		randomDoubleBattleMoves: ["closecombat", "uturn", "icepunch", "rockslide", "punishment", "earthquake", "poisonjab", "protect"],
		tier: "LC",
	},
	primeape: {
		randomBattleMoves: ["closecombat", "uturn", "icepunch", "stoneedge", "encore", "earthquake", "gunkshot"],
		randomDoubleBattleMoves: ["closecombat", "uturn", "icepunch", "rockslide", "punishment", "earthquake", "poisonjab", "protect", "taunt", "stoneedge"],
		eventPokemon: [
			{"generation": 3, "level": 34, "abilities":["vitalspirit"], "moves":["helpinghand", "crosschop", "focusenergy", "reversal"]},
		],
		tier: "New",
	},
	growlithe: {
		randomBattleMoves: ["flareblitz", "wildcharge", "hiddenpowergrass", "closecombat", "morningsun", "willowisp", "toxic", "flamethrower"],
		randomDoubleBattleMoves: ["flareblitz", "wildcharge", "hiddenpowergrass", "closecombat", "willowisp", "snarl", "heatwave", "helpinghand", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 32, "gender": "F", "nature": "Quiet", "ivs": {"hp": 11, "atk": 24, "def": 28, "spa": 1, "spd": 20, "spe": 2}, "abilities":["intimidate"], "moves":["leer", "odorsleuth", "takedown", "flamewheel"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["bite", "roar", "ember"]},
			{"generation": 3, "level": 28, "moves":["charm", "flamethrower", "bite", "takedown"]},
		],
		tier: "LC",
	},
	arcanine: {
		randomBattleMoves: ["flareblitz", "wildcharge", "extremespeed", "closecombat", "morningsun", "willowisp", "toxic", "crunch", "roar"],
		randomDoubleBattleMoves: ["flareblitz", "wildcharge", "closecombat", "willowisp", "snarl", "protect", "extremespeed"],
		eventPokemon: [
			{"generation": 4, "level": 50, "abilities":["intimidate"], "moves":["flareblitz", "thunderfang", "crunch", "extremespeed"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	poliwag: {
		randomBattleMoves: ["hydropump", "icebeam", "encore", "bellydrum", "hypnosis", "waterfall", "return"],
		randomDoubleBattleMoves: ["hydropump", "icebeam", "encore", "icywind", "hypnosis", "waterfall", "return", "protect", "helpinghand"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["bubble", "sweetkiss"]},
		],
		tier: "LC",
	},
	poliwhirl: {
		randomBattleMoves: ["hydropump", "icebeam", "encore", "bellydrum", "hypnosis", "waterfall", "return", "earthquake"],
		randomDoubleBattleMoves: ["hydropump", "icebeam", "encore", "icywind", "hypnosis", "waterfall", "return", "protect", "helpinghand", "earthquake"],
		tier: "NFE",
	},
	poliwrath: {
		randomBattleMoves: ["hydropump", "focusblast", "icebeam", "rest", "sleeptalk", "scald", "circlethrow", "raindance"],
		randomDoubleBattleMoves: ["bellydrum", "encore", "waterfall", "protect", "icepunch", "earthquake", "brickbreak", "rockslide"],
		eventPokemon: [
			{"generation": 3, "level": 42, "moves":["helpinghand", "hydropump", "raindance", "brickbreak"]},
		],
		tier: "New",
	},
	politoed: {
		randomBattleMoves: ["scald", "toxic", "encore", "perishsong", "protect", "hypnosis", "rest"],
		randomDoubleBattleMoves: ["scald", "hypnosis", "icywind", "encore", "helpinghand", "protect", "icebeam", "focusblast", "hydropump", "hiddenpowergrass"],
		eventPokemon: [
			{"generation": 5, "level": 50, "gender": "M", "nature": "Calm", "ivs": {"hp": 31, "atk": 13, "def": 31, "spa": 5, "spd": 31, "spe": 5}, "isHidden": true, "moves":["scald", "icebeam", "perishsong", "protect"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	abra: {
		randomBattleMoves: ["calmmind", "psychic", "psyshock", "hiddenpowerfighting", "shadowball", "encore", "substitute"],
		randomDoubleBattleMoves: ["protect", "psychic", "psyshock", "hiddenpowerfighting", "shadowball", "encore", "substitute"],
		tier: "LC",
	},
	kadabra: {
		randomBattleMoves: ["calmmind", "psychic", "psyshock", "hiddenpowerfighting", "shadowball", "encore", "substitute"],
		randomDoubleBattleMoves: ["protect", "psychic", "psyshock", "hiddenpowerfighting", "shadowball", "encore", "substitute"],
		tier: "New",
	},
	alakazam: {
		randomBattleMoves: ["psyshock", "psychic", "focusblast", "shadowball", "hiddenpowerice", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["protect", "psychic", "psyshock", "focusblast", "shadowball", "encore", "substitute", "dazzlinggleam"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["futuresight", "calmmind", "psychic", "trick"]},
		],
		tier: "New",
	},
	alakazammega: {
		randomBattleMoves: ["calmmind", "psyshock", "focusblast", "shadowball", "encore", "substitute"],
		randomDoubleBattleMoves: ["protect", "psychic", "psyshock", "focusblast", "shadowball", "encore", "substitute", "dazzlinggleam"],
		requiredItem: "Alakazite",
		tier: "New",
	},
	machop: {
		randomBattleMoves: ["dynamicpunch", "bulkup", "icepunch", "rockslide", "bulletpunch", "knockoff"],
		randomDoubleBattleMoves: ["dynamicpunch", "protect", "icepunch", "rockslide", "bulletpunch", "knockoff"],
		tier: "LC",
	},
	machoke: {
		randomBattleMoves: ["dynamicpunch", "bulkup", "icepunch", "rockslide", "bulletpunch", "poweruppunch", "knockoff"],
		randomDoubleBattleMoves: ["dynamicpunch", "protect", "icepunch", "rockslide", "bulletpunch", "knockoff"],
		eventPokemon: [
			{"generation": 5, "level": 30, "isHidden": false, "moves":["lowsweep", "foresight", "seismictoss", "revenge"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	machamp: {
		randomBattleMoves: ["dynamicpunch", "icepunch", "stoneedge", "bulletpunch", "knockoff", "substitute"],
		randomDoubleBattleMoves: ["dynamicpunch", "protect", "icepunch", "stoneedge", "rockslide", "bulletpunch", "knockoff", "wideguard"],
		eventPokemon: [
			{"generation": 3, "level": 38, "gender": "M", "nature": "Quiet", "ivs": {"hp": 9, "atk": 23, "def": 25, "spa": 20, "spd": 15, "spe": 10}, "abilities":["guts"], "moves":["seismictoss", "foresight", "revenge", "vitalthrow"]},
			{"generation": 6, "level": 50, "shiny": true, "gender": "M", "nature": "Adamant", "ivs": {"hp": 31, "atk": 31, "def": 31, "spa": 31, "spd": 31, "spe": 31}, "isHidden": false, "abilities":["noguard"], "moves":["dynamicpunch", "stoneedge", "wideguard", "knockoff"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	bellsprout: {
		randomBattleMoves: ["swordsdance", "sleeppowder", "sunnyday", "growth", "solarbeam", "gigadrain", "sludgebomb", "weatherball", "suckerpunch", "seedbomb"],
		randomDoubleBattleMoves: ["swordsdance", "sleeppowder", "sunnyday", "growth", "solarbeam", "gigadrain", "sludgebomb", "weatherball", "suckerpunch", "seedbomb", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["vinewhip", "teeterdance"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["vinewhip", "growth"]},
		],
		tier: "LC",
	},
	weepinbell: {
		randomBattleMoves: ["swordsdance", "sleeppowder", "sunnyday", "growth", "solarbeam", "gigadrain", "sludgebomb", "weatherball", "suckerpunch", "seedbomb", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "sleeppowder", "sunnyday", "growth", "solarbeam", "gigadrain", "sludgebomb", "weatherball", "suckerpunch", "seedbomb", "protect", "knockoff"],
		eventPokemon: [
			{"generation": 3, "level": 32, "moves":["morningsun", "magicalleaf", "sludgebomb", "sweetscent"]},
		],
		tier: "NFE",
	},
	victreebel: {
		randomBattleMoves: ["sleeppowder", "sunnyday", "growth", "solarbeam", "gigadrain", "sludgebomb", "weatherball", "suckerpunch", "powerwhip", "knockoff", "swordsdance"],
		randomDoubleBattleMoves: ["swordsdance", "sleeppowder", "sunnyday", "growth", "solarbeam", "gigadrain", "sludgebomb", "weatherball", "suckerpunch", "powerwhip", "protect", "knockoff"],
		tier: "New",
	},
	tentacool: {
		randomBattleMoves: ["toxicspikes", "rapidspin", "scald", "sludgebomb", "icebeam", "knockoff", "gigadrain", "toxic", "dazzlinggleam"],
		randomDoubleBattleMoves: ["muddywater", "scald", "sludgebomb", "icebeam", "knockoff", "gigadrain", "protect", "dazzlinggleam"],
		tier: "LC",
	},
	tentacruel: {
		randomBattleMoves: ["toxicspikes", "rapidspin", "scald", "sludgebomb", "acidspray", "knockoff"],
		randomDoubleBattleMoves: ["muddywater", "scald", "sludgebomb", "acidspray", "icebeam", "knockoff", "gigadrain", "protect", "dazzlinggleam"],
		tier: "New",
	},
	geodude: {
		randomBattleMoves: ["stealthrock", "earthquake", "stoneedge", "suckerpunch", "hammerarm", "firepunch", "rockblast"],
		randomDoubleBattleMoves: ["rockslide", "earthquake", "stoneedge", "suckerpunch", "hammerarm", "firepunch", "protect"],
		tier: "Bank-LC",
	},
	geodudealola: {
		tier: "LC",
	},
	graveler: {
		randomBattleMoves: ["stealthrock", "earthquake", "stoneedge", "suckerpunch", "hammerarm", "firepunch", "rockblast"],
		randomDoubleBattleMoves: ["rockslide", "earthquake", "stoneedge", "suckerpunch", "hammerarm", "firepunch", "protect"],
		tier: "Bank-NFE",
	},
	graveleralola: {
		tier: "NFE",
	},
	golem: {
		randomBattleMoves: ["stealthrock", "earthquake", "explosion", "suckerpunch", "toxic", "rockblast"],
		randomDoubleBattleMoves: ["rockslide", "earthquake", "stoneedge", "suckerpunch", "hammerarm", "firepunch", "protect"],
		tier: "Bank",
	},
	golemalola: {
		randomBattleMoves: ["stealthrock", "stoneedge", "thunderpunch", "earthquake", "suckerpunch", "toxic"],
		tier: "New",
	},
	ponyta: {
		randomBattleMoves: ["flareblitz", "wildcharge", "morningsun", "hypnosis", "flamecharge"],
		randomDoubleBattleMoves: ["flareblitz", "wildcharge", "protect", "hypnosis", "flamecharge"],
		tier: "Bank-LC",
	},
	rapidash: {
		randomBattleMoves: ["flareblitz", "wildcharge", "morningsun", "drillrun", "willowisp", "sunnyday", "solarbeam"],
		randomDoubleBattleMoves: ["flareblitz", "wildcharge", "protect", "hypnosis", "flamecharge", "megahorn", "drillrun", "willowisp"],
		eventPokemon: [
			{"generation": 3, "level": 40, "moves":["batonpass", "solarbeam", "sunnyday", "flamethrower"]},
		],
		tier: "Bank",
	},
	slowpoke: {
		randomBattleMoves: ["scald", "aquatail", "zenheadbutt", "thunderwave", "toxic", "slackoff", "trickroom"],
		randomDoubleBattleMoves: ["scald", "aquatail", "zenheadbutt", "thunderwave", "slackoff", "trickroom", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 31, "gender": "F", "nature": "Naive", "ivs": {"hp": 17, "atk": 11, "def": 19, "spa": 20, "spd": 5, "spe": 10}, "abilities":["oblivious"], "moves":["watergun", "confusion", "disable", "headbutt"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["curse", "yawn", "tackle", "growl"]},
			{"generation": 5, "level": 30, "isHidden": false, "moves":["confusion", "disable", "headbutt", "waterpulse"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	slowbro: {
		randomBattleMoves: ["scald", "toxic", "thunderwave", "psyshock", "foulplay", "fireblast", "icebeam", "slackoff"],
		randomDoubleBattleMoves: ["scald", "fireblast", "icebeam", "psychic", "grassknot", "thunderwave", "slackoff", "trickroom", "protect", "psyshock"],
		eventPokemon: [
			{"generation": 6, "level": 100, "nature": "Quiet", "isHidden": false, "abilities":["oblivious"], "moves":["scald", "trickroom", "slackoff", "irontail"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	slowbromega: {
		randomBattleMoves: ["calmmind", "scald", "psyshock", "slackoff", "fireblast", "psychic", "icebeam", "grassknot"],
		randomDoubleBattleMoves: ["scald", "fireblast", "icebeam", "psychic", "grassknot", "thunderwave", "slackoff", "trickroom", "protect", "psyshock"],
		requiredItem: "Slowbronite",
		tier: "(OU)",
	},
	slowking: {
		randomBattleMoves: ["scald", "fireblast", "icebeam", "psychic", "grassknot", "thunderwave", "toxic", "slackoff", "trickroom", "nastyplot", "dragontail", "psyshock"],
		randomDoubleBattleMoves: ["scald", "fireblast", "icebeam", "psychic", "grassknot", "thunderwave", "slackoff", "trickroom", "protect", "psyshock"],
		tier: "New",
	},
	magnemite: {
		randomBattleMoves: ["thunderbolt", "thunderwave", "magnetrise", "substitute", "flashcannon", "hiddenpowerice", "voltswitch"],
		randomDoubleBattleMoves: ["thunderbolt", "thunderwave", "magnetrise", "substitute", "flashcannon", "hiddenpowerice", "voltswitch", "protect", "electroweb", "discharge"],
		tier: "LC",
	},
	magneton: {
		randomBattleMoves: ["thunderbolt", "substitute", "flashcannon", "hiddenpowerice", "voltswitch", "chargebeam", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["thunderbolt", "thunderwave", "magnetrise", "substitute", "flashcannon", "hiddenpowerice", "voltswitch", "protect", "electroweb", "discharge", "hiddenpowerfire"],
		eventPokemon: [
			{"generation": 3, "level": 30, "moves":["refresh", "doubleedge", "raindance", "thunder"]},
		],
		tier: "New",
	},
	magnezone: {
		randomBattleMoves: ["thunderbolt", "substitute", "flashcannon", "hiddenpowerice", "voltswitch", "chargebeam", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["thunderbolt", "substitute", "flashcannon", "hiddenpowerice", "voltswitch", "protect", "electroweb", "discharge", "hiddenpowerfire"],
		tier: "New",
	},
	farfetchd: {
		randomBattleMoves: ["bravebird", "swordsdance", "return", "leafblade", "roost", "nightslash"],
		randomDoubleBattleMoves: ["bravebird", "swordsdance", "return", "leafblade", "protect", "nightslash"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["yawn", "wish"]},
			{"generation": 3, "level": 36, "moves":["batonpass", "slash", "swordsdance", "aerialace"]},
		],
		tier: "Bank",
	},
	doduo: {
		randomBattleMoves: ["bravebird", "return", "doubleedge", "roost", "quickattack", "pursuit"],
		randomDoubleBattleMoves: ["bravebird", "return", "doubleedge", "quickattack", "protect"],
		tier: "Bank-LC",
	},
	dodrio: {
		randomBattleMoves: ["bravebird", "return", "swordsdance", "roost", "quickattack", "knockoff", "jumpkick"],
		randomDoubleBattleMoves: ["bravebird", "return", "doubleedge", "quickattack", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 34, "moves":["batonpass", "drillpeck", "agility", "triattack"]},
		],
		tier: "Bank",
	},
	seel: {
		randomBattleMoves: ["surf", "icebeam", "aquajet", "protect", "rest", "toxic", "drillrun"],
		randomDoubleBattleMoves: ["surf", "icebeam", "aquajet", "protect", "rest", "toxic", "fakeout", "drillrun", "icywind"],
		eventPokemon: [
			{"generation": 3, "level": 23, "abilities":["thickfat"], "moves":["helpinghand", "surf", "safeguard", "icebeam"]},
		],
		tier: "Bank-LC",
	},
	dewgong: {
		randomBattleMoves: ["surf", "icebeam", "perishsong", "encore", "toxic", "protect"],
		randomDoubleBattleMoves: ["surf", "icebeam", "protect", "perishsong", "fakeout", "encore", "toxic"],
		tier: "Bank",
	},
	grimer: {
		randomBattleMoves: ["curse", "gunkshot", "poisonjab", "shadowsneak", "painsplit", "icepunch", "firepunch", "memento"],
		randomDoubleBattleMoves: ["gunkshot", "poisonjab", "shadowsneak", "protect", "icepunch", "firepunch"],
		eventPokemon: [
			{"generation": 3, "level": 23, "moves":["helpinghand", "sludgebomb", "shadowpunch", "minimize"]},
		],
		tier: "Bank-LC",
	},
	grimeralola: {
		tier: "LC",
	},
	muk: {
		randomBattleMoves: ["curse", "gunkshot", "poisonjab", "shadowsneak", "icepunch", "firepunch", "memento"],
		randomDoubleBattleMoves: ["gunkshot", "poisonjab", "shadowsneak", "protect", "icepunch", "firepunch", "brickbreak"],
		tier: "Bank",
	},
	mukalola: {
		randomBattleMoves: ["curse", "gunkshot", "knockoff", "poisonjab", "shadowsneak", "stoneedge"],
		tier: "New",
	},
	shellder: {
		randomBattleMoves: ["shellsmash", "hydropump", "razorshell", "rockblast", "iciclespear", "rapidspin"],
		randomDoubleBattleMoves: ["shellsmash", "hydropump", "razorshell", "rockblast", "iciclespear", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 24, "gender": "F", "nature": "Brave", "ivs": {"hp": 5, "atk": 19, "def": 18, "spa": 5, "spd": 11, "spe": 13}, "abilities":["shellarmor"], "moves":["withdraw", "iciclespear", "supersonic", "aurorabeam"]},
			{"generation": 3, "level": 10, "gender": "M", "abilities":["shellarmor"], "moves":["tackle", "withdraw", "iciclespear"]},
			{"generation": 3, "level": 29, "abilities":["shellarmor"], "moves":["refresh", "takedown", "surf", "aurorabeam"]},
		],
		tier: "LC",
	},
	cloyster: {
		randomBattleMoves: ["shellsmash", "hydropump", "rockblast", "iciclespear", "iceshard", "rapidspin", "spikes", "toxicspikes"],
		randomDoubleBattleMoves: ["shellsmash", "hydropump", "razorshell", "rockblast", "iciclespear", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 30, "gender": "M", "nature": "Naughty", "isHidden": false, "abilities":["skilllink"], "moves":["iciclespear", "rockblast", "hiddenpower", "razorshell"]},
		],
		tier: "New",
	},
	gastly: {
		randomBattleMoves: ["shadowball", "sludgebomb", "hiddenpowerfighting", "thunderbolt", "substitute", "disable", "painsplit", "hypnosis", "gigadrain", "trick", "dazzlinggleam"],
		randomDoubleBattleMoves: ["shadowball", "sludgebomb", "hiddenpowerfighting", "thunderbolt", "substitute", "disable", "taunt", "hypnosis", "gigadrain", "trick", "dazzlinggleam", "protect"],
		tier: "LC",
	},
	haunter: {
		randomBattleMoves: ["shadowball", "sludgebomb", "dazzlinggleam", "substitute", "destinybond"],
		randomDoubleBattleMoves: ["shadowball", "sludgebomb", "hiddenpowerfighting", "thunderbolt", "substitute", "disable", "taunt", "hypnosis", "gigadrain", "trick", "dazzlinggleam", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 30, "moves":["confuseray", "suckerpunch", "shadowpunch", "payback"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	gengar: {
		randomBattleMoves: ["shadowball", "sludgewave", "focusblast", "substitute", "disable", "painsplit", "willowisp"],
		randomDoubleBattleMoves: ["shadowball", "sludgebomb", "focusblast", "substitute", "disable", "taunt", "hypnosis", "willowisp", "dazzlinggleam", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 23, "gender": "F", "nature": "Hardy", "ivs": {"hp": 19, "atk": 14, "def": 0, "spa": 14, "spd": 17, "spe": 27}, "moves":["spite", "curse", "nightshade", "confuseray"]},
			{"generation": 6, "level": 25, "nature": "Timid", "moves":["psychic", "confuseray", "suckerpunch", "shadowpunch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 25, "moves":["nightshade", "confuseray", "suckerpunch", "shadowpunch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "moves":["shadowball", "sludgebomb", "willowisp", "destinybond"], "pokeball": "cherishball"},
			{"generation": 6, "level": 25, "shiny": true, "moves":["shadowball", "sludgewave", "confuseray", "astonish"], "pokeball": "duskball"},
			{"generation": 6, "level": 50, "shiny": true, "gender": "M", "moves":["meanlook", "hypnosis", "psychic", "hyperbeam"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["meanlook", "hypnosis", "psychic", "hyperbeam"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	gengarmega: {
		randomBattleMoves: ["shadowball", "sludgewave", "focusblast", "taunt", "destinybond", "disable", "perishsong", "protect"],
		randomDoubleBattleMoves: ["shadowball", "sludgebomb", "focusblast", "substitute", "disable", "taunt", "hypnosis", "willowisp", "dazzlinggleam", "protect"],
		requiredItem: "Gengarite",
		tier: "Uber",
	},
	onix: {
		randomBattleMoves: ["stealthrock", "earthquake", "stoneedge", "dragontail", "curse"],
		randomDoubleBattleMoves: ["stealthrock", "earthquake", "stoneedge", "rockslide", "protect", "explosion"],
		tier: "Bank-LC",
	},
	steelix: {
		randomBattleMoves: ["stealthrock", "earthquake", "ironhead", "roar", "toxic", "rockslide"],
		randomDoubleBattleMoves: ["stealthrock", "earthquake", "ironhead", "rockslide", "protect", "explosion"],
		tier: "Bank",
	},
	steelixmega: {
		randomBattleMoves: ["stealthrock", "earthquake", "heavyslam", "roar", "toxic", "dragontail"],
		randomDoubleBattleMoves: ["stealthrock", "earthquake", "heavyslam", "rockslide", "protect", "explosion"],
		requiredItem: "Steelixite",
		tier: "Unreleased",
	},
	drowzee: {
		randomBattleMoves: ["psychic", "seismictoss", "thunderwave", "wish", "protect", "toxic", "shadowball", "trickroom", "calmmind", "dazzlinggleam"],
		randomDoubleBattleMoves: ["psychic", "seismictoss", "thunderwave", "wish", "protect", "hypnosis", "shadowball", "trickroom", "calmmind", "dazzlinggleam", "toxic"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["insomnia"], "moves":["bellydrum", "wish"]},
		],
		tier: "LC",
	},
	hypno: {
		randomBattleMoves: ["psychic", "seismictoss", "foulplay", "wish", "protect", "thunderwave", "toxic"],
		randomDoubleBattleMoves: ["psychic", "seismictoss", "thunderwave", "wish", "protect", "hypnosis", "trickroom", "dazzlinggleam", "foulplay"],
		eventPokemon: [
			{"generation": 3, "level": 34, "abilities":["insomnia"], "moves":["batonpass", "psychic", "meditate", "shadowball"]},
		],
		tier: "New",
	},
	krabby: {
		randomBattleMoves: ["crabhammer", "swordsdance", "agility", "rockslide", "substitute", "xscissor", "superpower", "knockoff"],
		randomDoubleBattleMoves: ["crabhammer", "swordsdance", "rockslide", "substitute", "xscissor", "superpower", "knockoff", "protect"],
		tier: "Bank-LC",
	},
	kingler: {
		randomBattleMoves: ["crabhammer", "xscissor", "rockslide", "swordsdance", "agility", "superpower", "knockoff"],
		randomDoubleBattleMoves: ["crabhammer", "xscissor", "rockslide", "substitute", "superpower", "knockoff", "protect", "wideguard"],
		tier: "Bank",
	},
	voltorb: {
		randomBattleMoves: ["voltswitch", "thunderbolt", "taunt", "foulplay", "hiddenpowerice"],
		randomDoubleBattleMoves: ["voltswitch", "thunderbolt", "taunt", "foulplay", "hiddenpowerice", "protect", "thunderwave"],
		eventPokemon: [
			{"generation": 3, "level": 19, "moves":["refresh", "mirrorcoat", "spark", "swift"]},
		],
		tier: "Bank-LC",
	},
	electrode: {
		randomBattleMoves: ["voltswitch", "thunderbolt", "taunt", "foulplay", "hiddenpowergrass", "signalbeam"],
		randomDoubleBattleMoves: ["voltswitch", "discharge", "taunt", "foulplay", "hiddenpowerice", "protect", "thunderwave"],
		tier: "Bank",
	},
	exeggcute: {
		randomBattleMoves: ["substitute", "leechseed", "gigadrain", "psychic", "sleeppowder", "stunspore", "hiddenpowerfire", "synthesis"],
		randomDoubleBattleMoves: ["substitute", "leechseed", "gigadrain", "psychic", "sleeppowder", "stunspore", "hiddenpowerfire", "protect", "trickroom"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["sweetscent", "wish"]},
		],
		tier: "LC",
	},
	exeggutor: {
		randomBattleMoves: ["substitute", "leechseed", "gigadrain", "psychic", "sleeppowder", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["substitute", "leechseed", "gigadrain", "psychic", "sleeppowder", "hiddenpowerfire", "protect", "trickroom", "psyshock"],
		eventPokemon: [
			{"generation": 3, "level": 46, "moves":["refresh", "psychic", "hypnosis", "ancientpower"]},
		],
		tier: "Bank",
	},
	exeggutoralola: {
		randomBattleMoves: ["dracometeor", "leafstorm", "flamethrower", "psyshock"],
		tier: "New",
	},
	cubone: {
		randomBattleMoves: ["substitute", "bonemerang", "doubleedge", "rockslide", "firepunch", "earthquake"],
		randomDoubleBattleMoves: ["substitute", "bonemerang", "doubleedge", "rockslide", "firepunch", "earthquake", "protect"],
		tier: "LC",
	},
	marowak: {
		randomBattleMoves: ["bonemerang", "earthquake", "knockoff", "doubleedge", "stoneedge", "stealthrock", "substitute"],
		randomDoubleBattleMoves: ["substitute", "bonemerang", "doubleedge", "rockslide", "firepunch", "earthquake", "protect", "swordsdance"],
		eventPokemon: [
			{"generation": 3, "level": 44, "moves":["sing", "earthquake", "swordsdance", "rockslide"]},
		],
		tier: "Bank",
	},
	marowakalola: {
		randomBattleMoves: ["flamecharge", "shadowbone", "bonemerang", "willowisp", "stoneedge", "flareblitz", "substitute"],
		tier: "New",
	},
	tyrogue: {
		randomBattleMoves: ["highjumpkick", "rapidspin", "fakeout", "bulletpunch", "machpunch", "toxic", "counter"],
		randomDoubleBattleMoves: ["highjumpkick", "fakeout", "bulletpunch", "machpunch", "helpinghand", "protect"],
		tier: "Bank-LC",
	},
	hitmonlee: {
		randomBattleMoves: ["highjumpkick", "knockoff", "stoneedge", "rapidspin", "machpunch", "poisonjab", "fakeout"],
		randomDoubleBattleMoves: ["knockoff", "rockslide", "machpunch", "fakeout", "highjumpkick", "earthquake", "blazekick", "wideguard", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 38, "abilities":["limber"], "moves":["refresh", "highjumpkick", "mindreader", "megakick"]},
		],
		tier: "Bank",
	},
	hitmonchan: {
		randomBattleMoves: ["bulkup", "drainpunch", "icepunch", "firepunch", "machpunch", "rapidspin"],
		randomDoubleBattleMoves: ["fakeout", "drainpunch", "icepunch", "firepunch", "machpunch", "earthquake", "rockslide", "protect", "thunderpunch"],
		eventPokemon: [
			{"generation": 3, "level": 38, "abilities":["keeneye"], "moves":["helpinghand", "skyuppercut", "mindreader", "megapunch"]},
		],
		tier: "Bank",
	},
	hitmontop: {
		randomBattleMoves: ["suckerpunch", "machpunch", "rapidspin", "closecombat", "toxic"],
		randomDoubleBattleMoves: ["fakeout", "feint", "suckerpunch", "closecombat", "helpinghand", "machpunch", "wideguard"],
		eventPokemon: [
			{"generation": 5, "level": 55, "gender": "M", "nature": "Adamant", "isHidden": false, "abilities":["intimidate"], "moves":["fakeout", "closecombat", "suckerpunch", "helpinghand"]},
		],
		tier: "Bank",
	},
	lickitung: {
		randomBattleMoves: ["wish", "protect", "dragontail", "curse", "bodyslam", "return", "powerwhip", "swordsdance", "earthquake", "toxic", "healbell"],
		randomDoubleBattleMoves: ["wish", "protect", "dragontail", "knockoff", "bodyslam", "return", "powerwhip", "swordsdance", "earthquake", "toxic", "healbell"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["healbell", "wish"]},
			{"generation": 3, "level": 38, "moves":["helpinghand", "doubleedge", "defensecurl", "rollout"]},
		],
		tier: "Bank-LC",
	},
	lickilicky: {
		randomBattleMoves: ["wish", "protect", "bodyslam", "knockoff", "dragontail", "healbell", "swordsdance", "explosion", "earthquake", "powerwhip"],
		randomDoubleBattleMoves: ["wish", "protect", "dragontail", "knockoff", "bodyslam", "rockslide", "powerwhip", "earthquake", "toxic", "healbell", "explosion"],
		tier: "Bank",
	},
	koffing: {
		randomBattleMoves: ["painsplit", "sludgebomb", "willowisp", "fireblast", "toxic", "clearsmog", "rest", "sleeptalk", "thunderbolt"],
		randomDoubleBattleMoves: ["protect", "sludgebomb", "willowisp", "fireblast", "toxic", "rest", "sleeptalk", "thunderbolt"],
		tier: "Bank-LC",
	},
	weezing: {
		randomBattleMoves: ["painsplit", "sludgebomb", "willowisp", "fireblast", "protect", "toxicspikes"],
		randomDoubleBattleMoves: ["protect", "sludgebomb", "willowisp", "fireblast", "toxic", "painsplit", "thunderbolt", "explosion"],
		tier: "Bank",
	},
	rhyhorn: {
		randomBattleMoves: ["stoneedge", "earthquake", "aquatail", "megahorn", "stealthrock", "rockblast", "rockpolish"],
		randomDoubleBattleMoves: ["stoneedge", "earthquake", "aquatail", "megahorn", "stealthrock", "rockslide", "protect"],
		tier: "LC",
	},
	rhydon: {
		randomBattleMoves: ["stealthrock", "earthquake", "rockblast", "roar", "swordsdance", "stoneedge", "megahorn", "rockpolish"],
		randomDoubleBattleMoves: ["stoneedge", "earthquake", "aquatail", "megahorn", "stealthrock", "rockslide", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 46, "moves":["helpinghand", "megahorn", "scaryface", "earthquake"]},
		],
		tier: "New",
	},
	rhyperior: {
		randomBattleMoves: ["stoneedge", "earthquake", "aquatail", "megahorn", "stealthrock", "rockblast", "rockpolish", "dragontail"],
		randomDoubleBattleMoves: ["stoneedge", "earthquake", "hammerarm", "megahorn", "stealthrock", "rockslide", "protect"],
		tier: "New",
	},
	happiny: {
		randomBattleMoves: ["aromatherapy", "toxic", "thunderwave", "counter", "endeavor", "lightscreen", "fireblast"],
		randomDoubleBattleMoves: ["aromatherapy", "toxic", "thunderwave", "helpinghand", "swagger", "lightscreen", "fireblast", "protect"],
		tier: "LC",
	},
	chansey: {
		randomBattleMoves: ["softboiled", "healbell", "stealthrock", "thunderwave", "toxic", "seismictoss", "wish", "protect", "counter"],
		randomDoubleBattleMoves: ["aromatherapy", "toxic", "thunderwave", "helpinghand", "softboiled", "lightscreen", "seismictoss", "protect", "wish"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["sweetscent", "wish"]},
			{"generation": 3, "level": 10, "moves":["pound", "growl", "tailwhip", "refresh"]},
			{"generation": 3, "level": 39, "moves":["sweetkiss", "thunderbolt", "softboiled", "skillswap"]},
		],
		tier: "New",
	},
	blissey: {
		randomBattleMoves: ["toxic", "flamethrower", "seismictoss", "softboiled", "wish", "healbell", "protect", "thunderwave", "stealthrock"],
		randomDoubleBattleMoves: ["wish", "softboiled", "protect", "toxic", "aromatherapy", "seismictoss", "helpinghand", "thunderwave", "flamethrower", "icebeam"],
		eventPokemon: [
			{"generation": 5, "level": 10, "isHidden": true, "moves":["pound", "growl", "tailwhip", "refresh"]},
		],
		tier: "New",
	},
	tangela: {
		randomBattleMoves: ["gigadrain", "sleeppowder", "hiddenpowerfire", "hiddenpowerice", "leechseed", "knockoff", "leafstorm", "sludgebomb", "synthesis"],
		randomDoubleBattleMoves: ["gigadrain", "sleeppowder", "hiddenpowerrock", "hiddenpowerice", "leechseed", "knockoff", "leafstorm", "stunspore", "protect", "hiddenpowerfire"],
		eventPokemon: [
			{"generation": 3, "level": 30, "abilities":["chlorophyll"], "moves":["morningsun", "solarbeam", "sunnyday", "ingrain"]},
		],
		tier: "Bank",
	},
	tangrowth: {
		randomBattleMoves: ["gigadrain", "leafstorm", "knockoff", "earthquake", "hiddenpowerfire", "rockslide", "sleeppowder", "leechseed", "synthesis"],
		randomDoubleBattleMoves: ["gigadrain", "sleeppowder", "hiddenpowerice", "leechseed", "knockoff", "ragepowder", "focusblast", "protect", "powerwhip", "earthquake"],
		eventPokemon: [
			{"generation": 4, "level": 50, "gender": "M", "nature": "Brave", "moves":["sunnyday", "morningsun", "ancientpower", "naturalgift"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	kangaskhan: {
		randomBattleMoves: ["return", "suckerpunch", "earthquake", "drainpunch", "crunch", "fakeout"],
		randomDoubleBattleMoves: ["fakeout", "return", "suckerpunch", "earthquake", "doubleedge", "drainpunch", "crunch", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["earlybird"], "moves":["yawn", "wish"]},
			{"generation": 3, "level": 10, "abilities":["earlybird"], "moves":["cometpunch", "leer", "bite"]},
			{"generation": 3, "level": 35, "abilities":["earlybird"], "moves":["sing", "earthquake", "tailwhip", "dizzypunch"]},
			{"generation": 6, "level": 50, "isHidden": false, "abilities":["scrappy"], "moves":["fakeout", "return", "earthquake", "suckerpunch"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	kangaskhanmega: {
		randomBattleMoves: ["fakeout", "return", "suckerpunch", "earthquake", "poweruppunch", "crunch"],
		randomDoubleBattleMoves: ["fakeout", "return", "suckerpunch", "earthquake", "doubleedge", "poweruppunch", "drainpunch", "crunch", "protect"],
		requiredItem: "Kangaskhanite",
		tier: "Uber",
	},
	horsea: {
		randomBattleMoves: ["hydropump", "icebeam", "substitute", "hiddenpowergrass", "raindance"],
		randomDoubleBattleMoves: ["hydropump", "icebeam", "substitute", "hiddenpowergrass", "raindance", "muddywater", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": true, "isHidden": false, "moves":["bubble"]},
		],
		tier: "LC",
	},
	seadra: {
		randomBattleMoves: ["hydropump", "icebeam", "agility", "substitute", "hiddenpowergrass"],
		randomDoubleBattleMoves: ["hydropump", "icebeam", "substitute", "hiddenpowergrass", "agility", "muddywater", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 45, "abilities":["poisonpoint"], "moves":["leer", "watergun", "twister", "agility"]},
		],
		tier: "NFE",
	},
	kingdra: {
		randomBattleMoves: ["dragondance", "waterfall", "outrage", "ironhead", "substitute", "raindance", "hydropump", "dracometeor"],
		randomDoubleBattleMoves: ["hydropump", "icebeam", "focusenergy", "dracometeor", "dragonpulse", "muddywater", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 50, "abilities":["swiftswim"], "moves":["leer", "watergun", "twister", "agility"]},
			{"generation": 5, "level": 50, "gender": "M", "nature": "Timid", "ivs": {"hp": 31, "atk": 17, "def": 8, "spa": 31, "spd": 11, "spe": 31}, "isHidden": false, "abilities":["swiftswim"], "moves":["dracometeor", "muddywater", "dragonpulse", "protect"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	goldeen: {
		randomBattleMoves: ["waterfall", "megahorn", "knockoff", "drillrun", "icebeam"],
		randomDoubleBattleMoves: ["waterfall", "megahorn", "knockoff", "drillrun", "icebeam", "protect"],
		tier: "LC",
	},
	seaking: {
		randomBattleMoves: ["waterfall", "megahorn", "knockoff", "drillrun", "scald", "icebeam"],
		randomDoubleBattleMoves: ["waterfall", "surf", "megahorn", "knockoff", "drillrun", "icebeam", "icywind", "protect"],
		tier: "New",
	},
	staryu: {
		randomBattleMoves: ["scald", "thunderbolt", "icebeam", "rapidspin", "recover", "dazzlinggleam", "hydropump"],
		randomDoubleBattleMoves: ["scald", "thunderbolt", "icebeam", "protect", "recover", "dazzlinggleam", "hydropump"],
		eventPokemon: [
			{"generation": 3, "level": 50, "moves":["minimize", "lightscreen", "cosmicpower", "hydropump"]},
			{"generation": 3, "level": 18, "nature": "Timid", "ivs": {"hp": 10, "atk": 3, "def": 22, "spa": 24, "spd": 3, "spe": 18}, "abilities":["illuminate"], "moves":["harden", "watergun", "rapidspin", "recover"]},
		],
		tier: "LC",
	},
	starmie: {
		randomBattleMoves: ["thunderbolt", "icebeam", "rapidspin", "recover", "psyshock", "scald", "hydropump"],
		randomDoubleBattleMoves: ["surf", "thunderbolt", "icebeam", "protect", "recover", "psychic", "psyshock", "scald", "hydropump"],
		eventPokemon: [
			{"generation": 3, "level": 41, "moves":["refresh", "waterfall", "icebeam", "recover"]},
		],
		tier: "New",
	},
	mimejr: {
		randomBattleMoves: ["batonpass", "psychic", "thunderwave", "hiddenpowerfighting", "healingwish", "nastyplot", "thunderbolt", "encore"],
		randomDoubleBattleMoves: ["fakeout", "psychic", "thunderwave", "hiddenpowerfighting", "healingwish", "nastyplot", "thunderbolt", "encore", "icywind", "protect"],
		tier: "Bank-LC",
	},
	mrmime: {
		randomBattleMoves: ["nastyplot", "psychic", "psyshock", "dazzlinggleam", "shadowball", "batonpass", "focusblast", "healingwish", "encore"],
		randomDoubleBattleMoves: ["fakeout", "thunderwave", "hiddenpowerfighting", "teeterdance", "thunderbolt", "encore", "icywind", "protect", "wideguard", "dazzlinggleam"],
		eventPokemon: [
			{"generation": 3, "level": 42, "abilities":["soundproof"], "moves":["followme", "psychic", "encore", "thunderpunch"]},
		],
		tier: "Bank",
	},
	scyther: {
		randomBattleMoves: ["swordsdance", "roost", "bugbite", "quickattack", "brickbreak", "aerialace", "batonpass", "uturn", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "protect", "bugbite", "quickattack", "brickbreak", "aerialace", "feint", "uturn", "knockoff"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["swarm"], "moves":["quickattack", "leer", "focusenergy"]},
			{"generation": 3, "level": 40, "abilities":["swarm"], "moves":["morningsun", "razorwind", "silverwind", "slash"]},
			{"generation": 5, "level": 30, "isHidden": false, "moves":["agility", "wingattack", "furycutter", "slash"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	scizor: {
		randomBattleMoves: ["swordsdance", "bulletpunch", "bugbite", "superpower", "uturn", "pursuit", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "roost", "bulletpunch", "bugbite", "superpower", "uturn", "protect", "feint", "knockoff"],
		eventPokemon: [
			{"generation": 3, "level": 50, "gender": "M", "abilities":["swarm"], "moves":["furycutter", "metalclaw", "swordsdance", "slash"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Adamant", "abilities":["swarm"], "moves":["xscissor", "swordsdance", "irondefense", "agility"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "abilities":["technician"], "moves":["bulletpunch", "bugbite", "roost", "swordsdance"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["leer", "focusenergy", "pursuit", "steelwing"]},
			{"generation": 6, "level": 50, "gender": "M", "isHidden": false, "moves":["xscissor", "nightslash", "doublehit", "ironhead"], "pokeball": "cherishball"},
			{"generation": 6, "level": 25, "nature": "Adamant", "isHidden": false, "abilities":["technician"], "moves":["aerialace", "falseswipe", "agility", "furycutter"], "pokeball": "cherishball"},
			{"generation": 6, "level": 25, "isHidden": false, "moves":["metalclaw", "falseswipe", "agility", "furycutter"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "isHidden": false, "abilities":["technician"], "moves":["bulletpunch", "swordsdance", "roost", "uturn"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	scizormega: {
		randomBattleMoves: ["swordsdance", "roost", "bulletpunch", "bugbite", "superpower", "uturn", "batonpass", "pursuit", "defog", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "roost", "bulletpunch", "bugbite", "superpower", "uturn", "protect", "feint", "knockoff"],
		requiredItem: "Scizorite",
		tier: "New",
	},
	smoochum: {
		randomBattleMoves: ["icebeam", "psychic", "hiddenpowerfighting", "trick", "shadowball", "grassknot"],
		randomDoubleBattleMoves: ["icebeam", "psychic", "hiddenpowerfighting", "trick", "shadowball", "grassknot", "fakeout", "protect"],
		tier: "Bank-LC",
	},
	jynx: {
		randomBattleMoves: ["icebeam", "psychic", "focusblast", "trick", "nastyplot", "lovelykiss", "substitute", "psyshock"],
		randomDoubleBattleMoves: ["icebeam", "psychic", "hiddenpowerfighting", "shadowball", "protect", "lovelykiss", "substitute", "psyshock"],
		tier: "Bank",
	},
	elekid: {
		randomBattleMoves: ["thunderbolt", "crosschop", "voltswitch", "substitute", "icepunch", "psychic", "hiddenpowergrass"],
		randomDoubleBattleMoves: ["thunderbolt", "crosschop", "voltswitch", "substitute", "icepunch", "psychic", "hiddenpowergrass", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 20, "moves":["icepunch", "firepunch", "thunderpunch", "crosschop"]},
		],
		tier: "LC",
	},
	electabuzz: {
		randomBattleMoves: ["thunderbolt", "voltswitch", "substitute", "hiddenpowerice", "hiddenpowergrass", "focusblast", "psychic"],
		randomDoubleBattleMoves: ["thunderbolt", "crosschop", "voltswitch", "substitute", "icepunch", "psychic", "hiddenpowergrass", "protect", "focusblast", "discharge"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["quickattack", "leer", "thunderpunch"]},
			{"generation": 3, "level": 43, "moves":["followme", "crosschop", "thunderwave", "thunderbolt"]},
			{"generation": 4, "level": 30, "gender": "M", "nature": "Naughty", "moves":["lowkick", "shockwave", "lightscreen", "thunderpunch"]},
			{"generation": 5, "level": 30, "isHidden": false, "moves":["lowkick", "swift", "shockwave", "lightscreen"], "pokeball": "cherishball"},
			{"generation": 6, "level": 30, "gender": "M", "isHidden": true, "moves":["lowkick", "shockwave", "lightscreen", "thunderpunch"], "pokeball": "cherishball"},
		],
		tier: "NFE",
	},
	electivire: {
		randomBattleMoves: ["wildcharge", "crosschop", "icepunch", "flamethrower", "earthquake", "voltswitch"],
		randomDoubleBattleMoves: ["wildcharge", "crosschop", "icepunch", "substitute", "flamethrower", "earthquake", "protect", "followme"],
		eventPokemon: [
			{"generation": 4, "level": 50, "gender": "M", "nature": "Adamant", "moves":["thunderpunch", "icepunch", "crosschop", "earthquake"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Serious", "moves":["lightscreen", "thunderpunch", "discharge", "thunderbolt"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	magby: {
		randomBattleMoves: ["flareblitz", "substitute", "fireblast", "hiddenpowergrass", "hiddenpowerice", "crosschop", "thunderpunch", "overheat"],
		tier: "LC",
	},
	magmar: {
		randomBattleMoves: ["flareblitz", "substitute", "fireblast", "hiddenpowergrass", "hiddenpowerice", "crosschop", "thunderpunch", "focusblast"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["leer", "smog", "firepunch", "leer"]},
			{"generation": 3, "level": 36, "moves":["followme", "fireblast", "crosschop", "thunderpunch"]},
			{"generation": 4, "level": 30, "gender": "M", "nature": "Quiet", "moves":["smokescreen", "firespin", "confuseray", "firepunch"]},
			{"generation": 5, "level": 30, "isHidden": false, "moves":["smokescreen", "feintattack", "firespin", "confuseray"], "pokeball": "cherishball"},
			{"generation": 6, "level": 30, "gender": "M", "isHidden": true, "moves":["smokescreen", "firespin", "confuseray", "firepunch"], "pokeball": "cherishball"},
		],
		tier: "NFE",
	},
	magmortar: {
		randomBattleMoves: ["fireblast", "focusblast", "hiddenpowergrass", "hiddenpowerice", "thunderbolt", "earthquake", "substitute"],
		randomDoubleBattleMoves: ["fireblast", "taunt", "focusblast", "hiddenpowergrass", "hiddenpowerice", "thunderbolt", "heatwave", "willowisp", "protect", "followme"],
		eventPokemon: [
			{"generation": 4, "level": 50, "gender": "F", "nature": "Modest", "moves":["flamethrower", "psychic", "hyperbeam", "solarbeam"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Hardy", "moves":["confuseray", "firepunch", "lavaplume", "flamethrower"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	pinsir: {
		randomBattleMoves: ["earthquake", "xscissor", "closecombat", "stoneedge", "stealthrock", "knockoff"],
		randomDoubleBattleMoves: ["protect", "swordsdance", "xscissor", "earthquake", "closecombat", "substitute", "rockslide"],
		eventPokemon: [
			{"generation": 3, "level": 35, "abilities":["hypercutter"], "moves":["helpinghand", "guillotine", "falseswipe", "submission"]},
			{"generation": 6, "level": 50, "gender": "F", "nature": "Adamant", "isHidden": false, "moves":["xscissor", "earthquake", "stoneedge", "return"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "nature": "Jolly", "isHidden": true, "moves":["earthquake", "swordsdance", "feint", "quickattack"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	pinsirmega: {
		randomBattleMoves: ["swordsdance", "earthquake", "closecombat", "quickattack", "return"],
		randomDoubleBattleMoves: ["feint", "protect", "swordsdance", "xscissor", "earthquake", "closecombat", "substitute", "quickattack", "return", "rockslide"],
		requiredItem: "Pinsirite",
		tier: "New",
	},
	tauros: {
		randomBattleMoves: ["rockclimb", "earthquake", "zenheadbutt", "rockslide", "doubleedge"],
		randomDoubleBattleMoves: ["return", "earthquake", "zenheadbutt", "rockslide", "stoneedge", "protect", "doubleedge"],
		eventPokemon: [
			{"generation": 3, "level": 25, "nature": "Docile", "ivs": {"hp": 14, "atk": 19, "def": 12, "spa": 17, "spd": 5, "spe": 26}, "abilities":["intimidate"], "moves":["rage", "hornattack", "scaryface", "pursuit"], "pokeball": "safariball"},
			{"generation": 3, "level": 10, "abilities":["intimidate"], "moves":["tackle", "tailwhip", "rage", "hornattack"]},
			{"generation": 3, "level": 46, "abilities":["intimidate"], "moves":["refresh", "earthquake", "tailwhip", "bodyslam"]},
		],
		tier: "New",
	},
	magikarp: {
		randomBattleMoves: ["bounce", "flail", "tackle", "hydropump"],
		eventPokemon: [
			{"generation": 4, "level": 5, "gender": "M", "nature": "Relaxed", "moves":["splash"]},
			{"generation": 4, "level": 6, "gender": "F", "nature": "Rash", "moves":["splash"]},
			{"generation": 4, "level": 7, "gender": "F", "nature": "Hardy", "moves":["splash"]},
			{"generation": 4, "level": 5, "gender": "F", "nature": "Lonely", "moves":["splash"]},
			{"generation": 4, "level": 4, "gender": "M", "nature": "Modest", "moves":["splash"]},
			{"generation": 5, "level": 99, "shiny": true, "gender": "M", "isHidden": false, "moves":["flail", "hydropump", "bounce", "splash"], "pokeball": "cherishball"},
			{"generation": 6, "level": 1, "shiny": 1, "isHidden": false, "moves":["splash", "celebrate", "happyhour"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	gyarados: {
		randomBattleMoves: ["dragondance", "waterfall", "earthquake", "bounce", "rest", "sleeptalk", "dragontail", "stoneedge", "substitute"],
		randomDoubleBattleMoves: ["dragondance", "waterfall", "earthquake", "bounce", "taunt", "protect", "thunderwave", "stoneedge", "substitute", "icefang"],
		eventPokemon: [
			{"generation": 6, "level": 50, "isHidden": false, "moves":["waterfall", "earthquake", "icefang", "dragondance"], "pokeball": "cherishball"},
			{"generation": 6, "level": 20, "shiny": true, "isHidden": false, "moves":["waterfall", "bite", "icefang", "ironhead"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	gyaradosmega: {
		randomBattleMoves: ["dragondance", "waterfall", "earthquake", "substitute", "icefang", "crunch"],
		randomDoubleBattleMoves: ["dragondance", "waterfall", "earthquake", "bounce", "taunt", "protect", "thunderwave", "stoneedge", "substitute", "icefang"],
		requiredItem: "Gyaradosite",
		tier: "New",
	},
	lapras: {
		randomBattleMoves: ["icebeam", "thunderbolt", "healbell", "toxic", "hydropump", "substitute"],
		randomDoubleBattleMoves: ["icebeam", "thunderbolt", "healbell", "hydropump", "surf", "substitute", "protect", "iceshard", "icywind"],
		eventPokemon: [
			{"generation": 3, "level": 44, "moves":["hydropump", "raindance", "blizzard", "healbell"]},
		],
		tier: "New",
	},
	ditto: {
		randomBattleMoves: ["transform"],
		tier: "New",
	},
	eevee: {
		randomBattleMoves: ["quickattack", "return", "bite", "batonpass", "irontail", "yawn", "protect", "wish"],
		randomDoubleBattleMoves: ["quickattack", "return", "bite", "helpinghand", "irontail", "yawn", "protect", "wish"],
		eventPokemon: [
			{"generation": 4, "level": 10, "gender": "F", "nature": "Lonely", "abilities":["adaptability"], "moves":["covet", "bite", "helpinghand", "attract"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "shiny": true, "gender": "M", "nature": "Hardy", "abilities":["adaptability"], "moves":["irontail", "trumpcard", "flail", "quickattack"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "gender": "F", "nature": "Hardy", "isHidden": false, "abilities":["adaptability"], "moves":["sing", "return", "echoedvoice", "attract"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "sandattack", "babydolleyes", "swift"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "shiny": true, "isHidden": true, "moves":["swift", "quickattack", "babydolleyes", "helpinghand"], "pokeball": "cherishball"},
			{"generation": 7, "level": 10, "nature": "Jolly", "isHidden": false, "moves":["celebrate", "sandattack", "babydolleyes"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	vaporeon: {
		randomBattleMoves: ["wish", "protect", "scald", "roar", "icebeam", "healbell", "batonpass"],
		randomDoubleBattleMoves: ["helpinghand", "wish", "protect", "scald", "muddywater", "icebeam", "toxic", "hydropump"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "watergun"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	jolteon: {
		randomBattleMoves: ["thunderbolt", "voltswitch", "hiddenpowerice", "batonpass", "substitute", "signalbeam"],
		randomDoubleBattleMoves: ["thunderbolt", "voltswitch", "hiddenpowergrass", "hiddenpowerice", "helpinghand", "protect", "substitute", "signalbeam"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "thundershock"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	flareon: {
		randomBattleMoves: ["flamecharge", "facade", "flareblitz", "superpower", "rest", "sleeptalk"],
		randomDoubleBattleMoves: ["flamecharge", "facade", "flareblitz", "superpower", "wish", "protect", "helpinghand"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "ember"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	espeon: {
		randomBattleMoves: ["psychic", "psyshock", "substitute", "shadowball", "calmmind", "morningsun", "batonpass", "dazzlinggleam"],
		randomDoubleBattleMoves: ["psychic", "psyshock", "substitute", "wish", "shadowball", "hiddenpowerfighting", "helpinghand", "protect", "dazzlinggleam"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["psybeam", "psychup", "psychic", "morningsun"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "confusion"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	umbreon: {
		randomBattleMoves: ["wish", "protect", "healbell", "toxic", "batonpass", "foulplay"],
		randomDoubleBattleMoves: ["moonlight", "wish", "protect", "healbell", "snarl", "foulplay", "helpinghand"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["feintattack", "meanlook", "screech", "moonlight"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "pursuit"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	leafeon: {
		randomBattleMoves: ["swordsdance", "leafblade", "substitute", "xscissor", "synthesis", "batonpass", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "leafblade", "substitute", "xscissor", "protect", "helpinghand", "knockoff"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "razorleaf"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	glaceon: {
		randomBattleMoves: ["icebeam", "hiddenpowerground", "shadowball", "healbell", "wish", "protect", "toxic"],
		randomDoubleBattleMoves: ["icebeam", "hiddenpowerground", "shadowball", "wish", "protect", "healbell", "helpinghand"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tailwhip", "tackle", "helpinghand", "sandattack"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "tailwhip", "sandattack", "icywind"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	porygon: {
		randomBattleMoves: ["triattack", "icebeam", "recover", "toxic", "thunderwave", "discharge", "trick"],
		eventPokemon: [
			{"generation": 5, "level": 10, "isHidden": true, "moves":["tackle", "conversion", "sharpen", "psybeam"]},
		],
		tier: "LC Uber",
	},
	porygon2: {
		randomBattleMoves: ["triattack", "icebeam", "recover", "toxic", "thunderwave", "thunderbolt"],
		randomDoubleBattleMoves: ["triattack", "icebeam", "discharge", "shadowball", "protect", "recover"],
		tier: "New",
	},
	porygonz: {
		randomBattleMoves: ["triattack", "darkpulse", "icebeam", "thunderbolt", "agility", "trick", "nastyplot"],
		randomDoubleBattleMoves: ["protect", "triattack", "darkpulse", "hiddenpowerfighting", "agility", "trick", "nastyplot"],
		tier: "New",
	},
	omanyte: {
		randomBattleMoves: ["shellsmash", "surf", "icebeam", "earthpower", "hiddenpowerelectric", "spikes", "toxicspikes", "stealthrock", "hydropump"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "abilities":["swiftswim"], "moves":["bubblebeam", "supersonic", "withdraw", "bite"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	omastar: {
		randomBattleMoves: ["shellsmash", "scald", "icebeam", "earthpower", "spikes", "stealthrock", "hydropump"],
		randomDoubleBattleMoves: ["shellsmash", "muddywater", "icebeam", "earthpower", "hiddenpowerelectric", "protect", "hydropump"],
		tier: "Bank",
	},
	kabuto: {
		randomBattleMoves: ["aquajet", "rockslide", "rapidspin", "stealthrock", "honeclaws", "waterfall", "toxic"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "abilities":["battlearmor"], "moves":["confuseray", "dig", "scratch", "harden"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	kabutops: {
		randomBattleMoves: ["aquajet", "stoneedge", "rapidspin", "swordsdance", "waterfall", "knockoff"],
		randomDoubleBattleMoves: ["aquajet", "stoneedge", "protect", "rockslide", "swordsdance", "waterfall", "superpower", "knockoff"],
		tier: "Bank",
	},
	aerodactyl: {
		randomBattleMoves: ["stealthrock", "taunt", "stoneedge", "earthquake", "defog", "roost", "doubleedge"],
		randomDoubleBattleMoves: ["wideguard", "taunt", "stoneedge", "rockslide", "earthquake", "aquatail", "protect", "icefang", "skydrop", "tailwind"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "abilities":["pressure"], "moves":["steelwing", "icefang", "firefang", "thunderfang"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	aerodactylmega: {
		randomBattleMoves: ["aquatail", "pursuit", "honeclaws", "stoneedge", "firefang", "aerialace", "roost"],
		randomDoubleBattleMoves: ["wideguard", "taunt", "stoneedge", "rockslide", "earthquake", "ironhead", "aerialace", "protect", "icefang", "skydrop", "tailwind"],
		requiredItem: "Aerodactylite",
		tier: "New",
	},
	munchlax: {
		randomBattleMoves: ["rest", "curse", "sleeptalk", "bodyslam", "earthquake", "return", "firepunch", "icepunch", "whirlwind", "toxic"],
		eventPokemon: [
			{"generation": 4, "level": 5, "moves":["metronome", "tackle", "defensecurl", "selfdestruct"]},
			{"generation": 4, "level": 5, "gender": "F", "nature": "Relaxed", "abilities":["thickfat"], "moves":["metronome", "odorsleuth", "tackle", "curse"], "pokeball": "cherishball"},
			{"generation": 7, "level": 5, "isHidden": false, "abilities":["thickfat"], "moves":["tackle", "metronome", "holdback", "happyhour"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	snorlax: {
		randomBattleMoves: ["rest", "curse", "sleeptalk", "bodyslam", "earthquake", "return", "firepunch", "crunch", "pursuit", "whirlwind"],
		randomDoubleBattleMoves: ["curse", "protect", "bodyslam", "earthquake", "return", "firepunch", "icepunch", "crunch", "selfdestruct"],
		eventPokemon: [
			{"generation": 3, "level": 43, "moves":["refresh", "fissure", "curse", "bodyslam"]},
		],
		tier: "New",
	},
	articuno: {
		randomBattleMoves: ["icebeam", "roost", "freezedry", "toxic", "substitute", "hurricane"],
		randomDoubleBattleMoves: ["freezedry", "roost", "protect", "substitute", "hurricane", "tailwind"],
		eventPokemon: [
			{"generation": 3, "level": 50, "shiny": 1, "moves":["mist", "agility", "mindreader", "icebeam"]},
			{"generation": 3, "level": 70, "moves":["agility", "mindreader", "icebeam", "reflect"]},
			{"generation": 3, "level": 50, "moves":["icebeam", "healbell", "extrasensory", "haze"]},
			{"generation": 4, "level": 60, "shiny": 1, "moves":["agility", "icebeam", "reflect", "roost"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["mist", "agility", "mindreader", "icebeam"]},
			{"generation": 6, "level": 70, "isHidden": false, "moves":["icebeam", "reflect", "hail", "tailwind"]},
			{"generation": 6, "level": 70, "isHidden": true, "moves":["freezedry", "icebeam", "hail", "reflect"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	zapdos: {
		randomBattleMoves: ["thunderbolt", "heatwave", "hiddenpowerice", "roost", "toxic", "uturn", "defog"],
		randomDoubleBattleMoves: ["thunderbolt", "heatwave", "hiddenpowergrass", "hiddenpowerice", "tailwind", "protect", "discharge"],
		eventPokemon: [
			{"generation": 3, "level": 50, "shiny": 1, "moves":["thunderwave", "agility", "detect", "drillpeck"]},
			{"generation": 3, "level": 70, "moves":["agility", "detect", "drillpeck", "charge"]},
			{"generation": 3, "level": 50, "moves":["thunderbolt", "extrasensory", "batonpass", "metalsound"]},
			{"generation": 4, "level": 60, "shiny": 1, "moves":["charge", "agility", "discharge", "roost"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["thunderwave", "agility", "detect", "drillpeck"]},
			{"generation": 6, "level": 70, "isHidden": false, "moves":["agility", "discharge", "raindance", "lightscreen"]},
			{"generation": 6, "level": 70, "isHidden": true, "moves":["discharge", "thundershock", "raindance", "agility"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	moltres: {
		randomBattleMoves: ["fireblast", "hiddenpowergrass", "roost", "substitute", "toxic", "willowisp", "hurricane"],
		randomDoubleBattleMoves: ["fireblast", "hiddenpowergrass", "airslash", "roost", "substitute", "protect", "uturn", "willowisp", "hurricane", "heatwave", "tailwind"],
		eventPokemon: [
			{"generation": 3, "level": 50, "shiny": 1, "moves":["firespin", "agility", "endure", "flamethrower"]},
			{"generation": 3, "level": 70, "moves":["agility", "endure", "flamethrower", "safeguard"]},
			{"generation": 3, "level": 50, "moves":["extrasensory", "morningsun", "willowisp", "flamethrower"]},
			{"generation": 4, "level": 60, "shiny": 1, "moves":["flamethrower", "safeguard", "airslash", "roost"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["firespin", "agility", "endure", "flamethrower"]},
			{"generation": 6, "level": 70, "isHidden": false, "moves":["safeguard", "airslash", "sunnyday", "heatwave"]},
			{"generation": 6, "level": 70, "isHidden": true, "moves":["skyattack", "heatwave", "sunnyday", "safeguard"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	dratini: {
		randomBattleMoves: ["dragondance", "outrage", "waterfall", "fireblast", "extremespeed", "dracometeor", "substitute"],
		tier: "LC",
	},
	dragonair: {
		randomBattleMoves: ["dragondance", "outrage", "waterfall", "fireblast", "extremespeed", "dracometeor", "substitute"],
		tier: "NFE",
	},
	dragonite: {
		randomBattleMoves: ["dragondance", "outrage", "firepunch", "extremespeed", "earthquake", "roost"],
		randomDoubleBattleMoves: ["dragondance", "firepunch", "extremespeed", "dragonclaw", "earthquake", "roost", "substitute", "superpower", "dracometeor", "protect", "skydrop"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["agility", "safeguard", "wingattack", "outrage"]},
			{"generation": 3, "level": 55, "moves":["healbell", "hyperbeam", "dragondance", "earthquake"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Mild", "moves":["dracometeor", "thunderbolt", "outrage", "dragondance"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "gender": "M", "isHidden": true, "moves":["extremespeed", "firepunch", "dragondance", "outrage"], "pokeball": "cherishball"},
			{"generation": 5, "level": 55, "gender": "M", "isHidden": true, "moves":["dragonrush", "safeguard", "wingattack", "thunderpunch"]},
			{"generation": 5, "level": 55, "gender": "M", "isHidden": true, "moves":["dragonrush", "safeguard", "wingattack", "extremespeed"]},
			{"generation": 5, "level": 50, "gender": "M", "nature": "Brave", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "moves":["fireblast", "safeguard", "outrage", "hyperbeam"], "pokeball": "cherishball"},
			{"generation": 6, "level": 55, "gender": "M", "isHidden": true, "moves":["dragondance", "outrage", "hurricane", "extremespeed"], "pokeball": "cherishball"},
			{"generation": 6, "level": 62, "gender": "M", "ivs": {"hp": 31, "def": 31, "spa": 31, "spd": 31}, "isHidden": false, "moves":["agility", "slam", "barrier", "hyperbeam"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	mewtwo: {
		randomBattleMoves: ["psystrike", "aurasphere", "fireblast", "icebeam", "calmmind", "recover"],
		randomDoubleBattleMoves: ["psystrike", "aurasphere", "fireblast", "icebeam", "calmmind", "substitute", "recover", "thunderbolt", "willowisp", "taunt", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "shiny": 1, "moves":["swift", "recover", "safeguard", "psychic"]},
			{"generation": 4, "level": 70, "shiny": 1, "moves":["psychocut", "amnesia", "powerswap", "guardswap"]},
			{"generation": 5, "level": 70, "isHidden": false, "moves":["psystrike", "shadowball", "aurasphere", "electroball"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "nature": "Timid", "ivs": {"spa": 31, "spe": 31}, "isHidden": true, "moves":["psystrike", "icebeam", "healpulse", "hurricane"], "pokeball": "cherishball"},
			{"generation": 6, "level": 70, "isHidden": false, "moves":["recover", "psychic", "barrier", "aurasphere"]},
			{"generation": 6, "level": 100, "shiny": true, "isHidden": true, "moves":["psystrike", "psychic", "recover", "aurasphere"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	mewtwomegax: {
		randomBattleMoves: ["bulkup", "drainpunch", "earthquake", "taunt", "stoneedge", "zenheadbutt", "icebeam"],
		requiredItem: "Mewtwonite X",
		tier: "Unreleased",
	},
	mewtwomegay: {
		randomBattleMoves: ["psystrike", "aurasphere", "shadowball", "fireblast", "icebeam", "calmmind", "recover", "willowisp", "taunt"],
		requiredItem: "Mewtwonite Y",
		tier: "Unreleased",
	},
	mew: {
		randomBattleMoves: ["defog", "roost", "willowisp", "knockoff", "taunt", "icebeam", "earthpower", "aurasphere", "stealthrock", "nastyplot", "psyshock", "batonpass"],
		randomDoubleBattleMoves: ["taunt", "willowisp", "transform", "roost", "psyshock", "nastyplot", "aurasphere", "fireblast", "icebeam", "thunderbolt", "protect", "fakeout", "helpinghand", "tailwind"],
		eventPokemon: [
			{"generation": 3, "level": 30, "shiny": 1, "moves":["pound", "transform", "megapunch", "metronome"]},
			{"generation": 3, "level": 10, "moves":["pound", "transform"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["fakeout"]},
			{"generation": 3, "level": 10, "moves":["fakeout"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["feintattack"]},
			{"generation": 3, "level": 10, "moves":["feintattack"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["hypnosis"]},
			{"generation": 3, "level": 10, "moves":["hypnosis"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["nightshade"]},
			{"generation": 3, "level": 10, "moves":["nightshade"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["roleplay"]},
			{"generation": 3, "level": 10, "moves":["roleplay"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["zapcannon"]},
			{"generation": 3, "level": 10, "moves":["zapcannon"]},
			{"generation": 4, "level": 50, "moves":["ancientpower", "metronome", "teleport", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["barrier", "metronome", "teleport", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["megapunch", "metronome", "teleport", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["amnesia", "metronome", "teleport", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["transform", "metronome", "teleport", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["psychic", "metronome", "teleport", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["synthesis", "return", "hypnosis", "teleport"], "pokeball": "cherishball"},
			{"generation": 4, "level": 5, "moves":["pound"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["pound"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	chikorita: {
		randomBattleMoves: ["reflect", "lightscreen", "aromatherapy", "grasswhistle", "leechseed", "toxic", "gigadrain", "synthesis"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "growl", "razorleaf"]},
			{"generation": 3, "level": 5, "moves":["tackle", "growl", "ancientpower", "frenzyplant"]},
			{"generation": 6, "level": 5, "isHidden": false, "moves":["tackle", "growl"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	bayleef: {
		randomBattleMoves: ["reflect", "lightscreen", "aromatherapy", "grasswhistle", "leechseed", "toxic", "gigadrain", "synthesis"],
		tier: "NFE",
	},
	meganium: {
		randomBattleMoves: ["reflect", "lightscreen", "aromatherapy", "leechseed", "toxic", "gigadrain", "synthesis", "dragontail"],
		randomDoubleBattleMoves: ["reflect", "lightscreen", "aromatherapy", "leechseed", "petalblizzard", "gigadrain", "synthesis", "dragontail", "healpulse", "toxic", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "isHidden": true, "moves":["solarbeam", "sunnyday", "synthesis", "bodyslam"]},
		],
		tier: "New",
	},
	cyndaquil: {
		randomBattleMoves: ["eruption", "fireblast", "flamethrower", "hiddenpowergrass", "hiddenpowerice"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "leer", "smokescreen"]},
			{"generation": 3, "level": 5, "moves":["tackle", "leer", "reversal", "blastburn"]},
			{"generation": 6, "level": 5, "isHidden": false, "moves":["tackle", "leer"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	quilava: {
		randomBattleMoves: ["eruption", "fireblast", "flamethrower", "hiddenpowergrass", "hiddenpowerice"],
		tier: "NFE",
	},
	typhlosion: {
		randomBattleMoves: ["eruption", "fireblast", "hiddenpowergrass", "extrasensory", "focusblast"],
		randomDoubleBattleMoves: ["eruption", "fireblast", "hiddenpowergrass", "extrasensory", "focusblast", "heatwave", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["quickattack", "flamewheel", "swift", "flamethrower"]},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["overheat", "flamewheel", "flamecharge", "swift"]},
		],
		tier: "New",
	},
	totodile: {
		randomBattleMoves: ["aquajet", "waterfall", "crunch", "icepunch", "superpower", "dragondance", "swordsdance"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "leer", "rage"]},
			{"generation": 3, "level": 5, "moves":["scratch", "leer", "crunch", "hydrocannon"]},
			{"generation": 6, "level": 5, "isHidden": false, "moves":["scratch", "leer"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	croconaw: {
		randomBattleMoves: ["aquajet", "waterfall", "crunch", "icepunch", "superpower", "dragondance", "swordsdance"],
		tier: "NFE",
	},
	feraligatr: {
		randomBattleMoves: ["aquajet", "waterfall", "crunch", "icepunch", "dragondance", "swordsdance", "earthquake"],
		randomDoubleBattleMoves: ["aquajet", "waterfall", "crunch", "icepunch", "dragondance", "swordsdance", "earthquake", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "isHidden": true, "moves":["icepunch", "crunch", "waterfall", "screech"]},
		],
		tier: "New",
	},
	sentret: {
		randomBattleMoves: ["superfang", "trick", "toxic", "uturn", "knockoff"],
		tier: "Bank-LC",
	},
	furret: {
		randomBattleMoves: ["uturn", "trick", "aquatail", "firepunch", "knockoff", "doubleedge"],
		randomDoubleBattleMoves: ["uturn", "suckerpunch", "icepunch", "firepunch", "knockoff", "doubleedge", "superfang", "followme", "helpinghand", "protect"],
		tier: "Bank",
	},
	hoothoot: {
		randomBattleMoves: ["reflect", "toxic", "roost", "whirlwind", "nightshade", "magiccoat"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "growl", "foresight"]},
		],
		tier: "Bank-LC",
	},
	noctowl: {
		randomBattleMoves: ["roost", "whirlwind", "airslash", "nightshade", "toxic", "defog"],
		randomDoubleBattleMoves: ["roost", "tailwind", "airslash", "hypervoice", "heatwave", "protect", "hypnosis"],
		tier: "Bank",
	},
	ledyba: {
		randomBattleMoves: ["roost", "agility", "lightscreen", "encore", "reflect", "knockoff", "swordsdance", "batonpass", "toxic"],
		eventPokemon: [
			{"generation": 3, "level": 10, "moves":["refresh", "psybeam", "aerialace", "supersonic"]},
		],
		tier: "LC",
	},
	ledian: {
		randomBattleMoves: ["roost", "lightscreen", "encore", "reflect", "knockoff", "toxic", "uturn"],
		randomDoubleBattleMoves: ["protect", "lightscreen", "encore", "reflect", "knockoff", "bugbuzz", "uturn", "tailwind"],
		tier: "New",
	},
	spinarak: {
		randomBattleMoves: ["agility", "toxic", "xscissor", "toxicspikes", "poisonjab", "batonpass", "stickyweb"],
		eventPokemon: [
			{"generation": 3, "level": 14, "moves":["refresh", "dig", "signalbeam", "nightshade"]},
		],
		tier: "LC",
	},
	ariados: {
		randomBattleMoves: ["megahorn", "toxicspikes", "poisonjab", "suckerpunch", "stickyweb"],
		randomDoubleBattleMoves: ["protect", "megahorn", "stringshot", "poisonjab", "stickyweb", "ragepowder"],
		tier: "New",
	},
	chinchou: {
		randomBattleMoves: ["voltswitch", "thunderbolt", "hiddenpowergrass", "hydropump", "icebeam", "surf", "thunderwave", "scald", "discharge", "healbell"],
		tier: "LC",
	},
	lanturn: {
		randomBattleMoves: ["voltswitch", "hiddenpowergrass", "hydropump", "icebeam", "thunderwave", "scald", "thunderbolt", "healbell", "toxic"],
		randomDoubleBattleMoves: ["thunderbolt", "hiddenpowergrass", "hydropump", "icebeam", "thunderwave", "scald", "discharge", "protect", "surf"],
		tier: "New",
	},
	togepi: {
		randomBattleMoves: ["protect", "fireblast", "toxic", "thunderwave", "softboiled", "dazzlinggleam"],
		eventPokemon: [
			{"generation": 3, "level": 20, "gender": "F", "abilities":["serenegrace"], "moves":["metronome", "charm", "sweetkiss", "yawn"]},
			{"generation": 3, "level": 25, "moves":["triattack", "followme", "ancientpower", "helpinghand"]},
		],
		tier: "LC",
	},
	togetic: {
		randomBattleMoves: ["nastyplot", "dazzlinggleam", "fireblast", "batonpass", "roost", "defog", "toxic", "thunderwave", "healbell"],
		tier: "New",
	},
	togekiss: {
		randomBattleMoves: ["roost", "thunderwave", "nastyplot", "airslash", "aurasphere", "batonpass", "healbell", "defog"],
		randomDoubleBattleMoves: ["roost", "thunderwave", "nastyplot", "airslash", "followme", "dazzlinggleam", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["extremespeed", "aurasphere", "airslash", "present"]},
		],
		tier: "New",
	},
	natu: {
		randomBattleMoves: ["thunderwave", "roost", "toxic", "reflect", "lightscreen", "uturn", "wish", "psychic", "nightshade"],
		eventPokemon: [
			{"generation": 3, "level": 22, "moves":["batonpass", "futuresight", "nightshade", "aerialace"]},
		],
		tier: "Bank-LC",
	},
	xatu: {
		randomBattleMoves: ["thunderwave", "toxic", "roost", "psychic", "uturn", "reflect", "lightscreen", "nightshade", "heatwave"],
		randomDoubleBattleMoves: ["thunderwave", "tailwind", "roost", "psychic", "uturn", "reflect", "lightscreen", "grassknot", "heatwave", "protect"],
		tier: "Bank",
	},
	mareep: {
		randomBattleMoves: ["reflect", "lightscreen", "thunderbolt", "discharge", "thunderwave", "toxic", "hiddenpowerice", "cottonguard", "powergem"],
		eventPokemon: [
			{"generation": 3, "level": 37, "gender": "F", "moves":["thunder", "thundershock", "thunderwave", "cottonspore"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "growl", "thundershock"]},
			{"generation": 3, "level": 17, "moves":["healbell", "thundershock", "thunderwave", "bodyslam"]},
			{"generation": 6, "level": 10, "isHidden": false, "moves":["holdback", "tackle", "thunderwave", "thundershock"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	flaaffy: {
		randomBattleMoves: ["reflect", "lightscreen", "thunderbolt", "discharge", "thunderwave", "toxic", "hiddenpowerice", "cottonguard", "powergem"],
		tier: "Bank-NFE",
	},
	ampharos: {
		randomBattleMoves: ["voltswitch", "reflect", "lightscreen", "focusblast", "thunderbolt", "toxic", "healbell", "hiddenpowerice"],
		randomDoubleBattleMoves: ["focusblast", "hiddenpowerice", "hiddenpowergrass", "thunderbolt", "discharge", "dragonpulse", "protect"],
		tier: "Bank",
	},
	ampharosmega: {
		randomBattleMoves: ["voltswitch", "focusblast", "agility", "thunderbolt", "healbell", "dragonpulse"],
		randomDoubleBattleMoves: ["focusblast", "hiddenpowerice", "hiddenpowergrass", "thunderbolt", "discharge", "dragonpulse", "protect"],
		requiredItem: "Ampharosite",
		tier: "Unreleased",
	},
	azurill: {
		randomBattleMoves: ["scald", "return", "bodyslam", "encore", "toxic", "protect", "knockoff"],
		tier: "Bank-LC",
	},
	marill: {
		randomBattleMoves: ["waterfall", "knockoff", "encore", "toxic", "aquajet", "superpower", "icepunch", "protect", "playrough", "poweruppunch"],
		tier: "NFE",
	},
	azumarill: {
		randomBattleMoves: ["waterfall", "aquajet", "playrough", "superpower", "bellydrum", "knockoff"],
		randomDoubleBattleMoves: ["waterfall", "aquajet", "playrough", "superpower", "bellydrum", "knockoff", "protect"],
		tier: "New",
	},
	bonsly: {
		randomBattleMoves: ["rockslide", "brickbreak", "doubleedge", "toxic", "stealthrock", "suckerpunch", "explosion"],
		tier: "LC",
	},
	sudowoodo: {
		randomBattleMoves: ["stoneedge", "earthquake", "suckerpunch", "woodhammer", "toxic", "stealthrock"],
		randomDoubleBattleMoves: ["stoneedge", "earthquake", "suckerpunch", "woodhammer", "explosion", "stealthrock", "rockslide", "helpinghand", "protect"],
		tier: "New",
	},
	hoppip: {
		randomBattleMoves: ["encore", "sleeppowder", "uturn", "toxic", "leechseed", "substitute", "protect"],
		tier: "Bank-LC",
	},
	skiploom: {
		randomBattleMoves: ["encore", "sleeppowder", "uturn", "toxic", "leechseed", "substitute", "protect"],
		tier: "Bank-NFE",
	},
	jumpluff: {
		randomBattleMoves: ["swordsdance", "sleeppowder", "uturn", "encore", "toxic", "acrobatics", "leechseed", "seedbomb", "substitute"],
		randomDoubleBattleMoves: ["encore", "sleeppowder", "uturn", "helpinghand", "leechseed", "gigadrain", "ragepowder", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 27, "gender": "M", "isHidden": true, "moves":["falseswipe", "sleeppowder", "bulletseed", "leechseed"]},
		],
		tier: "Bank",
	},
	aipom: {
		randomBattleMoves: ["fakeout", "return", "brickbreak", "seedbomb", "knockoff", "uturn", "icepunch", "irontail"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "tailwhip", "sandattack"]},
		],
		tier: "Bank-LC",
	},
	ambipom: {
		randomBattleMoves: ["fakeout", "return", "knockoff", "uturn", "switcheroo", "seedbomb", "lowkick"],
		randomDoubleBattleMoves: ["fakeout", "return", "knockoff", "uturn", "doublehit", "icepunch", "lowkick", "protect"],
		tier: "Bank",
	},
	sunkern: {
		randomBattleMoves: ["sunnyday", "gigadrain", "solarbeam", "hiddenpowerfire", "toxic", "earthpower", "leechseed"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["chlorophyll"], "moves":["absorb", "growth"]},
		],
		tier: "Bank-LC",
	},
	sunflora: {
		randomBattleMoves: ["sunnyday", "gigadrain", "solarbeam", "hiddenpowerfire", "earthpower"],
		randomDoubleBattleMoves: ["sunnyday", "gigadrain", "solarbeam", "hiddenpowerfire", "hiddenpowerice", "earthpower", "protect", "encore"],
		tier: "Bank",
	},
	yanma: {
		randomBattleMoves: ["bugbuzz", "airslash", "hiddenpowerground", "uturn", "protect", "gigadrain", "ancientpower"],
		tier: "Bank",
	},
	yanmega: {
		randomBattleMoves: ["bugbuzz", "airslash", "ancientpower", "uturn", "protect", "gigadrain"],
		tier: "Bank",
	},
	wooper: {
		randomBattleMoves: ["recover", "earthquake", "scald", "toxic", "stockpile", "yawn", "protect"],
		tier: "Bank-LC",
	},
	quagsire: {
		randomBattleMoves: ["recover", "earthquake", "scald", "toxic", "encore", "icebeam"],
		randomDoubleBattleMoves: ["icywind", "earthquake", "waterfall", "scald", "rockslide", "curse", "yawn", "icepunch", "protect"],
		tier: "Bank",
	},
	murkrow: {
		randomBattleMoves: ["substitute", "suckerpunch", "bravebird", "heatwave", "roost", "darkpulse", "thunderwave"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["insomnia"], "moves":["peck", "astonish"]},
		],
		tier: "LC Uber",
	},
	honchkrow: {
		randomBattleMoves: ["substitute", "superpower", "suckerpunch", "bravebird", "roost", "heatwave", "pursuit"],
		randomDoubleBattleMoves: ["substitute", "superpower", "suckerpunch", "bravebird", "roost", "heatwave", "protect"],
		tier: "New",
	},
	misdreavus: {
		randomBattleMoves: ["nastyplot", "thunderbolt", "dazzlinggleam", "willowisp", "shadowball", "taunt", "painsplit"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["growl", "psywave", "spite"]},
		],
		tier: "LC Uber",
	},
	mismagius: {
		randomBattleMoves: ["nastyplot", "substitute", "willowisp", "shadowball", "thunderbolt", "dazzlinggleam", "taunt", "painsplit", "destinybond"],
		randomDoubleBattleMoves: ["nastyplot", "substitute", "willowisp", "shadowball", "thunderbolt", "dazzlinggleam", "taunt", "protect"],
		tier: "New",
	},
	unown: {
		randomBattleMoves: ["hiddenpowerpsychic"],
		tier: "Bank",
	},
	wynaut: {
		randomBattleMoves: ["destinybond", "counter", "mirrorcoat", "encore"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["splash", "charm", "encore", "tickle"]},
		],
		tier: "Bank-LC",
	},
	wobbuffet: {
		randomBattleMoves: ["counter", "mirrorcoat", "encore", "destinybond", "safeguard"],
		eventPokemon: [
			{"generation": 3, "level": 5, "moves":["counter", "mirrorcoat", "safeguard", "destinybond"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["counter", "mirrorcoat", "safeguard", "destinybond"]},
			{"generation": 6, "level": 10, "gender": "M", "isHidden": false, "moves":["counter"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "gender": "M", "isHidden": false, "moves":["counter", "mirrorcoat"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	girafarig: {
		randomBattleMoves: ["psychic", "psyshock", "thunderbolt", "nastyplot", "batonpass", "substitute", "hypervoice"],
		randomDoubleBattleMoves: ["psychic", "psyshock", "thunderbolt", "nastyplot", "protect", "agility", "hypervoice"],
		tier: "Bank",
	},
	pineco: {
		randomBattleMoves: ["rapidspin", "toxicspikes", "spikes", "bugbite", "stealthrock"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "protect", "selfdestruct"]},
			{"generation": 3, "level": 20, "moves":["refresh", "pinmissile", "spikes", "counter"]},
		],
		tier: "Bank-LC",
	},
	forretress: {
		randomBattleMoves: ["rapidspin", "toxic", "spikes", "voltswitch", "stealthrock", "gyroball"],
		randomDoubleBattleMoves: ["rockslide", "drillrun", "toxic", "voltswitch", "stealthrock", "gyroball", "protect"],
		tier: "Bank",
	},
	dunsparce: {
		randomBattleMoves: ["coil", "rockslide", "bite", "headbutt", "glare", "bodyslam", "roost"],
		randomDoubleBattleMoves: ["coil", "rockslide", "bite", "headbutt", "glare", "bodyslam", "protect"],
		tier: "Bank",
	},
	gligar: {
		randomBattleMoves: ["stealthrock", "toxic", "roost", "defog", "earthquake", "uturn", "knockoff"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["poisonsting", "sandattack"]},
		],
		tier: "Bank",
	},
	gliscor: {
		randomBattleMoves: ["roost", "substitute", "taunt", "earthquake", "protect", "toxic", "stealthrock", "knockoff"],
		randomDoubleBattleMoves: ["tailwind", "substitute", "taunt", "earthquake", "protect", "stoneedge", "knockoff"],
		tier: "Bank",
	},
	snubbull: {
		randomBattleMoves: ["thunderwave", "firepunch", "crunch", "closecombat", "icepunch", "earthquake", "playrough"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "scaryface", "tailwhip", "charm"]},
		],
		tier: "LC",
	},
	granbull: {
		randomBattleMoves: ["thunderwave", "playrough", "crunch", "earthquake", "healbell"],
		randomDoubleBattleMoves: ["thunderwave", "playrough", "crunch", "earthquake", "snarl", "rockslide", "protect"],
		tier: "New",
	},
	qwilfish: {
		randomBattleMoves: ["toxicspikes", "waterfall", "spikes", "painsplit", "thunderwave", "taunt", "destinybond"],
		randomDoubleBattleMoves: ["poisonjab", "waterfall", "swordsdance", "protect", "thunderwave", "taunt", "destinybond"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "poisonsting", "harden", "minimize"]},
		],
		tier: "Bank",
	},
	shuckle: {
		randomBattleMoves: ["toxic", "encore", "stealthrock", "knockoff", "stickyweb", "infestation"],
		randomDoubleBattleMoves: ["encore", "stealthrock", "knockoff", "stickyweb", "guardsplit", "powersplit", "toxic", "helpinghand"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["sturdy"], "moves":["constrict", "withdraw", "wrap"]},
			{"generation": 3, "level": 20, "abilities":["sturdy"], "moves":["substitute", "toxic", "sludgebomb", "encore"]},
		],
		tier: "Bank",
	},
	heracross: {
		randomBattleMoves: ["closecombat", "megahorn", "stoneedge", "swordsdance", "knockoff", "earthquake"],
		randomDoubleBattleMoves: ["closecombat", "megahorn", "stoneedge", "swordsdance", "knockoff", "earthquake", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "gender": "F", "nature": "Adamant", "isHidden": false, "moves":["bulletseed", "pinmissile", "closecombat", "megahorn"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "nature": "Adamant", "isHidden": false, "abilities":["guts"], "moves":["pinmissile", "bulletseed", "earthquake", "rockblast"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	heracrossmega: {
		randomBattleMoves: ["closecombat", "pinmissile", "rockblast", "swordsdance", "bulletseed", "substitute"],
		randomDoubleBattleMoves: ["closecombat", "pinmissile", "rockblast", "swordsdance", "bulletseed", "knockoff", "earthquake", "protect"],
		requiredItem: "Heracronite",
		tier: "Unreleased",
	},
	sneasel: {
		randomBattleMoves: ["iceshard", "iciclecrash", "lowkick", "pursuit", "swordsdance", "knockoff"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "leer", "taunt", "quickattack"]},
		],
		tier: "New",
	},
	weavile: {
		randomBattleMoves: ["iceshard", "iciclecrash", "knockoff", "pursuit", "swordsdance", "lowkick"],
		randomDoubleBattleMoves: ["iceshard", "iciclecrash", "knockoff", "fakeout", "swordsdance", "lowkick", "taunt", "protect", "feint"],
		eventPokemon: [
			{"generation": 4, "level": 30, "gender": "M", "nature": "Jolly", "moves":["fakeout", "iceshard", "nightslash", "brickbreak"], "pokeball": "cherishball"},
			{"generation": 6, "level": 48, "gender": "M", "perfectIVs": 2, "isHidden": false, "moves":["nightslash", "icepunch", "brickbreak", "xscissor"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	teddiursa: {
		randomBattleMoves: ["swordsdance", "protect", "facade", "closecombat", "firepunch", "crunch", "playrough", "gunkshot"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["pickup"], "moves":["scratch", "leer", "lick"]},
			{"generation": 3, "level": 11, "abilities":["pickup"], "moves":["refresh", "metalclaw", "lick", "return"]},
		],
		tier: "Bank-LC",
	},
	ursaring: {
		randomBattleMoves: ["swordsdance", "facade", "closecombat", "crunch", "protect"],
		randomDoubleBattleMoves: ["swordsdance", "facade", "closecombat", "earthquake", "crunch", "protect"],
		tier: "Bank",
	},
	slugma: {
		randomBattleMoves: ["stockpile", "recover", "lavaplume", "willowisp", "toxic", "hiddenpowergrass", "earthpower", "memento"],
		tier: "Bank-LC",
	},
	magcargo: {
		randomBattleMoves: ["recover", "lavaplume", "toxic", "hiddenpowergrass", "stealthrock", "fireblast", "earthpower", "shellsmash", "ancientpower"],
		randomDoubleBattleMoves: ["protect", "heatwave", "willowisp", "shellsmash", "hiddenpowergrass", "ancientpower", "stealthrock", "fireblast", "earthpower"],
		eventPokemon: [
			{"generation": 3, "level": 38, "moves":["refresh", "heatwave", "earthquake", "flamethrower"]},
		],
		tier: "Bank",
	},
	swinub: {
		randomBattleMoves: ["earthquake", "iciclecrash", "iceshard", "superpower", "endeavor", "stealthrock"],
		eventPokemon: [
			{"generation": 3, "level": 22, "abilities":["oblivious"], "moves":["charm", "ancientpower", "mist", "mudshot"]},
		],
		tier: "LC",
	},
	piloswine: {
		randomBattleMoves: ["earthquake", "iciclecrash", "iceshard", "superpower", "endeavor", "stealthrock"],
		tier: "New",
	},
	mamoswine: {
		randomBattleMoves: ["iceshard", "earthquake", "endeavor", "iciclecrash", "stealthrock", "superpower", "knockoff"],
		randomDoubleBattleMoves: ["iceshard", "earthquake", "rockslide", "iciclecrash", "protect", "superpower", "knockoff"],
		eventPokemon: [
			{"generation": 5, "level": 34, "gender": "M", "isHidden": true, "moves":["hail", "icefang", "takedown", "doublehit"]},
			{"generation": 6, "level": 50, "shiny": true, "gender": "M", "nature": "Adamant", "isHidden": true, "moves":["iciclespear", "earthquake", "iciclecrash", "rockslide"]},
		],
		tier: "New",
	},
	corsola: {
		randomBattleMoves: ["recover", "toxic", "powergem", "scald", "stealthrock"],
		randomDoubleBattleMoves: ["protect", "icywind", "powergem", "scald", "stealthrock", "earthpower", "icebeam"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["tackle", "mudsport"]},
		],
		tier: "New",
	},
	remoraid: {
		randomBattleMoves: ["waterspout", "hydropump", "fireblast", "hiddenpowerground", "icebeam", "seedbomb", "rockblast"],
		tier: "Bank-LC",
	},
	octillery: {
		randomBattleMoves: ["hydropump", "fireblast", "icebeam", "energyball", "rockblast", "gunkshot", "scald"],
		randomDoubleBattleMoves: ["hydropump", "surf", "fireblast", "icebeam", "energyball", "chargebeam", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 50, "gender": "F", "nature": "Serious", "abilities":["suctioncups"], "moves":["octazooka", "icebeam", "signalbeam", "hyperbeam"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	delibird: {
		randomBattleMoves: ["rapidspin", "iceshard", "icepunch", "aerialace", "spikes", "destinybond"],
		randomDoubleBattleMoves: ["fakeout", "iceshard", "icepunch", "aerialace", "brickbreak", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["present"]},
			{"generation": 6, "level": 10, "isHidden": false, "abilities":["vitalspirit"], "moves":["present", "happyhour"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	mantyke: {
		randomBattleMoves: ["raindance", "hydropump", "scald", "airslash", "icebeam", "rest", "sleeptalk", "toxic"],
		tier: "Bank-LC",
	},
	mantine: {
		randomBattleMoves: ["scald", "airslash", "roost", "toxic", "defog"],
		randomDoubleBattleMoves: ["raindance", "scald", "airslash", "icebeam", "tailwind", "wideguard", "helpinghand", "protect", "surf"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "bubble", "supersonic"]},
		],
		tier: "Bank",
	},
	skarmory: {
		randomBattleMoves: ["whirlwind", "bravebird", "roost", "spikes", "stealthrock", "defog"],
		randomDoubleBattleMoves: ["skydrop", "bravebird", "tailwind", "taunt", "feint", "protect", "ironhead"],
		tier: "New",
	},
	houndour: {
		randomBattleMoves: ["pursuit", "suckerpunch", "fireblast", "darkpulse", "hiddenpowerfighting", "nastyplot"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["leer", "ember", "howl"]},
			{"generation": 3, "level": 17, "moves":["charm", "feintattack", "ember", "roar"]},
		],
		tier: "Bank-LC",
	},
	houndoom: {
		randomBattleMoves: ["nastyplot", "darkpulse", "suckerpunch", "fireblast", "hiddenpowergrass"],
		randomDoubleBattleMoves: ["nastyplot", "darkpulse", "suckerpunch", "heatwave", "hiddenpowerfighting", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "nature": "Timid", "isHidden": false, "abilities":["flashfire"], "moves":["flamethrower", "darkpulse", "solarbeam", "sludgebomb"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	houndoommega: {
		randomBattleMoves: ["nastyplot", "darkpulse", "taunt", "fireblast", "hiddenpowergrass"],
		randomDoubleBattleMoves: ["nastyplot", "darkpulse", "taunt", "heatwave", "hiddenpowergrass", "protect"],
		requiredItem: "Houndoominite",
		tier: "Unreleased",
	},
	phanpy: {
		randomBattleMoves: ["stealthrock", "earthquake", "iceshard", "headsmash", "knockoff", "seedbomb", "superpower", "playrough"],
		tier: "Bank-LC",
	},
	donphan: {
		randomBattleMoves: ["stealthrock", "rapidspin", "iceshard", "earthquake", "knockoff", "stoneedge"],
		randomDoubleBattleMoves: ["stealthrock", "knockoff", "iceshard", "earthquake", "rockslide", "protect"],
		tier: "Bank",
	},
	stantler: {
		randomBattleMoves: ["doubleedge", "megahorn", "jumpkick", "earthquake", "suckerpunch"],
		randomDoubleBattleMoves: ["return", "megahorn", "jumpkick", "earthquake", "suckerpunch", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["intimidate"], "moves":["tackle", "leer"]},
		],
		tier: "Bank",
	},
	smeargle: {
		randomBattleMoves: ["spore", "spikes", "stealthrock", "destinybond", "whirlwind", "stickyweb"],
		randomDoubleBattleMoves: ["spore", "fakeout", "wideguard", "helpinghand", "followme", "tailwind", "kingsshield", "transform"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["owntempo"], "moves":["sketch"]},
			{"generation": 5, "level": 50, "gender": "F", "nature": "Jolly", "ivs": {"atk": 31, "spe": 31}, "isHidden": false, "abilities":["technician"], "moves":["falseswipe", "spore", "odorsleuth", "meanlook"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	miltank: {
		randomBattleMoves: ["milkdrink", "stealthrock", "bodyslam", "healbell", "curse", "earthquake", "toxic"],
		randomDoubleBattleMoves: ["protect", "helpinghand", "bodyslam", "healbell", "curse", "earthquake", "thunderwave"],
		eventPokemon: [
			{"generation": 6, "level": 20, "perfectIVs": 3, "isHidden": false, "abilities":["scrappy"], "moves":["rollout", "attract", "stomp", "milkdrink"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	raikou: {
		randomBattleMoves: ["thunderbolt", "hiddenpowerice", "aurasphere", "calmmind", "substitute", "voltswitch", "extrasensory"],
		randomDoubleBattleMoves: ["thunderbolt", "hiddenpowerice", "extrasensory", "calmmind", "substitute", "snarl", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 50, "shiny": 1, "moves":["thundershock", "roar", "quickattack", "spark"]},
			{"generation": 3, "level": 70, "moves":["quickattack", "spark", "reflect", "crunch"]},
			{"generation": 4, "level": 40, "shiny": 1, "moves":["roar", "quickattack", "spark", "reflect"]},
			{"generation": 4, "level": 30, "shiny": true, "nature": "Rash", "moves":["zapcannon", "aurasphere", "extremespeed", "weatherball"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["spark", "reflect", "crunch", "thunderfang"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "Bank",
	},
	entei: {
		randomBattleMoves: ["extremespeed", "flareblitz", "bulldoze", "stoneedge", "sacredfire"],
		randomDoubleBattleMoves: ["extremespeed", "flareblitz", "ironhead", "bulldoze", "stoneedge", "sacredfire", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 50, "shiny": 1, "moves":["ember", "roar", "firespin", "stomp"]},
			{"generation": 3, "level": 70, "moves":["firespin", "stomp", "flamethrower", "swagger"]},
			{"generation": 4, "level": 40, "shiny": 1, "moves":["roar", "firespin", "stomp", "flamethrower"]},
			{"generation": 4, "level": 30, "shiny": true, "nature": "Adamant", "moves":["flareblitz", "howl", "extremespeed", "crushclaw"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["stomp", "flamethrower", "swagger", "firefang"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "Bank",
	},
	suicune: {
		randomBattleMoves: ["hydropump", "icebeam", "scald", "hiddenpowergrass", "rest", "sleeptalk", "calmmind"],
		randomDoubleBattleMoves: ["hydropump", "icebeam", "scald", "hiddenpowergrass", "snarl", "tailwind", "protect", "calmmind"],
		eventPokemon: [
			{"generation": 3, "level": 50, "shiny": 1, "moves":["bubblebeam", "raindance", "gust", "aurorabeam"]},
			{"generation": 3, "level": 70, "moves":["gust", "aurorabeam", "mist", "mirrorcoat"]},
			{"generation": 4, "level": 40, "shiny": 1, "moves":["raindance", "gust", "aurorabeam", "mist"]},
			{"generation": 4, "level": 30, "shiny": true, "nature": "Relaxed", "moves":["sheercold", "airslash", "extremespeed", "aquaring"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["aurorabeam", "mist", "mirrorcoat", "icefang"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "Bank",
	},
	larvitar: {
		randomBattleMoves: ["earthquake", "stoneedge", "facade", "dragondance", "superpower", "crunch"],
		eventPokemon: [
			{"generation": 3, "level": 20, "moves":["sandstorm", "dragondance", "bite", "outrage"]},
			{"generation": 5, "level": 5, "shiny": true, "gender": "M", "isHidden": false, "moves":["bite", "leer", "sandstorm", "superpower"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	pupitar: {
		randomBattleMoves: ["earthquake", "stoneedge", "crunch", "dragondance", "superpower", "stealthrock"],
		tier: "Bank-NFE",
	},
	tyranitar: {
		randomBattleMoves: ["crunch", "stoneedge", "pursuit", "earthquake", "fireblast", "icebeam", "stealthrock"],
		randomDoubleBattleMoves: ["crunch", "stoneedge", "rockslide", "earthquake", "firepunch", "icepunch", "stealthrock", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["thrash", "scaryface", "crunch", "earthquake"]},
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["fireblast", "icebeam", "stoneedge", "crunch"], "pokeball": "cherishball"},
			{"generation": 5, "level": 55, "gender": "M", "isHidden": true, "moves":["payback", "crunch", "earthquake", "seismictoss"]},
			{"generation": 6, "level": 50, "isHidden": false, "moves":["stoneedge", "crunch", "earthquake", "icepunch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "nature": "Jolly", "isHidden": false, "moves":["rockslide", "earthquake", "crunch", "stoneedge"], "pokeball": "cherishball"},
			{"generation": 6, "level": 55, "shiny": true, "nature": "Adamant", "ivs": {"hp": 31, "atk": 31, "def": 31, "spa": 14, "spd": 31, "spe": 0}, "isHidden": false, "moves":["crunch", "rockslide", "lowkick", "protect"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "isHidden": false, "moves":["rockslide", "crunch", "icepunch", "lowkick"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	tyranitarmega: {
		randomBattleMoves: ["crunch", "stoneedge", "earthquake", "icepunch", "dragondance"],
		randomDoubleBattleMoves: ["crunch", "stoneedge", "earthquake", "icepunch", "dragondance", "rockslide", "protect"],
		requiredItem: "Tyranitarite",
		tier: "Unreleased",
	},
	lugia: {
		randomBattleMoves: ["toxic", "roost", "substitute", "whirlwind", "thunderwave", "dragontail", "aeroblast"],
		randomDoubleBattleMoves: ["aeroblast", "roost", "substitute", "tailwind", "icebeam", "psychic", "calmmind", "skydrop", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "shiny": 1, "moves":["recover", "hydropump", "raindance", "swift"]},
			{"generation": 3, "level": 50, "moves":["psychoboost", "earthquake", "hydropump", "featherdance"]},
			{"generation": 4, "level": 45, "shiny": 1, "moves":["extrasensory", "raindance", "hydropump", "aeroblast"]},
			{"generation": 4, "level": 70, "shiny": 1, "moves":["aeroblast", "punishment", "ancientpower", "safeguard"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["whirlwind", "weatherball"], "pokeball": "dreamball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["raindance", "hydropump", "aeroblast", "punishment"]},
			{"generation": 6, "level": 50, "nature": "Timid", "isHidden": false, "moves":["aeroblast", "hydropump", "dragonrush", "icebeam"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	hooh: {
		randomBattleMoves: ["substitute", "sacredfire", "bravebird", "earthquake", "roost", "toxic", "flamecharge"],
		randomDoubleBattleMoves: ["substitute", "sacredfire", "bravebird", "earthquake", "roost", "toxic", "tailwind", "skydrop", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "shiny": 1, "moves":["recover", "fireblast", "sunnyday", "swift"]},
			{"generation": 4, "level": 45, "shiny": 1, "moves":["extrasensory", "sunnyday", "fireblast", "sacredfire"]},
			{"generation": 4, "level": 70, "shiny": 1, "moves":["sacredfire", "punishment", "ancientpower", "safeguard"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["whirlwind", "weatherball"], "pokeball": "dreamball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["sunnyday", "fireblast", "sacredfire", "punishment"]},
			{"generation": 6, "level": 50, "shiny": true, "isHidden": false, "moves":["sacredfire", "bravebird", "recover", "celebrate"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	celebi: {
		randomBattleMoves: ["nastyplot", "psychic", "gigadrain", "recover", "healbell", "batonpass", "earthpower", "hiddenpowerfire", "leafstorm", "uturn", "thunderwave"],
		randomDoubleBattleMoves: ["protect", "psychic", "gigadrain", "leechseed", "recover", "earthpower", "hiddenpowerfire", "nastyplot", "leafstorm", "uturn", "thunderwave"],
		eventPokemon: [
			{"generation": 3, "level": 10, "moves":["confusion", "recover", "healbell", "safeguard"]},
			{"generation": 3, "level": 70, "moves":["ancientpower", "futuresight", "batonpass", "perishsong"]},
			{"generation": 3, "level": 10, "moves":["leechseed", "recover", "healbell", "safeguard"]},
			{"generation": 3, "level": 30, "moves":["healbell", "safeguard", "ancientpower", "futuresight"]},
			{"generation": 4, "level": 50, "moves":["leafstorm", "recover", "nastyplot", "healingwish"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "moves":["recover", "healbell", "safeguard", "holdback"], "pokeball": "luxuryball"},
			{"generation": 6, "level": 100, "moves":["confusion", "recover", "healbell", "safeguard"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	treecko: {
		randomBattleMoves: ["substitute", "leechseed", "leafstorm", "hiddenpowerice", "hiddenpowerrock", "endeavor"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["pound", "leer", "absorb"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["pound", "leer", "absorb"]},
		],
		tier: "Bank-LC",
	},
	grovyle: {
		randomBattleMoves: ["substitute", "leechseed", "gigadrain", "leafstorm", "hiddenpowerice", "hiddenpowerrock", "endeavor"],
		tier: "Bank-NFE",
	},
	sceptile: {
		randomBattleMoves: ["gigadrain", "leafstorm", "hiddenpowerice", "focusblast", "hiddenpowerflying"],
		randomDoubleBattleMoves: ["gigadrain", "leafstorm", "hiddenpowerice", "focusblast", "hiddenpowerfire", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "moves":["leafstorm", "dragonpulse", "focusblast", "rockslide"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	sceptilemega: {
		randomBattleMoves: ["substitute", "gigadrain", "dragonpulse", "focusblast", "swordsdance", "outrage", "leafblade", "earthquake", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["substitute", "gigadrain", "leafstorm", "hiddenpowerice", "focusblast", "dragonpulse", "hiddenpowerfire", "protect"],
		requiredItem: "Sceptilite",
		tier: "Unreleased",
	},
	torchic: {
		randomBattleMoves: ["protect", "batonpass", "substitute", "hiddenpowergrass", "swordsdance", "firepledge"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "growl", "focusenergy", "ember"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["scratch", "growl", "focusenergy", "ember"]},
			{"generation": 6, "level": 10, "gender": "M", "isHidden": true, "moves":["scratch", "growl", "focusenergy", "ember"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	combusken: {
		randomBattleMoves: ["flareblitz", "skyuppercut", "protect", "swordsdance", "substitute", "batonpass", "shadowclaw"],
		tier: "Bank",
	},
	blaziken: {
		randomBattleMoves: ["flareblitz", "highjumpkick", "protect", "swordsdance", "substitute", "batonpass", "stoneedge", "knockoff"],
		eventPokemon: [
			{"generation": 3, "level": 70, "moves":["blazekick", "slash", "mirrormove", "skyuppercut"]},
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "moves":["flareblitz", "highjumpkick", "thunderpunch", "stoneedge"], "pokeball": "cherishball"},
		],
		tier: "Bank-Uber",
	},
	blazikenmega: {
		randomBattleMoves: ["flareblitz", "highjumpkick", "protect", "swordsdance", "substitute", "batonpass", "stoneedge", "knockoff"],
		requiredItem: "Blazikenite",
		tier: "Unreleased",
	},
	mudkip: {
		randomBattleMoves: ["hydropump", "earthpower", "hiddenpowerelectric", "icebeam", "sludgewave"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["tackle", "growl", "mudslap", "watergun"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tackle", "growl", "mudslap", "watergun"]},
		],
		tier: "Bank-LC",
	},
	marshtomp: {
		randomBattleMoves: ["waterfall", "earthquake", "superpower", "icepunch", "rockslide", "stealthrock"],
		tier: "Bank-NFE",
	},
	swampert: {
		randomBattleMoves: ["stealthrock", "earthquake", "scald", "icebeam", "roar", "toxic", "protect"],
		randomDoubleBattleMoves: ["waterfall", "earthquake", "icebeam", "stealthrock", "wideguard", "scald", "rockslide", "muddywater", "protect", "icywind"],
		eventPokemon: [
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "moves":["earthquake", "icebeam", "hydropump", "hammerarm"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	swampertmega: {
		randomBattleMoves: ["raindance", "waterfall", "earthquake", "icepunch", "superpower"],
		randomDoubleBattleMoves: ["waterfall", "earthquake", "raindance", "icepunch", "superpower", "protect"],
		requiredItem: "Swampertite",
		tier: "Unreleased",
	},
	poochyena: {
		randomBattleMoves: ["superfang", "foulplay", "suckerpunch", "toxic", "crunch", "firefang", "icefang", "poisonfang"],
		eventPokemon: [
			{"generation": 3, "level": 10, "abilities":["runaway"], "moves":["healbell", "dig", "poisonfang", "howl"]},
		],
		tier: "Bank-LC",
	},
	mightyena: {
		randomBattleMoves: ["crunch", "suckerpunch", "playrough", "firefang", "irontail"],
		randomDoubleBattleMoves: ["suckerpunch", "crunch", "playrough", "firefang", "taunt", "protect"],
		tier: "Bank",
	},
	zigzagoon: {
		randomBattleMoves: ["trick", "thunderwave", "icebeam", "thunderbolt", "gunkshot", "lastresort"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": true, "abilities":["pickup"], "moves":["tackle", "growl", "tailwhip"]},
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["pickup"], "moves":["tackle", "growl", "tailwhip", "extremespeed"]},
		],
		tier: "Bank-LC",
	},
	linoone: {
		randomBattleMoves: ["bellydrum", "extremespeed", "seedbomb", "shadowclaw"],
		randomDoubleBattleMoves: ["bellydrum", "extremespeed", "seedbomb", "protect", "shadowclaw"],
		eventPokemon: [
			{"generation": 6, "level": 50, "isHidden": false, "moves":["extremespeed", "helpinghand", "babydolleyes", "protect"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	wurmple: {
		randomBattleMoves: ["bugbite", "poisonsting", "tackle", "electroweb"],
		tier: "Bank-LC",
	},
	silcoon: {
		randomBattleMoves: ["bugbite", "poisonsting", "tackle", "electroweb"],
		tier: "Bank-NFE",
	},
	beautifly: {
		randomBattleMoves: ["quiverdance", "bugbuzz", "aircutter", "psychic", "gigadrain", "hiddenpowerrock"],
		randomDoubleBattleMoves: ["quiverdance", "bugbuzz", "gigadrain", "hiddenpowerrock", "aircutter", "tailwind", "stringshot", "protect"],
		tier: "Bank",
	},
	cascoon: {
		randomBattleMoves: ["bugbite", "poisonsting", "tackle", "electroweb"],
		tier: "Bank-NFE",
	},
	dustox: {
		randomBattleMoves: ["roost", "defog", "bugbuzz", "sludgebomb", "quiverdance", "uturn", "shadowball"],
		randomDoubleBattleMoves: ["tailwind", "stringshot", "strugglebug", "bugbuzz", "protect", "sludgebomb", "quiverdance", "shadowball"],
		tier: "Bank",
	},
	lotad: {
		randomBattleMoves: ["gigadrain", "icebeam", "scald", "naturepower", "raindance"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["astonish", "growl", "absorb"]},
		],
		tier: "Bank-LC",
	},
	lombre: {
		randomBattleMoves: ["fakeout", "swordsdance", "waterfall", "seedbomb", "icepunch", "firepunch", "thunderpunch", "poweruppunch", "gigadrain", "icebeam"],
		tier: "Bank-NFE",
	},
	ludicolo: {
		randomBattleMoves: ["raindance", "hydropump", "scald", "gigadrain", "icebeam", "focusblast"],
		randomDoubleBattleMoves: ["raindance", "hydropump", "surf", "gigadrain", "icebeam", "fakeout", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "abilities":["swiftswim"], "moves":["fakeout", "hydropump", "icebeam", "gigadrain"], "pokeball": "cherishball"},
			{"generation": 5, "level": 30, "gender": "M", "nature": "Calm", "isHidden": false, "abilities":["swiftswim"], "moves":["scald", "gigadrain", "icebeam", "sunnyday"]},
		],
		tier: "Bank",
	},
	seedot: {
		randomBattleMoves: ["defog", "naturepower", "seedbomb", "explosion", "foulplay"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["bide", "harden", "growth"]},
			{"generation": 3, "level": 17, "moves":["refresh", "gigadrain", "bulletseed", "secretpower"]},
		],
		tier: "Bank-LC",
	},
	nuzleaf: {
		randomBattleMoves: ["naturepower", "seedbomb", "explosion", "swordsdance", "rockslide", "lowsweep"],
		tier: "Bank-NFE",
	},
	shiftry: {
		randomBattleMoves: ["leafstorm", "swordsdance", "leafblade", "suckerpunch", "defog", "lowkick", "knockoff"],
		randomDoubleBattleMoves: ["leafstorm", "swordsdance", "leafblade", "suckerpunch", "knockoff", "lowkick", "fakeout", "protect"],
		tier: "Bank",
	},
	taillow: {
		randomBattleMoves: ["bravebird", "facade", "quickattack", "uturn", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["peck", "growl", "focusenergy", "featherdance"]},
		],
		tier: "Bank-LC",
	},
	swellow: {
		randomBattleMoves: ["protect", "facade", "bravebird", "uturn", "quickattack"],
		randomDoubleBattleMoves: ["bravebird", "facade", "quickattack", "uturn", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 43, "moves":["batonpass", "skyattack", "agility", "facade"]},
		],
		tier: "Bank",
	},
	wingull: {
		randomBattleMoves: ["scald", "icebeam", "tailwind", "uturn", "airslash", "knockoff", "defog"],
		tier: "LC",
	},
	pelipper: {
		randomBattleMoves: ["scald", "uturn", "hurricane", "toxic", "roost", "defog", "knockoff"],
		randomDoubleBattleMoves: ["scald", "surf", "hurricane", "wideguard", "protect", "tailwind", "knockoff"],
		tier: "New",
	},
	ralts: {
		randomBattleMoves: ["trickroom", "destinybond", "psychic", "willowisp", "hypnosis", "dazzlinggleam", "substitute", "trick"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["growl", "wish"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["growl", "charm"]},
			{"generation": 3, "level": 20, "moves":["sing", "shockwave", "reflect", "confusion"]},
			{"generation": 6, "level": 1, "isHidden": true, "moves":["growl", "encore"]},
		],
		tier: "Bank-LC",
	},
	kirlia: {
		randomBattleMoves: ["trick", "dazzlinggleam", "psychic", "willowisp", "signalbeam", "thunderbolt", "destinybond", "substitute"],
		tier: "Bank-NFE",
	},
	gardevoir: {
		randomBattleMoves: ["psychic", "thunderbolt", "focusblast", "shadowball", "moonblast", "calmmind", "substitute", "willowisp"],
		randomDoubleBattleMoves: ["psyshock", "focusblast", "shadowball", "moonblast", "taunt", "willowisp", "thunderbolt", "trickroom", "helpinghand", "protect", "dazzlinggleam"],
		eventPokemon: [
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "abilities":["trace"], "moves":["hypnosis", "thunderbolt", "focusblast", "psychic"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": true, "gender": "F", "isHidden": false, "abilities":["synchronize"], "moves":["dazzlinggleam", "moonblast", "storedpower", "calmmind"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	gardevoirmega: {
		randomBattleMoves: ["calmmind", "hypervoice", "psyshock", "focusblast", "substitute", "taunt", "willowisp"],
		randomDoubleBattleMoves: ["psyshock", "focusblast", "shadowball", "calmmind", "thunderbolt", "hypervoice", "protect"],
		requiredItem: "Gardevoirite",
		tier: "Unreleased",
	},
	gallade: {
		randomBattleMoves: ["bulkup", "drainpunch", "icepunch", "shadowsneak", "closecombat", "zenheadbutt", "knockoff", "trick"],
		randomDoubleBattleMoves: ["closecombat", "trick", "stoneedge", "shadowsneak", "drainpunch", "icepunch", "zenheadbutt", "knockoff", "trickroom", "protect", "helpinghand"],
		tier: "Bank",
	},
	gallademega: {
		randomBattleMoves: ["swordsdance", "closecombat", "drainpunch", "knockoff", "zenheadbutt", "substitute"],
		randomDoubleBattleMoves: ["closecombat", "stoneedge", "drainpunch", "icepunch", "zenheadbutt", "swordsdance", "knockoff", "protect"],
		requiredItem: "Galladite",
		tier: "Unreleased",
	},
	surskit: {
		randomBattleMoves: ["hydropump", "signalbeam", "hiddenpowerfire", "stickyweb", "gigadrain", "powersplit"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["bubble", "mudsport"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["bubble", "quickattack"]},
		],
		tier: "LC",
	},
	masquerain: {
		randomBattleMoves: ["quiverdance", "bugbuzz", "airslash", "hydropump", "roost", "batonpass", "stickyweb"],
		randomDoubleBattleMoves: ["hydropump", "bugbuzz", "airslash", "quiverdance", "tailwind", "roost", "strugglebug", "protect"],
		tier: "New",
	},
	shroomish: {
		randomBattleMoves: ["spore", "substitute", "leechseed", "gigadrain", "protect", "toxic", "stunspore"],
		eventPokemon: [
			{"generation": 3, "level": 15, "abilities":["effectspore"], "moves":["refresh", "falseswipe", "megadrain", "stunspore"]},
		],
		tier: "Bank-LC",
	},
	breloom: {
		randomBattleMoves: ["spore", "machpunch", "bulletseed", "rocktomb", "swordsdance"],
		randomDoubleBattleMoves: ["spore", "helpinghand", "machpunch", "bulletseed", "rocktomb", "protect", "drainpunch"],
		tier: "Bank",
	},
	slakoth: {
		randomBattleMoves: ["doubleedge", "hammerarm", "firepunch", "counter", "retaliate", "toxic"],
		tier: "LC",
	},
	vigoroth: {
		randomBattleMoves: ["bulkup", "return", "earthquake", "firepunch", "suckerpunch", "slackoff", "icepunch", "lowkick"],
		tier: "New",
	},
	slaking: {
		randomBattleMoves: ["earthquake", "pursuit", "nightslash", "doubleedge", "retaliate"],
		randomDoubleBattleMoves: ["earthquake", "nightslash", "doubleedge", "retaliate", "hammerarm", "rockslide"],
		eventPokemon: [
			{"generation": 4, "level": 50, "gender": "M", "nature": "Adamant", "moves":["gigaimpact", "return", "shadowclaw", "aerialace"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	nincada: {
		randomBattleMoves: ["xscissor", "dig", "aerialace", "nightslash"],
		tier: "Bank-LC",
	},
	ninjask: {
		randomBattleMoves: ["batonpass", "swordsdance", "substitute", "protect", "xscissor"],
		randomDoubleBattleMoves: ["batonpass", "swordsdance", "substitute", "protect", "xscissor", "aerialace"],
		tier: "Bank",
	},
	shedinja: {
		randomBattleMoves: ["swordsdance", "willowisp", "xscissor", "shadowsneak", "shadowclaw", "batonpass"],
		eventPokemon: [
			{"generation": 3, "level": 50, "moves":["spite", "confuseray", "shadowball", "grudge"]},
			{"generation": 3, "level": 20, "moves":["doubleteam", "furycutter", "screech"]},
			{"generation": 3, "level": 25, "moves":["swordsdance"]},
			{"generation": 3, "level": 31, "moves":["slash"]},
			{"generation": 3, "level": 38, "moves":["agility"]},
			{"generation": 3, "level": 45, "moves":["batonpass"]},
			{"generation": 4, "level": 52, "moves":["xscissor"]},
		],
		tier: "Bank",
	},
	whismur: {
		randomBattleMoves: ["hypervoice", "fireblast", "shadowball", "icebeam", "extrasensory"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["pound", "uproar", "teeterdance"]},
		],
		tier: "Bank-LC",
	},
	loudred: {
		randomBattleMoves: ["hypervoice", "fireblast", "shadowball", "icebeam", "circlethrow", "bodyslam"],
		tier: "Bank-NFE",
	},
	exploud: {
		randomBattleMoves: ["boomburst", "fireblast", "icebeam", "surf", "focusblast"],
		randomDoubleBattleMoves: ["boomburst", "fireblast", "icebeam", "surf", "focusblast", "protect", "hypervoice"],
		eventPokemon: [
			{"generation": 3, "level": 100, "moves":["roar", "rest", "sleeptalk", "hypervoice"]},
			{"generation": 3, "level": 50, "moves":["stomp", "screech", "hyperbeam", "roar"]},
		],
		tier: "Bank",
	},
	makuhita: {
		randomBattleMoves: ["crosschop", "bulletpunch", "closecombat", "icepunch", "bulkup", "fakeout", "earthquake"],
		eventPokemon: [
			{"generation": 3, "level": 18, "moves":["refresh", "brickbreak", "armthrust", "rocktomb"]},
		],
		tier: "LC",
	},
	hariyama: {
		randomBattleMoves: ["bulletpunch", "closecombat", "icepunch", "stoneedge", "bulkup", "knockoff"],
		randomDoubleBattleMoves: ["bulletpunch", "closecombat", "icepunch", "stoneedge", "fakeout", "knockoff", "helpinghand", "wideguard", "protect"],
		tier: "New",
	},
	nosepass: {
		randomBattleMoves: ["powergem", "thunderwave", "stealthrock", "painsplit", "explosion", "voltswitch"],
		eventPokemon: [
			{"generation": 3, "level": 26, "moves":["helpinghand", "thunderbolt", "thunderwave", "rockslide"]},
		],
		tier: "LC",
	},
	probopass: {
		randomBattleMoves: ["stealthrock", "thunderwave", "toxic", "flashcannon", "powergem", "voltswitch", "painsplit"],
		randomDoubleBattleMoves: ["stealthrock", "thunderwave", "helpinghand", "earthpower", "powergem", "wideguard", "protect", "voltswitch"],
		tier: "New",
	},
	skitty: {
		randomBattleMoves: ["doubleedge", "zenheadbutt", "thunderwave", "fakeout", "playrough", "healbell"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["cutecharm"], "moves":["tackle", "growl", "tailwhip", "payday"]},
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["cutecharm"], "moves":["growl", "tackle", "tailwhip", "rollout"]},
			{"generation": 3, "level": 10, "gender": "M", "abilities":["cutecharm"], "moves":["growl", "tackle", "tailwhip", "attract"]},
		],
		tier: "Bank-LC",
	},
	delcatty: {
		randomBattleMoves: ["doubleedge", "suckerpunch", "wildcharge", "fakeout", "thunderwave", "healbell"],
		randomDoubleBattleMoves: ["doubleedge", "suckerpunch", "playrough", "wildcharge", "fakeout", "thunderwave", "protect", "helpinghand"],
		eventPokemon: [
			{"generation": 3, "level": 18, "abilities":["cutecharm"], "moves":["sweetkiss", "secretpower", "attract", "shockwave"]},
		],
		tier: "Bank",
	},
	sableye: {
		randomBattleMoves: ["recover", "willowisp", "taunt", "toxic", "knockoff", "foulplay"],
		randomDoubleBattleMoves: ["recover", "willowisp", "taunt", "fakeout", "knockoff", "foulplay", "helpinghand", "snarl", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "abilities":["keeneye"], "moves":["leer", "scratch", "foresight", "nightshade"]},
			{"generation": 3, "level": 33, "abilities":["keeneye"], "moves":["helpinghand", "shadowball", "feintattack", "recover"]},
			{"generation": 5, "level": 50, "gender": "M", "isHidden": true, "moves":["foulplay", "octazooka", "tickle", "trick"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "nature": "Relaxed", "ivs": {"hp": 31, "spa": 31}, "isHidden": true, "moves":["calmmind", "willowisp", "recover", "shadowball"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "nature": "Bold", "isHidden": true, "moves":["willowisp", "recover", "taunt", "shockwave"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	sableyemega: {
		randomBattleMoves: ["recover", "willowisp", "darkpulse", "calmmind", "shadowball"],
		randomDoubleBattleMoves: ["fakeout", "knockoff", "darkpulse", "shadowball", "willowisp", "protect"],
		requiredItem: "Sablenite",
		tier: "New",
	},
	mawile: {
		randomBattleMoves: ["swordsdance", "ironhead", "substitute", "playrough", "suckerpunch", "batonpass"],
		randomDoubleBattleMoves: ["swordsdance", "ironhead", "firefang", "substitute", "playrough", "suckerpunch", "knockoff", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["astonish", "faketears"]},
			{"generation": 3, "level": 22, "moves":["sing", "falseswipe", "vicegrip", "irondefense"]},
			{"generation": 6, "level": 50, "isHidden": false, "abilities":["intimidate"], "moves":["ironhead", "playrough", "firefang", "suckerpunch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "isHidden": false, "abilities":["intimidate"], "moves":["suckerpunch", "protect", "playrough", "ironhead"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	mawilemega: {
		randomBattleMoves: ["swordsdance", "ironhead", "firefang", "substitute", "playrough", "suckerpunch", "knockoff", "focuspunch"],
		randomDoubleBattleMoves: ["swordsdance", "ironhead", "firefang", "substitute", "playrough", "suckerpunch", "knockoff", "protect"],
		requiredItem: "Mawilite",
		tier: "Unreleased",
	},
	aron: {
		randomBattleMoves: ["headsmash", "ironhead", "earthquake", "superpower", "stealthrock", "endeavor"],
		tier: "Bank-LC",
	},
	lairon: {
		randomBattleMoves: ["headsmash", "ironhead", "earthquake", "superpower", "stealthrock"],
		tier: "Bank-NFE",
	},
	aggron: {
		randomBattleMoves: ["autotomize", "headsmash", "earthquake", "lowkick", "heavyslam", "aquatail", "stealthrock"],
		randomDoubleBattleMoves: ["rockslide", "headsmash", "earthquake", "lowkick", "heavyslam", "aquatail", "stealthrock", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 100, "moves":["irontail", "protect", "metalsound", "doubleedge"]},
			{"generation": 3, "level": 50, "moves":["takedown", "irontail", "protect", "metalsound"]},
			{"generation": 6, "level": 50, "nature": "Brave", "isHidden": false, "abilities":["rockhead"], "moves":["ironhead", "earthquake", "headsmash", "rockslide"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	aggronmega: {
		randomBattleMoves: ["earthquake", "heavyslam", "icepunch", "stealthrock", "thunderwave", "roar", "toxic"],
		randomDoubleBattleMoves: ["rockslide", "earthquake", "lowkick", "heavyslam", "aquatail", "protect"],
		requiredItem: "Aggronite",
		tier: "Unreleased",
	},
	meditite: {
		randomBattleMoves: ["highjumpkick", "psychocut", "icepunch", "thunderpunch", "trick", "fakeout", "bulletpunch", "drainpunch", "zenheadbutt"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["bide", "meditate", "confusion"]},
			{"generation": 3, "level": 20, "moves":["dynamicpunch", "confusion", "shadowball", "detect"]},
		],
		tier: "Bank",
	},
	medicham: {
		randomBattleMoves: ["highjumpkick", "drainpunch", "zenheadbutt", "icepunch", "bulletpunch"],
		randomDoubleBattleMoves: ["highjumpkick", "drainpunch", "zenheadbutt", "icepunch", "bulletpunch", "protect", "fakeout"],
		tier: "Bank",
	},
	medichammega: {
		randomBattleMoves: ["highjumpkick", "drainpunch", "icepunch", "fakeout", "zenheadbutt"],
		randomDoubleBattleMoves: ["highjumpkick", "drainpunch", "zenheadbutt", "icepunch", "bulletpunch", "protect", "fakeout"],
		requiredItem: "Medichamite",
		tier: "Unreleased",
	},
	electrike: {
		randomBattleMoves: ["voltswitch", "thunderbolt", "hiddenpowerice", "switcheroo", "flamethrower", "hiddenpowergrass"],
		tier: "Bank-LC",
	},
	manectric: {
		randomBattleMoves: ["voltswitch", "thunderbolt", "hiddenpowerice", "hiddenpowergrass", "overheat", "flamethrower"],
		randomDoubleBattleMoves: ["voltswitch", "thunderbolt", "hiddenpowerice", "hiddenpowergrass", "overheat", "flamethrower", "snarl", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 44, "moves":["refresh", "thunder", "raindance", "bite"]},
			{"generation": 6, "level": 50, "nature": "Timid", "isHidden": false, "abilities":["lightningrod"], "moves":["overheat", "thunderbolt", "voltswitch", "protect"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	manectricmega: {
		randomBattleMoves: ["voltswitch", "thunderbolt", "hiddenpowerice", "hiddenpowergrass", "overheat"],
		randomDoubleBattleMoves: ["voltswitch", "thunderbolt", "hiddenpowerice", "hiddenpowergrass", "overheat", "flamethrower", "snarl", "protect"],
		requiredItem: "Manectite",
		tier: "Unreleased",
	},
	plusle: {
		randomBattleMoves: ["nastyplot", "thunderbolt", "substitute", "batonpass", "hiddenpowerice", "encore"],
		randomDoubleBattleMoves: ["nastyplot", "thunderbolt", "substitute", "protect", "hiddenpowerice", "encore", "helpinghand"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["growl", "thunderwave", "mudsport"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["growl", "thunderwave", "quickattack"]},
		],
		tier: "Bank",
	},
	minun: {
		randomBattleMoves: ["nastyplot", "thunderbolt", "substitute", "batonpass", "hiddenpowerice", "encore"],
		randomDoubleBattleMoves: ["nastyplot", "thunderbolt", "substitute", "protect", "hiddenpowerice", "encore", "helpinghand"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["growl", "thunderwave", "watersport"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["growl", "thunderwave", "quickattack"]},
		],
		tier: "Bank",
	},
	volbeat: {
		randomBattleMoves: ["tailglow", "batonpass", "substitute", "bugbuzz", "thunderwave", "encore", "tailwind"],
		randomDoubleBattleMoves: ["stringshot", "strugglebug", "helpinghand", "bugbuzz", "thunderwave", "encore", "tailwind", "protect"],
		tier: "Bank",
	},
	illumise: {
		randomBattleMoves: ["substitute", "batonpass", "bugbuzz", "encore", "thunderbolt", "tailwind", "uturn", "thunderwave"],
		randomDoubleBattleMoves: ["protect", "helpinghand", "bugbuzz", "encore", "thunderbolt", "tailwind", "uturn"],
		tier: "Bank",
	},
	budew: {
		randomBattleMoves: ["spikes", "sludgebomb", "sleeppowder", "gigadrain", "stunspore", "rest"],
		tier: "LC",
	},
	roselia: {
		randomBattleMoves: ["spikes", "toxicspikes", "sleeppowder", "gigadrain", "stunspore", "rest", "sludgebomb", "synthesis"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["absorb", "growth", "poisonsting"]},
			{"generation": 3, "level": 22, "moves":["sweetkiss", "magicalleaf", "leechseed", "grasswhistle"]},
		],
		tier: "New",
	},
	roserade: {
		randomBattleMoves: ["sludgebomb", "gigadrain", "sleeppowder", "leafstorm", "spikes", "toxicspikes", "rest", "synthesis", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["sludgebomb", "gigadrain", "sleeppowder", "leafstorm", "protect", "hiddenpowerfire"],
		tier: "New",
	},
	gulpin: {
		randomBattleMoves: ["stockpile", "sludgebomb", "sludgewave", "icebeam", "toxic", "painsplit", "yawn", "encore"],
		eventPokemon: [
			{"generation": 3, "level": 17, "moves":["sing", "shockwave", "sludge", "toxic"]},
		],
		tier: "Bank-LC",
	},
	swalot: {
		randomBattleMoves: ["sludgebomb", "icebeam", "toxic", "yawn", "encore", "painsplit", "earthquake"],
		randomDoubleBattleMoves: ["sludgebomb", "icebeam", "protect", "yawn", "encore", "gunkshot", "earthquake"],
		tier: "Bank",
	},
	carvanha: {
		randomBattleMoves: ["protect", "hydropump", "icebeam", "waterfall", "crunch", "aquajet", "destinybond"],
		eventPokemon: [
			{"generation": 3, "level": 15, "moves":["refresh", "waterpulse", "bite", "scaryface"]},
			{"generation": 6, "level": 1, "isHidden": true, "moves":["leer", "bite", "hydropump"]},
		],
		tier: "LC",
	},
	sharpedo: {
		randomBattleMoves: ["protect", "icebeam", "crunch", "earthquake", "waterfall", "destinybond"],
		randomDoubleBattleMoves: ["protect", "icebeam", "crunch", "earthquake", "waterfall", "destinybond"],
		eventPokemon: [
			{"generation": 6, "level": 50, "nature": "Adamant", "isHidden": true, "moves":["aquajet", "crunch", "icefang", "destinybond"], "pokeball": "cherishball"},
			{"generation": 6, "level": 43, "gender": "M", "perfectIVs": 2, "isHidden": false, "moves":["scaryface", "slash", "poisonfang", "crunch"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	sharpedomega: {
		randomBattleMoves: ["protect", "icefang", "crunch", "earthquake", "waterfall", "psychicfangs"],
		requiredItem: "Sharpedonite",
		tier: "New",
	},
	wailmer: {
		randomBattleMoves: ["waterspout", "surf", "hydropump", "icebeam", "hiddenpowergrass", "hiddenpowerelectric"],
		tier: "LC",
	},
	wailord: {
		randomBattleMoves: ["waterspout", "hydropump", "icebeam", "hiddenpowergrass", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["waterspout", "hydropump", "icebeam", "hiddenpowergrass", "hiddenpowerfire", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 100, "moves":["rest", "waterspout", "amnesia", "hydropump"]},
			{"generation": 3, "level": 50, "moves":["waterpulse", "mist", "rest", "waterspout"]},
		],
		tier: "New",
	},
	numel: {
		randomBattleMoves: ["curse", "earthquake", "rockslide", "fireblast", "flamecharge", "rest", "sleeptalk", "stockpile", "hiddenpowerelectric", "earthpower", "lavaplume"],
		eventPokemon: [
			{"generation": 3, "level": 14, "abilities":["oblivious"], "moves":["charm", "takedown", "dig", "ember"]},
			{"generation": 6, "level": 1, "isHidden": false, "moves":["growl", "tackle", "ironhead"]},
		],
		tier: "Bank-LC",
	},
	camerupt: {
		randomBattleMoves: ["rockpolish", "fireblast", "earthpower", "lavaplume", "stealthrock", "hiddenpowergrass", "roar", "stoneedge"],
		randomDoubleBattleMoves: ["rockpolish", "fireblast", "earthpower", "heatwave", "eruption", "hiddenpowergrass", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 43, "gender": "M", "perfectIVs": 2, "isHidden": false, "abilities":["solidrock"], "moves":["curse", "takedown", "rockslide", "yawn"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	cameruptmega: {
		randomBattleMoves: ["stealthrock", "fireblast", "earthpower", "ancientpower", "willowisp", "toxic"],
		randomDoubleBattleMoves: ["fireblast", "earthpower", "heatwave", "eruption", "rockslide", "protect"],
		requiredItem: "Cameruptite",
		tier: "Unreleased",
	},
	torkoal: {
		randomBattleMoves: ["shellsmash", "fireblast", "earthpower", "hiddenpowergrass", "stealthrock", "rapidspin", "yawn", "lavaplume"],
		randomDoubleBattleMoves: ["protect", "heatwave", "earthpower", "willowisp", "shellsmash", "fireblast", "hiddenpowergrass"],
		tier: "New",
	},
	spoink: {
		randomBattleMoves: ["psychic", "reflect", "lightscreen", "thunderwave", "trick", "healbell", "calmmind", "hiddenpowerfighting", "shadowball"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["owntempo"], "moves":["splash", "uproar"]},
		],
		tier: "Bank-LC",
	},
	grumpig: {
		randomBattleMoves: ["psychic", "thunderwave", "healbell", "whirlwind", "toxic", "focusblast", "reflect", "lightscreen"],
		randomDoubleBattleMoves: ["psychic", "psyshock", "thunderwave", "trickroom", "taunt", "protect", "focusblast", "reflect", "lightscreen"],
		tier: "Bank",
	},
	spinda: {
		randomBattleMoves: ["return", "superpower", "suckerpunch", "trickroom"],
		randomDoubleBattleMoves: ["doubleedge", "return", "superpower", "suckerpunch", "trickroom", "fakeout", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["tackle", "uproar", "sing"]},
		],
		tier: "New",
	},
	trapinch: {
		randomBattleMoves: ["earthquake", "rockslide", "crunch", "quickattack", "superpower"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": true, "isHidden": false, "moves":["bite"]},
		],
		tier: "LC",
	},
	vibrava: {
		randomBattleMoves: ["substitute", "earthquake", "outrage", "roost", "uturn", "superpower", "defog"],
		tier: "NFE",
	},
	flygon: {
		randomBattleMoves: ["earthquake", "outrage", "uturn", "roost", "stoneedge", "firepunch", "dragondance"],
		randomDoubleBattleMoves: ["earthquake", "protect", "dragonclaw", "uturn", "rockslide", "firepunch", "fireblast", "tailwind", "feint"],
		eventPokemon: [
			{"generation": 3, "level": 45, "moves":["sandtomb", "crunch", "dragonbreath", "screech"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Naive", "moves":["dracometeor", "uturn", "earthquake", "dragonclaw"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	cacnea: {
		randomBattleMoves: ["swordsdance", "spikes", "suckerpunch", "seedbomb", "drainpunch"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["poisonsting", "leer", "absorb", "encore"]},
		],
		tier: "Bank-LC",
	},
	cacturne: {
		randomBattleMoves: ["swordsdance", "spikes", "suckerpunch", "seedbomb", "drainpunch", "substitute"],
		randomDoubleBattleMoves: ["swordsdance", "spikyshield", "suckerpunch", "seedbomb", "drainpunch", "substitute"],
		eventPokemon: [
			{"generation": 3, "level": 45, "moves":["ingrain", "feintattack", "spikes", "needlearm"]},
		],
		tier: "Bank",
	},
	swablu: {
		randomBattleMoves: ["roost", "toxic", "cottonguard", "pluck", "hypervoice", "return"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["peck", "growl", "falseswipe"]},
			{"generation": 5, "level": 1, "shiny": true, "isHidden": false, "moves":["peck", "growl"]},
			{"generation": 6, "level": 1, "isHidden": true, "moves":["peck", "growl", "hypervoice"]},
		],
		tier: "Bank-LC",
	},
	altaria: {
		randomBattleMoves: ["dragondance", "dracometeor", "outrage", "dragonclaw", "earthquake", "roost", "fireblast", "healbell"],
		randomDoubleBattleMoves: ["dragondance", "dracometeor", "protect", "dragonclaw", "earthquake", "fireblast", "tailwind"],
		eventPokemon: [
			{"generation": 3, "level": 45, "moves":["takedown", "dragonbreath", "dragondance", "refresh"]},
			{"generation": 3, "level": 36, "moves":["healbell", "dragonbreath", "solarbeam", "aerialace"]},
			{"generation": 5, "level": 35, "gender": "M", "isHidden": true, "moves":["takedown", "naturalgift", "dragonbreath", "falseswipe"]},
			{"generation": 6, "level": 100, "nature": "Modest", "isHidden": true, "moves":["hypervoice", "fireblast", "protect", "agility"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	altariamega: {
		randomBattleMoves: ["dragondance", "return", "hypervoice", "healbell", "earthquake", "roost", "dracometeor", "fireblast"],
		randomDoubleBattleMoves: ["dragondance", "return", "doubleedge", "dragonclaw", "earthquake", "protect", "fireblast"],
		requiredItem: "Altarianite",
		tier: "Unreleased",
	},
	zangoose: {
		randomBattleMoves: ["swordsdance", "closecombat", "knockoff", "quickattack", "facade"],
		randomDoubleBattleMoves: ["protect", "closecombat", "knockoff", "quickattack", "facade"],
		eventPokemon: [
			{"generation": 3, "level": 18, "moves":["leer", "quickattack", "swordsdance", "furycutter"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["scratch", "leer", "quickattack", "swordsdance"]},
			{"generation": 3, "level": 28, "moves":["refresh", "brickbreak", "counter", "crushclaw"]},
		],
		tier: "Bank",
	},
	seviper: {
		randomBattleMoves: ["flamethrower", "sludgewave", "gigadrain", "darkpulse", "switcheroo", "coil", "earthquake", "poisonjab", "suckerpunch"],
		randomDoubleBattleMoves: ["flamethrower", "gigadrain", "earthquake", "suckerpunch", "aquatail", "protect", "glare", "poisonjab", "sludgebomb"],
		eventPokemon: [
			{"generation": 3, "level": 18, "moves":["wrap", "lick", "bite", "poisontail"]},
			{"generation": 3, "level": 30, "moves":["poisontail", "screech", "glare", "crunch"]},
			{"generation": 3, "level": 10, "gender": "M", "moves":["wrap", "lick", "bite"]},
		],
		tier: "Bank",
	},
	lunatone: {
		randomBattleMoves: ["psychic", "earthpower", "stealthrock", "rockpolish", "batonpass", "calmmind", "icebeam", "powergem", "moonlight", "toxic"],
		randomDoubleBattleMoves: ["psychic", "earthpower", "rockpolish", "calmmind", "helpinghand", "icebeam", "powergem", "moonlight", "trickroom", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 10, "moves":["tackle", "harden", "confusion"]},
			{"generation": 3, "level": 25, "moves":["batonpass", "psychic", "raindance", "rocktomb"]},
		],
		tier: "Bank",
	},
	solrock: {
		randomBattleMoves: ["stealthrock", "explosion", "rockslide", "reflect", "lightscreen", "willowisp", "morningsun"],
		randomDoubleBattleMoves: ["protect", "helpinghand", "stoneedge", "zenheadbutt", "willowisp", "trickroom", "rockslide"],
		eventPokemon: [
			{"generation": 3, "level": 10, "moves":["tackle", "harden", "confusion"]},
			{"generation": 3, "level": 41, "moves":["batonpass", "psychic", "sunnyday", "cosmicpower"]},
		],
		tier: "Bank",
	},
	barboach: {
		randomBattleMoves: ["dragondance", "waterfall", "earthquake", "return", "bounce"],
		tier: "LC",
	},
	whiscash: {
		randomBattleMoves: ["dragondance", "waterfall", "earthquake", "stoneedge", "zenheadbutt"],
		randomDoubleBattleMoves: ["dragondance", "waterfall", "earthquake", "stoneedge", "zenheadbutt", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 51, "gender": "F", "nature": "Gentle", "abilities":["oblivious"], "moves":["earthquake", "aquatail", "zenheadbutt", "gigaimpact"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	corphish: {
		randomBattleMoves: ["dragondance", "waterfall", "crunch", "superpower", "swordsdance", "knockoff", "aquajet"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["bubble", "watersport"]},
		],
		tier: "Bank-LC",
	},
	crawdaunt: {
		randomBattleMoves: ["dragondance", "crabhammer", "superpower", "swordsdance", "knockoff", "aquajet"],
		randomDoubleBattleMoves: ["dragondance", "crabhammer", "crunch", "superpower", "swordsdance", "knockoff", "aquajet", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 100, "moves":["taunt", "crabhammer", "swordsdance", "guillotine"]},
			{"generation": 3, "level": 50, "moves":["knockoff", "taunt", "crabhammer", "swordsdance"]},
		],
		tier: "Bank",
	},
	baltoy: {
		randomBattleMoves: ["stealthrock", "earthquake", "toxic", "psychic", "reflect", "lightscreen", "icebeam", "rapidspin"],
		eventPokemon: [
			{"generation": 3, "level": 17, "moves":["refresh", "rocktomb", "mudslap", "psybeam"]},
		],
		tier: "Bank-LC",
	},
	claydol: {
		randomBattleMoves: ["stealthrock", "toxic", "psychic", "icebeam", "earthquake", "rapidspin"],
		randomDoubleBattleMoves: ["earthpower", "trickroom", "psychic", "icebeam", "earthquake", "protect"],
		tier: "Bank",
	},
	lileep: {
		randomBattleMoves: ["stealthrock", "recover", "ancientpower", "hiddenpowerfire", "gigadrain", "stockpile"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "moves":["recover", "rockslide", "constrict", "acid"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	cradily: {
		randomBattleMoves: ["stealthrock", "recover", "gigadrain", "toxic", "seedbomb", "rockslide", "curse"],
		randomDoubleBattleMoves: ["protect", "recover", "seedbomb", "rockslide", "earthquake", "curse", "swordsdance"],
		tier: "Bank",
	},
	anorith: {
		randomBattleMoves: ["stealthrock", "brickbreak", "toxic", "xscissor", "rockslide", "swordsdance", "rockpolish"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "moves":["harden", "mudsport", "watergun", "crosspoison"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	armaldo: {
		randomBattleMoves: ["stealthrock", "stoneedge", "toxic", "xscissor", "swordsdance", "knockoff", "rapidspin"],
		randomDoubleBattleMoves: ["rockslide", "stoneedge", "stringshot", "xscissor", "swordsdance", "knockoff", "protect"],
		tier: "Bank",
	},
	feebas: {
		randomBattleMoves: ["protect", "confuseray", "hypnosis", "scald", "toxic"],
		eventPokemon: [
			{"generation": 4, "level": 5, "gender": "F", "nature": "Calm", "moves":["splash", "mirrorcoat"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	milotic: {
		randomBattleMoves: ["recover", "scald", "toxic", "icebeam", "dragontail", "rest", "sleeptalk"],
		randomDoubleBattleMoves: ["recover", "scald", "hydropump", "icebeam", "dragontail", "hypnosis", "protect", "hiddenpowergrass"],
		eventPokemon: [
			{"generation": 3, "level": 35, "moves":["waterpulse", "twister", "recover", "raindance"]},
			{"generation": 4, "level": 50, "gender": "F", "nature": "Bold", "moves":["recover", "raindance", "icebeam", "hydropump"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "shiny": true, "gender": "M", "nature": "Timid", "moves":["raindance", "recover", "hydropump", "icywind"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "moves":["recover", "hydropump", "icebeam", "mirrorcoat"], "pokeball": "cherishball"},
			{"generation": 5, "level": 58, "gender": "M", "nature": "Lax", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "moves":["recover", "surf", "icebeam", "toxic"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	castform: {
		tier: "New",
	},
	castformsunny: {
		randomBattleMoves: ["sunnyday", "weatherball", "solarbeam", "icebeam"],
		battleOnly: true,
	},
	castformrainy: {
		randomBattleMoves: ["raindance", "weatherball", "thunder", "hurricane"],
		battleOnly: true,
	},
	castformsnowy: {
		battleOnly: true,
	},
	kecleon: {
		randomBattleMoves: ["fakeout", "knockoff", "drainpunch", "suckerpunch", "shadowsneak", "stealthrock", "recover"],
		randomDoubleBattleMoves: ["knockoff", "fakeout", "trickroom", "recover", "drainpunch", "suckerpunch", "shadowsneak", "protect"],
		tier: "Bank",
	},
	shuppet: {
		randomBattleMoves: ["trickroom", "destinybond", "taunt", "shadowsneak", "suckerpunch", "willowisp"],
		eventPokemon: [
			{"generation": 3, "level": 45, "abilities":["insomnia"], "moves":["spite", "willowisp", "feintattack", "shadowball"]},
		],
		tier: "Bank-LC",
	},
	banette: {
		randomBattleMoves: ["destinybond", "taunt", "shadowclaw", "suckerpunch", "willowisp", "shadowsneak", "knockoff"],
		randomDoubleBattleMoves: ["shadowclaw", "suckerpunch", "willowisp", "shadowsneak", "knockoff", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 37, "abilities":["insomnia"], "moves":["helpinghand", "feintattack", "shadowball", "curse"]},
			{"generation": 5, "level": 37, "gender": "F", "isHidden": true, "moves":["feintattack", "hex", "shadowball", "cottonguard"]},
		],
		tier: "Bank",
	},
	banettemega: {
		randomBattleMoves: ["destinybond", "taunt", "shadowclaw", "suckerpunch", "willowisp", "knockoff"],
		randomDoubleBattleMoves: ["destinybond", "taunt", "shadowclaw", "suckerpunch", "willowisp", "knockoff", "protect"],
		requiredItem: "Banettite",
		tier: "Unreleased",
	},
	duskull: {
		randomBattleMoves: ["willowisp", "shadowsneak", "painsplit", "substitute", "nightshade", "destinybond", "trickroom"],
		eventPokemon: [
			{"generation": 3, "level": 45, "moves":["pursuit", "curse", "willowisp", "meanlook"]},
			{"generation": 3, "level": 19, "moves":["helpinghand", "shadowball", "astonish", "confuseray"]},
		],
		tier: "Bank-LC",
	},
	dusclops: {
		randomBattleMoves: ["willowisp", "shadowsneak", "icebeam", "painsplit", "substitute", "seismictoss", "toxic", "trickroom"],
		tier: "Bank-NFE",
	},
	dusknoir: {
		randomBattleMoves: ["willowisp", "shadowsneak", "icepunch", "painsplit", "substitute", "earthquake", "focuspunch"],
		randomDoubleBattleMoves: ["willowisp", "shadowsneak", "icepunch", "painsplit", "protect", "earthquake", "helpinghand", "trickroom"],
		tier: "Bank",
	},
	tropius: {
		randomBattleMoves: ["leechseed", "substitute", "airslash", "gigadrain", "toxic", "protect"],
		randomDoubleBattleMoves: ["leechseed", "protect", "airslash", "gigadrain", "earthquake", "hiddenpowerfire", "tailwind", "sunnyday", "roost"],
		eventPokemon: [
			{"generation": 4, "level": 53, "gender": "F", "nature": "Jolly", "abilities":["chlorophyll"], "moves":["airslash", "synthesis", "sunnyday", "solarbeam"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	chingling: {
		randomBattleMoves: ["hypnosis", "reflect", "lightscreen", "toxic", "recover", "psychic", "signalbeam", "healbell"],
		tier: "Bank-LC",
	},
	chimecho: {
		randomBattleMoves: ["psychic", "yawn", "recover", "calmmind", "shadowball", "healingwish", "healbell", "taunt"],
		randomDoubleBattleMoves: ["protect", "psychic", "thunderwave", "recover", "shadowball", "dazzlinggleam", "trickroom", "helpinghand", "taunt"],
		eventPokemon: [
			{"generation": 3, "level": 10, "gender": "M", "moves":["wrap", "growl", "astonish"]},
		],
		tier: "Bank",
	},
	absol: {
		randomBattleMoves: ["swordsdance", "suckerpunch", "knockoff", "superpower", "pursuit", "playrough"],
		randomDoubleBattleMoves: ["swordsdance", "suckerpunch", "knockoff", "fireblast", "superpower", "protect", "playrough"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["pressure"], "moves":["scratch", "leer", "wish"]},
			{"generation": 3, "level": 5, "shiny": 1, "abilities":["pressure"], "moves":["scratch", "leer", "spite"]},
			{"generation": 3, "level": 35, "abilities":["pressure"], "moves":["razorwind", "bite", "swordsdance", "spite"]},
			{"generation": 3, "level": 70, "abilities":["pressure"], "moves":["doubleteam", "slash", "futuresight", "perishsong"]},
		],
		tier: "New",
	},
	absolmega: {
		randomBattleMoves: ["swordsdance", "suckerpunch", "knockoff", "fireblast", "superpower", "pursuit", "playrough", "icebeam"],
		randomDoubleBattleMoves: ["swordsdance", "suckerpunch", "knockoff", "fireblast", "superpower", "protect", "playrough"],
		requiredItem: "Absolite",
		tier: "New",
	},
	snorunt: {
		randomBattleMoves: ["spikes", "icebeam", "iceshard", "shadowball", "toxic"],
		eventPokemon: [
			{"generation": 3, "level": 20, "abilities":["innerfocus"], "moves":["sing", "waterpulse", "bite", "icywind"]},
		],
		tier: "LC",
	},
	glalie: {
		randomBattleMoves: ["spikes", "icebeam", "iceshard", "taunt", "earthquake", "explosion", "superfang"],
		randomDoubleBattleMoves: ["icebeam", "iceshard", "taunt", "earthquake", "protect"],
		tier: "New",
	},
	glaliemega: {
		randomBattleMoves: ["freezedry", "iceshard", "earthquake", "explosion", "return", "spikes"],
		randomDoubleBattleMoves: ["crunch", "iceshard", "freezedry", "earthquake", "explosion", "protect", "return"],
		requiredItem: "Glalitite",
		tier: "New",
	},
	froslass: {
		randomBattleMoves: ["icebeam", "spikes", "destinybond", "shadowball", "taunt", "thunderwave"],
		randomDoubleBattleMoves: ["icebeam", "protect", "destinybond", "shadowball", "taunt", "thunderwave"],
		tier: "New",
	},
	spheal: {
		randomBattleMoves: ["substitute", "protect", "toxic", "surf", "icebeam", "yawn", "superfang"],
		eventPokemon: [
			{"generation": 3, "level": 17, "abilities":["thickfat"], "moves":["charm", "aurorabeam", "watergun", "mudslap"]},
		],
		tier: "LC",
	},
	sealeo: {
		randomBattleMoves: ["substitute", "protect", "toxic", "surf", "icebeam", "yawn", "superfang"],
		tier: "NFE",
	},
	walrein: {
		randomBattleMoves: ["substitute", "protect", "toxic", "surf", "icebeam", "roar"],
		randomDoubleBattleMoves: ["protect", "icywind", "surf", "icebeam"],
		eventPokemon: [
			{"generation": 5, "level": 50, "isHidden": false, "abilities":["thickfat"], "moves":["icebeam", "brine", "hail", "sheercold"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	clamperl: {
		randomBattleMoves: ["shellsmash", "icebeam", "surf", "hiddenpowergrass", "hiddenpowerelectric", "substitute"],
		tier: "Bank-LC",
	},
	huntail: {
		randomBattleMoves: ["shellsmash", "waterfall", "icebeam", "batonpass", "suckerpunch"],
		randomDoubleBattleMoves: ["shellsmash", "waterfall", "icefang", "batonpass", "suckerpunch", "protect"],
		tier: "Bank",
	},
	gorebyss: {
		randomBattleMoves: ["shellsmash", "batonpass", "hydropump", "icebeam", "hiddenpowergrass", "substitute"],
		randomDoubleBattleMoves: ["shellsmash", "batonpass", "surf", "icebeam", "hiddenpowergrass", "substitute", "protect"],
		tier: "Bank",
	},
	relicanth: {
		randomBattleMoves: ["headsmash", "waterfall", "earthquake", "doubleedge", "stealthrock", "toxic"],
		randomDoubleBattleMoves: ["headsmash", "waterfall", "earthquake", "doubleedge", "rockslide", "protect"],
		tier: "New",
	},
	luvdisc: {
		randomBattleMoves: ["icebeam", "toxic", "sweetkiss", "protect", "scald"],
		tier: "New",
	},
	bagon: {
		randomBattleMoves: ["outrage", "dragondance", "firefang", "rockslide", "dragonclaw"],
		eventPokemon: [
			{"generation": 3, "level": 5, "shiny": 1, "moves":["rage", "bite", "wish"]},
			{"generation": 3, "level": 5, "shiny": 1, "moves":["rage", "bite", "irondefense"]},
			{"generation": 5, "level": 1, "shiny": true, "isHidden": false, "moves":["rage"]},
			{"generation": 6, "level": 1, "isHidden": false, "moves":["rage", "thrash"]},
		],
		tier: "LC",
	},
	shelgon: {
		randomBattleMoves: ["outrage", "brickbreak", "dragonclaw", "dragondance", "crunch", "zenheadbutt"],
		tier: "NFE",
	},
	salamence: {
		randomBattleMoves: ["outrage", "fireblast", "earthquake", "dracometeor", "dragondance", "dragonclaw"],
		randomDoubleBattleMoves: ["protect", "fireblast", "earthquake", "dracometeor", "tailwind", "dragondance", "dragonclaw", "hydropump", "rockslide"],
		eventPokemon: [
			{"generation": 3, "level": 50, "moves":["protect", "dragonbreath", "scaryface", "fly"]},
			{"generation": 3, "level": 50, "moves":["refresh", "dragonclaw", "dragondance", "aerialace"]},
			{"generation": 4, "level": 50, "gender": "M", "nature": "Naughty", "moves":["hydropump", "stoneedge", "fireblast", "dragonclaw"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "moves":["dragondance", "dragonclaw", "outrage", "aerialace"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	salamencemega: {
		randomBattleMoves: ["doubleedge", "return", "fireblast", "earthquake", "dracometeor", "roost", "dragondance"],
		randomDoubleBattleMoves: ["doubleedge", "return", "fireblast", "earthquake", "dracometeor", "protect", "dragondance", "dragonclaw"],
		requiredItem: "Salamencite",
		tier: "Uber",
	},
	beldum: {
		randomBattleMoves: ["ironhead", "zenheadbutt", "headbutt", "irondefense"],
		eventPokemon: [
			{"generation": 6, "level": 5, "shiny": true, "isHidden": false, "moves":["holdback", "ironhead", "zenheadbutt", "irondefense"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	metang: {
		randomBattleMoves: ["stealthrock", "meteormash", "toxic", "earthquake", "bulletpunch", "zenheadbutt"],
		eventPokemon: [
			{"generation": 3, "level": 30, "moves":["takedown", "confusion", "metalclaw", "refresh"]},
		],
		tier: "New",
	},
	metagross: {
		randomBattleMoves: ["meteormash", "earthquake", "agility", "stealthrock", "zenheadbutt", "bulletpunch", "thunderpunch", "explosion", "icepunch"],
		randomDoubleBattleMoves: ["meteormash", "earthquake", "protect", "zenheadbutt", "bulletpunch", "thunderpunch", "explosion", "icepunch", "hammerarm"],
		eventPokemon: [
			{"generation": 4, "level": 62, "nature": "Brave", "moves":["bulletpunch", "meteormash", "hammerarm", "zenheadbutt"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "shiny": 1, "isHidden": false, "moves":["meteormash", "earthquake", "bulletpunch", "hammerarm"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "isHidden": false, "moves":["bulletpunch", "zenheadbutt", "hammerarm", "icepunch"], "pokeball": "cherishball"},
			{"generation": 5, "level": 45, "isHidden": false, "moves":["earthquake", "zenheadbutt", "protect", "meteormash"]},
			{"generation": 5, "level": 45, "isHidden": true, "moves":["irondefense", "agility", "hammerarm", "doubleedge"]},
			{"generation": 5, "level": 45, "isHidden": true, "moves":["psychic", "meteormash", "hammerarm", "doubleedge"]},
			{"generation": 5, "level": 58, "nature": "Serious", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "moves":["earthquake", "hyperbeam", "psychic", "meteormash"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	metagrossmega: {
		randomBattleMoves: ["meteormash", "earthquake", "agility", "zenheadbutt", "hammerarm", "icepunch"],
		randomDoubleBattleMoves: ["meteormash", "earthquake", "protect", "zenheadbutt", "thunderpunch", "icepunch"],
		requiredItem: "Metagrossite",
		tier: "New",
	},
	regirock: {
		randomBattleMoves: ["stealthrock", "thunderwave", "stoneedge", "drainpunch", "curse", "rest", "rockslide", "toxic"],
		randomDoubleBattleMoves: ["stealthrock", "thunderwave", "stoneedge", "drainpunch", "curse", "rockslide", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 40, "shiny": 1, "moves":["rockthrow", "curse", "superpower", "ancientpower"]},
			{"generation": 3, "level": 40, "moves":["curse", "superpower", "ancientpower", "hyperbeam"]},
			{"generation": 4, "level": 30, "shiny": 1, "moves":["stomp", "rockthrow", "curse", "superpower"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["irondefense", "chargebeam", "lockon", "zapcannon"]},
			{"generation": 6, "level": 40, "shiny": 1, "isHidden": false, "moves":["bulldoze", "curse", "ancientpower", "irondefense"]},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["explosion", "icepunch", "stoneedge", "hammerarm"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	regice: {
		randomBattleMoves: ["thunderwave", "icebeam", "thunderbolt", "rest", "sleeptalk", "focusblast", "rockpolish"],
		randomDoubleBattleMoves: ["thunderwave", "icebeam", "thunderbolt", "icywind", "protect", "focusblast", "rockpolish"],
		eventPokemon: [
			{"generation": 3, "level": 40, "shiny": 1, "moves":["icywind", "curse", "superpower", "ancientpower"]},
			{"generation": 3, "level": 40, "moves":["curse", "superpower", "ancientpower", "hyperbeam"]},
			{"generation": 4, "level": 30, "shiny": 1, "moves":["stomp", "icywind", "curse", "superpower"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["amnesia", "chargebeam", "lockon", "zapcannon"]},
			{"generation": 6, "level": 40, "shiny": 1, "isHidden": false, "moves":["bulldoze", "curse", "ancientpower", "amnesia"]},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["thunderbolt", "amnesia", "icebeam", "hail"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	registeel: {
		randomBattleMoves: ["stealthrock", "thunderwave", "toxic", "protect", "seismictoss", "curse", "ironhead", "rest", "sleeptalk"],
		randomDoubleBattleMoves: ["stealthrock", "ironhead", "curse", "rest", "thunderwave", "protect", "seismictoss"],
		eventPokemon: [
			{"generation": 3, "level": 40, "shiny": 1, "moves":["metalclaw", "curse", "superpower", "ancientpower"]},
			{"generation": 3, "level": 40, "moves":["curse", "superpower", "ancientpower", "hyperbeam"]},
			{"generation": 4, "level": 30, "shiny": 1, "moves":["stomp", "metalclaw", "curse", "superpower"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["amnesia", "chargebeam", "lockon", "zapcannon"]},
			{"generation": 6, "level": 40, "shiny": 1, "isHidden": false, "moves":["curse", "ancientpower", "irondefense", "amnesia"]},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["ironhead", "rockslide", "gravity", "irondefense"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	latias: {
		randomBattleMoves: ["dracometeor", "psyshock", "hiddenpowerfire", "roost", "thunderbolt", "healingwish", "defog"],
		randomDoubleBattleMoves: ["dragonpulse", "psychic", "tailwind", "helpinghand", "healpulse", "lightscreen", "reflect", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 40, "shiny": 1, "moves":["watersport", "refresh", "mistball", "psychic"]},
			{"generation": 3, "level": 50, "shiny": 1, "moves":["mistball", "psychic", "recover", "charm"]},
			{"generation": 3, "level": 70, "moves":["mistball", "psychic", "recover", "charm"]},
			{"generation": 4, "level": 35, "shiny": 1, "moves":["dragonbreath", "watersport", "refresh", "mistball"]},
			{"generation": 4, "level": 40, "shiny": 1, "moves":["watersport", "refresh", "mistball", "zenheadbutt"]},
			{"generation": 5, "level": 68, "shiny": 1, "moves":["psychoshift", "charm", "psychic", "healpulse"]},
			{"generation": 6, "level": 30, "shiny": 1, "moves":["healpulse", "dragonbreath", "mistball", "psychoshift"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	latiasmega: {
		randomBattleMoves: ["calmmind", "dragonpulse", "surf", "dracometeor", "roost", "hiddenpowerfire", "substitute", "psyshock"],
		randomDoubleBattleMoves: ["dragonpulse", "psychic", "tailwind", "helpinghand", "healpulse", "lightscreen", "reflect", "protect"],
		requiredItem: "Latiasite",
		tier: "Unreleased",
	},
	latios: {
		randomBattleMoves: ["dracometeor", "hiddenpowerfire", "surf", "thunderbolt", "psyshock", "roost", "trick", "defog"],
		randomDoubleBattleMoves: ["dracometeor", "dragonpulse", "surf", "thunderbolt", "psyshock", "substitute", "trick", "tailwind", "protect", "hiddenpowerfire"],
		eventPokemon: [
			{"generation": 3, "level": 40, "shiny": 1, "moves":["protect", "refresh", "lusterpurge", "psychic"]},
			{"generation": 3, "level": 50, "shiny": 1, "moves":["lusterpurge", "psychic", "recover", "dragondance"]},
			{"generation": 3, "level": 70, "moves":["lusterpurge", "psychic", "recover", "dragondance"]},
			{"generation": 4, "level": 35, "shiny": 1, "moves":["dragonbreath", "protect", "refresh", "lusterpurge"]},
			{"generation": 4, "level": 40, "shiny": 1, "moves":["protect", "refresh", "lusterpurge", "zenheadbutt"]},
			{"generation": 5, "level": 68, "shiny": 1, "moves":["psychoshift", "dragondance", "psychic", "healpulse"]},
			{"generation": 6, "level": 30, "shiny": 1, "moves":["healpulse", "dragonbreath", "lusterpurge", "psychoshift"]},
			{"generation": 6, "level": 50, "nature": "Modest", "moves":["dragonpulse", "lusterpurge", "psychic", "healpulse"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	latiosmega: {
		randomBattleMoves: ["calmmind", "dracometeor", "hiddenpowerfire", "psyshock", "roost", "memento", "defog"],
		randomDoubleBattleMoves: ["dracometeor", "dragonpulse", "surf", "thunderbolt", "psyshock", "substitute", "tailwind", "protect", "hiddenpowerfire"],
		requiredItem: "Latiosite",
		tier: "Unreleased",
	},
	kyogre: {
		randomBattleMoves: ["waterspout", "originpulse", "scald", "thunder", "icebeam"],
		randomDoubleBattleMoves: ["waterspout", "muddywater", "originpulse", "thunder", "icebeam", "calmmind", "rest", "sleeptalk", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 45, "shiny": 1, "moves":["bodyslam", "calmmind", "icebeam", "hydropump"]},
			{"generation": 3, "level": 70, "shiny": 1, "moves":["hydropump", "rest", "sheercold", "doubleedge"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["aquaring", "icebeam", "ancientpower", "waterspout"]},
			{"generation": 5, "level": 80, "shiny": 1, "moves":["icebeam", "ancientpower", "waterspout", "thunder"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "moves":["waterspout", "thunder", "icebeam", "sheercold"], "pokeball": "cherishball"},
			{"generation": 6, "level": 45, "moves":["bodyslam", "aquaring", "icebeam", "originpulse"]},
			{"generation": 6, "level": 100, "nature": "Timid", "moves":["waterspout", "thunder", "sheercold", "icebeam"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	kyogreprimal: {
		randomBattleMoves: ["calmmind", "waterspout", "originpulse", "scald", "thunder", "icebeam", "rest", "sleeptalk"],
		randomDoubleBattleMoves: ["waterspout", "originpulse", "muddywater", "thunder", "icebeam", "calmmind", "rest", "sleeptalk", "protect"],
		requiredItem: "Blue Orb",
	},
	groudon: {
		randomBattleMoves: ["precipiceblades", "earthquake", "stealthrock", "lavaplume", "stoneedge", "dragontail", "roar", "toxic", "swordsdance", "rockpolish", "firepunch"],
		randomDoubleBattleMoves: ["precipiceblades", "rockslide", "protect", "stoneedge", "swordsdance", "rockpolish", "dragonclaw", "firepunch"],
		eventPokemon: [
			{"generation": 3, "level": 45, "shiny": 1, "moves":["slash", "bulkup", "earthquake", "fireblast"]},
			{"generation": 3, "level": 70, "shiny": 1, "moves":["fireblast", "rest", "fissure", "solarbeam"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["rest", "earthquake", "ancientpower", "eruption"]},
			{"generation": 5, "level": 80, "shiny": 1, "moves":["earthquake", "ancientpower", "eruption", "solarbeam"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "moves":["eruption", "hammerarm", "earthpower", "solarbeam"], "pokeball": "cherishball"},
			{"generation": 6, "level": 45, "moves":["lavaplume", "rest", "earthquake", "precipiceblades"]},
			{"generation": 6, "level": 100, "nature": "Adamant", "moves":["firepunch", "solarbeam", "hammerarm", "rockslide"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	groudonprimal: {
		randomBattleMoves: ["stealthrock", "precipiceblades", "earthquake", "lavaplume", "stoneedge", "overheat", "rockpolish", "thunderwave"],
		randomDoubleBattleMoves: ["precipiceblades", "lavaplume", "rockslide", "stoneedge", "swordsdance", "overheat", "rockpolish", "firepunch", "protect"],
		requiredItem: "Red Orb",
	},
	rayquaza: {
		randomBattleMoves: ["outrage", "vcreate", "extremespeed", "dragondance", "earthquake", "dracometeor", "dragonclaw"],
		randomDoubleBattleMoves: ["tailwind", "vcreate", "extremespeed", "dragondance", "earthquake", "dracometeor", "dragonclaw", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 70, "shiny": 1, "moves":["fly", "rest", "extremespeed", "outrage"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["rest", "airslash", "ancientpower", "outrage"]},
			{"generation": 5, "level": 70, "shiny": true, "moves":["dragonpulse", "ancientpower", "outrage", "dragondance"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "moves":["extremespeed", "hyperbeam", "dragonpulse", "vcreate"], "pokeball": "cherishball"},
			{"generation": 6, "level": 70, "moves":["extremespeed", "dragonpulse", "dragondance", "dragonascent"]},
			{"generation": 6, "level": 70, "shiny": true, "moves":["dragonpulse", "thunder", "twister", "extremespeed"], "pokeball": "cherishball"},
			{"generation": 6, "level": 70, "shiny": true, "moves":["dragonascent", "dragonclaw", "extremespeed", "dragondance"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "shiny": true, "moves":["dragonascent", "dracometeor", "fly", "celebrate"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	rayquazamega: {
		// randomBattleMoves: ["vcreate", "extremespeed", "swordsdance", "earthquake", "dragonascent", "dragonclaw", "dragondance"],
		randomDoubleBattleMoves: ["vcreate", "extremespeed", "swordsdance", "earthquake", "dragonascent", "dragonclaw", "dragondance", "protect"],
		requiredMove: "Dragon Ascent",
		tier: "AG",
	},
	jirachi: {
		randomBattleMoves: ["ironhead", "uturn", "firepunch", "icepunch", "trick", "stealthrock", "bodyslam", "toxic", "wish", "substitute"],
		randomDoubleBattleMoves: ["bodyslam", "ironhead", "icywind", "thunderwave", "helpinghand", "trickroom", "uturn", "followme", "zenheadbutt", "protect"],
		eventPokemon: [
			{"generation": 3, "level": 5, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Bashful", "ivs": {"hp": 24, "atk": 3, "def": 30, "spa": 12, "spd": 16, "spe": 11}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Careful", "ivs": {"hp": 10, "atk": 0, "def": 10, "spa": 10, "spd": 26, "spe": 12}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Docile", "ivs": {"hp": 19, "atk": 7, "def": 10, "spa": 19, "spd": 10, "spe": 16}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Hasty", "ivs": {"hp": 3, "atk": 12, "def": 12, "spa": 7, "spd": 11, "spe": 9}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Jolly", "ivs": {"hp": 11, "atk": 8, "def": 6, "spa": 14, "spd": 5, "spe": 20}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Lonely", "ivs": {"hp": 31, "atk": 23, "def": 26, "spa": 29, "spd": 18, "spe": 5}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Naughty", "ivs": {"hp": 21, "atk": 31, "def": 31, "spa": 18, "spd": 24, "spe": 19}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Serious", "ivs": {"hp": 29, "atk": 10, "def": 31, "spa": 25, "spd": 23, "spe": 21}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 5, "shiny": true, "nature": "Timid", "ivs": {"hp": 15, "atk": 28, "def": 29, "spa": 3, "spd": 0, "spe": 7}, "moves":["wish", "confusion", "rest"]},
			{"generation": 3, "level": 30, "moves":["helpinghand", "psychic", "refresh", "rest"]},
			{"generation": 4, "level": 5, "moves":["wish", "confusion", "rest"], "pokeball": "cherishball"},
			{"generation": 4, "level": 5, "moves":["wish", "confusion", "rest", "dracometeor"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "moves":["healingwish", "psychic", "swift", "meteormash"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "moves":["dracometeor", "meteormash", "wish", "followme"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "moves":["wish", "healingwish", "cosmicpower", "meteormash"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "moves":["wish", "healingwish", "swift", "return"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "shiny": true, "moves":["wish", "swift", "healingwish", "moonblast"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "shiny": true, "moves":["wish", "confusion", "helpinghand", "return"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["heartstamp", "playrough", "wish", "cosmicpower"], "pokeball": "cherishball"},
			{"generation": 6, "level": 25, "shiny": true, "moves":["wish", "confusion", "swift", "happyhour"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["wish", "confusion", "rest"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	deoxys: {
		randomBattleMoves: ["psychoboost", "stealthrock", "spikes", "firepunch", "superpower", "extremespeed", "knockoff", "taunt"],
		randomDoubleBattleMoves: ["psychoboost", "superpower", "extremespeed", "icebeam", "thunderbolt", "firepunch", "protect", "knockoff", "psyshock"],
		eventPokemon: [
			{"generation": 3, "level": 30, "shiny": 1, "moves":["taunt", "pursuit", "psychic", "superpower"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["knockoff", "spikes", "psychic", "snatch"]},
			{"generation": 3, "level": 30, "shiny": 1, "moves":["knockoff", "pursuit", "psychic", "swift"]},
			{"generation": 3, "level": 70, "moves":["cosmicpower", "recover", "psychoboost", "hyperbeam"]},
			{"generation": 4, "level": 50, "moves":["psychoboost", "zapcannon", "irondefense", "extremespeed"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["psychoboost", "swift", "doubleteam", "extremespeed"]},
			{"generation": 4, "level": 50, "moves":["psychoboost", "detect", "counter", "mirrorcoat"]},
			{"generation": 4, "level": 50, "moves":["psychoboost", "meteormash", "superpower", "hyperbeam"]},
			{"generation": 4, "level": 50, "moves":["psychoboost", "leer", "wrap", "nightshade"]},
			{"generation": 5, "level": 100, "moves":["nastyplot", "darkpulse", "recover", "psychoboost"], "pokeball": "duskball"},
			{"generation": 6, "level": 80, "moves":["cosmicpower", "recover", "psychoboost", "hyperbeam"]},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	deoxysattack: {
		randomBattleMoves: ["psychoboost", "superpower", "icebeam", "knockoff", "extremespeed", "firepunch", "stealthrock"],
		randomDoubleBattleMoves: ["psychoboost", "superpower", "extremespeed", "icebeam", "thunderbolt", "firepunch", "protect", "knockoff"],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	deoxysdefense: {
		randomBattleMoves: ["spikes", "stealthrock", "recover", "taunt", "toxic", "seismictoss", "knockoff"],
		randomDoubleBattleMoves: ["protect", "stealthrock", "recover", "taunt", "reflect", "seismictoss", "lightscreen", "trickroom"],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	deoxysspeed: {
		randomBattleMoves: ["spikes", "stealthrock", "superpower", "psychoboost", "taunt", "magiccoat", "knockoff"],
		randomDoubleBattleMoves: ["superpower", "icebeam", "psychoboost", "taunt", "lightscreen", "reflect", "protect", "knockoff"],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	turtwig: {
		randomBattleMoves: ["reflect", "lightscreen", "stealthrock", "seedbomb", "substitute", "leechseed", "toxic"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tackle", "withdraw", "absorb"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["tackle", "withdraw", "absorb", "stockpile"]},
		],
		tier: "Bank-LC",
	},
	grotle: {
		randomBattleMoves: ["reflect", "lightscreen", "stealthrock", "seedbomb", "substitute", "leechseed", "toxic"],
		tier: "Bank-NFE",
	},
	torterra: {
		randomBattleMoves: ["stealthrock", "earthquake", "woodhammer", "stoneedge", "synthesis", "rockpolish"],
		randomDoubleBattleMoves: ["protect", "earthquake", "woodhammer", "stoneedge", "rockslide", "wideguard", "rockpolish"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["woodhammer", "earthquake", "outrage", "stoneedge"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	chimchar: {
		randomBattleMoves: ["stealthrock", "overheat", "hiddenpowergrass", "fakeout", "uturn", "gunkshot"],
		eventPokemon: [
			{"generation": 4, "level": 40, "gender": "M", "nature": "Mild", "moves":["flamethrower", "thunderpunch", "grassknot", "helpinghand"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["scratch", "leer", "ember", "taunt"]},
			{"generation": 4, "level": 40, "gender": "M", "nature": "Hardy", "moves":["flamethrower", "thunderpunch", "grassknot", "helpinghand"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["leer", "ember", "taunt", "fakeout"]},
		],
		tier: "Bank-LC",
	},
	monferno: {
		randomBattleMoves: ["stealthrock", "overheat", "hiddenpowergrass", "fakeout", "vacuumwave", "uturn", "gunkshot"],
		tier: "Bank",
	},
	infernape: {
		randomBattleMoves: ["stealthrock", "uturn", "swordsdance", "closecombat", "flareblitz", "thunderpunch", "machpunch", "nastyplot", "fireblast", "vacuumwave", "grassknot", "hiddenpowerice"],
		randomDoubleBattleMoves: ["fakeout", "heatwave", "closecombat", "uturn", "grassknot", "stoneedge", "machpunch", "feint", "taunt", "flareblitz", "hiddenpowerice", "thunderpunch", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["fireblast", "closecombat", "uturn", "grassknot"], "pokeball": "cherishball"},
			{"generation": 6, "level": 88, "isHidden": true, "moves":["fireblast", "closecombat", "firepunch", "focuspunch"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	piplup: {
		randomBattleMoves: ["stealthrock", "hydropump", "scald", "icebeam", "hiddenpowerelectric", "hiddenpowerfire", "yawn", "defog"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["pound", "growl", "bubble"]},
			{"generation": 5, "level": 15, "shiny": 1, "isHidden": false, "moves":["hydropump", "featherdance", "watersport", "peck"], "pokeball": "cherishball"},
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "moves":["sing", "round", "featherdance", "peck"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["pound", "growl", "bubble", "featherdance"]},
			{"generation": 6, "level": 7, "isHidden": false, "moves":["pound", "growl", "return"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	prinplup: {
		randomBattleMoves: ["stealthrock", "hydropump", "scald", "icebeam", "hiddenpowerelectric", "hiddenpowerfire", "yawn", "defog"],
		tier: "Bank",
	},
	empoleon: {
		randomBattleMoves: ["hydropump", "flashcannon", "grassknot", "hiddenpowerfire", "icebeam", "scald", "toxic", "roar", "stealthrock"],
		randomDoubleBattleMoves: ["icywind", "scald", "surf", "icebeam", "hiddenpowerelectric", "protect", "grassknot", "flashcannon"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["hydropump", "icebeam", "aquajet", "grassknot"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	starly: {
		randomBattleMoves: ["bravebird", "return", "uturn", "pursuit"],
		eventPokemon: [
			{"generation": 4, "level": 1, "gender": "M", "nature": "Mild", "moves":["tackle", "growl"]},
		],
		tier: "LC",
	},
	staravia: {
		randomBattleMoves: ["bravebird", "return", "uturn", "pursuit", "defog"],
		tier: "NFE",
	},
	staraptor: {
		randomBattleMoves: ["bravebird", "closecombat", "uturn", "quickattack", "roost", "doubleedge"],
		randomDoubleBattleMoves: ["bravebird", "closecombat", "uturn", "quickattack", "doubleedge", "tailwind", "protect"],
		tier: "New",
	},
	bidoof: {
		randomBattleMoves: ["return", "aquatail", "curse", "quickattack", "stealthrock", "superfang"],
		eventPokemon: [
			{"generation": 4, "level": 1, "gender": "M", "nature": "Lonely", "abilities":["simple"], "moves":["tackle"]},
		],
		tier: "Bank-LC",
	},
	bibarel: {
		randomBattleMoves: ["return", "waterfall", "swordsdance", "quickattack", "aquajet"],
		randomDoubleBattleMoves: ["return", "waterfall", "curse", "aquajet", "quickattack", "protect", "rest"],
		tier: "Bank",
	},
	kricketot: {
		randomBattleMoves: ["endeavor", "mudslap", "bugbite", "strugglebug"],
		tier: "Bank-LC",
	},
	kricketune: {
		randomBattleMoves: ["xscissor", "endeavor", "taunt", "toxic", "stickyweb", "knockoff"],
		randomDoubleBattleMoves: ["bugbite", "protect", "taunt", "stickyweb", "knockoff"],
		tier: "Bank",
	},
	shinx: {
		randomBattleMoves: ["wildcharge", "icefang", "firefang", "crunch"],
		tier: "LC",
	},
	luxio: {
		randomBattleMoves: ["wildcharge", "icefang", "firefang", "crunch"],
		tier: "NFE",
	},
	luxray: {
		randomBattleMoves: ["wildcharge", "icefang", "voltswitch", "crunch", "superpower", "facade"],
		randomDoubleBattleMoves: ["wildcharge", "icefang", "voltswitch", "crunch", "superpower", "facade", "protect"],
		tier: "New",
	},
	cranidos: {
		randomBattleMoves: ["headsmash", "rockslide", "earthquake", "zenheadbutt", "firepunch", "rockpolish", "crunch"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "moves":["pursuit", "takedown", "crunch", "headbutt"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	rampardos: {
		randomBattleMoves: ["headsmash", "earthquake", "rockpolish", "crunch", "rockslide", "firepunch"],
		randomDoubleBattleMoves: ["headsmash", "earthquake", "zenheadbutt", "rockslide", "crunch", "stoneedge", "protect"],
		tier: "New",
	},
	shieldon: {
		randomBattleMoves: ["stealthrock", "metalburst", "fireblast", "icebeam", "protect", "toxic", "roar"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "moves":["metalsound", "takedown", "bodyslam", "protect"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	bastiodon: {
		randomBattleMoves: ["stealthrock", "rockblast", "metalburst", "protect", "toxic", "roar"],
		randomDoubleBattleMoves: ["stealthrock", "stoneedge", "metalburst", "protect", "wideguard", "guardsplit"],
		tier: "New",
	},
	burmy: {
		randomBattleMoves: ["bugbite", "hiddenpowerice", "electroweb", "protect"],
		tier: "Bank-LC",
	},
	wormadam: {
		randomBattleMoves: ["gigadrain", "signalbeam", "protect", "toxic", "synthesis"],
		randomDoubleBattleMoves: ["leafstorm", "gigadrain", "signalbeam", "hiddenpowerice", "hiddenpowerrock", "stringshot", "protect"],
		tier: "Bank",
	},
	wormadamsandy: {
		randomBattleMoves: ["earthquake", "toxic", "rockblast", "protect", "stealthrock"],
		randomDoubleBattleMoves: ["earthquake", "suckerpunch", "rockblast", "protect", "stringshot"],
		tier: "Bank",
	},
	wormadamtrash: {
		randomBattleMoves: ["stealthrock", "toxic", "gyroball", "protect"],
		randomDoubleBattleMoves: ["strugglebug", "stringshot", "gyroball", "protect"],
		tier: "Bank",
	},
	mothim: {
		randomBattleMoves: ["quiverdance", "bugbuzz", "airslash", "gigadrain", "hiddenpowerground", "uturn"],
		randomDoubleBattleMoves: ["quiverdance", "bugbuzz", "airslash", "gigadrain", "roost", "protect"],
		tier: "Bank",
	},
	combee: {
		randomBattleMoves: ["bugbuzz", "aircutter", "endeavor", "ominouswind", "tailwind"],
		tier: "Bank-LC",
	},
	vespiquen: {
		randomBattleMoves: ["substitute", "healorder", "toxic", "attackorder", "defendorder", "infestation"],
		randomDoubleBattleMoves: ["tailwind", "healorder", "stringshot", "attackorder", "strugglebug", "protect"],
		tier: "Bank",
	},
	pachirisu: {
		randomBattleMoves: ["nuzzle", "thunderbolt", "superfang", "toxic", "uturn"],
		randomDoubleBattleMoves: ["nuzzle", "thunderbolt", "superfang", "followme", "uturn", "helpinghand", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "nature": "Impish", "ivs": {"hp": 31, "atk": 31, "def": 31, "spa": 14, "spd": 31, "spe": 31}, "isHidden": true, "moves":["nuzzle", "superfang", "followme", "protect"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	buizel: {
		randomBattleMoves: ["waterfall", "aquajet", "switcheroo", "brickbreak", "bulkup", "batonpass", "icepunch"],
		tier: "Bank-LC",
	},
	floatzel: {
		randomBattleMoves: ["bulkup", "batonpass", "waterfall", "icepunch", "substitute", "taunt", "aquajet", "brickbreak"],
		randomDoubleBattleMoves: ["waterfall", "aquajet", "switcheroo", "raindance", "protect", "icepunch", "crunch", "taunt"],
		tier: "Bank",
	},
	cherubi: {
		randomBattleMoves: ["sunnyday", "solarbeam", "weatherball", "hiddenpowerice", "aromatherapy", "dazzlinggleam"],
		tier: "Bank-LC",
	},
	cherrim: {
		randomBattleMoves: ["energyball", "dazzlinggleam", "hiddenpowerfire", "synthesis", "healingwish"],
		randomDoubleBattleMoves: ["sunnyday", "solarbeam", "weatherball", "gigadrain", "protect"],
		tier: "Bank",
	},
	cherrimsunshine: {
		randomBattleMoves: ["sunnyday", "solarbeam", "gigadrain", "weatherball", "hiddenpowerice"],
		randomDoubleBattleMoves: ["sunnyday", "solarbeam", "gigadrain", "weatherball", "protect"],
		battleOnly: true,
	},
	shellos: {
		randomBattleMoves: ["scald", "clearsmog", "recover", "toxic", "icebeam", "stockpile"],
		tier: "LC",
	},
	gastrodon: {
		randomBattleMoves: ["earthquake", "icebeam", "scald", "toxic", "recover", "clearsmog"],
		randomDoubleBattleMoves: ["earthpower", "icebeam", "scald", "muddywater", "recover", "icywind", "protect"],
		tier: "New",
	},
	drifloon: {
		randomBattleMoves: ["shadowball", "substitute", "calmmind", "hypnosis", "hiddenpowerfighting", "thunderbolt", "destinybond", "willowisp"],
		tier: "LC",
	},
	drifblim: {
		randomBattleMoves: ["acrobatics", "willowisp", "substitute", "destinybond", "shadowball", "hex"],
		randomDoubleBattleMoves: ["shadowball", "substitute", "hypnosis", "hiddenpowerfighting", "thunderbolt", "destinybond", "willowisp", "protect"],
		tier: "New",
	},
	buneary: {
		randomBattleMoves: ["fakeout", "return", "switcheroo", "thunderpunch", "jumpkick", "firepunch", "icepunch", "healingwish"],
		tier: "Bank-LC",
	},
	lopunny: {
		randomBattleMoves: ["return", "switcheroo", "highjumpkick", "icepunch", "healingwish"],
		randomDoubleBattleMoves: ["return", "switcheroo", "highjumpkick", "firepunch", "icepunch", "fakeout", "protect", "encore"],
		tier: "Bank",
	},
	lopunnymega: {
		randomBattleMoves: ["return", "highjumpkick", "substitute", "thunderpunch", "icepunch"],
		randomDoubleBattleMoves: ["return", "highjumpkick", "protect", "fakeout", "icepunch", "encore"],
		requiredItem: "Lopunnite",
		tier: "Unreleased",
	},
	glameow: {
		randomBattleMoves: ["fakeout", "uturn", "suckerpunch", "hypnosis", "quickattack", "return", "foulplay"],
		tier: "Bank-LC",
	},
	purugly: {
		randomBattleMoves: ["fakeout", "uturn", "suckerpunch", "quickattack", "return", "knockoff"],
		randomDoubleBattleMoves: ["fakeout", "uturn", "suckerpunch", "quickattack", "return", "knockoff", "protect"],
		tier: "Bank",
	},
	stunky: {
		randomBattleMoves: ["pursuit", "suckerpunch", "crunch", "fireblast", "explosion", "taunt", "playrough", "defog"],
		tier: "Bank-LC",
	},
	skuntank: {
		randomBattleMoves: ["pursuit", "suckerpunch", "crunch", "fireblast", "taunt", "poisonjab", "defog"],
		randomDoubleBattleMoves: ["protect", "suckerpunch", "crunch", "fireblast", "taunt", "poisonjab", "playrough", "snarl"],
		tier: "Bank",
	},
	bronzor: {
		randomBattleMoves: ["stealthrock", "psychic", "toxic", "hypnosis", "reflect", "lightscreen", "trickroom", "trick"],
		tier: "Bank-LC",
	},
	bronzong: {
		randomBattleMoves: ["stealthrock", "earthquake", "toxic", "reflect", "lightscreen", "trickroom", "explosion", "gyroball"],
		randomDoubleBattleMoves: ["earthquake", "protect", "reflect", "lightscreen", "trickroom", "explosion", "gyroball"],
		tier: "Bank",
	},
	chatot: {
		randomBattleMoves: ["nastyplot", "boomburst", "heatwave", "hiddenpowerground", "substitute", "chatter", "uturn"],
		randomDoubleBattleMoves: ["nastyplot", "heatwave", "encore", "substitute", "chatter", "uturn", "protect", "hypervoice", "boomburst"],
		eventPokemon: [
			{"generation": 4, "level": 25, "gender": "M", "nature": "Jolly", "abilities":["keeneye"], "moves":["mirrormove", "furyattack", "chatter", "taunt"]},
		],
		tier: "Bank",
	},
	spiritomb: {
		randomBattleMoves: ["shadowsneak", "suckerpunch", "pursuit", "willowisp", "darkpulse", "rest", "sleeptalk", "foulplay", "painsplit", "calmmind"],
		randomDoubleBattleMoves: ["shadowsneak", "suckerpunch", "icywind", "willowisp", "snarl", "darkpulse", "protect", "foulplay", "painsplit"],
		eventPokemon: [
			{"generation": 5, "level": 61, "gender": "F", "nature": "Quiet", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "moves":["darkpulse", "psychic", "silverwind", "embargo"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	gible: {
		randomBattleMoves: ["outrage", "dragonclaw", "earthquake", "fireblast", "stoneedge", "stealthrock"],
		tier: "LC",
	},
	gabite: {
		randomBattleMoves: ["outrage", "dragonclaw", "earthquake", "fireblast", "stoneedge", "stealthrock"],
		tier: "New",
	},
	garchomp: {
		randomBattleMoves: ["outrage", "dragonclaw", "earthquake", "stoneedge", "fireblast", "swordsdance", "stealthrock", "firefang"],
		randomDoubleBattleMoves: ["substitute", "dragonclaw", "earthquake", "stoneedge", "rockslide", "swordsdance", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["outrage", "earthquake", "swordsdance", "stoneedge"], "pokeball": "cherishball"},
			{"generation": 5, "level": 48, "gender": "M", "isHidden": true, "moves":["dragonclaw", "dig", "crunch", "outrage"]},
			{"generation": 6, "level": 48, "gender": "M", "isHidden": false, "moves":["dracometeor", "dragonclaw", "dig", "crunch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "gender": "M", "isHidden": false, "moves":["slash", "dragonclaw", "dig", "crunch"], "pokeball": "cherishball"},
			{"generation": 6, "level": 66, "gender": "F", "perfectIVs": 3, "isHidden": false, "moves":["dragonrush", "earthquake", "brickbreak", "gigaimpact"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	garchompmega: {
		randomBattleMoves: ["outrage", "dracometeor", "earthquake", "stoneedge", "fireblast", "swordsdance"],
		randomDoubleBattleMoves: ["substitute", "dragonclaw", "earthquake", "stoneedge", "rockslide", "swordsdance", "protect", "fireblast"],
		requiredItem: "Garchompite",
		tier: "(OU)",
	},
	riolu: {
		randomBattleMoves: ["crunch", "rockslide", "copycat", "drainpunch", "highjumpkick", "icepunch", "swordsdance"],
		eventPokemon: [
			{"generation": 4, "level": 30, "gender": "M", "nature": "Serious", "abilities":["steadfast"], "moves":["aurasphere", "shadowclaw", "bulletpunch", "drainpunch"]},
		],
		tier: "LC",
	},
	lucario: {
		randomBattleMoves: ["swordsdance", "closecombat", "crunch", "extremespeed", "icepunch", "nastyplot", "aurasphere", "darkpulse", "vacuumwave", "flashcannon"],
		randomDoubleBattleMoves: ["followme", "closecombat", "crunch", "extremespeed", "icepunch", "bulletpunch", "aurasphere", "darkpulse", "vacuumwave", "flashcannon", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 50, "gender": "M", "nature": "Modest", "abilities":["steadfast"], "moves":["aurasphere", "darkpulse", "dragonpulse", "waterpulse"], "pokeball": "cherishball"},
			{"generation": 4, "level": 30, "gender": "M", "nature": "Adamant", "abilities":["innerfocus"], "moves":["forcepalm", "bonerush", "sunnyday", "blazekick"], "pokeball": "cherishball"},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["detect", "metalclaw", "counter", "bulletpunch"]},
			{"generation": 5, "level": 50, "gender": "M", "nature": "Naughty", "ivs": {"atk": 31}, "isHidden": true, "moves":["bulletpunch", "closecombat", "stoneedge", "shadowclaw"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "nature": "Jolly", "isHidden": false, "abilities":["innerfocus"], "moves":["closecombat", "aurasphere", "flashcannon", "quickattack"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	lucariomega: {
		randomBattleMoves: ["swordsdance", "closecombat", "crunch", "icepunch", "bulletpunch", "nastyplot", "aurasphere", "darkpulse", "flashcannon"],
		randomDoubleBattleMoves: ["followme", "closecombat", "crunch", "extremespeed", "icepunch", "bulletpunch", "aurasphere", "darkpulse", "vacuumwave", "flashcannon", "protect"],
		requiredItem: "Lucarionite",
		tier: "Uber",
	},
	hippopotas: {
		randomBattleMoves: ["earthquake", "slackoff", "whirlwind", "stealthrock", "protect", "toxic", "stockpile"],
		tier: "Bank-LC",
	},
	hippowdon: {
		randomBattleMoves: ["earthquake", "slackoff", "whirlwind", "stealthrock", "toxic", "stoneedge"],
		randomDoubleBattleMoves: ["earthquake", "slackoff", "rockslide", "stealthrock", "protect", "stoneedge"],
		tier: "Bank",
	},
	skorupi: {
		randomBattleMoves: ["toxicspikes", "xscissor", "poisonjab", "knockoff", "pinmissile", "whirlwind"],
		tier: "Bank-LC",
	},
	drapion: {
		randomBattleMoves: ["knockoff", "taunt", "toxicspikes", "poisonjab", "whirlwind", "swordsdance", "aquatail", "earthquake"],
		randomDoubleBattleMoves: ["snarl", "taunt", "protect", "earthquake", "aquatail", "swordsdance", "poisonjab", "knockoff"],
		tier: "Bank",
	},
	croagunk: {
		randomBattleMoves: ["fakeout", "vacuumwave", "suckerpunch", "drainpunch", "darkpulse", "knockoff", "gunkshot", "toxic"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["astonish", "mudslap", "poisonsting", "taunt"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["mudslap", "poisonsting", "taunt", "poisonjab"]},
		],
		tier: "Bank-LC",
	},
	toxicroak: {
		randomBattleMoves: ["swordsdance", "gunkshot", "drainpunch", "suckerpunch", "icepunch", "substitute"],
		randomDoubleBattleMoves: ["suckerpunch", "drainpunch", "substitute", "swordsdance", "knockoff", "icepunch", "gunkshot", "fakeout", "protect"],
		tier: "Bank",
	},
	carnivine: {
		randomBattleMoves: ["swordsdance", "powerwhip", "return", "sleeppowder", "substitute", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "powerwhip", "return", "sleeppowder", "substitute", "leechseed", "knockoff", "ragepowder", "protect"],
		tier: "Bank",
	},
	finneon: {
		randomBattleMoves: ["surf", "uturn", "icebeam", "hiddenpowerelectric", "hiddenpowergrass"],
		tier: "LC",
	},
	lumineon: {
		randomBattleMoves: ["scald", "waterfall", "icebeam", "uturn", "toxic", "defog"],
		randomDoubleBattleMoves: ["surf", "uturn", "icebeam", "toxic", "raindance", "tailwind", "protect"],
		tier: "New",
	},
	snover: {
		randomBattleMoves: ["blizzard", "iceshard", "gigadrain", "leechseed", "substitute", "woodhammer"],
		tier: "Bank-LC",
	},
	abomasnow: {
		randomBattleMoves: ["woodhammer", "iceshard", "blizzard", "gigadrain", "leechseed", "substitute", "focuspunch", "earthquake"],
		randomDoubleBattleMoves: ["blizzard", "iceshard", "gigadrain", "protect", "focusblast", "woodhammer", "earthquake"],
		tier: "Bank",
	},
	abomasnowmega: {
		randomBattleMoves: ["blizzard", "gigadrain", "woodhammer", "earthquake", "iceshard", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["blizzard", "iceshard", "gigadrain", "protect", "focusblast", "woodhammer", "earthquake"],
		requiredItem: "Abomasite",
		tier: "Unreleased",
	},
	rotom: {
		randomBattleMoves: ["thunderbolt", "voltswitch", "shadowball", "substitute", "painsplit", "hiddenpowerice", "trick", "willowisp"],
		randomDoubleBattleMoves: ["thunderbolt", "voltswitch", "shadowball", "substitute", "painsplit", "hiddenpowerice", "trick", "willowisp", "electroweb", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 10, "nature": "Naughty", "moves":["uproar", "astonish", "trick", "thundershock"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "nature": "Quirky", "moves":["shockwave", "astonish", "trick", "thunderwave"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	rotomheat: {
		randomBattleMoves: ["overheat", "thunderbolt", "voltswitch", "hiddenpowerice", "painsplit", "willowisp", "trick"],
		randomDoubleBattleMoves: ["overheat", "thunderbolt", "voltswitch", "substitute", "painsplit", "hiddenpowerice", "willowisp", "trick", "electroweb", "protect"],
		tier: "Bank",
	},
	rotomwash: {
		randomBattleMoves: ["hydropump", "thunderbolt", "voltswitch", "painsplit", "hiddenpowerice", "willowisp", "trick"],
		randomDoubleBattleMoves: ["hydropump", "thunderbolt", "voltswitch", "substitute", "painsplit", "hiddenpowerice", "willowisp", "trick", "electroweb", "protect", "hiddenpowergrass"],
		tier: "Bank",
	},
	rotomfrost: {
		randomBattleMoves: ["blizzard", "thunderbolt", "voltswitch", "substitute", "painsplit", "willowisp", "trick"],
		randomDoubleBattleMoves: ["blizzard", "thunderbolt", "voltswitch", "substitute", "painsplit", "willowisp", "trick", "electroweb", "protect"],
		tier: "Bank",
	},
	rotomfan: {
		randomBattleMoves: ["airslash", "thunderbolt", "voltswitch", "painsplit", "willowisp", "trick"],
		randomDoubleBattleMoves: ["airslash", "thunderbolt", "voltswitch", "substitute", "painsplit", "hiddenpowerice", "willowisp", "electroweb", "discharge", "protect"],
		tier: "Bank",
	},
	rotommow: {
		randomBattleMoves: ["leafstorm", "thunderbolt", "voltswitch", "painsplit", "hiddenpowerfire", "willowisp", "trick"],
		randomDoubleBattleMoves: ["leafstorm", "thunderbolt", "voltswitch", "substitute", "painsplit", "hiddenpowerfire", "willowisp", "trick", "electroweb", "protect"],
		tier: "Bank",
	},
	uxie: {
		randomBattleMoves: ["stealthrock", "thunderwave", "psychic", "uturn", "healbell", "knockoff", "yawn"],
		randomDoubleBattleMoves: ["uturn", "psyshock", "yawn", "healbell", "stealthrock", "thunderbolt", "protect", "helpinghand", "thunderwave", "skillswap"],
		eventPokemon: [
			{"generation": 4, "level": 50, "shiny": 1, "moves":["confusion", "yawn", "futuresight", "amnesia"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["swift", "yawn", "futuresight", "amnesia"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["futuresight", "amnesia", "extrasensory", "flail"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["yawn", "futuresight", "amnesia", "extrasensory"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	mesprit: {
		randomBattleMoves: ["calmmind", "psychic", "psyshock", "energyball", "signalbeam", "hiddenpowerfire", "icebeam", "healingwish", "stealthrock", "uturn"],
		randomDoubleBattleMoves: ["calmmind", "psychic", "thunderbolt", "icebeam", "substitute", "uturn", "trick", "protect", "knockoff", "helpinghand"],
		eventPokemon: [
			{"generation": 4, "level": 50, "shiny": 1, "moves":["confusion", "luckychant", "futuresight", "charm"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["swift", "luckychant", "futuresight", "charm"]},
			{"generation": 5, "level": 50, "shiny": 1, "moves":["futuresight", "charm", "extrasensory", "copycat"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["luckychant", "futuresight", "charm", "extrasensory"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	azelf: {
		randomBattleMoves: ["nastyplot", "psyshock", "fireblast", "dazzlinggleam", "stealthrock", "knockoff", "taunt", "explosion"],
		randomDoubleBattleMoves: ["nastyplot", "psychic", "fireblast", "thunderbolt", "icepunch", "knockoff", "zenheadbutt", "uturn", "trick", "taunt", "protect", "dazzlinggleam"],
		eventPokemon: [
			{"generation": 4, "level": 50, "shiny": 1, "moves":["confusion", "uproar", "futuresight", "nastyplot"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["swift", "uproar", "futuresight", "nastyplot"]},
			{"generation": 5, "level": 50, "shiny": 1, "moves":["futuresight", "nastyplot", "extrasensory", "lastresort"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["uproar", "futuresight", "nastyplot", "extrasensory"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	dialga: {
		randomBattleMoves: ["stealthrock", "toxic", "dracometeor", "fireblast", "flashcannon", "roar", "thunderbolt"],
		randomDoubleBattleMoves: ["dracometeor", "dragonpulse", "protect", "thunderbolt", "flashcannon", "earthpower", "fireblast", "aurasphere"],
		eventPokemon: [
			{"generation": 4, "level": 47, "shiny": 1, "moves":["metalclaw", "ancientpower", "dragonclaw", "roaroftime"]},
			{"generation": 4, "level": 70, "shiny": 1, "moves":["roaroftime", "healblock", "earthpower", "slash"]},
			{"generation": 4, "level": 1, "shiny": 1, "moves":["dragonbreath", "scaryface"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["dragonbreath", "scaryface"], "pokeball": "dreamball"},
			{"generation": 5, "level": 100, "shiny": true, "isHidden": false, "moves":["dragonpulse", "dracometeor", "aurasphere", "roaroftime"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["aurasphere", "irontail", "roaroftime", "flashcannon"]},
			{"generation": 6, "level": 100, "nature": "Modest", "isHidden": true, "moves":["metalburst", "overheat", "roaroftime", "flashcannon"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	palkia: {
		randomBattleMoves: ["spacialrend", "dracometeor", "hydropump", "thunderwave", "dragontail", "fireblast"],
		randomDoubleBattleMoves: ["spacialrend", "dracometeor", "surf", "hydropump", "thunderbolt", "fireblast", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 47, "shiny": 1, "moves":["waterpulse", "ancientpower", "dragonclaw", "spacialrend"]},
			{"generation": 4, "level": 70, "shiny": 1, "moves":["spacialrend", "healblock", "earthpower", "slash"]},
			{"generation": 4, "level": 1, "shiny": 1, "moves":["dragonbreath", "scaryface"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["dragonbreath", "scaryface"], "pokeball": "dreamball"},
			{"generation": 5, "level": 100, "shiny": true, "isHidden": false, "moves":["hydropump", "dracometeor", "spacialrend", "aurasphere"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["earthpower", "aurasphere", "spacialrend", "hydropump"]},
			{"generation": 6, "level": 100, "nature": "Timid", "isHidden": true, "moves":["earthpower", "aurasphere", "spacialrend", "hydropump"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	heatran: {
		randomBattleMoves: ["fireblast", "lavaplume", "stealthrock", "earthpower", "flashcannon", "protect", "toxic", "roar"],
		randomDoubleBattleMoves: ["heatwave", "substitute", "earthpower", "protect", "eruption", "willowisp"],
		eventPokemon: [
			{"generation": 4, "level": 70, "shiny": 1, "moves":["scaryface", "lavaplume", "firespin", "ironhead"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["metalsound", "crunch", "scaryface", "lavaplume"]},
			{"generation": 4, "level": 50, "nature": "Quiet", "moves":["eruption", "magmastorm", "earthpower", "ancientpower"]},
			{"generation": 5, "level": 68, "shiny": 1, "isHidden": false, "moves":["scaryface", "lavaplume", "firespin", "ironhead"]},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["metalsound", "crunch", "scaryface", "lavaplume"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "Bank",
	},
	regigigas: {
		randomBattleMoves: ["thunderwave", "confuseray", "substitute", "return", "knockoff", "drainpunch"],
		randomDoubleBattleMoves: ["thunderwave", "substitute", "return", "icywind", "rockslide", "earthquake", "knockoff", "wideguard"],
		eventPokemon: [
			{"generation": 4, "level": 70, "shiny": 1, "moves":["confuseray", "stomp", "superpower", "zenheadbutt"]},
			{"generation": 4, "level": 1, "shiny": 1, "moves":["dizzypunch", "knockoff", "foresight", "confuseray"]},
			{"generation": 4, "level": 100, "moves":["ironhead", "rockslide", "icywind", "crushgrip"], "pokeball": "cherishball"},
			{"generation": 5, "level": 68, "shiny": 1, "moves":["revenge", "wideguard", "zenheadbutt", "payback"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["foresight", "revenge", "wideguard", "zenheadbutt"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	giratina: {
		randomBattleMoves: ["rest", "sleeptalk", "dragontail", "roar", "willowisp", "shadowball", "dragonpulse"],
		randomDoubleBattleMoves: ["tailwind", "icywind", "protect", "dragontail", "willowisp", "calmmind", "dragonpulse", "shadowball"],
		eventPokemon: [
			{"generation": 4, "level": 70, "shiny": 1, "moves":["shadowforce", "healblock", "earthpower", "slash"]},
			{"generation": 4, "level": 47, "shiny": 1, "moves":["ominouswind", "ancientpower", "dragonclaw", "shadowforce"]},
			{"generation": 4, "level": 1, "shiny": 1, "moves":["dragonbreath", "scaryface"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["dragonbreath", "scaryface"], "pokeball": "dreamball"},
			{"generation": 5, "level": 100, "shiny": true, "isHidden": false, "moves":["dragonpulse", "dragonclaw", "aurasphere", "shadowforce"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["aurasphere", "shadowclaw", "shadowforce", "hex"]},
			{"generation": 6, "level": 100, "nature": "Brave", "isHidden": true, "moves":["aurasphere", "dracometeor", "shadowforce", "ironhead"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	giratinaorigin: {
		randomBattleMoves: ["dracometeor", "shadowsneak", "dragontail", "willowisp", "defog", "toxic", "shadowball", "earthquake"],
		randomDoubleBattleMoves: ["dracometeor", "shadowsneak", "tailwind", "hiddenpowerfire", "willowisp", "calmmind", "substitute", "dragonpulse", "shadowball", "aurasphere", "protect", "earthquake"],
		eventOnly: true,
		requiredItem: "Griseous Orb",
		tier: "Bank-Uber",
	},
	cresselia: {
		randomBattleMoves: ["moonlight", "psychic", "icebeam", "thunderwave", "toxic", "substitute", "psyshock", "moonblast", "calmmind"],
		randomDoubleBattleMoves: ["psyshock", "icywind", "thunderwave", "trickroom", "moonblast", "moonlight", "skillswap", "reflect", "lightscreen", "icebeam", "protect", "helpinghand"],
		eventPokemon: [
			{"generation": 4, "level": 50, "shiny": 1, "moves":["mist", "aurorabeam", "futuresight", "slash"]},
			{"generation": 5, "level": 68, "shiny": 1, "moves":["futuresight", "slash", "moonlight", "psychocut"]},
			{"generation": 5, "level": 68, "nature": "Modest", "moves":["icebeam", "psyshock", "energyball", "hiddenpower"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["mist", "aurorabeam", "futuresight", "slash"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	phione: {
		randomBattleMoves: ["raindance", "scald", "uturn", "rest", "icebeam"],
		randomDoubleBattleMoves: ["raindance", "scald", "uturn", "rest", "icebeam", "helpinghand", "icywind", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 50, "moves":["grassknot", "raindance", "rest", "surf"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	manaphy: {
		randomBattleMoves: ["tailglow", "surf", "icebeam", "energyball", "psychic"],
		randomDoubleBattleMoves: ["tailglow", "surf", "icebeam", "energyball", "protect", "scald", "icywind", "helpinghand"],
		eventPokemon: [
			{"generation": 4, "level": 5, "moves":["tailglow", "bubble", "watersport"]},
			{"generation": 4, "level": 1, "shiny": 1, "moves":["tailglow", "bubble", "watersport"]},
			{"generation": 4, "level": 50, "moves":["heartswap", "waterpulse", "whirlpool", "acidarmor"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "nature": "Impish", "moves":["aquaring", "waterpulse", "watersport", "heartswap"], "pokeball": "cherishball"},
			{"generation": 6, "level": 1, "moves":["tailglow", "bubble", "watersport", "heartswap"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["tailglow", "bubble", "watersport"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	darkrai: {
		randomBattleMoves: ["hypnosis", "darkpulse", "focusblast", "nastyplot", "substitute", "sludgebomb"],
		randomDoubleBattleMoves: ["darkpulse", "focusblast", "nastyplot", "substitute", "snarl", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 40, "shiny": 1, "moves":["quickattack", "hypnosis", "pursuit", "nightmare"]},
			{"generation": 4, "level": 50, "moves":["roaroftime", "spacialrend", "nightmare", "hypnosis"], "pokeball": "cherishball"},
			{"generation": 4, "level": 50, "moves":["darkvoid", "darkpulse", "shadowball", "doubleteam"]},
			{"generation": 4, "level": 50, "shiny": 1, "moves":["hypnosis", "feintattack", "nightmare", "doubleteam"]},
			{"generation": 5, "level": 50, "moves":["darkvoid", "ominouswind", "feintattack", "nightmare"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "moves":["darkvoid", "darkpulse", "phantomforce", "dreameater"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["darkvoid", "ominouswind", "nightmare", "feintattack"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	shaymin: {
		randomBattleMoves: ["seedflare", "earthpower", "airslash", "psychic", "rest", "substitute", "leechseed"],
		randomDoubleBattleMoves: ["seedflare", "earthpower", "airslash", "hiddenpowerfire", "rest", "substitute", "leechseed", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 50, "moves":["seedflare", "aromatherapy", "substitute", "energyball"], "pokeball": "cherishball"},
			{"generation": 4, "level": 30, "shiny": 1, "moves":["growth", "magicalleaf", "leechseed", "synthesis"]},
			{"generation": 5, "level": 50, "moves":["seedflare", "leechseed", "synthesis", "sweetscent"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "moves":["growth", "magicalleaf", "seedflare", "airslash"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["seedflare", "aromatherapy", "substitute", "energyball"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	shayminsky: {
		randomBattleMoves: ["seedflare", "earthpower", "airslash", "hiddenpowerfire", "substitute", "leechseed", "healingwish"],
		randomDoubleBattleMoves: ["seedflare", "earthpower", "airslash", "hiddenpowerfire", "rest", "substitute", "leechseed", "tailwind", "protect", "hiddenpowerice"],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	arceus: {
		randomBattleMoves: ["swordsdance", "extremespeed", "shadowclaw", "earthquake", "recover"],
		randomDoubleBattleMoves: ["swordsdance", "extremespeed", "shadowclaw", "earthquake", "recover", "protect"],
		eventPokemon: [
			{"generation": 4, "level": 100, "moves":["judgment", "roaroftime", "spacialrend", "shadowforce"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "moves":["recover", "hyperbeam", "perishsong", "judgment"]},
			{"generation": 6, "level": 100, "shiny": 1, "moves":["judgment", "blastburn", "hydrocannon", "earthpower"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["judgment", "perishsong", "hyperbeam", "recover"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	arceusbug: {
		randomBattleMoves: ["swordsdance", "xscissor", "stoneedge", "recover", "earthquake", "ironhead"],
		randomDoubleBattleMoves: ["swordsdance", "xscissor", "stoneedge", "recover", "earthquake", "ironhead", "protect"],
		eventOnly: true,
		requiredItems: ["Insect Plate", "Buginium Z"],
	},
	arceusdark: {
		randomBattleMoves: ["calmmind", "judgment", "recover", "fireblast", "thunderbolt"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "recover", "focusblast", "safeguard", "snarl", "willowisp", "protect"],
		eventOnly: true,
		requiredItems: ["Dread Plate", "Darkinium Z"],
	},
	arceusdragon: {
		randomBattleMoves: ["swordsdance", "outrage", "extremespeed", "earthquake", "recover", "calmmind", "judgment", "fireblast", "earthpower"],
		randomDoubleBattleMoves: ["swordsdance", "dragonclaw", "extremespeed", "earthquake", "recover", "protect"],
		eventOnly: true,
		requiredItems: ["Draco Plate", "Dragonium Z"],
	},
	arceuselectric: {
		randomBattleMoves: ["calmmind", "judgment", "recover", "icebeam", "grassknot", "fireblast", "willowisp"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "recover", "icebeam", "protect"],
		eventOnly: true,
		requiredItems: ["Zap Plate", "Electrium Z"],
	},
	arceusfairy: {
		randomBattleMoves: ["calmmind", "judgment", "recover", "willowisp", "defog", "thunderbolt", "toxic", "fireblast"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "recover", "willowisp", "protect", "earthpower", "thunderbolt"],
		eventOnly: true,
		requiredItems: ["Pixie Plate", "Fairium Z"],
	},
	arceusfighting: {
		randomBattleMoves: ["calmmind", "judgment", "stoneedge", "shadowball", "recover", "toxic", "defog"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "icebeam", "shadowball", "recover", "willowisp", "protect"],
		eventOnly: true,
		requiredItems: ["Fist Plate", "Fightinium Z"],
	},
	arceusfire: {
		randomBattleMoves: ["calmmind", "judgment", "grassknot", "thunderbolt", "icebeam", "recover"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "thunderbolt", "recover", "heatwave", "protect", "willowisp"],
		eventOnly: true,
		requiredItems: ["Flame Plate", "Firium Z"],
	},
	arceusflying: {
		randomBattleMoves: ["calmmind", "judgment", "earthpower", "fireblast", "substitute", "recover"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "safeguard", "recover", "substitute", "tailwind", "protect"],
		eventOnly: true,
		requiredItems: ["Sky Plate", "Flyinium Z"],
	},
	arceusghost: {
		randomBattleMoves: ["calmmind", "judgment", "focusblast", "recover", "swordsdance", "shadowforce", "brickbreak", "willowisp", "roar", "defog"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "focusblast", "recover", "swordsdance", "shadowforce", "brickbreak", "willowisp", "protect"],
		eventOnly: true,
		requiredItems: ["Spooky Plate", "Ghostium Z"],
	},
	arceusgrass: {
		randomBattleMoves: ["judgment", "recover", "calmmind", "icebeam", "fireblast"],
		randomDoubleBattleMoves: ["calmmind", "icebeam", "judgment", "earthpower", "recover", "safeguard", "thunderwave", "protect"],
		eventOnly: true,
		requiredItems: ["Meadow Plate", "Grassium Z"],
	},
	arceusground: {
		randomBattleMoves: ["swordsdance", "earthquake", "stoneedge", "recover", "extremespeed", "icebeam"],
		randomDoubleBattleMoves: ["swordsdance", "earthquake", "stoneedge", "recover", "calmmind", "judgment", "icebeam", "rockslide", "protect"],
		eventOnly: true,
		requiredItems: ["Earth Plate", "Groundium Z"],
	},
	arceusice: {
		randomBattleMoves: ["calmmind", "judgment", "thunderbolt", "fireblast", "recover"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "thunderbolt", "focusblast", "recover", "protect", "icywind"],
		eventOnly: true,
		requiredItems: ["Icicle Plate", "Icium Z"],
	},
	arceuspoison: {
		randomBattleMoves: ["calmmind", "sludgebomb", "fireblast", "recover", "willowisp", "defog", "thunderwave"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "sludgebomb", "heatwave", "recover", "willowisp", "protect", "earthpower"],
		eventOnly: true,
		requiredItems: ["Toxic Plate", "Poisonium Z"],
	},
	arceuspsychic: {
		randomBattleMoves: ["judgment", "calmmind", "focusblast", "recover", "defog", "thunderbolt", "willowisp"],
		randomDoubleBattleMoves: ["calmmind", "psyshock", "focusblast", "recover", "willowisp", "judgment", "protect"],
		eventOnly: true,
		requiredItems: ["Mind Plate", "Psychium Z"],
	},
	arceusrock: {
		randomBattleMoves: ["recover", "swordsdance", "earthquake", "stoneedge", "extremespeed"],
		randomDoubleBattleMoves: ["swordsdance", "stoneedge", "recover", "rockslide", "earthquake", "protect"],
		eventOnly: true,
		requiredItems: ["Stone Plate", "Rockium Z"],
	},
	arceussteel: {
		randomBattleMoves: ["calmmind", "judgment", "recover", "willowisp", "thunderbolt", "swordsdance", "ironhead", "earthquake", "stoneedge"],
		randomDoubleBattleMoves: ["calmmind", "judgment", "recover", "protect", "willowisp"],
		eventOnly: true,
		requiredItems: ["Iron Plate", "Steelium Z"],
	},
	arceuswater: {
		randomBattleMoves: ["recover", "calmmind", "judgment", "substitute", "willowisp", "thunderbolt"],
		randomDoubleBattleMoves: ["recover", "calmmind", "judgment", "icebeam", "fireblast", "icywind", "surf", "protect"],
		eventOnly: true,
		requiredItems: ["Splash Plate", "Waterium Z"],
	},
	victini: {
		randomBattleMoves: ["vcreate", "boltstrike", "uturn", "zenheadbutt", "grassknot", "focusblast", "blueflare"],
		randomDoubleBattleMoves: ["vcreate", "boltstrike", "uturn", "psychic", "focusblast", "blueflare", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 15, "moves":["quickattack", "incinerate", "confusion", "endure"]},
			{"generation": 5, "level": 50, "moves":["vcreate", "fusionflare", "fusionbolt", "searingshot"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "moves":["vcreate", "blueflare", "boltstrike", "glaciate"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "moves":["confusion", "quickattack", "vcreate", "searingshot"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["incinerate", "quickattack", "endure", "confusion"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "moves":["quickattack", "swagger", "vcreate"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	snivy: {
		randomBattleMoves: ["leafstorm", "hiddenpowerfire", "substitute", "leechseed", "hiddenpowerice", "gigadrain"],
		eventPokemon: [
			{"generation": 5, "level": 5, "gender": "M", "nature": "Hardy", "isHidden": false, "moves":["growth", "synthesis", "energyball", "aromatherapy"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	servine: {
		randomBattleMoves: ["leafstorm", "hiddenpowerfire", "substitute", "leechseed", "hiddenpowerice", "gigadrain"],
		tier: "NFE",
	},
	serperior: {
		randomBattleMoves: ["leafstorm", "dragonpulse", "hiddenpowerfire", "substitute", "leechseed", "glare"],
		randomDoubleBattleMoves: ["leafstorm", "hiddenpowerfire", "substitute", "taunt", "dragonpulse", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["leafstorm", "substitute", "gigadrain", "leechseed"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["leafstorm", "holdback", "wringout", "gigadrain"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	tepig: {
		randomBattleMoves: ["flamecharge", "flareblitz", "wildcharge", "superpower", "headsmash"],
		tier: "LC",
	},
	pignite: {
		randomBattleMoves: ["flamecharge", "flareblitz", "wildcharge", "superpower", "headsmash"],
		tier: "NFE",
	},
	emboar: {
		randomBattleMoves: ["flareblitz", "superpower", "wildcharge", "stoneedge", "fireblast", "grassknot", "suckerpunch"],
		randomDoubleBattleMoves: ["flareblitz", "superpower", "flamecharge", "wildcharge", "headsmash", "protect", "heatwave", "rockslide"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["flareblitz", "hammerarm", "wildcharge", "headsmash"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["flareblitz", "holdback", "headsmash", "takedown"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	oshawott: {
		randomBattleMoves: ["swordsdance", "waterfall", "aquajet", "xscissor"],
		tier: "LC",
	},
	dewott: {
		randomBattleMoves: ["swordsdance", "waterfall", "aquajet", "xscissor"],
		tier: "NFE",
	},
	samurott: {
		randomBattleMoves: ["swordsdance", "waterfall", "aquajet", "megahorn", "superpower", "hydropump", "icebeam", "grassknot"],
		randomDoubleBattleMoves: ["hydropump", "aquajet", "icebeam", "scald", "hiddenpowergrass", "taunt", "helpinghand", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 100, "gender": "M", "isHidden": false, "moves":["hydropump", "icebeam", "megahorn", "superpower"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "isHidden": true, "moves":["razorshell", "holdback", "confide", "hydropump"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	patrat: {
		randomBattleMoves: ["swordsdance", "batonpass", "substitute", "hypnosis", "return", "superfang"],
		tier: "Bank-LC",
	},
	watchog: {
		randomBattleMoves: ["hypnosis", "substitute", "batonpass", "superfang", "swordsdance", "return", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "knockoff", "substitute", "hypnosis", "return", "superfang", "protect"],
		tier: "Bank",
	},
	lillipup: {
		randomBattleMoves: ["return", "wildcharge", "firefang", "crunch", "icefang"],
		tier: "LC",
	},
	herdier: {
		randomBattleMoves: ["return", "wildcharge", "firefang", "crunch", "icefang"],
		tier: "NFE",
	},
	stoutland: {
		randomBattleMoves: ["return", "crunch", "wildcharge", "superpower", "icefang"],
		randomDoubleBattleMoves: ["return", "wildcharge", "superpower", "crunch", "icefang", "protect"],
		tier: "New",
	},
	purrloin: {
		randomBattleMoves: ["encore", "taunt", "uturn", "knockoff", "thunderwave"],
		tier: "Bank-LC",
	},
	liepard: {
		randomBattleMoves: ["knockoff", "encore", "suckerpunch", "thunderwave", "uturn", "substitute", "nastyplot", "darkpulse", "copycat"],
		randomDoubleBattleMoves: ["encore", "thunderwave", "substitute", "knockoff", "playrough", "uturn", "suckerpunch", "fakeout", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 20, "gender": "F", "nature": "Jolly", "isHidden": true, "moves":["fakeout", "foulplay", "encore", "swagger"]},
		],
		tier: "Bank",
	},
	pansage: {
		randomBattleMoves: ["leafstorm", "hiddenpowerfire", "hiddenpowerice", "gigadrain", "nastyplot", "substitute", "leechseed"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": 1, "gender": "M", "nature": "Brave", "ivs": {"spa": 31}, "isHidden": false, "moves":["bulletseed", "bite", "solarbeam", "dig"]},
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["leer", "lick", "vinewhip", "leafstorm"]},
			{"generation": 5, "level": 30, "gender": "M", "nature": "Serious", "isHidden": false, "moves":["seedbomb", "solarbeam", "rocktomb", "dig"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	simisage: {
		randomBattleMoves: ["nastyplot", "gigadrain", "focusblast", "hiddenpowerice", "substitute", "leafstorm", "knockoff", "superpower"],
		randomDoubleBattleMoves: ["nastyplot", "leafstorm", "hiddenpowerfire", "hiddenpowerice", "gigadrain", "focusblast", "substitute", "taunt", "synthesis", "helpinghand", "protect"],
		tier: "Bank",
	},
	pansear: {
		randomBattleMoves: ["nastyplot", "fireblast", "hiddenpowerelectric", "hiddenpowerground", "sunnyday", "solarbeam", "overheat"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["leer", "lick", "incinerate", "heatwave"]},
		],
		tier: "Bank-LC",
	},
	simisear: {
		randomBattleMoves: ["substitute", "nastyplot", "fireblast", "focusblast", "grassknot", "hiddenpowerrock"],
		randomDoubleBattleMoves: ["nastyplot", "fireblast", "focusblast", "grassknot", "hiddenpowerground", "substitute", "heatwave", "taunt", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 5, "perfectIVs": 2, "isHidden": false, "moves":["workup", "honeclaws", "poweruppunch", "gigaimpact"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	panpour: {
		randomBattleMoves: ["nastyplot", "hydropump", "hiddenpowergrass", "substitute", "surf", "icebeam"],
		eventPokemon: [
			{"generation": 5, "level": 10, "gender": "M", "isHidden": true, "moves":["leer", "lick", "watergun", "hydropump"]},
		],
		tier: "Bank-LC",
	},
	simipour: {
		randomBattleMoves: ["substitute", "nastyplot", "hydropump", "icebeam", "focusblast"],
		randomDoubleBattleMoves: ["nastyplot", "hydropump", "icebeam", "substitute", "surf", "taunt", "helpinghand", "protect"],
		tier: "Bank",
	},
	munna: {
		randomBattleMoves: ["psychic", "hiddenpowerfighting", "hypnosis", "calmmind", "moonlight", "thunderwave", "batonpass", "psyshock", "healbell", "signalbeam"],
		tier: "Bank-LC",
	},
	musharna: {
		randomBattleMoves: ["calmmind", "psychic", "psyshock", "signalbeam", "batonpass", "moonlight", "healbell", "thunderwave"],
		randomDoubleBattleMoves: ["trickroom", "thunderwave", "moonlight", "psychic", "hiddenpowerfighting", "helpinghand", "psyshock", "healbell", "signalbeam", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "isHidden": true, "moves":["defensecurl", "luckychant", "psybeam", "hypnosis"]},
		],
		tier: "Bank",
	},
	pidove: {
		randomBattleMoves: ["pluck", "uturn", "return", "detect", "roost", "wish"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": 1, "gender": "F", "nature": "Hardy", "ivs": {"atk": 31}, "isHidden": false, "abilities":["superluck"], "moves":["gust", "quickattack", "aircutter"]},
		],
		tier: "Bank-LC",
	},
	tranquill: {
		randomBattleMoves: ["pluck", "uturn", "return", "detect", "roost", "wish"],
		tier: "Bank-NFE",
	},
	unfezant: {
		randomBattleMoves: ["return", "pluck", "hypnosis", "tailwind", "uturn", "roost", "nightslash"],
		randomDoubleBattleMoves: ["pluck", "uturn", "return", "protect", "tailwind", "taunt", "roost", "nightslash"],
		tier: "Bank",
	},
	blitzle: {
		randomBattleMoves: ["voltswitch", "hiddenpowergrass", "wildcharge", "mefirst"],
		tier: "Bank-LC",
	},
	zebstrika: {
		randomBattleMoves: ["voltswitch", "hiddenpowergrass", "overheat", "wildcharge", "thunderbolt"],
		randomDoubleBattleMoves: ["voltswitch", "hiddenpowergrass", "overheat", "wildcharge", "protect"],
		tier: "Bank",
	},
	roggenrola: {
		randomBattleMoves: ["autotomize", "stoneedge", "stealthrock", "rockblast", "earthquake", "explosion"],
		tier: "LC",
	},
	boldore: {
		randomBattleMoves: ["autotomize", "stoneedge", "stealthrock", "rockblast", "earthquake", "explosion"],
		tier: "NFE",
	},
	gigalith: {
		randomBattleMoves: ["stealthrock", "rockblast", "earthquake", "explosion", "stoneedge", "superpower"],
		randomDoubleBattleMoves: ["stealthrock", "rockslide", "earthquake", "explosion", "stoneedge", "autotomize", "superpower", "wideguard", "protect"],
		tier: "New",
	},
	woobat: {
		randomBattleMoves: ["calmmind", "psychic", "airslash", "gigadrain", "roost", "heatwave", "storedpower"],
		tier: "Bank-LC",
	},
	swoobat: {
		randomBattleMoves: ["substitute", "calmmind", "storedpower", "heatwave", "psychic", "airslash", "roost"],
		randomDoubleBattleMoves: ["calmmind", "psychic", "airslash", "gigadrain", "protect", "heatwave", "tailwind"],
		tier: "Bank",
	},
	drilbur: {
		randomBattleMoves: ["swordsdance", "rapidspin", "earthquake", "rockslide", "shadowclaw", "return", "xscissor"],
		tier: "Bank-LC",
	},
	excadrill: {
		randomBattleMoves: ["swordsdance", "earthquake", "ironhead", "rockslide", "rapidspin"],
		randomDoubleBattleMoves: ["swordsdance", "drillrun", "earthquake", "rockslide", "ironhead", "substitute", "protect"],
		tier: "Bank",
	},
	audino: {
		randomBattleMoves: ["wish", "protect", "healbell", "toxic", "thunderwave", "reflect", "lightscreen", "doubleedge"],
		randomDoubleBattleMoves: ["healpulse", "protect", "healbell", "trickroom", "thunderwave", "reflect", "lightscreen", "doubleedge", "helpinghand"],
		eventPokemon: [
			{"generation": 5, "level": 30, "gender": "F", "nature": "Calm", "isHidden": false, "abilities":["healer"], "moves":["healpulse", "helpinghand", "refresh", "doubleslap"], "pokeball": "cherishball"},
			{"generation": 5, "level": 30, "gender": "F", "nature": "Serious", "isHidden": false, "abilities":["healer"], "moves":["healpulse", "helpinghand", "refresh", "present"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "nature": "Relaxed", "isHidden": false, "abilities":["regenerator"], "moves":["trickroom", "healpulse", "simplebeam", "thunderbolt"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	audinomega: {
		randomBattleMoves: ["wish", "calmmind", "healbell", "dazzlinggleam", "hypervoice", "protect"],
		randomDoubleBattleMoves: ["healpulse", "protect", "healbell", "trickroom", "thunderwave", "hypervoice", "helpinghand", "dazzlinggleam"],
		requiredItem: "Audinite",
		tier: "Unreleased",
	},
	timburr: {
		randomBattleMoves: ["machpunch", "bulkup", "drainpunch", "icepunch", "knockoff"],
		tier: "LC",
	},
	gurdurr: {
		randomBattleMoves: ["bulkup", "machpunch", "drainpunch", "icepunch", "knockoff"],
		tier: "New",
	},
	conkeldurr: {
		randomBattleMoves: ["bulkup", "drainpunch", "icepunch", "knockoff", "machpunch"],
		randomDoubleBattleMoves: ["wideguard", "machpunch", "drainpunch", "icepunch", "knockoff", "protect"],
		tier: "New",
	},
	tympole: {
		randomBattleMoves: ["hydropump", "surf", "sludgewave", "earthpower", "hiddenpowerelectric"],
		tier: "Bank-LC",
	},
	palpitoad: {
		randomBattleMoves: ["hydropump", "surf", "sludgewave", "earthpower", "hiddenpowerelectric", "stealthrock"],
		tier: "Bank-NFE",
	},
	seismitoad: {
		randomBattleMoves: ["hydropump", "scald", "sludgewave", "earthquake", "knockoff", "stealthrock", "toxic", "raindance"],
		randomDoubleBattleMoves: ["hydropump", "muddywater", "sludgebomb", "earthquake", "hiddenpowerelectric", "icywind", "protect"],
		tier: "Bank",
	},
	throh: {
		randomBattleMoves: ["bulkup", "circlethrow", "icepunch", "stormthrow", "rest", "sleeptalk", "knockoff"],
		randomDoubleBattleMoves: ["helpinghand", "circlethrow", "icepunch", "stormthrow", "wideguard", "knockoff", "protect"],
		tier: "Bank",
	},
	sawk: {
		randomBattleMoves: ["closecombat", "earthquake", "icepunch", "poisonjab", "bulkup", "knockoff"],
		randomDoubleBattleMoves: ["closecombat", "knockoff", "icepunch", "rockslide", "protect"],
		tier: "Bank",
	},
	sewaddle: {
		randomBattleMoves: ["calmmind", "gigadrain", "bugbuzz", "hiddenpowerfire", "hiddenpowerice", "airslash"],
		tier: "LC",
	},
	swadloon: {
		randomBattleMoves: ["calmmind", "gigadrain", "bugbuzz", "hiddenpowerfire", "hiddenpowerice", "airslash", "stickyweb"],
		tier: "NFE",
	},
	leavanny: {
		randomBattleMoves: ["stickyweb", "swordsdance", "leafblade", "xscissor", "knockoff", "batonpass"],
		randomDoubleBattleMoves: ["swordsdance", "leafblade", "xscissor", "protect", "stickyweb", "poisonjab"],
		tier: "New",
	},
	venipede: {
		randomBattleMoves: ["toxicspikes", "infestation", "spikes", "endeavor", "protect"],
		tier: "LC",
	},
	whirlipede: {
		randomBattleMoves: ["toxicspikes", "infestation", "spikes", "endeavor", "protect"],
		tier: "NFE",
	},
	scolipede: {
		randomBattleMoves: ["substitute", "spikes", "toxicspikes", "megahorn", "rockslide", "earthquake", "swordsdance", "batonpass", "poisonjab"],
		randomDoubleBattleMoves: ["substitute", "protect", "megahorn", "rockslide", "poisonjab", "swordsdance", "batonpass", "aquatail", "superpower"],
		tier: "New",
	},
	cottonee: {
		randomBattleMoves: ["encore", "taunt", "substitute", "leechseed", "toxic", "stunspore"],
		tier: "LC",
	},
	whimsicott: {
		randomBattleMoves: ["encore", "taunt", "substitute", "leechseed", "uturn", "toxic", "stunspore", "memento", "tailwind", "moonblast"],
		randomDoubleBattleMoves: ["encore", "taunt", "substitute", "leechseed", "uturn", "helpinghand", "stunspore", "moonblast", "tailwind", "dazzlinggleam", "gigadrain", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "gender": "F", "nature": "Timid", "ivs": {"spe": 31}, "isHidden": false, "abilities":["prankster"], "moves":["swagger", "gigadrain", "beatup", "helpinghand"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	petilil: {
		randomBattleMoves: ["sunnyday", "sleeppowder", "solarbeam", "hiddenpowerfire", "hiddenpowerice", "healingwish"],
		tier: "LC",
	},
	lilligant: {
		randomBattleMoves: ["sleeppowder", "quiverdance", "petaldance", "gigadrain", "hiddenpowerfire", "hiddenpowerrock"],
		randomDoubleBattleMoves: ["quiverdance", "gigadrain", "sleeppowder", "hiddenpowerice", "hiddenpowerfire", "hiddenpowerrock", "petaldance", "helpinghand", "protect"],
		tier: "New",
	},
	basculin: {
		randomBattleMoves: ["waterfall", "aquajet", "superpower", "crunch", "headsmash"],
		randomDoubleBattleMoves: ["waterfall", "aquajet", "superpower", "crunch", "doubleedge", "protect"],
		tier: "Bank",
	},
	basculinbluestriped: {
		randomBattleMoves: ["waterfall", "aquajet", "superpower", "crunch", "headsmash"],
		randomDoubleBattleMoves: ["waterfall", "aquajet", "superpower", "crunch", "doubleedge", "protect"],
		tier: "Bank",
	},
	sandile: {
		randomBattleMoves: ["earthquake", "stoneedge", "pursuit", "crunch"],
		tier: "LC",
	},
	krokorok: {
		randomBattleMoves: ["earthquake", "stoneedge", "pursuit", "crunch"],
		tier: "NFE",
	},
	krookodile: {
		randomBattleMoves: ["earthquake", "stoneedge", "pursuit", "knockoff", "stealthrock", "superpower"],
		randomDoubleBattleMoves: ["earthquake", "stoneedge", "protect", "knockoff", "superpower"],
		tier: "New",
	},
	darumaka: {
		randomBattleMoves: ["uturn", "flareblitz", "firepunch", "rockslide", "superpower"],
		tier: "Bank-LC",
	},
	darmanitan: {
		randomBattleMoves: ["uturn", "flareblitz", "rockslide", "earthquake", "superpower"],
		randomDoubleBattleMoves: ["uturn", "flareblitz", "firepunch", "rockslide", "earthquake", "superpower", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 35, "isHidden": true, "moves":["thrash", "bellydrum", "flareblitz", "hammerarm"]},
			{"generation": 6, "level": 35, "gender": "M", "nature": "Calm", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": true, "moves":["thrash", "bellydrum", "flareblitz", "hammerarm"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	darmanitanzen: {
		requiredAbility: "Zen Mode",
		battleOnly: true,
	},
	maractus: {
		randomBattleMoves: ["spikes", "gigadrain", "leechseed", "hiddenpowerfire", "toxic", "suckerpunch", "spikyshield"],
		randomDoubleBattleMoves: ["grassyterrain", "gigadrain", "leechseed", "hiddenpowerfire", "helpinghand", "suckerpunch", "spikyshield"],
		tier: "Bank",
	},
	dwebble: {
		randomBattleMoves: ["stealthrock", "spikes", "shellsmash", "earthquake", "rockblast", "xscissor", "stoneedge"],
		tier: "Bank-LC",
	},
	crustle: {
		randomBattleMoves: ["stealthrock", "spikes", "shellsmash", "earthquake", "rockblast", "xscissor", "stoneedge"],
		randomDoubleBattleMoves: ["protect", "shellsmash", "earthquake", "rockslide", "xscissor", "stoneedge"],
		tier: "Bank",
	},
	scraggy: {
		randomBattleMoves: ["dragondance", "icepunch", "highjumpkick", "drainpunch", "rest", "bulkup", "crunch", "knockoff"],
		eventPokemon: [
			{"generation": 5, "level": 1, "gender": "M", "nature": "Adamant", "isHidden": false, "abilities":["moxie"], "moves":["headbutt", "leer", "highjumpkick", "lowkick"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	scrafty: {
		randomBattleMoves: ["dragondance", "icepunch", "highjumpkick", "drainpunch", "rest", "bulkup", "knockoff"],
		randomDoubleBattleMoves: ["fakeout", "drainpunch", "knockoff", "icepunch", "stoneedge", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "gender": "M", "nature": "Brave", "isHidden": false, "abilities":["moxie"], "moves":["firepunch", "payback", "drainpunch", "substitute"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	sigilyph: {
		randomBattleMoves: ["cosmicpower", "roost", "storedpower", "psychoshift"],
		randomDoubleBattleMoves: ["psyshock", "heatwave", "icebeam", "airslash", "energyball", "shadowball", "tailwind", "protect"],
		tier: "Bank",
	},
	yamask: {
		randomBattleMoves: ["nastyplot", "trickroom", "shadowball", "hiddenpowerfighting", "willowisp", "haze", "rest", "sleeptalk", "painsplit"],
		tier: "Bank-LC",
	},
	cofagrigus: {
		randomBattleMoves: ["nastyplot", "trickroom", "shadowball", "hiddenpowerfighting", "willowisp", "haze", "painsplit"],
		randomDoubleBattleMoves: ["nastyplot", "trickroom", "shadowball", "hiddenpowerfighting", "willowisp", "protect", "painsplit"],
		tier: "Bank",
	},
	tirtouga: {
		randomBattleMoves: ["shellsmash", "aquajet", "waterfall", "stoneedge", "earthquake", "stealthrock"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "isHidden": false, "abilities":["sturdy"], "moves":["bite", "protect", "aquajet", "bodyslam"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	carracosta: {
		randomBattleMoves: ["shellsmash", "aquajet", "waterfall", "stoneedge", "earthquake", "stealthrock"],
		randomDoubleBattleMoves: ["shellsmash", "aquajet", "waterfall", "stoneedge", "earthquake", "protect", "wideguard", "rockslide"],
		tier: "New",
	},
	archen: {
		randomBattleMoves: ["stoneedge", "rockslide", "earthquake", "uturn", "pluck", "headsmash"],
		eventPokemon: [
			{"generation": 5, "level": 15, "gender": "M", "moves":["headsmash", "wingattack", "doubleteam", "scaryface"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	archeops: {
		randomBattleMoves: ["headsmash", "acrobatics", "stoneedge", "earthquake", "aquatail", "uturn", "tailwind"],
		randomDoubleBattleMoves: ["stoneedge", "rockslide", "earthquake", "uturn", "acrobatics", "tailwind", "taunt", "protect"],
		tier: "New",
	},
	trubbish: {
		randomBattleMoves: ["clearsmog", "toxicspikes", "spikes", "gunkshot", "painsplit", "toxic"],
		tier: "LC",
	},
	garbodor: {
		randomBattleMoves: ["spikes", "toxicspikes", "gunkshot", "haze", "painsplit", "toxic", "rockblast"],
		randomDoubleBattleMoves: ["protect", "painsplit", "gunkshot", "seedbomb", "drainpunch", "explosion", "rockblast"],
		tier: "New",
	},
	zorua: {
		randomBattleMoves: ["suckerpunch", "extrasensory", "darkpulse", "hiddenpowerfighting", "uturn", "knockoff"],
		tier: "Bank-LC",
	},
	zoroark: {
		randomBattleMoves: ["suckerpunch", "darkpulse", "focusblast", "flamethrower", "uturn", "nastyplot", "knockoff", "trick"],
		randomDoubleBattleMoves: ["suckerpunch", "darkpulse", "focusblast", "flamethrower", "uturn", "nastyplot", "knockoff", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "gender": "M", "nature": "Quirky", "moves":["agility", "embargo", "punishment", "snarl"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "moves":["sludgebomb", "darkpulse", "flamethrower", "suckerpunch"], "pokeball": "ultraball"},
		],
		tier: "Bank",
	},
	minccino: {
		randomBattleMoves: ["return", "tailslap", "wakeupslap", "uturn", "aquatail"],
		tier: "Bank-LC",
	},
	cinccino: {
		randomBattleMoves: ["tailslap", "aquatail", "uturn", "knockoff", "bulletseed", "rockblast"],
		randomDoubleBattleMoves: ["tailslap", "aquatail", "uturn", "knockoff", "bulletseed", "rockblast", "protect"],
		tier: "Bank",
	},
	gothita: {
		randomBattleMoves: ["psychic", "thunderbolt", "hiddenpowerfighting", "shadowball", "substitute", "calmmind", "trick", "grassknot"],
		tier: "LC",
	},
	gothorita: {
		randomBattleMoves: ["psychic", "psyshock", "thunderbolt", "hiddenpowerfighting", "shadowball", "substitute", "calmmind", "trick", "grassknot"],
		eventPokemon: [
			{"generation": 5, "level": 32, "gender": "M", "isHidden": true, "moves":["psyshock", "flatter", "futuresight", "mirrorcoat"]},
			{"generation": 5, "level": 32, "gender": "M", "isHidden": true, "moves":["psyshock", "flatter", "futuresight", "imprison"]},
		],
		tier: "NFE",
	},
	gothitelle: {
		randomBattleMoves: ["psychic", "thunderbolt", "shadowball", "hiddenpowerfire", "hiddenpowerfighting", "substitute", "calmmind", "trick", "psyshock"],
		randomDoubleBattleMoves: ["psychic", "thunderbolt", "shadowball", "hiddenpowerfighting", "reflect", "lightscreen", "psyshock", "energyball", "trickroom", "taunt", "healpulse", "protect"],
		tier: "New",
	},
	solosis: {
		randomBattleMoves: ["calmmind", "recover", "psychic", "hiddenpowerfighting", "shadowball", "trickroom", "psyshock"],
		tier: "LC",
	},
	duosion: {
		randomBattleMoves: ["calmmind", "recover", "psychic", "hiddenpowerfighting", "shadowball", "trickroom", "psyshock"],
		tier: "NFE",
	},
	reuniclus: {
		randomBattleMoves: ["calmmind", "recover", "psychic", "focusblast", "shadowball", "trickroom", "psyshock"],
		randomDoubleBattleMoves: ["energyball", "helpinghand", "psychic", "focusblast", "shadowball", "trickroom", "psyshock", "hiddenpowerfire", "protect"],
		tier: "New",
	},
	ducklett: {
		randomBattleMoves: ["scald", "airslash", "roost", "hurricane", "icebeam", "hiddenpowergrass", "bravebird", "defog"],
		tier: "Bank-LC",
	},
	swanna: {
		randomBattleMoves: ["airslash", "roost", "hurricane", "surf", "icebeam", "raindance", "defog", "scald"],
		randomDoubleBattleMoves: ["airslash", "roost", "hurricane", "surf", "icebeam", "raindance", "tailwind", "scald", "protect"],
		tier: "Bank",
	},
	vanillite: {
		randomBattleMoves: ["icebeam", "explosion", "hiddenpowerelectric", "hiddenpowerfighting", "autotomize"],
		tier: "LC",
	},
	vanillish: {
		randomBattleMoves: ["icebeam", "explosion", "hiddenpowerelectric", "hiddenpowerfighting", "autotomize"],
		tier: "NFE",
	},
	vanilluxe: {
		randomBattleMoves: ["icebeam", "explosion", "hiddenpowerground", "flashcannon", "autotomize", "freezedry"],
		randomDoubleBattleMoves: ["icebeam", "taunt", "hiddenpowerground", "flashcannon", "autotomize", "protect", "freezedry"],
		tier: "New",
	},
	deerling: {
		randomBattleMoves: ["agility", "batonpass", "seedbomb", "jumpkick", "synthesis", "return", "thunderwave"],
		eventPokemon: [
			{"generation": 5, "level": 30, "gender": "F", "isHidden": true, "moves":["feintattack", "takedown", "jumpkick", "aromatherapy"]},
		],
		tier: "Bank-LC",
	},
	sawsbuck: {
		randomBattleMoves: ["swordsdance", "hornleech", "jumpkick", "return", "substitute", "batonpass"],
		randomDoubleBattleMoves: ["swordsdance", "hornleech", "jumpkick", "return", "substitute", "synthesis", "protect"],
		tier: "Bank",
	},
	emolga: {
		randomBattleMoves: ["encore", "chargebeam", "batonpass", "substitute", "thunderbolt", "airslash", "roost"],
		randomDoubleBattleMoves: ["helpinghand", "tailwind", "encore", "substitute", "thunderbolt", "airslash", "roost", "protect"],
		tier: "New",
	},
	karrablast: {
		randomBattleMoves: ["swordsdance", "megahorn", "return", "substitute"],
		eventPokemon: [
			{"generation": 5, "level": 30, "isHidden": false, "moves":["furyattack", "headbutt", "falseswipe", "bugbuzz"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "isHidden": false, "moves":["megahorn", "takedown", "xscissor", "flail"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	escavalier: {
		randomBattleMoves: ["megahorn", "pursuit", "ironhead", "knockoff", "swordsdance", "drillrun"],
		randomDoubleBattleMoves: ["megahorn", "protect", "ironhead", "knockoff", "swordsdance", "drillrun"],
		tier: "Bank",
	},
	foongus: {
		randomBattleMoves: ["spore", "stunspore", "gigadrain", "clearsmog", "hiddenpowerfire", "synthesis", "sludgebomb"],
		tier: "Bank-LC",
	},
	amoonguss: {
		randomBattleMoves: ["spore", "stunspore", "gigadrain", "clearsmog", "hiddenpowerfire", "synthesis", "sludgebomb", "foulplay"],
		randomDoubleBattleMoves: ["spore", "stunspore", "gigadrain", "ragepowder", "hiddenpowerfire", "synthesis", "sludgebomb", "protect"],
		tier: "Bank",
	},
	frillish: {
		randomBattleMoves: ["scald", "willowisp", "recover", "toxic", "shadowball", "taunt"],
		tier: "Bank-LC",
	},
	jellicent: {
		randomBattleMoves: ["scald", "willowisp", "recover", "toxic", "shadowball", "icebeam", "taunt"],
		randomDoubleBattleMoves: ["scald", "willowisp", "recover", "trickroom", "shadowball", "icebeam", "waterspout", "icywind", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 40, "isHidden": true, "moves":["waterpulse", "ominouswind", "brine", "raindance"]},
		],
		tier: "Bank",
	},
	alomomola: {
		randomBattleMoves: ["wish", "protect", "knockoff", "toxic", "scald"],
		randomDoubleBattleMoves: ["wish", "protect", "knockoff", "icywind", "scald", "helpinghand", "wideguard"],
		tier: "New",
	},
	joltik: {
		randomBattleMoves: ["thunderbolt", "bugbuzz", "hiddenpowerice", "gigadrain", "voltswitch"],
		tier: "Bank-LC",
	},
	galvantula: {
		randomBattleMoves: ["thunder", "hiddenpowerice", "gigadrain", "bugbuzz", "voltswitch", "stickyweb"],
		randomDoubleBattleMoves: ["thunder", "hiddenpowerice", "gigadrain", "bugbuzz", "voltswitch", "stickyweb", "protect"],
		tier: "Bank",
	},
	ferroseed: {
		randomBattleMoves: ["spikes", "stealthrock", "leechseed", "seedbomb", "protect", "thunderwave", "gyroball"],
		tier: "Bank",
	},
	ferrothorn: {
		randomBattleMoves: ["spikes", "stealthrock", "leechseed", "powerwhip", "thunderwave", "protect", "knockoff", "gyroball"],
		randomDoubleBattleMoves: ["gyroball", "stealthrock", "leechseed", "powerwhip", "thunderwave", "protect"],
		tier: "Bank",
	},
	klink: {
		randomBattleMoves: ["shiftgear", "return", "geargrind", "wildcharge", "substitute"],
		tier: "LC",
	},
	klang: {
		randomBattleMoves: ["shiftgear", "return", "geargrind", "wildcharge", "substitute"],
		tier: "NFE",
	},
	klinklang: {
		randomBattleMoves: ["shiftgear", "return", "geargrind", "wildcharge", "substitute"],
		randomDoubleBattleMoves: ["shiftgear", "return", "geargrind", "wildcharge", "protect"],
		tier: "New",
	},
	tynamo: {
		randomBattleMoves: ["spark", "chargebeam", "thunderwave", "tackle"],
		tier: "LC",
	},
	eelektrik: {
		randomBattleMoves: ["uturn", "voltswitch", "acidspray", "wildcharge", "thunderbolt", "gigadrain", "aquatail", "coil"],
		tier: "NFE",
	},
	eelektross: {
		randomBattleMoves: ["thunderbolt", "flamethrower", "uturn", "voltswitch", "acidspray", "gigadrain", "knockoff", "superpower", "aquatail"],
		randomDoubleBattleMoves: ["thunderbolt", "flamethrower", "uturn", "voltswitch", "knockoff", "gigadrain", "protect"],
		tier: "New",
	},
	elgyem: {
		randomBattleMoves: ["nastyplot", "psychic", "thunderbolt", "hiddenpowerfighting", "recover", "trickroom", "signalbeam"],
		tier: "Bank-LC",
	},
	beheeyem: {
		randomBattleMoves: ["nastyplot", "psychic", "psyshock", "thunderbolt", "hiddenpowerfighting", "trick", "trickroom", "signalbeam"],
		randomDoubleBattleMoves: ["nastyplot", "psychic", "thunderbolt", "hiddenpowerfighting", "recover", "trick", "trickroom", "signalbeam", "protect"],
		tier: "Bank",
	},
	litwick: {
		randomBattleMoves: ["shadowball", "energyball", "fireblast", "hiddenpowerground", "trickroom", "substitute", "painsplit"],
		tier: "LC",
	},
	lampent: {
		randomBattleMoves: ["calmmind", "shadowball", "energyball", "fireblast", "hiddenpowerground", "substitute", "painsplit"],
		tier: "NFE",
	},
	chandelure: {
		randomBattleMoves: ["calmmind", "shadowball", "energyball", "fireblast", "hiddenpowerground", "trick", "substitute", "painsplit"],
		randomDoubleBattleMoves: ["shadowball", "energyball", "overheat", "heatwave", "hiddenpowerice", "trick", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "gender": "F", "nature": "Modest", "ivs": {"spa": 31}, "isHidden": false, "abilities":["flashfire"], "moves":["heatwave", "shadowball", "energyball", "psychic"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	axew: {
		randomBattleMoves: ["dragondance", "outrage", "dragonclaw", "swordsdance", "aquatail", "superpower", "poisonjab", "taunt", "substitute"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": 1, "gender": "M", "nature": "Naive", "ivs": {"spe": 31}, "isHidden": false, "abilities":["moldbreaker"], "moves":["scratch", "dragonrage"]},
			{"generation": 5, "level": 10, "gender": "F", "isHidden": false, "abilities":["moldbreaker"], "moves":["dragonrage", "return", "endure", "dragonclaw"], "pokeball": "cherishball"},
			{"generation": 5, "level": 30, "gender": "M", "nature": "Naive", "isHidden": false, "abilities":["rivalry"], "moves":["dragonrage", "scratch", "outrage", "gigaimpact"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	fraxure: {
		randomBattleMoves: ["dragondance", "swordsdance", "outrage", "dragonclaw", "aquatail", "superpower", "poisonjab", "taunt", "substitute"],
		tier: "NFE",
	},
	haxorus: {
		randomBattleMoves: ["dragondance", "swordsdance", "outrage", "dragonclaw", "earthquake", "poisonjab", "taunt", "substitute"],
		randomDoubleBattleMoves: ["dragondance", "swordsdance", "protect", "dragonclaw", "earthquake", "poisonjab", "taunt", "substitute"],
		eventPokemon: [
			{"generation": 5, "level": 59, "gender": "F", "nature": "Naive", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "abilities":["moldbreaker"], "moves":["earthquake", "dualchop", "xscissor", "dragondance"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	cubchoo: {
		randomBattleMoves: ["icebeam", "surf", "hiddenpowergrass", "superpower"],
		eventPokemon: [
			{"generation": 5, "level": 15, "isHidden": false, "moves":["powdersnow", "growl", "bide", "icywind"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	beartic: {
		randomBattleMoves: ["iciclecrash", "superpower", "nightslash", "stoneedge", "swordsdance", "aquajet"],
		randomDoubleBattleMoves: ["iciclecrash", "superpower", "nightslash", "stoneedge", "swordsdance", "aquajet", "protect"],
		tier: "Bank",
	},
	cryogonal: {
		randomBattleMoves: ["icebeam", "recover", "toxic", "rapidspin", "haze", "freezedry", "hiddenpowerground"],
		randomDoubleBattleMoves: ["icebeam", "recover", "icywind", "protect", "reflect", "freezedry", "hiddenpowerground"],
		tier: "Bank",
	},
	shelmet: {
		randomBattleMoves: ["spikes", "yawn", "substitute", "acidarmor", "batonpass", "recover", "toxic", "bugbuzz", "infestation"],
		eventPokemon: [
			{"generation": 5, "level": 30, "isHidden": false, "moves":["strugglebug", "megadrain", "yawn", "protect"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "isHidden": false, "moves":["encore", "gigadrain", "bodyslam", "bugbuzz"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	accelgor: {
		randomBattleMoves: ["spikes", "yawn", "bugbuzz", "focusblast", "gigadrain", "hiddenpowerrock", "encore"],
		randomDoubleBattleMoves: ["protect", "yawn", "bugbuzz", "focusblast", "gigadrain", "hiddenpowerrock", "encore", "sludgebomb"],
		tier: "Bank",
	},
	stunfisk: {
		randomBattleMoves: ["discharge", "earthpower", "scald", "toxic", "rest", "sleeptalk", "stealthrock"],
		randomDoubleBattleMoves: ["discharge", "earthpower", "scald", "electroweb", "protect", "stealthrock"],
		tier: "Bank",
	},
	mienfoo: {
		randomBattleMoves: ["uturn", "drainpunch", "stoneedge", "swordsdance", "batonpass", "highjumpkick", "fakeout", "knockoff"],
		tier: "Bank-LC",
	},
	mienshao: {
		randomBattleMoves: ["uturn", "fakeout", "highjumpkick", "stoneedge", "substitute", "swordsdance", "batonpass", "knockoff"],
		randomDoubleBattleMoves: ["uturn", "fakeout", "highjumpkick", "stoneedge", "drainpunch", "swordsdance", "wideguard", "knockoff", "feint", "protect"],
		tier: "Bank",
	},
	druddigon: {
		randomBattleMoves: ["outrage", "earthquake", "suckerpunch", "dragonclaw", "dragontail", "substitute", "glare", "stealthrock", "firepunch", "gunkshot"],
		randomDoubleBattleMoves: ["superpower", "earthquake", "suckerpunch", "dragonclaw", "glare", "protect", "firepunch", "thunderpunch"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": true, "isHidden": false, "moves":["leer", "scratch"]},
		],
		tier: "Bank",
	},
	golett: {
		randomBattleMoves: ["earthquake", "shadowpunch", "dynamicpunch", "icepunch", "stealthrock", "rockpolish"],
		tier: "Bank-LC",
	},
	golurk: {
		randomBattleMoves: ["earthquake", "shadowpunch", "dynamicpunch", "icepunch", "stealthrock", "rockpolish"],
		randomDoubleBattleMoves: ["earthquake", "shadowpunch", "dynamicpunch", "icepunch", "stoneedge", "protect", "rockpolish"],
		eventPokemon: [
			{"generation": 5, "level": 70, "shiny": true, "isHidden": false, "abilities":["ironfist"], "moves":["shadowpunch", "hyperbeam", "gyroball", "hammerarm"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	pawniard: {
		randomBattleMoves: ["swordsdance", "substitute", "suckerpunch", "ironhead", "brickbreak", "knockoff"],
		tier: "Bank",
	},
	bisharp: {
		randomBattleMoves: ["swordsdance", "substitute", "suckerpunch", "ironhead", "brickbreak", "knockoff"],
		randomDoubleBattleMoves: ["swordsdance", "substitute", "suckerpunch", "ironhead", "brickbreak", "knockoff", "protect"],
		tier: "Bank",
	},
	bouffalant: {
		randomBattleMoves: ["headcharge", "earthquake", "stoneedge", "megahorn", "swordsdance", "superpower"],
		randomDoubleBattleMoves: ["headcharge", "earthquake", "stoneedge", "megahorn", "swordsdance", "superpower", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "nature": "Adamant", "ivs": {"hp": 31, "atk": 31}, "isHidden": true, "moves":["headcharge", "facade", "earthquake", "rockslide"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	rufflet: {
		randomBattleMoves: ["bravebird", "rockslide", "return", "uturn", "substitute", "bulkup", "roost"],
		tier: "LC",
	},
	braviary: {
		randomBattleMoves: ["bravebird", "superpower", "return", "uturn", "substitute", "rockslide", "bulkup", "roost"],
		randomDoubleBattleMoves: ["bravebird", "superpower", "return", "uturn", "tailwind", "rockslide", "bulkup", "roost", "skydrop", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 25, "gender": "M", "isHidden": true, "moves":["wingattack", "honeclaws", "scaryface", "aerialace"]},
		],
		tier: "New",
	},
	vullaby: {
		randomBattleMoves: ["knockoff", "roost", "taunt", "whirlwind", "toxic", "defog", "uturn", "bravebird"],
		tier: "New",
	},
	mandibuzz: {
		randomBattleMoves: ["foulplay", "knockoff", "roost", "taunt", "whirlwind", "toxic", "uturn", "bravebird", "defog"],
		randomDoubleBattleMoves: ["knockoff", "roost", "taunt", "tailwind", "snarl", "uturn", "bravebird", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 25, "gender": "F", "isHidden": true, "moves":["pluck", "nastyplot", "flatter", "feintattack"]},
		],
		tier: "New",
	},
	heatmor: {
		randomBattleMoves: ["fireblast", "suckerpunch", "focusblast", "gigadrain", "knockoff"],
		randomDoubleBattleMoves: ["fireblast", "suckerpunch", "focusblast", "gigadrain", "heatwave", "protect"],
		tier: "Bank",
	},
	durant: {
		randomBattleMoves: ["honeclaws", "ironhead", "xscissor", "stoneedge", "batonpass", "superpower"],
		randomDoubleBattleMoves: ["honeclaws", "ironhead", "xscissor", "rockslide", "protect", "superpower"],
		tier: "Bank",
	},
	deino: {
		randomBattleMoves: ["outrage", "crunch", "firefang", "dragontail", "thunderwave", "superpower"],
		eventPokemon: [
			{"generation": 5, "level": 1, "shiny": true, "moves":["tackle", "dragonrage"]},
		],
		tier: "LC",
	},
	zweilous: {
		randomBattleMoves: ["outrage", "crunch", "headsmash", "dragontail", "superpower", "rest", "sleeptalk"],
		tier: "NFE",
	},
	hydreigon: {
		randomBattleMoves: ["uturn", "dracometeor", "dragonpulse", "earthpower", "fireblast", "darkpulse", "roost", "flashcannon", "superpower"],
		randomDoubleBattleMoves: ["uturn", "dracometeor", "dragonpulse", "earthpower", "fireblast", "darkpulse", "roost", "flashcannon", "superpower", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 70, "shiny": true, "gender": "M", "moves":["hypervoice", "dragonbreath", "flamethrower", "focusblast"], "pokeball": "cherishball"},
			{"generation": 6, "level": 52, "gender": "M", "perfectIVs": 2, "moves":["dragonrush", "crunch", "rockslide", "frustration"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	larvesta: {
		randomBattleMoves: ["flareblitz", "uturn", "wildcharge", "zenheadbutt", "morningsun", "willowisp"],
		tier: "Bank-LC",
	},
	volcarona: {
		randomBattleMoves: ["quiverdance", "fierydance", "fireblast", "bugbuzz", "roost", "gigadrain", "hiddenpowerice", "hiddenpowerground"],
		randomDoubleBattleMoves: ["quiverdance", "fierydance", "fireblast", "bugbuzz", "roost", "gigadrain", "hiddenpowerice", "heatwave", "willowisp", "ragepowder", "tailwind", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 35, "isHidden": false, "moves":["stringshot", "leechlife", "gust", "firespin"]},
			{"generation": 5, "level": 77, "gender": "M", "nature": "Calm", "ivs": {"hp": 30, "atk": 30, "def": 30, "spa": 30, "spd": 30, "spe": 30}, "isHidden": false, "moves":["bugbuzz", "overheat", "hyperbeam", "quiverdance"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	cobalion: {
		randomBattleMoves: ["closecombat", "ironhead", "swordsdance", "substitute", "stoneedge", "voltswitch", "hiddenpowerice", "taunt", "stealthrock"],
		randomDoubleBattleMoves: ["closecombat", "ironhead", "swordsdance", "substitute", "stoneedge", "thunderwave", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 42, "shiny": 1, "moves":["helpinghand", "retaliate", "ironhead", "sacredsword"]},
			{"generation": 5, "level": 45, "shiny": 1, "moves":["helpinghand", "retaliate", "ironhead", "sacredsword"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["sacredsword", "swordsdance", "quickguard", "workup"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["retaliate", "ironhead", "sacredsword", "swordsdance"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	terrakion: {
		randomBattleMoves: ["stoneedge", "closecombat", "swordsdance", "substitute", "stealthrock", "earthquake"],
		randomDoubleBattleMoves: ["stoneedge", "closecombat", "substitute", "rockslide", "earthquake", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 42, "shiny": 1, "moves":["helpinghand", "retaliate", "rockslide", "sacredsword"]},
			{"generation": 5, "level": 45, "shiny": 1, "moves":["helpinghand", "retaliate", "rockslide", "sacredsword"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["sacredsword", "swordsdance", "quickguard", "workup"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["retaliate", "rockslide", "sacredsword", "swordsdance"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	virizion: {
		randomBattleMoves: ["swordsdance", "closecombat", "leafblade", "stoneedge", "calmmind", "focusblast", "gigadrain", "hiddenpowerice", "substitute"],
		randomDoubleBattleMoves: ["taunt", "closecombat", "stoneedge", "leafblade", "swordsdance", "synthesis", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 42, "shiny": 1, "moves":["helpinghand", "retaliate", "gigadrain", "sacredsword"]},
			{"generation": 5, "level": 45, "shiny": 1, "moves":["helpinghand", "retaliate", "gigadrain", "sacredsword"]},
			{"generation": 5, "level": 65, "shiny": 1, "moves":["sacredsword", "swordsdance", "quickguard", "workup"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["retaliate", "gigadrain", "sacredsword", "swordsdance"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	tornadus: {
		randomBattleMoves: ["bulkup", "acrobatics", "knockoff", "substitute", "hurricane", "heatwave", "superpower", "uturn", "taunt", "tailwind"],
		randomDoubleBattleMoves: ["hurricane", "airslash", "uturn", "superpower", "focusblast", "taunt", "substitute", "heatwave", "tailwind", "protect", "skydrop"],
		eventPokemon: [
			{"generation": 5, "level": 40, "shiny": 1, "isHidden": false, "moves":["revenge", "aircutter", "extrasensory", "agility"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["uproar", "astonish", "gust"], "pokeball": "dreamball"},
			{"generation": 5, "level": 70, "isHidden": false, "moves":["hurricane", "hammerarm", "airslash", "hiddenpower"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["extrasensory", "agility", "airslash", "crunch"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	tornadustherian: {
		randomBattleMoves: ["hurricane", "airslash", "heatwave", "knockoff", "superpower", "uturn", "taunt"],
		randomDoubleBattleMoves: ["hurricane", "airslash", "focusblast", "uturn", "heatwave", "skydrop", "tailwind", "taunt", "protect"],
		eventOnly: true,
		tier: "Bank",
	},
	thundurus: {
		randomBattleMoves: ["thunderwave", "nastyplot", "thunderbolt", "hiddenpowerice", "hiddenpowerflying", "focusblast", "substitute", "knockoff", "taunt"],
		randomDoubleBattleMoves: ["thunderwave", "nastyplot", "thunderbolt", "hiddenpowerice", "hiddenpowerflying", "focusblast", "substitute", "knockoff", "taunt", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 40, "shiny": 1, "isHidden": false, "moves":["revenge", "shockwave", "healblock", "agility"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["uproar", "astonish", "thundershock"], "pokeball": "dreamball"},
			{"generation": 5, "level": 70, "isHidden": false, "moves":["thunder", "hammerarm", "focusblast", "wildcharge"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "isHidden": false, "moves":["healblock", "agility", "discharge", "crunch"]},
		],
		eventOnly: true,
		tier: "Bank",
	},
	thundurustherian: {
		randomBattleMoves: ["nastyplot", "thunderbolt", "hiddenpowerflying", "hiddenpowerice", "focusblast", "voltswitch"],
		randomDoubleBattleMoves: ["nastyplot", "thunderbolt", "hiddenpowerflying", "hiddenpowerice", "focusblast", "voltswitch", "protect"],
		eventOnly: true,
		tier: "Bank",
	},
	reshiram: {
		randomBattleMoves: ["blueflare", "dracometeor", "dragonpulse", "toxic", "flamecharge", "stoneedge", "roost"],
		randomDoubleBattleMoves: ["blueflare", "dracometeor", "dragonpulse", "heatwave", "flamecharge", "roost", "protect", "tailwind"],
		eventPokemon: [
			{"generation": 5, "level": 50, "moves":["dragonbreath", "slash", "extrasensory", "fusionflare"]},
			{"generation": 5, "level": 70, "moves":["extrasensory", "fusionflare", "dragonpulse", "imprison"]},
			{"generation": 5, "level": 100, "moves":["blueflare", "fusionflare", "mist", "dracometeor"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["dragonbreath", "slash", "extrasensory", "fusionflare"]},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	zekrom: {
		randomBattleMoves: ["boltstrike", "outrage", "dragonclaw", "dracometeor", "voltswitch", "honeclaws", "substitute", "roost"],
		randomDoubleBattleMoves: ["voltswitch", "protect", "dragonclaw", "boltstrike", "honeclaws", "substitute", "dracometeor", "fusionbolt", "roost", "tailwind"],
		eventPokemon: [
			{"generation": 5, "level": 50, "moves":["dragonbreath", "slash", "zenheadbutt", "fusionbolt"]},
			{"generation": 5, "level": 70, "moves":["zenheadbutt", "fusionbolt", "dragonclaw", "imprison"]},
			{"generation": 5, "level": 100, "moves":["boltstrike", "fusionbolt", "haze", "outrage"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["dragonbreath", "slash", "zenheadbutt", "fusionbolt"]},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	landorus: {
		randomBattleMoves: ["calmmind", "rockpolish", "earthpower", "focusblast", "psychic", "sludgewave", "stealthrock", "knockoff", "rockslide"],
		randomDoubleBattleMoves: ["earthpower", "focusblast", "hiddenpowerice", "psychic", "sludgebomb", "rockslide", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 70, "shiny": 1, "isHidden": false, "moves":["rockslide", "earthquake", "sandstorm", "fissure"]},
			{"generation": 5, "level": 5, "isHidden": true, "moves":["block", "mudshot", "rocktomb"], "pokeball": "dreamball"},
			{"generation": 6, "level": 65, "shiny": 1, "isHidden": false, "moves":["extrasensory", "swordsdance", "earthpower", "rockslide"]},
			{"generation": 6, "level": 50, "nature": "Adamant", "ivs": {"hp": 31, "atk": 31, "def": 31, "spa": 1, "spd": 31, "spe": 24}, "isHidden": false, "moves":["earthquake", "knockoff", "uturn", "rocktomb"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	landorustherian: {
		randomBattleMoves: ["swordsdance", "rockpolish", "earthquake", "stoneedge", "uturn", "superpower", "stealthrock"],
		randomDoubleBattleMoves: ["rockslide", "earthquake", "stoneedge", "uturn", "superpower", "knockoff", "protect"],
		eventOnly: true,
		tier: "Bank",
	},
	kyurem: {
		randomBattleMoves: ["dracometeor", "icebeam", "earthpower", "outrage", "substitute", "dragonpulse", "focusblast", "roost"],
		randomDoubleBattleMoves: ["substitute", "icebeam", "dracometeor", "dragonpulse", "focusblast", "glaciate", "earthpower", "roost", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 75, "shiny": 1, "moves":["glaciate", "dragonpulse", "imprison", "endeavor"]},
			{"generation": 5, "level": 70, "shiny": 1, "moves":["scaryface", "glaciate", "dragonpulse", "imprison"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["dragonbreath", "slash", "scaryface", "glaciate"]},
			{"generation": 6, "level": 100, "moves":["glaciate", "scaryface", "dracometeor", "ironhead"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	kyuremblack: {
		randomBattleMoves: ["outrage", "fusionbolt", "icebeam", "roost", "substitute", "earthpower", "dragonclaw"],
		randomDoubleBattleMoves: ["protect", "fusionbolt", "icebeam", "roost", "substitute", "honeclaws", "earthpower", "dragonclaw"],
		eventPokemon: [
			{"generation": 5, "level": 75, "shiny": 1, "moves":["freezeshock", "dragonpulse", "imprison", "endeavor"]},
			{"generation": 5, "level": 70, "shiny": 1, "moves":["fusionbolt", "freezeshock", "dragonpulse", "imprison"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["dragonbreath", "slash", "fusionbolt", "freezeshock"]},
			{"generation": 6, "level": 100, "moves":["freezeshock", "fusionbolt", "dracometeor", "ironhead"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	kyuremwhite: {
		randomBattleMoves: ["dracometeor", "icebeam", "fusionflare", "earthpower", "focusblast", "dragonpulse", "substitute", "roost", "toxic"],
		randomDoubleBattleMoves: ["dracometeor", "dragonpulse", "icebeam", "fusionflare", "earthpower", "focusblast", "roost", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 75, "shiny": 1, "moves":["iceburn", "dragonpulse", "imprison", "endeavor"]},
			{"generation": 5, "level": 70, "shiny": 1, "moves":["fusionflare", "iceburn", "dragonpulse", "imprison"]},
			{"generation": 6, "level": 50, "shiny": 1, "moves":["dragonbreath", "slash", "fusionflare", "iceburn"]},
			{"generation": 6, "level": 100, "moves":["iceburn", "fusionflare", "dracometeor", "ironhead"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	keldeo: {
		randomBattleMoves: ["hydropump", "secretsword", "calmmind", "hiddenpowerflying", "hiddenpowerelectric", "substitute", "scald", "icywind"],
		randomDoubleBattleMoves: ["hydropump", "secretsword", "protect", "hiddenpowerflying", "hiddenpowerelectric", "substitute", "surf", "icywind", "taunt"],
		eventPokemon: [
			{"generation": 5, "level": 15, "moves":["aquajet", "leer", "doublekick", "bubblebeam"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "moves":["sacredsword", "hydropump", "aquajet", "swordsdance"], "pokeball": "cherishball"},
			{"generation": 6, "level": 15, "moves":["aquajet", "leer", "doublekick", "hydropump"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["aquajet", "leer", "doublekick", "bubblebeam"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	keldeoresolute: {
		eventOnly: true,
		requiredMove: "Secret Sword",
	},
	meloetta: {
		randomBattleMoves: ["uturn", "calmmind", "psyshock", "hypervoice", "shadowball", "focusblast"],
		randomDoubleBattleMoves: ["calmmind", "psyshock", "thunderbolt", "hypervoice", "shadowball", "focusblast", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 15, "moves":["quickattack", "confusion", "round"], "pokeball": "cherishball"},
			{"generation": 5, "level": 50, "moves":["round", "teeterdance", "psychic", "closecombat"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	meloettapirouette: {
		randomBattleMoves: ["relicsong", "closecombat", "knockoff", "return"],
		randomDoubleBattleMoves: ["relicsong", "closecombat", "knockoff", "return", "protect"],
		requiredMove: "Relic Song",
		battleOnly: true,
	},
	genesect: {
		randomBattleMoves: ["uturn", "bugbuzz", "icebeam", "flamethrower", "thunderbolt", "ironhead", "shiftgear", "extremespeed", "blazekick"],
		randomDoubleBattleMoves: ["uturn", "bugbuzz", "icebeam", "flamethrower", "thunderbolt", "ironhead", "shiftgear", "extremespeed", "blazekick", "protect"],
		eventPokemon: [
			{"generation": 5, "level": 50, "moves":["technoblast", "magnetbomb", "solarbeam", "signalbeam"], "pokeball": "cherishball"},
			{"generation": 5, "level": 15, "moves":["technoblast", "magnetbomb", "solarbeam", "signalbeam"], "pokeball": "cherishball"},
			{"generation": 5, "level": 100, "shiny": true, "nature": "Hasty", "ivs": {"atk": 31, "spe": 31}, "moves":["extremespeed", "technoblast", "blazekick", "shiftgear"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "moves":["technoblast", "magnetbomb", "solarbeam", "signalbeam"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	genesectburn: {
		randomBattleMoves: ["uturn", "bugbuzz", "icebeam", "technoblast", "thunderbolt", "ironhead", "extremespeed"],
		randomDoubleBattleMoves: ["uturn", "bugbuzz", "icebeam", "technoblast", "thunderbolt", "ironhead", "extremespeed", "protect"],
		eventOnly: true,
		requiredItem: "Burn Drive",
	},
	genesectchill: {
		randomBattleMoves: ["uturn", "bugbuzz", "technoblast", "flamethrower", "thunderbolt", "ironhead", "extremespeed"],
		randomDoubleBattleMoves: ["uturn", "bugbuzz", "technoblast", "flamethrower", "thunderbolt", "ironhead", "extremespeed", "protect"],
		eventOnly: true,
		requiredItem: "Chill Drive",
	},
	genesectdouse: {
		randomBattleMoves: ["uturn", "bugbuzz", "icebeam", "flamethrower", "thunderbolt", "technoblast", "ironhead", "extremespeed"],
		randomDoubleBattleMoves: ["uturn", "bugbuzz", "icebeam", "flamethrower", "thunderbolt", "technoblast", "ironhead", "extremespeed", "protect"],
		eventOnly: true,
		requiredItem: "Douse Drive",
	},
	genesectshock: {
		randomBattleMoves: ["uturn", "bugbuzz", "icebeam", "flamethrower", "technoblast", "ironhead", "extremespeed"],
		randomDoubleBattleMoves: ["uturn", "bugbuzz", "icebeam", "flamethrower", "technoblast", "ironhead", "extremespeed", "protect"],
		eventOnly: true,
		requiredItem: "Shock Drive",
	},
	chespin: {
		randomBattleMoves: ["curse", "gyroball", "seedbomb", "stoneedge", "spikes", "synthesis"],
		tier: "Bank-LC",
	},
	quilladin: {
		randomBattleMoves: ["curse", "gyroball", "seedbomb", "stoneedge", "spikes", "synthesis"],
		tier: "Bank-NFE",
	},
	chesnaught: {
		randomBattleMoves: ["leechseed", "synthesis", "spikes", "drainpunch", "spikyshield", "woodhammer"],
		randomDoubleBattleMoves: ["leechseed", "synthesis", "hammerarm", "spikyshield", "stoneedge", "woodhammer", "rockslide"],
		tier: "Bank",
	},
	fennekin: {
		randomBattleMoves: ["fireblast", "psychic", "psyshock", "grassknot", "willowisp", "hypnosis", "hiddenpowerrock", "flamecharge"],
		eventPokemon: [
			{"generation": 6, "level": 15, "gender": "F", "nature": "Hardy", "isHidden": false, "moves":["scratch", "flamethrower", "hiddenpower"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	braixen: {
		randomBattleMoves: ["fireblast", "flamethrower", "psychic", "psyshock", "grassknot", "willowisp", "hiddenpowerrock"],
		tier: "Bank-NFE",
	},
	delphox: {
		randomBattleMoves: ["calmmind", "fireblast", "psyshock", "grassknot", "switcheroo", "shadowball"],
		randomDoubleBattleMoves: ["calmmind", "fireblast", "psyshock", "grassknot", "switcheroo", "shadowball", "heatwave", "dazzlinggleam", "protect"],
		tier: "Bank",
	},
	froakie: {
		randomBattleMoves: ["quickattack", "hydropump", "icebeam", "waterfall", "toxicspikes", "poweruppunch", "uturn"],
		eventPokemon: [
			{"generation": 6, "level": 7, "isHidden": false, "moves":["pound", "growl", "bubble", "return"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	frogadier: {
		randomBattleMoves: ["hydropump", "surf", "icebeam", "uturn", "taunt", "toxicspikes"],
		tier: "NFE",
	},
	greninja: {
		randomBattleMoves: ["hydropump", "icebeam", "darkpulse", "gunkshot", "uturn", "spikes", "toxicspikes", "taunt"],
		randomDoubleBattleMoves: ["hydropump", "uturn", "surf", "icebeam", "matblock", "taunt", "darkpulse", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 36, "ivs": {"spe": 31}, "isHidden": true, "moves":["watershuriken", "shadowsneak", "hydropump", "substitute"], "pokeball": "cherishball"},
			{"generation": 6, "level": 100, "isHidden": true, "moves":["hydrocannon", "gunkshot", "matblock", "happyhour"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	greninjaash: {
		randomBattleMoves: ["hydropump", "icebeam", "darkpulse", "watershuriken", "uturn"],
		eventPokemon: [
			{"generation": 7, "level": 36, "ivs": {"hp": 20, "atk": 31, "def": 20, "spa": 31, "spd": 20, "spe": 31}, "moves":["watershuriken", "aerialace", "doubleteam", "nightslash"]},
		],
		eventOnly: true,
		gen: 7,
		requiredAbility: "Battle Bond",
		battleOnly: true,
		tier: "New",
	},
	bunnelby: {
		randomBattleMoves: ["agility", "earthquake", "return", "quickattack", "uturn", "stoneedge", "spikes", "bounce"],
		tier: "Bank-LC",
	},
	diggersby: {
		randomBattleMoves: ["earthquake", "return", "wildcharge", "uturn", "swordsdance", "quickattack", "knockoff", "agility"],
		randomDoubleBattleMoves: ["earthquake", "uturn", "return", "wildcharge", "protect", "quickattack"],
		tier: "Bank",
	},
	fletchling: {
		randomBattleMoves: ["roost", "swordsdance", "uturn", "return", "overheat", "flamecharge", "tailwind"],
		tier: "LC",
	},
	fletchinder: {
		randomBattleMoves: ["roost", "swordsdance", "uturn", "return", "overheat", "flamecharge", "tailwind", "acrobatics"],
		tier: "New",
	},
	talonflame: {
		randomBattleMoves: ["bravebird", "flareblitz", "roost", "swordsdance", "uturn", "willowisp", "tailwind"],
		randomDoubleBattleMoves: ["bravebird", "flareblitz", "roost", "swordsdance", "uturn", "willowisp", "tailwind", "taunt", "protect"],
		tier: "New",
	},
	scatterbug: {
		randomBattleMoves: ["tackle", "stringshot", "stunspore", "bugbite", "poisonpowder"],
		tier: "Bank-LC",
	},
	spewpa: {
		randomBattleMoves: ["tackle", "stringshot", "stunspore", "bugbite", "poisonpowder"],
		tier: "Bank-NFE",
	},
	vivillon: {
		randomBattleMoves: ["sleeppowder", "quiverdance", "hurricane", "bugbuzz", "substitute"],
		randomDoubleBattleMoves: ["sleeppowder", "quiverdance", "hurricane", "bugbuzz", "roost", "protect"],
		tier: "Bank",
	},
	vivillonfancy: {
		eventPokemon: [
			{"generation": 6, "level": 12, "isHidden": false, "moves":["gust", "lightscreen", "strugglebug", "holdhands"], "pokeball": "cherishball"},
		],
		eventOnly: true,
	},
	vivillonpokeball: {
		eventPokemon: [
			{"generation": 6, "level": 12, "isHidden": false, "moves":["stunspore", "gust", "lightscreen", "strugglebug"]},
		],
		eventOnly: true,
	},
	litleo: {
		randomBattleMoves: ["hypervoice", "fireblast", "willowisp", "bulldoze", "yawn"],
		tier: "Bank-LC",
	},
	pyroar: {
		randomBattleMoves: ["sunnyday", "fireblast", "hypervoice", "solarbeam", "willowisp", "darkpulse"],
		randomDoubleBattleMoves: ["hypervoice", "fireblast", "willowisp", "protect", "sunnyday", "solarbeam"],
		eventPokemon: [
			{"generation": 6, "level": 49, "gender": "M", "perfectIVs": 2, "isHidden": false, "abilities":["unnerve"], "moves":["hypervoice", "fireblast", "darkpulse"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	flabebe: {
		randomBattleMoves: ["moonblast", "toxic", "wish", "psychic", "aromatherapy", "protect", "calmmind"],
		tier: "Bank-LC",
	},
	floette: {
		randomBattleMoves: ["moonblast", "toxic", "wish", "psychic", "aromatherapy", "protect", "calmmind"],
		tier: "Bank-NFE",
	},
	floetteeternal: {
		randomBattleMoves: ["lightofruin", "psychic", "hiddenpowerfire", "hiddenpowerground", "moonblast"],
		randomDoubleBattleMoves: ["lightofruin", "dazzlinggleam", "wish", "psychic", "aromatherapy", "protect", "calmmind"],
		isUnreleased: true,
		tier: "Unreleased",
	},
	florges: {
		randomBattleMoves: ["calmmind", "moonblast", "synthesis", "aromatherapy", "wish", "toxic", "protect"],
		randomDoubleBattleMoves: ["moonblast", "dazzlinggleam", "wish", "psychic", "aromatherapy", "protect", "calmmind"],
		tier: "Bank",
	},
	skiddo: {
		randomBattleMoves: ["hornleech", "brickbreak", "bulkup", "leechseed", "milkdrink", "rockslide"],
		tier: "Bank-LC",
	},
	gogoat: {
		randomBattleMoves: ["bulkup", "hornleech", "earthquake", "rockslide", "substitute", "leechseed", "milkdrink"],
		randomDoubleBattleMoves: ["hornleech", "earthquake", "brickbreak", "bulkup", "leechseed", "milkdrink", "rockslide", "protect"],
		tier: "Bank",
	},
	pancham: {
		randomBattleMoves: ["partingshot", "skyuppercut", "crunch", "stoneedge", "bulldoze", "shadowclaw", "bulkup"],
		eventPokemon: [
			{"generation": 6, "level": 30, "gender": "M", "nature": "Adamant", "isHidden": false, "abilities":["moldbreaker"], "moves":["armthrust", "stoneedge", "darkpulse"], "pokeball": "cherishball"},
		],
		tier: "LC",
	},
	pangoro: {
		randomBattleMoves: ["knockoff", "superpower", "gunkshot", "icepunch", "partingshot", "drainpunch"],
		randomDoubleBattleMoves: ["partingshot", "hammerarm", "crunch", "circlethrow", "icepunch", "earthquake", "poisonjab", "protect"],
		tier: "New",
	},
	furfrou: {
		randomBattleMoves: ["return", "cottonguard", "thunderwave", "substitute", "toxic", "suckerpunch", "uturn", "rest"],
		randomDoubleBattleMoves: ["return", "cottonguard", "uturn", "thunderwave", "suckerpunch", "snarl", "wildcharge", "protect"],
		tier: "Bank",
	},
	espurr: {
		randomBattleMoves: ["fakeout", "yawn", "thunderwave", "psychic", "trick", "darkpulse"],
		tier: "Bank-LC",
	},
	meowstic: {
		randomBattleMoves: ["toxic", "yawn", "thunderwave", "psychic", "reflect", "lightscreen", "healbell"],
		randomDoubleBattleMoves: ["fakeout", "thunderwave", "psychic", "reflect", "lightscreen", "safeguard", "protect"],
		tier: "Bank",
	},
	meowsticf: {
		randomBattleMoves: ["calmmind", "psychic", "psyshock", "shadowball", "energyball", "thunderbolt"],
		randomDoubleBattleMoves: ["psyshock", "darkpulse", "fakeout", "energyball", "signalbeam", "thunderbolt", "protect", "helpinghand"],
		tier: "Bank",
	},
	honedge: {
		randomBattleMoves: ["swordsdance", "shadowclaw", "shadowsneak", "ironhead", "rockslide", "aerialace", "destinybond"],
		tier: "LC",
	},
	doublade: {
		randomBattleMoves: ["swordsdance", "shadowclaw", "shadowsneak", "ironhead", "sacredsword"],
		randomDoubleBattleMoves: ["swordsdance", "shadowclaw", "shadowsneak", "ironhead", "sacredsword", "rockslide", "protect"],
		tier: "New",
	},
	aegislash: {
		randomBattleMoves: ["kingsshield", "swordsdance", "shadowclaw", "sacredsword", "ironhead", "shadowsneak", "hiddenpowerice", "shadowball", "flashcannon"],
		randomDoubleBattleMoves: ["kingsshield", "swordsdance", "shadowclaw", "sacredsword", "ironhead", "shadowsneak", "wideguard", "hiddenpowerice", "shadowball", "flashcannon"],
		eventPokemon: [
			{"generation": 6, "level": 50, "gender": "F", "nature": "Quiet", "moves":["wideguard", "kingsshield", "shadowball", "flashcannon"], "pokeball": "cherishball"},
		],
		tier: "Uber",
	},
	aegislashblade: {
		battleOnly: true,
	},
	spritzee: {
		randomBattleMoves: ["calmmind", "drainingkiss", "moonblast", "psychic", "aromatherapy", "wish", "trickroom", "thunderbolt"],
		tier: "Bank-LC",
	},
	aromatisse: {
		randomBattleMoves: ["wish", "protect", "moonblast", "aromatherapy", "reflect", "lightscreen"],
		randomDoubleBattleMoves: ["moonblast", "aromatherapy", "wish", "trickroom", "thunderbolt", "protect", "healpulse"],
		eventPokemon: [
			{"generation": 6, "level": 50, "nature": "Relaxed", "isHidden": true, "moves":["trickroom", "healpulse", "disable", "moonblast"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	swirlix: {
		randomBattleMoves: ["calmmind", "drainingkiss", "dazzlinggleam", "surf", "psychic", "flamethrower", "bellydrum", "thunderbolt", "return", "thief", "cottonguard"],
		tier: "Bank",
	},
	slurpuff: {
		randomBattleMoves: ["substitute", "bellydrum", "playrough", "return", "drainpunch", "calmmind", "drainingkiss", "dazzlinggleam", "flamethrower", "surf"],
		randomDoubleBattleMoves: ["substitute", "bellydrum", "playrough", "return", "drainpunch", "dazzlinggleam", "surf", "psychic", "flamethrower", "protect"],
		tier: "Bank",
	},
	inkay: {
		randomBattleMoves: ["topsyturvy", "switcheroo", "superpower", "psychocut", "flamethrower", "rockslide", "trickroom"],
		eventPokemon: [
			{"generation": 6, "level": 10, "isHidden": false, "moves":["happyhour", "foulplay", "hypnosis", "topsyturvy"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	malamar: {
		randomBattleMoves: ["superpower", "knockoff", "psychocut", "rockslide", "substitute", "trickroom"],
		randomDoubleBattleMoves: ["superpower", "psychocut", "rockslide", "trickroom", "knockoff", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "nature": "Adamant", "ivs": {"hp": 31, "atk": 31}, "isHidden": false, "abilities":["contrary"], "moves":["superpower", "knockoff", "facade", "rockslide"], "pokeball": "cherishball"},
		],
		tier: "Bank",
	},
	binacle: {
		randomBattleMoves: ["shellsmash", "razorshell", "stoneedge", "earthquake", "crosschop", "poisonjab", "xscissor", "rockslide"],
		tier: "Bank-LC",
	},
	barbaracle: {
		randomBattleMoves: ["shellsmash", "stoneedge", "razorshell", "earthquake", "crosschop", "stealthrock"],
		randomDoubleBattleMoves: ["shellsmash", "razorshell", "earthquake", "crosschop", "rockslide", "protect"],
		tier: "Bank",
	},
	skrelp: {
		randomBattleMoves: ["scald", "sludgebomb", "thunderbolt", "shadowball", "toxicspikes", "hydropump"],
		tier: "Bank-LC",
	},
	dragalge: {
		randomBattleMoves: ["dracometeor", "sludgewave", "focusblast", "scald", "hiddenpowerfire", "toxicspikes", "dragonpulse"],
		randomDoubleBattleMoves: ["dracometeor", "sludgebomb", "focusblast", "scald", "hiddenpowerfire", "protect", "dragonpulse"],
		tier: "Bank",
	},
	clauncher: {
		randomBattleMoves: ["waterpulse", "flashcannon", "uturn", "crabhammer", "aquajet", "sludgebomb"],
		tier: "Bank-LC",
	},
	clawitzer: {
		randomBattleMoves: ["scald", "waterpulse", "darkpulse", "aurasphere", "icebeam", "uturn"],
		randomDoubleBattleMoves: ["waterpulse", "icebeam", "uturn", "darkpulse", "aurasphere", "muddywater", "helpinghand", "protect"],
		tier: "Bank",
	},
	helioptile: {
		randomBattleMoves: ["surf", "voltswitch", "hiddenpowerice", "raindance", "thunder", "darkpulse", "thunderbolt"],
		tier: "Bank-LC",
	},
	heliolisk: {
		randomBattleMoves: ["raindance", "thunder", "hypervoice", "surf", "darkpulse", "hiddenpowerice", "voltswitch", "thunderbolt"],
		randomDoubleBattleMoves: ["surf", "voltswitch", "hiddenpowerice", "raindance", "thunder", "darkpulse", "thunderbolt", "electricterrain", "protect"],
		tier: "Bank",
	},
	tyrunt: {
		randomBattleMoves: ["stealthrock", "dragondance", "stoneedge", "dragonclaw", "earthquake", "icefang", "firefang"],
		eventPokemon: [
			{"generation": 6, "level": 10, "isHidden": true, "moves":["tailwhip", "tackle", "roar", "stomp"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	tyrantrum: {
		randomBattleMoves: ["stealthrock", "dragondance", "dragonclaw", "earthquake", "superpower", "outrage", "headsmash"],
		randomDoubleBattleMoves: ["rockslide", "dragondance", "headsmash", "dragonclaw", "earthquake", "icefang", "firefang", "protect"],
		tier: "Bank",
	},
	amaura: {
		randomBattleMoves: ["naturepower", "hypervoice", "ancientpower", "thunderbolt", "darkpulse", "thunderwave", "dragontail", "flashcannon"],
		eventPokemon: [
			{"generation": 6, "level": 10, "isHidden": true, "moves":["growl", "powdersnow", "thunderwave", "rockthrow"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	aurorus: {
		randomBattleMoves: ["ancientpower", "thunderbolt", "encore", "thunderwave", "earthpower", "freezedry", "hypervoice", "stealthrock"],
		randomDoubleBattleMoves: ["hypervoice", "ancientpower", "thunderbolt", "encore", "thunderwave", "flashcannon", "freezedry", "icywind", "protect"],
		tier: "Bank",
	},
	sylveon: {
		randomBattleMoves: ["hypervoice", "calmmind", "wish", "protect", "psyshock", "batonpass", "shadowball"],
		randomDoubleBattleMoves: ["hypervoice", "calmmind", "wish", "protect", "psyshock", "helpinghand", "shadowball", "hiddenpowerground"],
		eventPokemon: [
			{"generation": 6, "level": 10, "isHidden": false, "moves":["celebrate", "helpinghand", "sandattack", "fairywind"], "pokeball": "cherishball"},
			{"generation": 6, "level": 10, "gender": "F", "isHidden": false, "moves":["disarmingvoice", "babydolleyes", "quickattack", "drainingkiss"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	hawlucha: {
		randomBattleMoves: ["substitute", "swordsdance", "highjumpkick", "acrobatics", "roost", "stoneedge"],
		randomDoubleBattleMoves: ["swordsdance", "highjumpkick", "uturn", "stoneedge", "skydrop", "encore", "protect"],
		tier: "Bank",
	},
	dedenne: {
		randomBattleMoves: ["substitute", "recycle", "thunderbolt", "nuzzle", "grassknot", "hiddenpowerice", "toxic"],
		randomDoubleBattleMoves: ["voltswitch", "thunderbolt", "nuzzle", "grassknot", "hiddenpowerice", "uturn", "helpinghand", "protect"],
		tier: "Bank",
	},
	carbink: {
		randomBattleMoves: ["stealthrock", "lightscreen", "reflect", "explosion", "powergem", "moonblast"],
		randomDoubleBattleMoves: ["trickroom", "lightscreen", "reflect", "explosion", "powergem", "moonblast", "protect"],
		tier: "New",
	},
	goomy: {
		randomBattleMoves: ["sludgebomb", "thunderbolt", "toxic", "protect", "infestation"],
		tier: "LC",
	},
	sliggoo: {
		randomBattleMoves: ["sludgebomb", "thunderbolt", "toxic", "protect", "infestation", "icebeam"],
		tier: "NFE",
	},
	goodra: {
		randomBattleMoves: ["dracometeor", "dragonpulse", "fireblast", "sludgebomb", "thunderbolt", "earthquake", "dragontail"],
		randomDoubleBattleMoves: ["thunderbolt", "icebeam", "dragonpulse", "fireblast", "muddywater", "dracometeor", "focusblast", "protect"],
		tier: "New",
	},
	klefki: {
		randomBattleMoves: ["reflect", "lightscreen", "spikes", "magnetrise", "playrough", "thunderwave", "foulplay", "toxic"],
		randomDoubleBattleMoves: ["reflect", "lightscreen", "safeguard", "playrough", "substitute", "thunderwave", "protect", "flashcannon", "dazzlinggleam"],
		tier: "New",
	},
	phantump: {
		randomBattleMoves: ["hornleech", "leechseed", "phantomforce", "substitute", "willowisp", "rest"],
		tier: "LC",
	},
	trevenant: {
		randomBattleMoves: ["hornleech", "shadowclaw", "leechseed", "willowisp", "rest", "substitute", "phantomforce"],
		randomDoubleBattleMoves: ["hornleech", "woodhammer", "leechseed", "shadowclaw", "willowisp", "trickroom", "earthquake", "rockslide", "protect"],
		tier: "New",
	},
	pumpkaboo: {
		randomBattleMoves: ["willowisp", "shadowsneak", "destinybond", "synthesis", "seedbomb", "leechseed"],
		tier: "Bank-LC",
	},
	pumpkaboosmall: {
		randomBattleMoves: ["willowisp", "shadowsneak", "destinybond", "synthesis", "seedbomb"],
		unreleasedHidden: true,
		tier: "Bank-LC",
	},
	pumpkaboolarge: {
		randomBattleMoves: ["willowisp", "shadowsneak", "leechseed", "synthesis", "seedbomb"],
		unreleasedHidden: true,
		tier: "Bank-LC",
	},
	pumpkaboosuper: {
		randomBattleMoves: ["willowisp", "shadowsneak", "leechseed", "synthesis", "seedbomb"],
		eventPokemon: [
			{"generation": 6, "level": 50, "moves":["trickortreat", "astonish", "scaryface", "shadowsneak"], "pokeball": "cherishball"},
		],
		tier: "Bank-LC",
	},
	gourgeist: {
		randomBattleMoves: ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"],
		randomDoubleBattleMoves: ["willowisp", "shadowsneak", "painsplit", "seedbomb", "leechseed", "phantomforce", "explosion", "protect"],
		tier: "Bank",
	},
	gourgeistsmall: {
		randomBattleMoves: ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"],
		randomDoubleBattleMoves: ["willowisp", "shadowsneak", "painsplit", "seedbomb", "leechseed", "phantomforce", "explosion", "protect"],
		unreleasedHidden: true,
		tier: "Bank",
	},
	gourgeistlarge: {
		randomBattleMoves: ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"],
		randomDoubleBattleMoves: ["willowisp", "shadowsneak", "painsplit", "seedbomb", "leechseed", "phantomforce", "explosion", "protect", "trickroom"],
		unreleasedHidden: true,
		tier: "Bank",
	},
	gourgeistsuper: {
		randomBattleMoves: ["willowisp", "seedbomb", "leechseed", "shadowsneak", "substitute", "synthesis"],
		randomDoubleBattleMoves: ["willowisp", "shadowsneak", "painsplit", "seedbomb", "leechseed", "phantomforce", "explosion", "protect", "trickroom"],
		tier: "Bank",
	},
	bergmite: {
		randomBattleMoves: ["avalanche", "recover", "stoneedge", "curse", "gyroball", "rapidspin"],
		tier: "Bank-LC",
	},
	avalugg: {
		randomBattleMoves: ["avalanche", "recover", "toxic", "rapidspin", "roar", "earthquake"],
		randomDoubleBattleMoves: ["avalanche", "recover", "earthquake", "protect"],
		tier: "Bank",
	},
	noibat: {
		randomBattleMoves: ["airslash", "hurricane", "dracometeor", "uturn", "roost", "switcheroo"],
		tier: "Bank-LC",
	},
	noivern: {
		randomBattleMoves: ["dracometeor", "hurricane", "airslash", "flamethrower", "boomburst", "switcheroo", "uturn", "roost", "taunt"],
		randomDoubleBattleMoves: ["airslash", "hurricane", "dragonpulse", "dracometeor", "focusblast", "flamethrower", "uturn", "roost", "boomburst", "switcheroo", "tailwind", "taunt", "protect"],
		tier: "Bank",
	},
	xerneas: {
		randomBattleMoves: ["geomancy", "moonblast", "thunder", "focusblast", "thunderbolt", "hiddenpowerfire", "psyshock", "rockslide", "closecombat"],
		randomDoubleBattleMoves: ["geomancy", "dazzlinggleam", "thunder", "focusblast", "thunderbolt", "hiddenpowerfire", "psyshock", "rockslide", "closecombat", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "moves":["gravity", "geomancy", "moonblast", "megahorn"]},
			{"generation": 6, "level": 100, "shiny": true, "moves":["geomancy", "moonblast", "aromatherapy", "focusblast"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	yveltal: {
		randomBattleMoves: ["darkpulse", "hurricane", "foulplay", "oblivionwing", "uturn", "suckerpunch", "taunt", "toxic", "roost"],
		randomDoubleBattleMoves: ["darkpulse", "oblivionwing", "taunt", "focusblast", "hurricane", "roost", "suckerpunch", "snarl", "skydrop", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "moves":["snarl", "oblivionwing", "disable", "darkpulse"]},
			{"generation": 6, "level": 100, "shiny": true, "moves":["oblivionwing", "suckerpunch", "darkpulse", "foulplay"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank-Uber",
	},
	zygarde: {
		randomBattleMoves: ["dragondance", "thousandarrows", "outrage", "extremespeed", "irontail"],
		randomDoubleBattleMoves: ["dragondance", "thousandarrows", "extremespeed", "rockslide", "coil", "stoneedge", "glare", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 70, "moves":["crunch", "earthquake", "camouflage", "dragonpulse"]},
			{"generation": 6, "level": 100, "moves":["landswrath", "extremespeed", "glare", "outrage"], "pokeball": "cherishball"},
			{"generation": 7, "level": 50, "moves":["bind", "landswrath", "sandstorm", "haze"]},
			{"generation": 7, "level": 50, "isHidden": true, "moves":["bind", "landswrath", "sandstorm", "haze"]},
		],
		eventOnly: true,
		tier: "New",
	},
	zygarde10: {
		randomBattleMoves: ["dragondance", "thousandarrows", "outrage", "extremespeed", "irontail", "substitute"],
		eventPokemon: [
			{"generation": 7, "level": 30, "moves":["safeguard", "dig", "bind", "landswrath"]},
			{"generation": 7, "level": 50, "isHidden": true, "moves":["safeguard", "dig", "bind", "landswrath"]},
		],
		eventOnly: true,
		gen: 7,
		tier: "New",
	},
	zygardecomplete: {
		gen: 7,
		requiredAbility: "Power Construct",
		battleOnly: true,
	},
	diancie: {
		randomBattleMoves: ["reflect", "lightscreen", "stealthrock", "diamondstorm", "moonblast", "hiddenpowerfire"],
		randomDoubleBattleMoves: ["diamondstorm", "moonblast", "reflect", "lightscreen", "safeguard", "substitute", "calmmind", "psychic", "dazzlinggleam", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 50, "moves":["diamondstorm", "reflect", "return", "moonblast"], "pokeball": "cherishball"},
			{"generation": 6, "level": 50, "shiny": true, "moves":["diamondstorm", "moonblast", "reflect", "return"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	dianciemega: {
		randomBattleMoves: ["calmmind", "moonblast", "earthpower", "hiddenpowerfire", "psyshock", "diamondstorm"],
		randomDoubleBattleMoves: ["diamondstorm", "moonblast", "calmmind", "psyshock", "earthpower", "hiddenpowerfire", "dazzlinggleam", "protect"],
		requiredItem: "Diancite",
		tier: "Unreleased",
	},
	hoopa: {
		randomBattleMoves: ["nastyplot", "psyshock", "shadowball", "focusblast", "trick"],
		randomDoubleBattleMoves: ["hyperspacehole", "shadowball", "focusblast", "protect", "psychic", "trickroom"],
		eventPokemon: [
			{"generation": 6, "level": 50, "moves":["hyperspacehole", "nastyplot", "psychic", "astonish"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	hoopaunbound: {
		randomBattleMoves: ["nastyplot", "substitute", "psyshock", "psychic", "darkpulse", "focusblast", "hyperspacefury", "zenheadbutt", "icepunch", "drainpunch", "gunkshot", "knockoff", "trick"],
		randomDoubleBattleMoves: ["psychic", "darkpulse", "focusblast", "protect", "hyperspacefury", "zenheadbutt", "icepunch", "drainpunch", "gunkshot"],
		eventOnly: true,
		tier: "Bank",
	},
	volcanion: {
		randomBattleMoves: ["substitute", "steameruption", "fireblast", "sludgewave", "hiddenpowerice", "earthpower", "superpower"],
		randomDoubleBattleMoves: ["substitute", "steameruption", "heatwave", "sludgebomb", "rockslide", "earthquake", "protect"],
		eventPokemon: [
			{"generation": 6, "level": 70, "moves":["steameruption", "overheat", "hydropump", "mist"], "pokeball": "cherishball"},
			{"generation": 6, "level": 70, "moves":["steameruption", "flamethrower", "hydropump", "explosion"], "pokeball": "cherishball"},
		],
		eventOnly: true,
		tier: "Bank",
	},
	rowlet: {
		unreleasedHidden: true,
		tier: "LC",
	},
	dartrix: {
		unreleasedHidden: true,
		tier: "NFE",
	},
	decidueye: {
		randomBattleMoves: ["spiritshackle", "uturn", "leafblade", "roost", "swordsdance", "suckerpunch"],
		unreleasedHidden: true,
		tier: "New",
	},
	litten: {
		unreleasedHidden: true,
		tier: "LC",
	},
	torracat: {
		unreleasedHidden: true,
		tier: "NFE",
	},
	incineroar: {
		randomBattleMoves: ["fakeout", "darkestlariat", "flareblitz", "uturn", "earthquake"],
		unreleasedHidden: true,
		tier: "New",
	},
	popplio: {
		unreleasedHidden: true,
		tier: "LC",
	},
	brionne: {
		unreleasedHidden: true,
		tier: "NFE",
	},
	primarina: {
		randomBattleMoves: ["hypervoice", "moonblast", "icebeam", "encore", "reflect", "lightscreen", "scald"],
		unreleasedHidden: true,
		tier: "New",
	},
	pikipek: {
		tier: "LC",
	},
	trumbeak: {
		tier: "NFE",
	},
	toucannon: {
		randomBattleMoves: ["substitute", "beakblast", "swordsdance", "roost", "brickbreak"],
		tier: "New",
	},
	yungoos: {
		tier: "LC",
	},
	gumshoos: {
		randomBattleMoves: ["uturn", "return", "crunch", "earthquake"],
		tier: "New",
	},
	grubbin: {
		tier: "LC",
	},
	charjabug: {
		tier: "NFE",
	},
	vikavolt: {
		randomBattleMoves: ["agility", "bugbuzz", "thunderbolt", "voltswitch", "energyball", "hiddenpowerice"],
		tier: "New",
	},
	crabrawler: {
		tier: "LC",
	},
	crabominable: {
		randomBattleMoves: ["icehammer", "closecombat", "earthquake", "stoneedge"],
		tier: "New",
	},
	oricorio: {
		randomBattleMoves: ["revelationdance", "hurricane", "toxic", "roost", "uturn"],
		tier: "New",
	},
	oricoriopompom: {
		randomBattleMoves: ["revelationdance", "hurricane", "toxic", "roost", "uturn"],
		tier: "New",
	},
	oricoriopau: {
		randomBattleMoves: ["revelationdance", "hurricane", "toxic", "roost", "uturn"],
		tier: "New",
	},
	oricoriosensu: {
		randomBattleMoves: ["revelationdance", "hurricane", "toxic", "roost", "uturn"],
		tier: "New",
	},
	cutiefly: {
		tier: "LC Uber",
	},
	ribombee: {
		randomBattleMoves: ["quiverdance", "bugbuzz", "moonblast", "hiddenpowerfire", "roost", "batonpass"],
		tier: "New",
	},
	rockruff: {
		tier: "LC",
	},
	lycanroc: {
		randomBattleMoves: ["swordsdance", "accelerock", "stoneedge", "crunch", "firefang"],
		tier: "New",
	},
	lycanrocmidnight: {
		randomBattleMoves: ["bulkup", "stoneedge", "stealthrock", "suckerpunch", "swordsdance", "firefang", "rockclimb"],
		tier: "New",
	},
	wishiwashi: {
		randomBattleMoves: ["scald", "hydropump", "icebeam", "hiddenpowergrass", "earthquake"],
		tier: "New",
	},
	wishiwashischool: {
		battleOnly: true,
	},
	mareanie: {
		tier: "LC",
	},
	toxapex: {
		randomBattleMoves: ["toxicspikes", "banefulbunker", "recover", "scald", "haze"],
		tier: "New",
	},
	mudbray: {
		tier: "LC",
	},
	mudsdale: {
		randomBattleMoves: ["earthquake", "closecombat", "payback", "rockslide", "heavyslam"],
		tier: "New",
	},
	dewpider: {
		tier: "LC",
	},
	araquanid: {
		randomBattleMoves: ["liquidation", "lunge", "infestation", "mirrorcoat"],
		tier: "New",
	},
	fomantis: {
		tier: "LC",
	},
	lurantis: {
		randomBattleMoves: ["leafstorm", "hiddenpowerfire", "gigadrain", "substitute"],
		tier: "New",
	},
	morelull: {
		tier: "LC",
	},
	shiinotic: {
		randomBattleMoves: ["spore", "strengthsap", "moonblast", "substitute", "leechseed"],
		tier: "New",
	},
	salandit: {
		tier: "LC",
	},
	salazzle: {
		randomBattleMoves: ["nastyplot", "fireblast", "sludgewave", "hiddenpowerground"],
		tier: "New",
	},
	stufful: {
		tier: "LC",
	},
	bewear: {
		randomBattleMoves: ["hammerarm", "icepunch", "swordsdance", "return", "shadowclaw", "doubleedge"],
		tier: "New",
	},
	bounsweet: {
		tier: "LC",
	},
	steenee: {
		tier: "NFE",
	},
	tsareena: {
		randomBattleMoves: ["highjumpkick", "tropkick", "playrough", "uturn"],
		tier: "New",
	},
	comfey: {
		randomBattleMoves: ["aromatherapy", "drainingkiss", "toxic", "synthesis", "uturn"],
		eventPokemon: [
			{"generation": 7, "level": 10, "nature": "Jolly", "isHidden": false, "moves":["celebrate", "leechseed", "drainingkiss", "magicalleaf"], "pokeball": "cherishball"},
		],
		tier: "New",
	},
	oranguru: {
		randomBattleMoves: ["nastyplot", "psyshock", "focusblast", "thunderbolt"],
		unreleasedHidden: true,
		tier: "New",
	},
	passimian: {
		randomBattleMoves: ["rocktomb", "closecombat", "earthquake", "ironhead"],
		unreleasedHidden: true,
		tier: "New",
	},
	wimpod: {
		tier: "LC",
	},
	golisopod: {
		randomBattleMoves: ["spikes", "firstimpression", "liquidation", "suckerpunch", "aquajet", "toxic"],
		tier: "New",
	},
	sandygast: {
		tier: "LC",
	},
	palossand: {
		randomBattleMoves: ["shoreup", "earthpower", "shadowball", "protect", "toxic"],
		tier: "New",
	},
	pyukumuku: {
		randomBattleMoves: ["curse", "batonpass", "recover", "counter", "reflect", "lightscreen"],
		tier: "New",
	},
	typenull: {
		eventPokemon: [
			{"generation": 7, "level": 40, "shiny": 1, "moves":["crushclaw", "scaryface", "xscissor", "takedown"]},
		],
		eventOnly: true,
		tier: "NFE",
	},
	silvally: {
		randomBattleMoves: ["swordsdance", "return", "doubleedge", "crunch", "flamecharge", "flamethrower", "icebeam", "uturn", "ironhead"],
		tier: "New",
	},
	silvallybug: {
		randomBattleMoves: ["flamethrower", "icebeam", "thunderbolt", "uturn"],
		tier: "New",
		requiredItem: "Bug Memory",
	},
	silvallydark: {
		randomBattleMoves: ["multiattack", "swordsdance", "flamecharge", "ironhead"],
		tier: "New",
		requiredItem: "Dark Memory",
	},
	silvallydragon: {
		randomBattleMoves: ["multiattack", "ironhead", "flamecharge", "flamethrower", "icebeam", "dracometeor", "swordsdance", "uturn"],
		tier: "New",
		requiredItem: "Dragon Memory",
	},
	silvallyelectric: {
		randomBattleMoves: ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"],
		tier: "New",
		requiredItem: "Electric Memory",
	},
	silvallyfairy: {
		randomBattleMoves: ["multiattack", "flamethrower", "rockslide", "thunderwave", "partingshot"],
		tier: "New",
		requiredItem: "Fairy Memory",
	},
	silvallyfighting: {
		randomBattleMoves: ["swordsdance", "multiattack", "shadowclaw", "flamecharge", "ironhead"],
		tier: "New",
		requiredItem: "Fighting Memory",
	},
	silvallyfire: {
		randomBattleMoves: ["multiattack", "icebeam", "thunderbolt", "uturn"],
		tier: "New",
		requiredItem: "Fire Memory",
	},
	silvallyflying: {
		randomBattleMoves: ["multiattack", "flamethrower", "ironhead", "partingshot", "thunderwave"],
		tier: "New",
		requiredItem: "Flying Memory",
	},
	silvallyghost: {
		randomBattleMoves: ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"],
		tier: "New",
		requiredItem: "Ghost Memory",
	},
	silvallygrass: {
		randomBattleMoves: ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"],
		tier: "New",
		requiredItem: "Grass Memory",
	},
	silvallyground: {
		randomBattleMoves: ["multiattack", "swordsdance", "flamecharge", "rockslide"],
		tier: "New",
		requiredItem: "Ground Memory",
	},
	silvallyice: {
		randomBattleMoves: ["multiattack", "thunderbolt", "flamethrower", "uturn", "toxic"],
		tier: "New",
		requiredItem: "Ice Memory",
	},
	silvallypoison: {
		randomBattleMoves: ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"],
		tier: "New",
		requiredItem: "Poison Memory",
	},
	silvallypsychic: {
		randomBattleMoves: ["multiattack", "flamethrower", "rockslide", "partingshot", "thunderwave"],
		tier: "New",
		requiredItem: "Psychic Memory",
	},
	silvallyrock: {
		randomBattleMoves: ["multiattack", "flamethrower", "icebeam", "partingshot", "toxic"],
		tier: "New",
		requiredItem: "Rock Memory",
	},
	silvallysteel: {
		randomBattleMoves: ["multiattack", "crunch", "flamethrower", "thunderbolt"],
		tier: "New",
		requiredItem: "Steel Memory",
	},
	silvallywater: {
		randomBattleMoves: ["multiattack", "icebeam", "thunderbolt", "partingshot"],
		tier: "New",
		requiredItem: "Water Memory",
	},
	minior: {
		randomBattleMoves: ["shellsmash", "powergem", "acrobatics", "earthquake"],
		tier: "New",
	},
	miniormeteor: {
		battleOnly: true,
	},
	komala: {
		randomBattleMoves: ["return", "suckerpunch", "woodhammer", "earthquake", "playrough", "uturn"],
		tier: "New",
	},
	turtonator: {
		randomBattleMoves: ["overheat", "shelltrap", "earthquake", "dragontail", "explosion"],
		tier: "New",
	},
	togedemaru: {
		randomBattleMoves: ["spikyshield", "zingzap", "nuzzle", "uturn", "wish"],
		tier: "New",
	},
	mimikyu: {
		randomBattleMoves: ["swordsdance", "shadowsneak", "playrough", "woodhammer", "shadowclaw"],
		tier: "New",
	},
	mimikyubusted: {
		battleOnly: true,
	},
	bruxish: {
		randomBattleMoves: ["psychicfangs", "crunch", "waterfall", "icefang", "aquajet", "swordsdance"],
		tier: "New",
	},
	drampa: {
		randomBattleMoves: ["dracometeor", "dragonpulse", "hypervoice", "fireblast", "thunderbolt", "glare", "substitute", "roost"],
		tier: "New",
	},
	dhelmise: {
		randomBattleMoves: ["swordsdance", "powerwhip", "phantomforce", "anchorshot", "switcheroo", "earthquake"],
		tier: "New",
	},
	jangmoo: {
		tier: "LC",
	},
	hakamoo: {
		tier: "NFE",
	},
	kommoo: {
		randomBattleMoves: ["dragondance", "outrage", "dragonclaw", "skyuppercut", "poisonjab"],
		tier: "New",
	},
	tapukoko: {
		randomBattleMoves: ["wildcharge", "voltswitch", "naturesmadness", "bravebird", "uturn"],
		eventPokemon: [
			{"generation": 7, "level": 60, "isHidden": false, "moves":["naturesmadness", "discharge", "agility", "electroball"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "New",
	},
	tapulele: {
		randomBattleMoves: ["moonblast", "psyshock", "calmmind", "focusblast", "aromatherapy"],
		eventPokemon: [
			{"generation": 7, "level": 60, "isHidden": false, "moves":["naturesmadness", "extrasensory", "flatter", "moonblast"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "New",
	},
	tapubulu: {
		randomBattleMoves: ["woodhammer", "naturesmadness", "rocktomb", "superpower", "megahorn"],
		eventPokemon: [
			{"generation": 7, "level": 60, "isHidden": false, "moves":["naturesmadness", "zenheadbutt", "megahorn", "skullbash"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "New",
	},
	tapufini: {
		randomBattleMoves: ["calmmind", "moonblast", "scald", "substitute", "icebeam"],
		eventPokemon: [
			{"generation": 7, "level": 60, "isHidden": false, "moves":["naturesmadness", "muddywater", "aquaring", "hydropump"]},
		],
		eventOnly: true,
		unreleasedHidden: true,
		tier: "New",
	},
	cosmog: {
		eventPokemon: [
			{"generation": 7, "level": 5, "moves":["splash"]},
		],
		eventOnly: true,
		tier: "LC",
	},
	cosmoem: {
		tier: "NFE",
	},
	solgaleo: {
		randomBattleMoves: ["sunsteelstrike", "zenheadbutt", "flareblitz", "morningsun", "stoneedge", "earthquake"],
		eventPokemon: [
			{"generation": 7, "level": 55, "moves":["sunsteelstrike", "cosmicpower", "crunch", "zenheadbutt"]},
		],
		tier: "Uber",
	},
	lunala: {
		randomBattleMoves: ["moongeistbeam", "psyshock", "calmmind", "focusblast", "roost"],
		eventPokemon: [
			{"generation": 7, "level": 55, "moves":["moongeistbeam", "cosmicpower", "nightdaze", "shadowball"]},
		],
		tier: "Uber",
	},
	nihilego: {
		randomBattleMoves: ["stealthrock", "acidspray", "powergem", "toxicspikes", "sludgewave"],
		tier: "New",
	},
	buzzwole: {
		randomBattleMoves: ["superpower", "leechlife", "stoneedge", "poisonjab"],
		tier: "New",
	},
	pheromosa: {
		randomBattleMoves: ["highjumpkick", "uturn", "icebeam", "poisonjab", "bugbuzz"],
		tier: "New",
	},
	xurkitree: {
		randomBattleMoves: ["thunderbolt", "voltswitch", "energyball", "dazzlinggleam", "hiddenpowerice"],
		tier: "New",
	},
	celesteela: {
		randomBattleMoves: ["autotomize", "flashcannon", "airslash", "fireblast", "energyball"],
		tier: "New",
	},
	kartana: {
		randomBattleMoves: ["leafblade", "sacredsword", "smartstrike", "psychocut", "swordsdance"],
		tier: "New",
	},
	guzzlord: {
		randomBattleMoves: ["dracometeor", "hammerarm", "crunch", "earthquake", "fireblast"],
		tier: "New",
	},
	necrozma: {
		randomBattleMoves: ["autotomize", "swordsdance", "stoneedge", "psychocut", "earthquake", "psyshock"],
		tier: "New",
	},
	magearna: {
		randomBattleMoves: ["shiftgear", "flashcannon", "aurasphere", "fleurcannon", "ironhead", "thunderbolt", "icebeam"],
		eventPokemon: [
			{"generation": 7, "level": 50, "moves":["fleurcannon", "flashcannon", "luckychant", "helpinghand"]},
		],
		eventOnly: true,
		tier: "New",
	},
	marshadow: {
		randomBattleMoves: ["spectralthief", "closecombat", "stoneedge", "shadowsneak", "icepunch"],
		isUnreleased: true,
		tier: "Unreleased",
	},
	missingno: {
		randomBattleMoves: ["watergun", "skyattack", "doubleedge", "metronome"],
		isNonstandard: true,
		tier: "Illegal",
	},
	tomohawk: {
		randomBattleMoves: ["aurasphere", "roost", "stealthrock", "rapidspin", "hurricane", "airslash", "taunt", "substitute", "toxic", "naturepower", "earthpower"],
		isNonstandard: true,
		tier: "CAP",
	},
	necturna: {
		randomBattleMoves: ["powerwhip", "hornleech", "willowisp", "shadowsneak", "stoneedge", "sacredfire", "boltstrike", "vcreate", "extremespeed", "closecombat", "shellsmash", "spore", "milkdrink", "batonpass", "stickyweb"],
		isNonstandard: true,
		tier: "CAP",
	},
	mollux: {
		randomBattleMoves: ["fireblast", "thunderbolt", "sludgebomb", "thunderwave", "willowisp", "recover", "rapidspin", "trick", "stealthrock", "toxicspikes", "lavaplume"],
		isNonstandard: true,
		tier: "CAP",
	},
	aurumoth: {
		randomBattleMoves: ["dragondance", "quiverdance", "closecombat", "bugbuzz", "hydropump", "megahorn", "psychic", "blizzard", "thunder", "focusblast", "zenheadbutt"],
		isNonstandard: true,
		tier: "CAP",
	},
	malaconda: {
		randomBattleMoves: ["powerwhip", "glare", "toxic", "suckerpunch", "rest", "substitute", "uturn", "synthesis", "rapidspin", "knockoff"],
		isNonstandard: true,
		tier: "CAP",
	},
	cawmodore: {
		randomBattleMoves: ["bellydrum", "bulletpunch", "drainpunch", "acrobatics", "drillpeck", "substitute", "ironhead", "quickattack"],
		isNonstandard: true,
		tier: "CAP",
	},
	volkraken: {
		randomBattleMoves: ["scald", "powergem", "hydropump", "memento", "hiddenpowerice", "fireblast", "willowisp", "uturn", "substitute", "flashcannon", "surf"],
		isNonstandard: true,
		tier: "CAP",
	},
	plasmanta: {
		randomBattleMoves: ["sludgebomb", "thunderbolt", "substitute", "hiddenpowerice", "psyshock", "dazzlinggleam", "flashcannon"],
		isNonstandard: true,
		tier: "CAP",
	},
	naviathan: {
		randomBattleMoves: ["dragondance", "waterfall", "ironhead", "iciclecrash"],
		isNonstandard: true,
		tier: "CAP",
	},
	crucibelle: {
		randomBattleMoves: ["headsmash", "gunkshot", "coil", "lowkick", "uturn", "stealthrock"],
		isNonstandard: true,
		tier: "CAP",
	},
	crucibellemega: {
		randomBattleMoves: ["headsmash", "gunkshot", "coil", "woodhammer", "lowkick", "uturn"],
		requiredItem: "Crucibellite",
		isNonstandard: true,
		tier: "CAP",
	},
	kerfluffle: {
		randomBattleMoves: ["aurasphere", "moonblast", "taunt", "partingshot", "gigadrain", "yawn"],
		isNonstandard: true,
		eventPokemon: [
			{"generation": 6, "level": 16, "isHidden": false, "abilities":["naturalcure"], "moves":["celebrate", "holdhands", "fly", "metronome"], "pokeball": "cherishball"},
		],
		tier: "CAP",
	},
	syclant: {
		randomBattleMoves: ["bugbuzz", "icebeam", "blizzard", "earthpower", "spikes", "superpower", "tailglow", "uturn", "focusblast"],
		isNonstandard: true,
		tier: "CAP",
	},
	revenankh: {
		randomBattleMoves: ["bulkup", "shadowsneak", "drainpunch", "rest", "moonlight", "icepunch", "glare"],
		isNonstandard: true,
		tier: "CAP",
	},
	pyroak: {
		randomBattleMoves: ["leechseed", "lavaplume", "substitute", "protect", "gigadrain"],
		isNonstandard: true,
		tier: "CAP",
	},
	fidgit: {
		randomBattleMoves: ["spikes", "stealthrock", "toxicspikes", "wish", "rapidspin", "encore", "uturn", "sludgebomb", "earthpower"],
		isNonstandard: true,
		tier: "CAP",
	},
	stratagem: {
		randomBattleMoves: ["paleowave", "earthpower", "fireblast", "gigadrain", "calmmind", "substitute"],
		isNonstandard: true,
		tier: "CAP",
	},
	arghonaut: {
		randomBattleMoves: ["recover", "bulkup", "waterfall", "drainpunch", "crosschop", "stoneedge", "thunderpunch", "aquajet", "machpunch"],
		isNonstandard: true,
		tier: "CAP",
	},
	kitsunoh: {
		randomBattleMoves: ["shadowstrike", "earthquake", "superpower", "meteormash", "uturn", "icepunch", "trick", "willowisp"],
		isNonstandard: true,
		tier: "CAP",
	},
	cyclohm: {
		randomBattleMoves: ["slackoff", "dracometeor", "dragonpulse", "fireblast", "thunderbolt", "hydropump", "discharge", "healbell"],
		isNonstandard: true,
		tier: "CAP",
	},
	colossoil: {
		randomBattleMoves: ["earthquake", "crunch", "suckerpunch", "uturn", "rapidspin", "encore", "pursuit", "knockoff"],
		isNonstandard: true,
		tier: "CAP",
	},
	krilowatt: {
		randomBattleMoves: ["surf", "thunderbolt", "icebeam", "earthpower"],
		isNonstandard: true,
		tier: "CAP",
	},
	voodoom: {
		randomBattleMoves: ["aurasphere", "darkpulse", "taunt", "painsplit", "substitute", "hiddenpowerice", "vacuumwave"],
		isNonstandard: true,
		tier: "CAP",
	},
};
