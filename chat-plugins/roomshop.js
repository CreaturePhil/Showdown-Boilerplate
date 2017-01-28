/**
 *
 * Roomshop.js Made By Dragotic.
 * Pokemon Showdown plugin to create a shop for a room.
 *
 */


'use strict';

const fs = require('fs');
const db = require('origindb')('./config/db');
const MAX_ITEMS = 12;

/*currencyName: function (_cost){
    if (_cost == 1){
        return "buck";
    }else{
        return "bucks";
    }
}*/

exports.commands = {
    roomshop: 'leagueshop',
    leagueshop: {
        enable: function (target, room, user) {
            if (!this.can('eval')) return false;
            if (db('roomshop').has(room.id)) return this.errorReply('Roomshop is already enabled here.');

            db('roomshop')
            .set(room.id, {});

            this.sendReply('Roomshop has been enabled here.');
        },
        disable: function (target, room, user) {
            if (!this.can('eval')) return false;
            if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');

            db('roomshop').delete(room.id);

            this.sendReply('Roomshop has been disabled here.');
        },
        bank: {
            set: function (target, room, user) {
                if (!this.can('declare', null, room)) return false;
                if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');
                if (db('roomshop').has([room.id, 'Bank'])) return this.errorReply(room.id + ' already has a bank.');

                let bank = toId(target);

                if (!bank) return this.parse('/help roomshop');

                db('roomshop')
                .set([room.id, 'Bank'], bank);

                this.sendReply(bank + ' has been made the bank for ' + room.id + '\'s shop.');
            },
            change: function (target, room, user) {
                if (!this.can('declare', null, room)) return false;
                if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');
                if (!db('roomshop').has([room.id, 'Bank'])) return this.errorReply(room.id + ' does not have a bank set.');

                let bank = toId(target);

                if (!bank) return this.parse('/help roomshop');

                db('roomshop')
                .set([room.id, 'Bank'], bank);

                this.sendReply(bank + ' has been made the bank for ' + room.id + '\'s shop.');
            },
            '': function (target, room, user) {
                if (!this.can('declare', null, room)) return false;
                if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');
                if (!db('roomshop').has([room.id, 'Bank'])) return this.errorReply(room.id + ' does not have a bank set.');

                let bank = db('roomshop').get([room.id, 'Bank']);

                this.sendReply(bank + ' is currently the bank for the roomshop.');
            },
        },
        add: function (target, room, user) {
            if (!this.can('declare', null, room)) return false;
            if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');

            let opts = target.split(',');

            let itemID = toId(opts[0]);
            let itemName = opts[0];
            let description = opts[1];
            let price = opts[2];

            if (!itemID || !description || !price || itemID === 'bank') return this.parse('/help roomshop');
            if (isNaN(price)) return this.errorReply('Price should be in integers.');
            if (db('roomshop').has([room.id, itemID])) return this.errorReply(itemID + ' is already present in roomshop.');

            let keys = Object.keys(db('roomshop').object()[room.id]);

            if (keys.indexOf('Bank') >= 0) keys.splice(keys.indexOf('Bank'), 1);
            if (keys.length >= MAX_ITEMS) return this.errorReply('roomshop has reached max number of items.');

            db('roomshop')
            .set([room.id, itemID], {})
            .set([room.id, itemID, 'Item Name'], itemName)
            .set([room.id, itemID, 'Description'], description)
            .set([room.id, itemID, 'Price'], Number(price));

            this.sendReply(itemName + ' added to the roomshop.');
        },
        remove: function (target, room, user) {
            if (!this.can('declare', null, room)) return false;
            if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');

            let itemID = toId(target);

            if (!itemID) return this.parse('/help roomshop');

            if (!db('roomshop').has([room.id, itemID]) || itemID === 'bank') return this.errorReply(itemID + ' is not present in roomshop.');
            db('roomshop').delete([room.id, itemID]);

            this.sendReply(itemID + ' has been removed from the roomshop.');
        },
        buy: function (target, room, user) {
            if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');

            let itemID = toId(target);

            if (!db('roomshop').has([room.id, itemID]) || itemID === 'bank') return this.errorReply(itemID + ' is not present in roomshop.');
            if (!db('roomshop').has([room.id, 'Bank'])) return this.errorReply(room.id + ' does not have a bank set.');
            if (db('roomshop').get([room.id, 'Bank']) === user.userid) return this.errorReply('Bank cannot purchase from the roomshop.');

            let usersMoney = Db('money').get(user.userid, 0);
            let bank = db('roomshop').get([room.id, 'Bank']);
            let banksMoney = Db('money').get(bank, 0);
            let cost = db('roomshop').get([room.id, itemID, 'Price']);

            if (usersMoney < cost) return this.errorReply('You do not have enough money to purchase ' + itemID + '.');

            Db('money').set(user.userid, usersMoney - cost).get(user.userid);
            Db('money').set(bank, banksMoney + cost).get(bank);
            db('roomshop').set();

            if (!fs.existsSync('logs/roomshops')) fs.mkdirSync('logs/roomshops');
            fs.appendFile('logs/roomshops/roomshop_' + room.id + '.txt', '[' + new Date().toUTCString() + '] ' + user.name + ' has bought ' + itemID + ' from the roomshop.' + '\n');

            let msg = user.name + ' has purchased ' + itemID + '.';

            Users.users.forEach(function (user) {
                if (room.auth[user] === '#' || room.auth[user] === '&') {
                    user.send('|pm|~' + room.title + '\'s Shop Alert|' + user.getIdentity() + '|' + msg);
                }
            });

            //this.sendReply('You have bought ' + itemID + ' for ' + cost + currencyName(cost) + '.'); //currencyName(cost)
              this.sendReply('You have bought ' + itemID + ' for ' + cost + ' bucks.');
        },
        '': function (target, room, user) {
            if (!this.canBroadcast()) return false;
            if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');

            let keys = Object.keys(db('roomshop').object()[room.id]);

            function display(keys) {
                let display = '<center><u><b>' + room.title + '\'s Shop</b></u></center><br><table border="1" cellspacing="0" cellpadding="5" width="100%"><tbody><tr><th>Item</th><th>Description</th><th>Price</th></tr>';

                if (keys.indexOf('Bank') >= 0) keys.splice(keys.indexOf('Bank'), 1);
                if (!keys.length) return '<center><h2><b><u>This Shop Has No Items!</u></b></h2></center>';

                for (let i = 0; i < keys.length; i++) {
                    let item = db('roomshop').object()[room.id][keys[i]];
                    display += '<tr><td align="center"><button name="send" value="/roomshop buy ' + keys[i] + '"><b>' + item['Item Name'] + '</b></button></td>';
                    display += '<td align="center">' + item['Description'] + '</td>';
                    display += '<td align="center">' + item['Price'] + '</td></tr>';
                }

                display += '</tbody></table>';
                return display;
            }

            this.sendReplyBox(display(keys));
        },
        log: function (target, room, user) {
            if (!this.can('declare', null, room)) return false;
            if (!db('roomshop').has(room.id)) return this.errorReply('Roomshop is not enabled here.');
            target = toId(target);

            let numLines = 15;
            let matching = true;

            if (target.match(/\d/g) && !isNaN(target)) {
                numLines = Number(target);
                matching = false;
            }

            let topMsg = 'Displaying the last ' + numLines + ' lines of transactions:\n';
            let file = 'logs/roomshops/roomshop_' + room.id + '.txt';

            fs.exists(file, function (exists) {
                if (!exists) return Users(user.userid).popup('No transactions.');
                fs.readFile(file, 'utf8', function (err, data) {
                    data = data.split('\n');
                    if (target && matching) {
                        data = data.filter(function (line) {
                            return line.toLowerCase().indexOf(target.toLowerCase()) >= 0;
                        });
                    }
                    Users(user.userid).popup('|wide|' + topMsg + data.slice(-(numLines + 1)).join('\n'));
                });
            });
        },
    },
    roomshophelp: ['Commands for leagueshop/roomshop are:',
                    '- /roomshop enable - Enables roomshop for the room. Requires ~',
                    '- /roomshop disable - Disables roomshop for the room. Requires ~',
                    '- /roomshop add [name],[description],[price] - Adds an item to the roomshop. Requires &, #',
                    '- /roomshop bank - Shows the bank name. Requires &, #',
                    '- /roomshop bank set [username] - Sets the username as bank. Requires &, #',
                    '- /roomshop bank change [username] - Changes bank to username. Requires &, #',
                    '- /roomshop remove [name] - Removes an item from the roomshop. Requires &, #',
                    '- /roomshop - Displays the roomshop for the room.',
                    '- /roomshop log [lines/target] - Displays log for the roomshop of the room. Requires &, #'],
};
