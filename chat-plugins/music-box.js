/* Music Box chat-plugin
 * parses links into the HTML for music boxes
 * by BlizzardQ
 */

var https = require("https");
var cheerio = require('cheerio');
var request = require('request');
var title = "";

exports.commands = {
    mb: 'musicbox',
    musicbox: function (target, room, user) {
        if (!this.canBroadcast()) return;
        var parts = target.split(',');
        if (!target) return this.sendReply("/musicbox link, link, link - parses it to be in a music box");
        var str = '';
        var self = this;
        var parsed = parts.map(parse);
        Promise.all(parsed).then(function(data) {
            str+=data;
            self.sendReply(data);
        });

    }
};

function parse (link) {
        return new Promise(function(resolve, reject) {
            request(link, function(err, res, body) {
                if (!err && res.statusCode == 200) {
                    var $ = cheerio.load(body);
                    var title = $("title").text();
                    var str = '<a href="' + link + '"><button title="' + title + '">' + title + '</button></a><br />'; //parse it now
                    resolve(str);
                } else {
                    reject(str);
                }
            });
        });
}
