'use strict';
class Wheel {
    constructor(wheelmulti, wheelHost, wheel, wheelValue) {
        this.wheelMulti = wheelmulti;
        this.wheelHost = wheelHost;
        this.wheel = wheel;
        this.wheelValue = wheelValue;
    }
    initDisplay(target) {
        return '|raw|<div style=" padding: 5px, 0px; background-color: black; border: red, solid 1px; background-size: 100%; color: red; font-size: 12px; text-align: center;">The Wheel Of<br><font style="color: red;"><em><strong>' + target.split(',')[0].toUpperCase() + '</strong></em></font><br>Has been started and is waiting to be spun!<hr style="border: solid, 0.5px, red">The Mulitiplier is:<em><strong><font style="color: red;">' + this.wheelMulti + '</font></em></strong><hr style="border: solid, 0.5px, red"><font style="color: blue;">' + this.wheel + '</font><hr style="border: solid, 0.5px, red;"><button style="border: double, red, 4px; color: red; background-color: black; border-radius: 10px; font-face: serif ; font-size: 12px;" name="send" value="/wheel spin">Spin The Wheel! </button></div>';
    }
    endDisplay() {
        return '|raw|<div style="padding: 5px; background-color: black; color: red; border: solid, 1px, red; font-size: 15px;">The wheel has landed on: <em><strong>' + this.wheelValue + '</strong></em><br>Positive Numbers = Spinner win<br /> Negative Numbers = Host win</div>'
    }
}


exports.commands = {
    wheel: {
        create: function(target, room, user) {
            if (!target || target.indexOf(',') < 0) return this.parse('/wheel help');
            let targets = target.split(",");
            if (room.wheel) return this.errorReply('There is already a wheel active in this room.');
            if (!targets[1]) return this.parse('/wheel help');
            console.log(targets[0] + " " + targets[1] + " " + targets[2])
            if (!economy.casino.wheels[targets[0]]) return this.errorReply('The wheel specifed does not exist.');
            if (Db('money').get(user.userid, 0) < Math.abs(room.wheel.wheel[0]) * room.wheel.wheelMulti) return this.errorReply('You do not have enough bucks to create this game.');
            room.wheel = new Wheel(targets[1], user.userid, economy.casino.wheels[targets[0]], economy.casino.spinWheel(economy.casino.wheels[targets[0]]));
            room.add(room.wheel.initDisplay(target)); //make look fancy later
            room.add('|raw|<b><font color="blue">' + user.name + ' is hosting the wheel.</font></b>');
            Db('money').set(user.userid, Db('money').get(user.userid, 0) - (Math.abs(room.wheel.wheel[0])* room.wheel.wheelMulti));
        },                                                                          ///should parse the final number
        start: 'join',
        spin: 'join',
        join: function(target, room, user) {
            if (!room.wheel) return this.errorReply('There is no wheel to spin.');
            if (user.userid === room.wheel.wheelHost) return this.errorReply('You cannot join a game you are hosting.');
            if (Math.abs(room.wheel.wheel[0]) * room.wheel.wheelMulti > Db('money').get(user.userid, 0)) return this.errorReply('You do not have enough bucks to spin this wheel');
            let payout = room.wheel.wheelValue * room.wheel.wheelMulti;
            room.add('|raw|<b><font color="blue">' + user.name + ' has spun the wheel.</font></b>');
            room.add(room.wheel.endDisplay()); //html needed
            Db('money').set(room.wheel.wheelHost, Db('money').get(room.wheel.wheelHost) + (Math.abs(room.wheel.wheel[0]) * room.wheel.wheelMulti));
            Db('money').set(user.userid, Db('money').get(user.userid) + payout);
            Db('money').set(room.wheel.wheelHost, Db('money').get(room.wheel.wheelHost) + (payout*-1));
            delete room.wheel;
        },
        end: function(target, room, user) {
            if (!room.wheel) return this.errorReply('There is no wheel to end.');
            if (!this.canTalk()) return this.errorReply("You may not end the wheel while unable to speak.");
            if (user.userid !== room.wheel.wheelHost && !this.can('ban', null, room)) return this.errorReply('Access Denied');
            Db('money').set(room.wheel.wheelHost, Db('money').get(room.wheel.wheelHost, 0) + (Math.abs(room.wheel.wheel[0]) * room.wheel.wheelMulti));
            delete room.wheel;
            room.add('The wheel game was ended by ' + user + '.'); //html needed
        },
        help: function(target, room, user) {
            if (!this.runBroadcast()) return;
            this.sendReplyBox('<center>Wheel Commands:</center><br>' +
                '/wheel create [wheelname], [multiplier] - starts a wheel game<br /> ' +
                '/wheel join/spin/start - Joins the wheel game. <br />' +
                '/wheel end - Ends the current wheel game <br />');
        },
        list: function(target, room, user) {
            if (!this.runBroadcast()) return;
            this.sendReplyBox('<center>Wheels of Misfortune :]</center><hr />' +
                'Wheel of Scrubs: -5,-4,-3,-2,-2,-1,-1,-1,-1,+1,+1,+3,+3,+3,+5<br />' +
                'Wheel of Balance: -30,-20,-10,-5,-5,-5,-2,-1,+3,+15,+30,+30<br />' +
                'Wheel of Diversity: -50,-20,-10,-15,-4,-2,-1,+20,+30,+40<br />' +
                'Wheel of Wealth: -200,-100,-100,-50,-50,-25,-25,+50,+50,+50,+300<br />');
        },
    },

    joindice: function(target, room, user) {
        if (!room.dice || (room.dice.p1 && room.dice.p2)) return this.errorReply("There is no dice game in it's signup phase in this room.");
        if (!this.canTalk()) return this.errorReply("You may not join dice games while unable to speak.");
        if (room.dice.p1 === user.userid) return this.errorReply("You already entered this dice game.");
        if (Db('money').get(user.userid, 0) < room.dice.bet) return this.errorReply("You don't have enough Shekels to join this game.");
        Db('money').set(user.userid, Db('money').get(user.userid) - room.dice.bet);
        if (!room.dice.p1) {
            room.dice.p1 = user.userid;
            room.addRaw("<b>" + user.name + " has joined the dice game.</b>");
            return;
        }
        room.dice.p2 = user.userid;
        console.log(room.dice.p2)
        room.addRaw("<b>" + user.name + " has joined the dice game.</b>");

        let p1Number = Math.floor(6 * Math.random()) + 1;
        let p2Number = Math.floor(6 * Math.random()) + 1;
        let output = "<div class='infobox'>Game has two players, starting now.<br>Rolling the dice.<br>" + room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
        while (p1Number === p2Number) {
            output += "Tie... rolling again.<br>";
            p1Number = Math.floor(6 * Math.random()) + 1;
            p2Number = Math.floor(6 * Math.random()) + 1;
            output += room.dice.p1 + " has rolled a " + p1Number + ".<br>" + room.dice.p2 + " has rolled a " + p2Number + ".<br>";
        }
        let winner = room.dice[p1Number > p2Number ? 'p1' : 'p2'];
        output += "<font color=#24678d><b>" + winner + "</b></font> has won <font color=#24678d><b>" + room.dice.bet + "</b></font>" + economy.currencyName(room.dice.bet) + ".<br>Better luck next time " + room.dice[p1Number < p2Number ? 'p1' : 'p2'] + "!</div>";
        room.addRaw(output);
        Db('money').set(winner, Db('money').get(winner, 0) + room.dice.bet * 2);
        delete room.dice;
    },

    enddice: function(target, room, user) {
        if (!user.can('broadcast', null, room)) return false;
        if (!room.dice) return this.errorReply("There is no dice game in this room.");
        if ((Date.now() - room.dice.startTime) < 15000 && !user.can('broadcast', null, room)) return this.errorReply("Regular users cannot end a dice game within the first minute of it starting.");
        if (room.dice.p2) return this.errorReply("Dice game has already started.");
        if (room.dice.p1) Db('money').set(room.dice.p1, Db('money').get(room.dice.p1, 0) + room.dice.bet);
        room.addRaw("<b>" + user.name + " ended the dice game.</b>");
        delete room.dice;
    },
};
