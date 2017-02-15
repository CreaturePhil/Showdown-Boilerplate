'use strict';

const ProcessManager = require('./../process-manager');

const MAX_PROCESSES = 1;
const RESULTS_MAX_LENGTH = 10;

const PM = exports.PM = new ProcessManager({
	maxProcesses: MAX_PROCESSES,
	execFile: __filename,
	onMessageUpstream: function (message) {
		// Protocol:
		// "[id]|JSON"
		let pipeIndex = message.indexOf('|');
		let id = +message.substr(0, pipeIndex);
		let result = JSON.parse(message.slice(pipeIndex + 1));

		if (this.pendingTasks.has(id)) {
			this.pendingTasks.get(id)(result);
			this.pendingTasks.delete(id);
			this.release();
		}
	},
	onMessageDownstream: function (message) {
		// protocol:
		// "[id]|{data, sig}"
		let pipeIndex = message.indexOf('|');
		let id = message.substr(0, pipeIndex);

		let data = JSON.parse(message.slice(pipeIndex + 1));
		process.send(id + '|' + JSON.stringify(this.receive(data)));
	},
	receive: function (data) {
		let result;
		try {
			switch (data.cmd) {
			case 'randpoke':
			case 'dexsearch':
				result = runDexsearch(data.target, data.cmd, data.canAll, data.message);
				break;
			case 'movesearch':
				result = runMovesearch(data.target, data.cmd, data.canAll, data.message);
				break;
			case 'itemsearch':
				result = runItemsearch(data.target, data.cmd, data.canAll, data.message);
				break;
			case 'learn':
				result = runLearn(data.target, data.message);
				break;
			default:
				result = null;
			}
		} catch (err) {
			require('./../crashlogger')(err, 'A search query', data);
			result = {error: "Sorry! Our search engine crashed on your query. We've been automatically notified and will fix this crash."};
		}
		return result;
	},
	isChatBased: true,
});

if (process.send && module === process.mainModule) {
	// This is a child process!

	global.Config = require('../config/config');

	if (Config.crashguard) {
		process.on('uncaughtException', err => {
			require('../crashlogger')(err, 'A dexsearch process', true);
		});
	}

	global.Tools = require('../tools');
	global.toId = Tools.getId;
	Tools.includeData();
	Tools.includeMods();
	global.TeamValidator = require('../team-validator');

	process.on('message', message => PM.onMessageDownstream(message));
	process.on('disconnect', () => process.exit());

	require('../repl').start('dexsearch', cmd => eval(cmd));
} else if (!PM.maxProcesses) {
	process.nextTick(() => Tools.includeMods());
}//All this isfrom datasearch.js
let isMega = function(zom) {
        var k = "",
                b = false;
        zom = toId(zom);
        for (var i = 0; i < k.length; i++) {

                if (k.charAt(i) == 'm' && k.charAt(i + 1) == 'e' && k.charAt(i + 2) == 'g' && k.charAt(i + 3) == 'a')
                        b = true;
        }
        if (k == "yanmega")
                b = false;
        if (k.charAt(0) == 'm')
                if (pokemen[k.substring(1, k.length) + "mega"] != undefined)
                        b = true;
        return b;
}
let natures = {
        adamant: {
                name: "Adamant",
                swap: true,
                plus: 'atk',
                minus: 'spa'
        },
        bashful: {
                name: "Bashful",
                swap: false,
        },
        bold: {
                name: "Bold",
                swap: true,
                plus: 'def',
                minus: 'atk'
        },
        brave: {
                name: "Brave",
                swap: true,
                plus: 'atk',
                minus: 'spe'
        },
        calm: {
                name: "Calm",
                swap: true,
                plus: 'spd',
                minus: 'atk'
        },
        careful: {
                name: "Careful",
                swap: true,
                plus: 'spd',
                minus: 'spa'
        },
        docile: {
                name: "Docile",
                swap: false
        },
        gentle: {
                name: "Gentle",
                swap: true,
                plus: 'spd',
                minus: 'def'
        },
        hardy: {
                name: "Hardy",
                swap: false
        },
        hasty: {
                name: "Hasty",
                swap: true,
                plus: 'spe',
                minus: 'def'
        },
        impish: {
                name: "Impish",
                swap: true,
                plus: 'def',
                minus: 'spa'
        },
        jolly: {
                name: "Jolly",
                swap: true,
                plus: 'spe',
                minus: 'spa'
        },
        lax: {
                name: "Lax",
                swap: true,
                plus: 'def',
                minus: 'spd'
        },
        lonely: {
                name: "Lonely",
                swap: true,
                plus: 'atk',
                minus: 'def'
        },
        mild: {
                name: "Mild",
                swap: true,
                plus: 'spa',
                minus: 'def'
        },
        modest: {
                name: "Modest",
                swap: true,
                plus: 'spa',
                minus: 'atk'
        },
        naive: {
                name: "Naive",
                swap: true,
                plus: 'spe',
                minus: 'spd'
        },
        naughty: {
                name: "Naughty",
                swap: true,
                plus: 'atk',
                minus: 'spd'
        },
        quiet: {
                name: "Quiet",
                swap: true,
                plus: 'spa',
                minus: 'spe'
        },
        quirky: {
                name: "Quirky",
                swap: false
        },
        rash: {
                name: "Rash",
                swap: true,
                plus: 'spa',
                minus: 'spd'
        },
        relaxed: {
                name: "Relaxed",
                swap: true,
                plus: 'def',
                minus: 'spe'
        },
        sassy: {
                name: "Sassy",
                swap: true,
                plus: 'spd',
                minus: 'spe'
        },
        serious: {
                name: "Serious",
                swap: false
        },
        timid: {
                name: "Timid",
                swap: true,
                plus: 'spe',
                minus: 'atk'
        },
};
exports.commands= {
	mixandmega: 'mnm',
        mnm: function(target, room, user) {
		if (!this.runBroadcast()) return;
                var text = "",arg=target,by=user,pokemen=Tools.data.Pokedex; 
                var stones = {
                        abomasite: {
                                atk: 40,
                                def: 30,
                                spa: 40,
                                spd: 20,
                                spe: -30,
                                ability: 'Snow Warning',
                                type: 'None',
                                wt: 49.5
                        },
                        absolite: {
                                atk: 20,
                                def: 0,
                                spa: 40,
                                spd: 0,
                                spe: 40,
                                ability: 'Magic Bounce',
                                type: 'None',
                                wt: 2
                        },
                        aerodactylite: {
                                atk: 30,
                                def: 20,
                                spa: 10,
                                spd: 20,
                                spe: 20,
                                ability: 'Tough Claws',
                                type: 'None',
                                wt: 20
                        },
                        aggronite: {
                                atk: 30,
                                def: 50,
                                spa: 0,
                                spd: 20,
                                spe: 20,
                                ability: 'Filter',
                                type: 'Steel',
                                wt: 35
                        },
                        alakazite: {
                                atk: 0,
                                def: 20,
                                spa: 40,
                                spd: 0,
                                spe: 30,
                                ability: 'Trace',
                                type: 'None',
                                wt: 0
                        },
                        altarianite: {
                                atk: 40,
                                def: 20,
                                spa: 40,
                                spd: 0,
                                spe: 0,
                                ability: 'Pixilate',
                                type: 'Fairy',
                                wt: 0
                        },
                        ampharosite: {
                                atk: 20,
                                def: 20,
                                spa: 50,
                                spd: 20,
                                spe: -10,
                                ability: 'Mold Breaker',
                                type: 'Dragon',
                                wt: 0
                        },
                        audinite: {
                                atk: 0,
                                def: 40,
                                spa: 20,
                                spd: 40,
                                spe: 0,
                                ability: 'Healer',
                                type: 'Fairy',
                                wt: 1
                        },
                        banettite: {
                                atk: 50,
                                def: 10,
                                spa: 10,
                                spd: 20,
                                spe: 10,
                                ability: 'Prankster',
                                type: 'None',
                                wt: 0.5
                        },
                        blastoisinite: {
                                atk: 20,
                                def: 20,
                                spa: 50,
                                spd: 10,
                                spe: 0,
                                ability: 'Mega Launcher',
                                type: 'None',
                                wt: 15.6
                        },
                        cameruptite: {
                                atk: 20,
                                def: 30,
                                spa: 40,
                                spd: 30,
                                spe: -20,
                                ability: 'Sheer Force',
                                type: 'None',
                                wt: 100.5
                        },
                        'charizardite x': {
                                atk: 46,
                                def: 33,
                                spa: 21,
                                spd: 0,
                                spe: 0,
                                ability: 'Tough Claws',
                                type: 'Dragon',
                                wt: 20
                        },
                        'charizardite y': {
                                atk: 20,
                                def: 0,
                                spa: 50,
                                spd: 30,
                                spe: 0,
                                ability: 'Drought',
                                type: 'None',
                                wt: 10
                        },
                        diancite: {
                                atk: 60,
                                def: -40,
                                spa: 60,
                                spd: -40,
                                spe: 60,
                                ability: 'Magic Bounce',
                                type: 'None',
                                wt: 19
                        },
                        galladite: {
                                atk: 40,
                                def: 30,
                                spa: 0,
                                spd: 0,
                                spe: 30,
                                ability: 'Inner Focus',
                                type: 'None',
                                wt: 4.4
                        },
                        garchompite: {
                                atk: 40,
                                def: 20,
                                spa: 40,
                                spd: 10,
                                spe: -10,
                                ability: 'Sand Force',
                                type: 'None',
                                wt: 0
                        },
                        gardevoirite: {
                                atk: 20,
                                def: 0,
                                spa: 40,
                                spd: 20,
                                spe: 20,
                                ability: 'Pixilate',
                                type: 'None',
                                wt: 0
                        },
                        gengarite: {
                                atk: 0,
                                def: 20,
                                spa: 40,
                                spd: 20,
                                spe: 20,
                                ability: 'Shadow Tag',
                                type: 'None',
                                wt: 0
                        },
                        glalitite: {
                                atk: 40,
                                def: 0,
                                spa: 40,
                                spd: 0,
                                spe: 20,
                                ability: 'Refrigerate',
                                type: 'None',
                                wt: 93.7
                        },
                        gyaradosite: {
                                atk: 30,
                                def: 30,
                                spa: 10,
                                spd: 30,
                                spe: 0,
                                ability: 'Mold Breaker',
                                type: 'Dark',
                                wt: 70
                        },
                        heracronite: {
                                atk: 60,
                                def: 40,
                                spa: 0,
                                spd: 10,
                                spe: -10,
                                ability: 'Skill Link',
                                type: 'None',
                                wt: 8.5
                        },
                        houndoominite: {
                                atk: 0,
                                def: 40,
                                spa: 30,
                                spd: 10,
                                spe: 20,
                                ability: 'Solar Power',
                                type: 'None',
                                wt: 14.5
                        },
                        latiasite: {
                                atk: 20,
                                def: 30,
                                spa: 30,
                                spd: 20,
                                spe: 0,
                                ability: 'Levitate',
                                type: 'None',
                                wt: 12
                        },
                        latiosite: {
                                atk: 40,
                                def: 20,
                                spa: 30,
                                spd: 10,
                                spe: 0,
                                ability: 'Levitate',
                                type: 'None',
                                wt: 10
                        },
                        lopunnite: {
                                atk: 60,
                                def: 10,
                                spa: 0,
                                spd: 0,
                                spe: 30,
                                ability: 'Scrappy',
                                type: 'Fighting',
                                wt: 5
                        },
                        lucarionite: {
                                atk: 35,
                                def: 18,
                                spa: 25,
                                spd: 0,
                                spe: 22,
                                ability: 'Adaptability',
                                type: 'None',
                                wt: 3.5
                        },
                        manectite: {
                                atk: 0,
                                def: 20,
                                spa: 30,
                                spd: 20,
                                spe: 30,
                                ability: 'Intimidate',
                                type: 'None',
                                wt: 3.8
                        },
                        metagrossite: {
                                atk: 10,
                                def: 20,
                                spa: 10,
                                spd: 20,
                                spe: 40,
                                ability: 'Tough Claws',
                                type: 'None',
                                wt: 392.9
                        },
                        'mewtwonite x': {
                                atk: 80,
                                def: 10,
                                spa: 0,
                                spd: 10,
                                spe: 0,
                                ability: 'Steadfast',
                                type: 'Fighting',
                                wt: 5
                        },
                        'mewtwonite y': {
                                atk: 40,
                                def: -20,
                                spa: 40,
                                spd: 30,
                                spe: 10,
                                ability: 'Insomnia',
                                type: 'None',
                                wt: 89
                        },
                        pidgeotite: {
                                atk: 0,
                                def: 5,
                                spa: 65,
                                spd: 10,
                                spe: 20,
                                ability: 'No Guard',
                                type: 'None',
                                wt: 11
                        },
                        pinsirite: {
                                atk: 30,
                                def: 20,
                                spa: 10,
                                spd: 20,
                                spe: 20,
                                ability: 'Aerilate',
                                type: 'Flying',
                                wt: 4
                        },
                        sablenite: {
                                atk: 10,
                                def: 50,
                                spa: 20,
                                spd: 50,
                                spe: -30,
                                ability: 'Magic Bounce',
                                type: 'None',
                                wt: 150
                        },
                        salamencite: {
                                atk: 10,
                                def: 50,
                                spa: 10,
                                spd: 10,
                                spe: 20,
                                ability: 'Aerilate',
                                type: 'None',
                                wt: 10
                        },
                        sceptilite: {
                                atk: 25,
                                def: 10,
                                spa: 40,
                                spd: 0,
                                spe: 25,
                                ability: 'Lightning Rod',
                                type: 'Dragon',
                                wt: 3
                        },
                        scizorite: {
                                atk: 20,
                                def: 40,
                                spa: 10,
                                spd: 20,
                                spe: 10,
                                ability: 'Technician',
                                type: 'None',
                                wt: 7
                        },
                        sharpedonite: {
                                atk: 20,
                                def: 30,
                                spa: 15,
                                spd: 25,
                                spe: 10,
                                ability: 'Strong Jaw',
                                type: 'None',
                                wt: 41.5
                        },
                        slowbronite: {
                                atk: 0,
                                def: 70,
                                spa: 30,
                                spd: 0,
                                spe: 0,
                                ability: 'Shell Armor',
                                type: 'None',
                                wt: 31.5
                        },
                        steelixite: {
                                atk: 40,
                                def: 30,
                                spa: 0,
                                spd: 30,
                                spe: 0,
                                ability: 'Sand Force',
                                type: 'None',
                                wt: 340
                        },
                        swampertite: {
                                atk: 40,
                                def: 20,
                                spa: 10,
                                spd: 20,
                                spe: 10,
                                ability: 'Swift Swim',
                                type: 'None',
                                wt: 20.1
                        },
                        tyranitarite: {
                                atk: 40,
                                def: 20,
                                spa: 10,
                                spd: 20,
                                spe: 10,
                                ability: 'Sand Stream',
                                type: 'None',
                                wt: 53
                        },
                        venusaurite: {
                                atk: 18,
                                def: 40,
                                spa: 22,
                                spd: 20,
                                spe: 0,
                                ability: 'Thick Fat',
                                type: 'None',
                                wt: 55.5
                        },
                        'red orb': {
                                atk: 30,
                                def: 20,
                                spa: 50,
                                spd: 0,
                                spe: 0,
                                ability: 'Desolate Land',
                                type: 'Fire',
                                wt: 49.7
                        },
                        'blue orb': {
                                atk: 50,
                                def: 0,
                                spa: 30,
                                spd: 20,
                                spe: 0,
                                ability: 'Primodal Sea',
                                type: 'None',
                                wt: 78
                        },
                        beedrillite: {
                                atk: 60,
                                def: 0,
                                spa: -30,
                                spd: 0,
                                spe: 70,
                                ability: 'Adaptability',
                                type: 'None',
                                wt: 11
                        },
                        blazikenite: {
                                atk: 40,
                                def: 10,
                                spa: 20,
                                spd: 10,
                                spe: 20,
                                ability: 'Speed Boost',
                                type: 'None',
                                wt: 0
                        },
                        kangaskhanite: {
                                atk: 30,
                                def: 20,
                                spa: 20,
                                spd: 20,
                                spe: 10,
                                ability: 'Parental Bond',
                                type: 'None',
                                wt: 20
                        },
                        mawilite: {
                                atk: 20,
                                def: 40,
                                spa: 0,
                                spd: 40,
                                spe: 0,
                                ability: 'Huge Power',
                                type: 'None',
                                wt: 12
                        },
                        medichamite: {
                                atk: 40,
                                def: 10,
                                spa: 20,
                                spd: 10,
                                spe: 20,
                                ability: 'Pure Power',
                                type: 'None',
                                wt: 0
                        }
                };
                let separated = arg.split(" ");
                let stone = ("" + separated[0]).toLowerCase();
                let name = ("" + separated[1]).toLowerCase();
                let justincase = ("" + separated[2]).toLowerCase();
                stone = toId(stone);
                name = toId(name);
                justincase = toId(justincase);
                if (name == 'x' || name == 'y' || name == 'orb') {
                        stone = stone + ' ' + name;
                        name = justincase;
                }
                if (arg == '' || arg == ' ')
                        this.sendReplyBox("Usage: <code>/mnm &lt;Mega Stone Name> &lt;Pokemon Name></code>");
                else if (stones[stone] == undefined)
                        this.errorReply("Error: Mega stone not found")
                else if (pokemen[name] == undefined)
                        this.errorReply("Error: Pokemon not found");
                else {
                        if (!isMega(name)) {
                                let tot = {};
                                let secondtype;
                                if (stones[stone].type != 'None') {
                                        if (stones[stone].type == pokemen[name].types[0])
                                                secondtype = "";
                                        else
                                                secondtype = "/" + stones[stone].type;
                                } else {
                                        if (pokemen[name].types[1] == undefined)
                                                secondtype = "";
                                        else
                                                secondtype = "/" + pokemen[name].types[1];
                                }
                                tot['hp'] = pokemen[name].baseStats.hp;
                                tot['atk'] = pokemen[name].baseStats.atk + stones[stone].atk;
                                tot['def'] = pokemen[name].baseStats.def + stones[stone].def;
                                tot['spa'] = pokemen[name].baseStats.spa + stones[stone].spa;
                                tot['spd'] = pokemen[name].baseStats.spd + stones[stone].spd;
                                tot['spe'] = pokemen[name].baseStats.spe + stones[stone].spe;
                                tot['wt'] = pokemen[name].weightkg + stones[stone].wt;
                                tot['type'] = pokemen[name].types[0] + secondtype;
                                let gnbp = function(wtkg) {
                                        var bp;
                                        if (wtkg > 0.1 && wtkg <= 9.9)
                                                bp = 20;
                                        if (wtkg > 10 && wtkg <= 24.9)
                                                bp = 40;
                                        if (wtkg > 25 && wtkg <= 49.9)
                                                bp = 60;
                                        if (wtkg > 50 && wtkg <= 99.9)
                                                bp = 80;
                                        if (wtkg > 100 && wtkg <= 199.9)
                                                bp = 100;
                                        if (wtkg > 199.9)
                                                bp = 120;
                                        return bp;
                                }
                                if (tot['hp'] > 255 || tot['hp'] < 0 || tot['atk'] > 255 || tot['atk'] < 0 || tot['def'] > 255 || tot['def'] < 0 || tot['spa'] > 255 || tot['spa'] < 0 || tot['spd'] > 255 || tot['spd'] < 0 || tot['spe'] > 255 || tot['spe'] < 0) {
                                        if (tot['hp'] > 255)
                                                tot['hp'] = 255;
                                        if (tot['atk'] > 255)
                                                tot['atk'] = 255;
                                        if (tot['def'] > 255)
                                                tot['def'] = 255;
                                        if (tot['spa'] > 255)
                                                tot['spa'] = 255;
                                        if (tot['spd'] > 255)
                                                tot['spd'] = 255;
                                        if (tot['spe'] > 255)
                                                tot['spe'] = 255;
                                        if (tot['hp'] < 1)
                                                tot['hp'] = 1;
                                        if (tot['atk'] < 1)
                                                tot['atk'] = 1;
                                        if (tot['def'] < 1)
                                                tot['def'] = 1;
                                        if (tot['spa'] < 1)
                                                tot['spa'] = 1;
                                        if (tot['spd'] < 1)
                                                tot['spd'] = 1;
                                        if (tot['spe'] < 1)
                                                tot['spe'] = 1;
                                        text = "The new stats are: " + tot['hp'] + "/" + tot['atk'] + "/" + tot['def'] + "/" + tot['spa'] + "/" + tot['spd'] + "/" + tot['spe'] + "<br />"
+"Ability:<b>" + stones[stone].ability + "</b><br />" 
+"Type:<b>" + tot['type'] + "</b><br />" 
+"GrassKnot/LowKick Base Power:<b>" + gnbp(tot['wt'])+"</b>";

                                } else
                                        text = "The new stats are: " + tot['hp'] + "/" + tot['atk'] + "/" + tot['def'] + "/" + tot['spa'] + "/" + tot['spd'] + "/" + tot['spe'] + "<br />"
+"Ability:<b>" + stones[stone].ability + "</b><br />" 
+"Type:<b>" + tot['type'] + "</b><br />" 
+"GrassKnot/LowKick Base Power:<b>" + gnbp(tot['wt'])+"</b>";

                        } else
                                text += "<font color=\"red\">Uh, I don't think you can mega evolve a mega Pokemon....</font>"
                        this.sendReplyBox(text);
                }
        },
	ns: 'natureswap',
        'natureswap': function(target, room, user) {
		if (!this.runBroadcast()) return;
		let arg=target,by=user;
		let pokemen=Tools.data.Pokedex;
                let text = "";
                if (arg == " " || arg == '') {
                        text += "Usage: <code>/ns &lt;Nature> &lt;Pokemon></code>";
                } else {
                        let tar = arg.split(' ');
                        let poke = tar[1],
                                nat = toId(tar[0]),
                                p = toId(poke);
                        if (p == "mega")
                                poke = tar[2] + "mega";
                        if (p.charAt(0) == "m" && pokemen[p.substring(1, p.length) + "mega"] != undefined)
                                poke = poke.substring(1, poke.length) + "mega";
                        let temp = "";
                        p = toId(poke);
                        if (pokemen[p] == undefined) {
                                text += "Error: Pokemon not found";
                        } else if (natures[nat] == undefined) {
                                text += "Error: Nature not found";
                        } else {
                                let pokeobj = {
                                        hp: "" + pokemen[p].baseStats.hp,
                                        atk: "" + pokemen[p].baseStats.atk,
                                        def: "" + pokemen[p].baseStats.def,
                                        spa: "" + pokemen[p].baseStats.spa,
                                        spd: "" + pokemen[p].baseStats.spd,
                                        spe: "" + pokemen[p].baseStats.spe,
                                        name: pokemen[p].species,
                                };
                                let natureobj = natures[nat];
                                if (natureobj['swap']) {
                                        temp = "<b>" + pokeobj[natureobj['plus']] + "</b>";
                                        pokeobj[natureobj['plus']] = "<b>" + pokeobj[natureobj['minus']] + "</b>";
                                        pokeobj[natureobj['minus']] = temp;
                                }
                                text += "The new stats for " + pokeobj['name'] + " are: " + pokeobj['hp'] + "/" + pokeobj['atk'] + "/" + pokeobj['def'] + "/" + pokeobj['spa'] + "/" + pokeobj['spd'] + "/" + pokeobj['spe'] + "";
                        }
                }
                this.sendReplyBox(text);
        },
	fuse: function(target, room, user) {
		if (!this.runBroadcast()) return;
		let text = "";
		let separated = target.split(",");
		let name = (("" + separated[0]).trim()).toLowerCase();
		let name2 = (("" + separated[1]).trim()).toLowerCase();
		name = toId(name);
		name2 = toId(name2);
		let pokemen = Tools.data.Pokedex;
		if (pokemen[name] == undefined || pokemen[name2] == undefined)
		{
			this.errorReply("Error: Pokemon not found");
			return;
		}
		else {
			let baseStats = {};
			baseStats['avehp'] = Math.floor((pokemen[name].baseStats.hp + pokemen[name2].baseStats.hp) / 2);
			baseStats['aveatk'] = Math.floor((pokemen[name].baseStats.atk + pokemen[name2].baseStats.atk) / 2);
			baseStats['avedef'] = Math.floor((pokemen[name].baseStats.def + pokemen[name2].baseStats.def) / 2);
			baseStats['avespa'] = Math.floor((pokemen[name].baseStats.spa + pokemen[name2].baseStats.spa) / 2);
			baseStats['avespd'] = Math.floor((pokemen[name].baseStats.spd + pokemen[name2].baseStats.spd) / 2);
			baseStats['avespe'] = Math.floor((pokemen[name].baseStats.spe + pokemen[name2].baseStats.spe) / 2);
			let type = pokemen[name].types[0];
			let ability = "";
			let weight = (pokemen[name].weightkg + pokemen[name2].weightkg) / 2;
			for (let i in pokemen[name].abilities) {
				ability += pokemen[name].abilities[i] + "/";
			}
			ability = ability.substring(0, ability.length - 1);
			ability = ability + " + " + pokemen[name2].abilities['0'];
			if (separated[2] && toId(separated[2]) === "shiny" && pokemen[name2].types[1])
				type = type + '/' + pokemen[name2].types[1];
			else if (pokemen[name].types[0] != pokemen[name2].types[0])
				type = type + '/' + pokemen[name2].types[0];
			if (type.split("/")[0] === type.split("/")[1]) {
				type = type.split("/")[0];
			}
			let bst = baseStats['avehp'] + baseStats['aveatk'] + baseStats['avedef'] + baseStats['avespa'] + baseStats['avespd'] + baseStats['avespe'];
			text = "<b>Stats</b>: " + baseStats['avehp'] + "/" + baseStats['aveatk'] + "/" + baseStats['avedef'] + "/" + baseStats['avespa'] + "/" + baseStats['avespd'] + "/" + baseStats['avespe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " + ability + "<br /><b>Weight</b>: " + weight + " kg";
			this.sendReplyBox(text);
		}
	},
	di: 'distor',
	dataistor: 'distor',
	distor: function(target, room, user) {
        	 if (!this.runBroadcast()) return;
                 if(!target || toId(target) === '') return this.sendReply("/distor: Shows the data for a Pokemon/Ability/Move, including ones from istor.");
		let name = toId(target);
		let abilistor, movestor, pokemen;
		try {
			pokemen = Tools.dexes.istor.data.Pokedex;
			abilistor = Tools.dexes.istor.data.Abilities;
			movestor = Tools.dexes.istor.data.Movedex;
		}
		catch(e) {
			return this.errorReply("Error: Please start an istor battle before using this command");
		}
		if(pokemen[name]) {
			let baseStats = pokemen[name].baseStats;
			let types = pokemen[name].types;
			let type = '<span class="col typecol">';
			for(let i = 0; i<types.length;i++) {
				type = type+ '<img src="https://play.pokemonshowdown.com/sprites/types/'+types[i]+'.png" alt="'+types[i]+'" height="14" width="32">';
			}
			type = type+"</span>";
			let ability = "";
			let weight = pokemen[name].weightkg;
			for(let i in pokemen[name].abilities) {
				ability+=pokemen[name].abilities[i]+"/";
			}
			ability = ability.substring(0,ability.length-1);
			let bst = baseStats['hp'] + baseStats['atk'] + baseStats['def'] + baseStats['spa'] + baseStats['spd'] + baseStats['spe'];
			let text = "<b>Stats</b>: " + baseStats['hp'] + "/" + baseStats['atk'] + "/" + baseStats['def'] + "/" + baseStats['spa'] + "/" + baseStats['spd'] + "/" + baseStats['spe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " +ability+ "<br /><b>Weight</b>: "+weight+" kg";
			return this.sendReplyBox(text);
		}
		else if(movestor[name] && (movestor.desc || movestor[name].shortDesc)) {
			return this.sendReplyBox(`<ul class="utilichart"><li class="result"><span class="col movenamecol">${movestor[name].name}</span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/${(movestor[name].type)}.png" alt="${(movestor[name].type)}" height="14" width="32"><img src="//play.pokemonshowdown.com/sprites/categories/${(movestor[name].category)}.png" alt="${(movestor[name].category)}" height="14" width="32"></span> <span class="col labelcol"><em>Power</em><br>${(movestor[name].basePower)}</span> <span class="col widelabelcol"><em>Accuracy</em><br>${(movestor[name].accuracy)}%</span> <span class="col pplabelcol"><em>PP</em><br>${(movestor[name].pp)}</span> <span class="col movedesccol">${(movestor[name].shortDesc)}</span> </li><li style="clear:both"></li></ul><div class="chat"><font size="1"><font color="#686868">Priority:</font> ${(movestor[name].priority)}|<font color="#686868">Gen:</font> Istor |<font color="#686868"> Target:</font>${(movestor[name].target)}</div>`);
		}
		else if(abilistor[name] && (abilistor[name].desc || abilistor[name].shortDesc)) {
			return this.sendReplyBox(`<b>${abilistor[name].name}</b>: ${(abilistor[name].desc || abilistor[name].shortDesc)}`);
		}
		else 
			return this.errorReply("Error: Pokemon/Ability/Move not found");
		
	},
        learnistor: function(target, room, user) {
                if (!this.runBroadcast()) return;
		let learnstor, movestor, dexstor;
		try {
			learnstor = Tools.dexes.istor.data.Learnsets;
			movestor = Tools.dexes.istor.data.Movedex;
			dexstor= Tools.dexes.istor.data.Pokedex;
		}
		catch(e) {
			return this.errorReply("Error: Please start an istor battle before using this command");
		}
                if(!target || toId(target) === '') return this.sendReply("/learnistor: Shows the whether a Pokemon can learn a move, including Pokemon and Moves from istor.");
                let targets = target.split(','), mon = targets[0], move = targets[1];
                if(!mon || !dexstor[toId(mon)]) return this.errorReply("Error: Pokemon not found");
                if(!learnstor[toId(mon)]) return this.errorReply("Error: Learnset not found");
                if(!move || !movestor[toId(move)]) return this.errorReply("Error: Move not found");
                mon = dexstor[toId(mon)];
                move = movestor[toId(move)];
                if(learnstor[toId(mon.species)].learnset[toId(move.name)]) {
                        return this.sendReplyBox("In Istor, "+mon.species+' <font color="green"><u><b>can<b><u></font> learn '+move.name);
                }
                return this.sendReplyBox("In Istor, "+mon.species+' <font color="red"><u><b>can\'t<b><u></font> learn '+move.name);
        },
	dgen: 'dnewgen',
	dnewgen: function(target, room, user) {
        	 if (!this.runBroadcast()) return;
                 if(!target || toId(target) === '') return this.sendReply("/distor: Shows the data for a Pokemon/Ability/Move, including ones from istor.");
		let name = toId(target);
		let abiliden, moveden, pokegen;
		try {
			pokegen = Tools.dexes.thefirstnewgen.data.Pokedex;
			abiliden = Tools.dexes.thefirstnewgen.data.Abilities;
			moveden = Tools.dexes.thefirstnewgen.data.Movedex;
		}
		catch(e) {
			return this.errorReply("Error: Please start a Pokemon: The New First Generation battle before using this command");
		}
		if(pokegen[name]) {
			let baseStats = pokegen[name].baseStats;
			let types = pokegen[name].types;
			let type = '<span class="col typecol">';
			for(let i = 0; i<types.length;i++) {
				type = type+ '<img src="https://play.pokemonshowdown.com/sprites/types/'+types[i]+'.png" alt="'+types[i]+'" height="14" width="32">';
			}
			type = type+"</span>";
			let ability = "";
			let weight = pokegen[name].weightkg;
			for(let i in pokegen[name].abilities) {
				ability+=pokegen[name].abilities[i]+"/";
			}
			ability = ability.substring(0,ability.length-1);
			let bst = baseStats['hp'] + baseStats['atk'] + baseStats['def'] + baseStats['spa'] + baseStats['spd'] + baseStats['spe'];
			let text = "<b>Stats</b>: " + baseStats['hp'] + "/" + baseStats['atk'] + "/" + baseStats['def'] + "/" + baseStats['spa'] + "/" + baseStats['spd'] + "/" + baseStats['spe'] + "<br /><b>BST</b>:" + bst + "<br /><b>Type:</b> " + type + "<br /><b>Abilities</b>: " +ability+ "<br /><b>Weight</b>: "+weight+" kg";
			return this.sendReplyBox(text);
		}
		else if(moveden[name]) {
			return this.sendReplyBox(`<ul class="utilichart"><li class="result"><span class="col movenamecol">${moveden[name].name}</span> <span class="col typecol"><img src="//play.pokemonshowdown.com/sprites/types/${(moveden[name].type)}.png" alt="${(moveden[name].type)}" height="14" width="32"><img src="//play.pokemonshowdown.com/sprites/categories/${(moveden[name].category)}.png" alt="${(moveden[name].category)}" height="14" width="32"></span> <span class="col labelcol"><em>Power</em><br>${(moveden[name].basePower)}</span> <span class="col widelabelcol"><em>Accuracy</em><br>${(moveden[name].accuracy)}%</span> <span class="col pplabelcol"><em>PP</em><br>${(moveden[name].pp)}</span> <span class="col movedesccol">${(moveden[name].shortDesc)}</span> </li><li style="clear:both"></li></ul><div class="chat"><font size="1"><font color="#686868">Priority:</font> ${(moveden[name].priority)}|<font color="#686868">Gen:</font> New First Gen |<font color="#686868"> Target:</font>${(moveden[name].target)}</div>`);
		}
		else if(abiliden[name]) {
			return this.sendReplyBox(`<b>${abiliden[name].name}</b>: ${(abiliden[name].shortDesc)}`);
		}
		else 
			return this.errorReply("Error: Pokemon/Ability/Move not found");
		
	},
};
