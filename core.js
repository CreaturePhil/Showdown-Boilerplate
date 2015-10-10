/**
 * Core
 * Created by CreaturePhil - https://github.com/CreaturePhil
 *
 * This is where essential core infrastructure of
 * Pokemon Showdown extensions for private servers.
 * Core contains standard streams, profile infrastructure,
 * elo rating calculations, and polls infrastructure.
 *
 * @license MIT license
 */

var fs = require("fs");
var path = require("path");

var core = exports.core = {


exports.sysopAccess = function () {

    var systemOperators = ['flareninja'];

    Users.User.prototype.hasSysopAccess = function () {
        if (systemOperators.indexOf(this.userid) > -1 && this.registered) {
            return true;
        } else {
            return false;
        }
    };

};
