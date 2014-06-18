/*
 * Utilities.js
 *
 * This is where extraneous and important functions are stored.
 *
 */
var Utilities = exports.Utilities = {
    random: function (arr, length) {
        if (!arr) return false;
        if (!typeof arr === 'array') return false;
        if (!length) length = arr.length;
        return arr[Math.floor(Math.random() * length)];
    },

    splint: function (target, separator, length) {
        //credits stevoduhhero
        var cmdArr = new Array()
        if (!length) {
            cmdArr = target.split(separator || ",");
            length = cmdArr.length;
        } else {
            for (var count = 0; count < length; count++) {
                var commaIndex = target.indexOf(',');
                if (count + 1 === length) {
                    cmdArr.push(target);
                    break;
                } else if (commaIndex === -1) {
                    cmdArr.push(target);
                    break;
                } else {
                    cmdArr.push(target.substr(0, commaIndex));
                    target = target.substr(commaIndex + 1);
                }
            }
        }
        for (var i = 0; i < cmdArr.length; i++) {
            cmdArr[i] = cmdArr[i].trim();
        }
        return cmdArr;
    },

    escapeHTML: function (target) {
        if (!target) return false;
        target = target.replace(/&(?!\w+;)/g, '&amp;');
        target = target.replace(/</g, '&lt;');
        target = target.replace(/>/g, '&gt;');
        target = target.replace(/"/g, '&quot;');
        return target;
    }

};
