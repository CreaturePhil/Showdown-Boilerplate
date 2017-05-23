module.exports = hashColor;
let MD5 = require('MD5');

function hslToRgb(e, t, n) {
	var r, i, s, o, u, a;
	if (!isFinite(e)) e = 0;
	if (!isFinite(t)) t = 0;
	if (!isFinite(n)) n = 0;
	e /= 60;
	if (e < 0) e = 6 - -e % 6;
	e %= 6;
	t = Math.max(0, Math.min(1, t / 100));
	n = Math.max(0, Math.min(1, n / 100));
	u = (1 - Math.abs(2 * n - 1)) * t;
	a = u * (1 - Math.abs(e % 2 - 1));
	if (e < 1) {
		r = u;
		i = a;
		s = 0;
	} else if (e < 2) {
		r = a;
		i = u;
		s = 0;
	} else if (e < 3) {
		r = 0;
		i = u;
		s = a;
	} else if (e < 4) {
		r = 0;
		i = a;
		s = u;
	} else if (e < 5) {
		r = a;
		i = 0;
		s = u;
	} else {
		r = u;
		i = 0;
		s = a;
	}
	o = n - u / 2;
	r = Math.round((r + o) * 255);
	i = Math.round((i + o) * 255);
	s = Math.round((s + o) * 255);
	return {
		r: r,
		g: i,
		b: s
	};
}

function rgbToHex(e, t, n) {
	return toHex(e) + toHex(t) + toHex(n);
}

function toHex(e) {
	if (e == null) return "00";
	e = parseInt(e);
	if (e == 0 || isNaN(e)) return "00";
	e = Math.max(0, e);
	e = Math.min(e, 255);
	e = Math.round(e);
	return "0123456789ABCDEF".charAt((e - e % 16) / 16) + "0123456789ABCDEF".charAt(e % 16);
}

var colorCache = {};

function hashColor(name) {
	name = toId(name);
	if (colorCache[name]) return colorCache[name];
	var hash = MD5(name);
	var H = parseInt(hash.substr(4, 4), 16) % 360; // 0 to 360
	var S = parseInt(hash.substr(0, 4), 16) % 50 + 40; // 40 to 89
	var L = Math.floor(parseInt(hash.substr(8, 4), 16) % 20 + 30); // 30 to 49
	var C = (100 - Math.abs(2 * L - 100)) * S / 100 / 100;
	var X = C * (1 - Math.abs((H / 60) % 2 - 1));
	var m = L / 100 - C / 2;

	var R1, G1, B1;
	switch (Math.floor(H / 60)) {
		case 1: R1 = X; G1 = C; B1 = 0; break;
		case 2: R1 = 0; G1 = C; B1 = X; break;
		case 3: R1 = 0; G1 = X; B1 = C; break;
		case 4: R1 = X; G1 = 0; B1 = C; break;
		case 5: R1 = C; G1 = 0; B1 = X; break;
		case 0: default: R1 = C; G1 = X; B1 = 0; break;
	}
	var lum = (R1 + m) * 0.2126 + (G1 + m) * 0.7152 + (B1 + m) * 0.0722; // 0.05 (dark blue) to 0.93 (yellow)
	var HLmod = (lum - 0.5) * -100; // -43 (yellow) to 45 (dark blue)
	if (HLmod > 12) HLmod -= 12;
	else if (HLmod < -10) HLmod = (HLmod + 10) * 2 / 3;
	else HLmod = 0;

	L += HLmod;
	var Smod = 10 - Math.abs(50 - L);
	if (HLmod > 15) Smod += (HLmod - 15) / 2;
	S -= Smod;

	var rgb = hslToRgb(H, S, L);
	colorCache[name] = "#" + rgbToHex(rgb.r, rgb.g, rgb.b);
	return colorCache[name];
}
