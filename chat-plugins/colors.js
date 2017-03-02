/**
 * Hashcolor file.
 * Custom Colors Refactored by Lord Haji to use nef
 */
'use strict';

let fs = require('fs');

function updateColor() {
	let newCss = '/* COLORS START */\n';
	Db.customcolors.keys().forEach(userid => {
		newCss += generateCSS(userid, Db.customcolors.get(userid));
	})
	newCss += '/* COLORS END */\n';

	let file = fs.readFileSync('config/custom.css', 'utf8').split('\n');
	if (~file.indexOf('/* COLORS START */')) file.splice(file.indexOf('/* COLORS START */'), (file.indexOf('/* COLORS END */') - file.indexOf('/* COLORS START */')) + 1);
	fs.writeFileSync('config/custom.css', file.join('\n') + newCss);
	Util.reloadCSS();
}

function generateCSS(name, color) {
	let css = '';
	let rooms = [];
	name = toId(name);
	Rooms.rooms.forEach((curRoom, id) => {
		if (id === 'global' || curRoom.type !== 'chat' || curRoom.isPersonal) return;
		if (!isNaN(Number(id.charAt(0)))) return;
		rooms.push('#' + id + '-userlist-user-' + name + ' strong em');
		rooms.push('#' + id + '-userlist-user-' + name + ' strong');
		rooms.push('#' + id + '-userlist-user-' + name + ' span');
	});
	css = rooms.join(', ');
	css += '{\ncolor: ' + color + ' !important;\n}\n';
	css += '.chat.chatmessage-' + name + ' strong {\n';
	css += 'color: ' + color + ' !important;\n}\n';
	return css;
}

exports.commands = {
	customcolour: 'customcolor',
	customcolor: {
		set: function (target, room, user) {
			if (!this.can('roomowner')) return false;
			target = target.split(',');
			for (let u = 0; u < target.length; u++) target[u] = target[u].trim();
			if (!target[1]) return this.parse('/help customcolor');
			if (toId(target[0]).length > 19) return this.errorReply("Usernames are not this long...");
			if (Db.customcolors.has(target[0])) return this.errorReply(target[0] + " already has a custom color.");
			Db.customcolors.set(target[0], target[1]);
			this.sendReply("|raw|You have given <b><font color=" + target[1] + ">" + target[0] + "</font></b> a custom color.");
			this.privateModCommand("(" + target[0] + " has recieved custom color: '" + target[1] + "' from " + user.name + ".)");
			updateColor();
		},
		delete: function (target, room, user) {
			if (!this.can('roomowner')) return false;
			if (!target) return this.parse('/help customcolor');
			if (!Db.customcolors.has(toId(target))) return this.errorReply('/customcolor - ' + target + ' does not have a custom color.');
			Db.customcolors.remove(toId(target));
			this.sendReply("You removed " + target + "'s custom color.");
			this.privateModCommand("(" + target + "'s custom color was removed by " + user.name + ".)");
			if (Users(target) && Users(target).connected) Users(target).popup("|html|" + Util.nameColor(user.name, true) + " removed your custom color.");
			updateColor();
		},
		preview: function (target, room, user) {
			if (!this.runBroadcast()) return;
			target = target.split(',');
			for (let u = 0; u < target.length; u++) target[u] = target[u].trim();
			if (!target[1]) return this.parse('/help customcolor');
			return this.sendReplyBox('<b><font size="3" color="' + target[1] + '">' + Chat.escapeHTML(target[0]) + '</font></b>');
		},
		reload: function (target, room, user) {
			if (!this.can('hotpatch')) return false;
			updateColor();
			this.privateModCommand("(" + user.name + " has reloaded custom colours.)");
		},
		'': function (target, room, user) {
			return this.parse("/help customcolor");
		},
	},
	customcolorhelp: [
		"Commands Include:",
		"/customcolor set [user], [hex] - Gives [user] a custom color of [hex]",
		"/customcolor delete [user], delete - Deletes a user's custom color",
		"/customcolor reload - Reloads colours.",
		"/customcolor preview [user], [hex] - Previews what that username looks like with [hex] as the color.",
	],
};

/* Pokemon Showdown hashColor function
 * This gives the color of a username
 * based on the userid.
 */

/*eslint-disable */
function MD5(e) {
	function t(e, t) {
		let n, r, i, s, o;
		i = e & 2147483648;
		s = t & 2147483648;
		n = e & 1073741824;
		r = t & 1073741824;
		o = (e & 1073741823) + (t & 1073741823);
		return n & r ? o ^ 2147483648 ^ i ^ s : n | r ? o & 1073741824 ? o ^ 3221225472 ^ i ^ s : o ^ 1073741824 ^ i ^ s : o ^ i ^ s;
	}

	function n(e, n, r, i, s, o, u) {
		e = t(e, t(t(n & r | ~n & i, s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function r(e, n, r, i, s, o, u) {
		e = t(e, t(t(n & i | r & ~i, s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function i(e, n, r, i, s, o, u) {
		e = t(e, t(t(n ^ r ^ i, s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function s(e, n, r, i, s, o, u) {
		e = t(e, t(t(r ^ (n | ~i), s), u));
		return t(e << o | e >>> 32 - o, n);
	}

	function o(e) {
		let t = "",
			n = "",
			r;
		for (r = 0; r <= 3; r++) n = e >>> r * 8 & 255, n = "0" + n.toString(16), t += n.substr(n.length - 2, 2);
		return t
	}
	let u = [],
		a, f, l, c, h, p, d, v, e = function(e) {
			for (let e = e.replace(/\r\n/g, "\n"), t = "", n = 0; n < e.length; n++) {
				let r = e.charCodeAt(n);
				r < 128 ? t += String.fromCharCode(r) : (r > 127 && r < 2048 ? t += String.fromCharCode(r >> 6 | 192) : (t += String.fromCharCode(r >> 12 | 224), t += String.fromCharCode(r >> 6 & 63 | 128)), t += String.fromCharCode(r & 63 | 128));
			}
			return t;
		}(e),
		u = function(e) {
			let t, n = e.length;
			t = n + 8;
			for (let r = ((t - t % 64) / 64 + 1) * 16, i = Array(r - 1), s = 0, o = 0; o < n;) t = (o - o % 4) / 4, s = o % 4 * 8, i[t] |= e.charCodeAt(o) << s, o++;
			i[(o - o % 4) / 4] |= 128 << o % 4 * 8;
			i[r - 2] = n << 3;
			i[r - 1] = n >>> 29;
			return i;
		}(e);
	h = 1732584193;
	p = 4023233417;
	d = 2562383102;
	v = 271733878;
	for (e = 0; e < u.length; e += 16) a = h, f = p, l = d, c = v, h = n(h, p, d, v, u[e + 0], 7, 3614090360), v = n(v, h, p, d, u[e + 1], 12, 3905402710), d = n(d, v, h, p, u[e + 2], 17, 606105819), p = n(p, d, v, h, u[e + 3], 22, 3250441966), h = n(h, p, d, v, u[e + 4], 7, 4118548399), v = n(v, h, p, d, u[e + 5], 12, 1200080426), d = n(d, v, h, p, u[e + 6], 17, 2821735955), p = n(p, d, v, h, u[e + 7], 22, 4249261313), h = n(h, p, d, v, u[e + 8], 7, 1770035416), v = n(v, h, p, d, u[e + 9], 12, 2336552879), d = n(d, v, h, p, u[e + 10], 17, 4294925233), p = n(p, d, v, h, u[e + 11], 22, 2304563134), h = n(h, p, d, v, u[e + 12], 7, 1804603682), v = n(v, h, p, d, u[e + 13], 12, 4254626195), d = n(d, v, h, p, u[e + 14], 17, 2792965006), p = n(p, d, v, h, u[e + 15], 22, 1236535329), h = r(h, p, d, v, u[e + 1], 5, 4129170786), v = r(v, h, p, d, u[e + 6], 9, 3225465664), d = r(d, v, h, p, u[e + 11], 14, 643717713), p = r(p, d, v, h, u[e + 0], 20, 3921069994), h = r(h, p, d, v, u[e + 5], 5, 3593408605), v = r(v, h, p, d, u[e + 10], 9, 38016083), d = r(d, v, h, p, u[e + 15], 14, 3634488961), p = r(p, d, v, h, u[e + 4], 20, 3889429448), h = r(h, p, d, v, u[e + 9], 5, 568446438), v = r(v, h, p, d, u[e + 14], 9, 3275163606), d = r(d, v, h, p, u[e + 3], 14, 4107603335), p = r(p, d, v, h, u[e + 8], 20, 1163531501), h = r(h, p, d, v, u[e + 13], 5, 2850285829), v = r(v, h, p, d, u[e + 2], 9, 4243563512), d = r(d, v, h, p, u[e + 7], 14, 1735328473), p = r(p, d, v, h, u[e + 12], 20, 2368359562), h = i(h, p, d, v, u[e + 5], 4, 4294588738), v = i(v, h, p, d, u[e + 8], 11, 2272392833), d = i(d, v, h, p, u[e + 11], 16, 1839030562), p = i(p, d, v, h, u[e + 14], 23, 4259657740), h = i(h, p, d, v, u[e + 1], 4, 2763975236), v = i(v, h, p, d, u[e + 4], 11, 1272893353), d = i(d, v, h, p, u[e + 7], 16, 4139469664), p = i(p, d, v, h, u[e + 10], 23, 3200236656), h = i(h, p, d, v, u[e + 13], 4, 681279174), v = i(v, h, p, d, u[e + 0], 11, 3936430074), d = i(d, v, h, p, u[e + 3], 16, 3572445317), p = i(p, d, v, h, u[e + 6], 23, 76029189), h = i(h, p, d, v, u[e + 9], 4, 3654602809), v = i(v, h, p, d, u[e + 12], 11, 3873151461), d = i(d, v, h, p, u[e + 15], 16, 530742520), p = i(p, d, v, h, u[e + 2], 23, 3299628645), h = s(h, p, d, v, u[e + 0], 6, 4096336452), v = s(v, h, p, d, u[e + 7], 10, 1126891415), d = s(d, v, h, p, u[e + 14], 15, 2878612391), p = s(p, d, v, h, u[e + 5], 21, 4237533241), h = s(h, p, d, v, u[e + 12], 6, 1700485571), v = s(v, h, p, d, u[e + 3], 10, 2399980690), d = s(d, v, h, p, u[e + 10], 15, 4293915773), p = s(p, d, v, h, u[e + 1], 21, 2240044497), h = s(h, p, d, v, u[e + 8], 6, 1873313359), v = s(v, h, p, d, u[e + 15], 10, 4264355552), d = s(d, v, h, p, u[e + 6], 15, 2734768916), p = s(p, d, v, h, u[e + 13], 21, 1309151649), h = s(h, p, d, v, u[e + 4], 6, 4149444226), v = s(v, h, p, d, u[e + 11], 10, 3174756917), d = s(d, v, h, p, u[e + 2], 15, 718787259), p = s(p, d, v, h, u[e + 9], 21, 3951481745), h = t(h, a), p = t(p, f), d = t(d, l), v = t(v, c);
	return (o(h) + o(p) + o(d) + o(v)).toLowerCase();
}
/*eslint-enable */
let colorCache = {};
// hashColor function
Util.hashColor = function (name) {
	name = toId(name);
	if (Db.customcolors.has(name)) return Db.customcolors.get(name);
	if (colorCache[name]) return colorCache[name];
	let hash = MD5(name);
	let H = parseInt(hash.substr(4, 4), 16) % 360; // 0 to 360
	let S = parseInt(hash.substr(0, 4), 16) % 50 + 40; // 40 to 89
	let L = Math.floor(parseInt(hash.substr(8, 4), 16) % 20 + 30); // 30 to 49
	let C = (100 - Math.abs(2 * L - 100)) * S / 100 / 100;
	let X = C * (1 - Math.abs((H / 60) % 2 - 1));
	let m = L / 100 - C / 2;

	let R1, G1, B1;
	switch (Math.floor(H / 60)) {
	case 1:
		R1 = X;
		G1 = C;
		B1 = 0;
		break;
	case 2:
		R1 = 0;
		G1 = C;
		B1 = X;
		break;
	case 3:
		R1 = 0;
		G1 = X;
		B1 = C;
		break;
	case 4:
		R1 = X;
		G1 = 0;
		B1 = C;
		break;
	case 5:
		R1 = C;
		G1 = 0;
		B1 = X;
		break;
	case 0:
	default:
		R1 = C;
		G1 = X;
		B1 = 0;
		break;
	}
	let lum = (R1 + m) * 0.2126 + (G1 + m) * 0.7152 + (B1 + m) * 0.0722; // 0.05 (dark blue) to 0.93 (yellow)
	let HLmod = (lum - 0.5) * -100; // -43 (yellow) to 45 (dark blue)
	if (HLmod > 12) {
		HLmod -= 12;
	} else if (HLmod < -10) {
		HLmod = (HLmod + 10) * 2 / 3;
	} else {
		HLmod = 0;
	}

	L += HLmod;
	let Smod = 10 - Math.abs(50 - L);
	if (HLmod > 15) Smod += (HLmod - 15) / 2;
	S -= Smod;

	let rgb = hslToRgb(H, S, L);
	colorCache[name] = "#" + rgbToHex(rgb.r, rgb.g, rgb.b);
	return colorCache[name];
};

function hslToRgb(h, s, l) {
	let r, g, b, m, c, x;
	if (!isFinite(h)) h = 0;
	if (!isFinite(s)) s = 0;
	if (!isFinite(l)) l = 0;
	h /= 60;
	if (h < 0) h = 6 - (-h % 6);
	h %= 6;
	s = Math.max(0, Math.min(1, s / 100));
	l = Math.max(0, Math.min(1, l / 100));
	c = (1 - Math.abs((2 * l) - 1)) * s;
	x = c * (1 - Math.abs((h % 2) - 1));
	if (h < 1) {
		r = c;
		g = x;
		b = 0;
	} else if (h < 2) {
		r = x;
		g = c;
		b = 0;
	} else if (h < 3) {
		r = 0;
		g = c;
		b = x;
	} else if (h < 4) {
		r = 0;
		g = x;
		b = c;
	} else if (h < 5) {
		r = x;
		g = 0;
		b = c;
	} else {
		r = c;
		g = 0;
		b = x;
	}
	m = l - c / 2;
	r = Math.round((r + m) * 255);
	g = Math.round((g + m) * 255);
	b = Math.round((b + m) * 255);
	return {
		r: r,
		g: g,
		b: b,
	};
}

function rgbToHex(R, G, B) {
	return toHex(R) + toHex(G) + toHex(B);
}

function toHex(N) {
	if (N === null || N === undefined) return "00";
	N = parseInt(N);
	if (N === 0 || isNaN(N)) return "00";
	N = Math.max(0, N);
	N = Math.min(N, 255);
	N = Math.round(N);
	return "0123456789ABCDEF".charAt((N - N % 16) / 16) + "0123456789ABCDEF".charAt(N % 16);
}

Util.nameColor = function (name, bold, userGroup) {
	let userGroupSymbol = Users.usergroups[toId(name)] ? '<b><font color=#948A88>' + Users.usergroups[name].substr(0, 1) + '</font></b>' : "";
	return (userGroup ? userGroupSymbol : "") + (bold ? "<b>" : "") + "<font color=" + Util.hashColor(name) + ">" + (Users(name) && Users(name).connected && Users.getExact(name) ? Chat.escapeHTML(Users.getExact(name).name) : Chat.escapeHTML(name)) + "</font>" + (bold ? "</b>" : "");
};
