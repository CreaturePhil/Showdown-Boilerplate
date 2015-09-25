/* Pokemon Showdown hashColor function
 * This gives the color of a username
 * based on the userid.
*/

if (typeof Gold === 'undefined') global.Gold = {};
var MD5 = require('MD5');
var colorCache = {};

Object.merge(Gold, {
	hashColor: function(name) {
		name = toId(name);
		if (colorCache[name]) return colorCache[name];
		var hash = MD5(name);
		var H = parseInt(hash.substr(4, 4), 16) % 360;
		var S = parseInt(hash.substr(0, 4), 16) % 50 + 50;
		var L = parseInt(hash.substr(8, 4), 16) % 20 + 25;
		var rgb = hslToRgb(H, S, L);
		colorCache[name] = "#" + rgbToHex(rgb.r, rgb.g, rgb.b);
		try {
			switch (toId(name)) {
				case 'flareninja':
					return colorCache[name] = '#DA9D01';
					break;
				default:
					return colorCache[name];
			}
		} catch (e) {
			return this.sendReply("Something with hashColor broke: \n" + e.stack);
		}
	}
});

function hslToRgb(h, s, l) {
	var r, g, b, m, c, x;
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
		b: b
	};
}

function rgbToHex(R, G, B) {
	return toHex(R) + toHex(G) + toHex(B);
}

function toHex(N) {
	if (N == null) return "00";
	N = parseInt(N);
	if (N == 0 || isNaN(N)) return "00";
	N = Math.max(0, N);
	N = Math.min(N, 255);
	N = Math.round(N);
	return "0123456789ABCDEF".charAt((N - N % 16) / 16) + "0123456789ABCDEF".charAt(N % 16);
}
