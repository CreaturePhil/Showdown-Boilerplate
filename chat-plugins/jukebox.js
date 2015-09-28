var fs = require('fs');

exports.commands = {

jukebox: function(target, room, user, connection, cmd) {
        if (!this.can('potd')) return;
        if (!this.canBroadcast()) return;
        if (room.id !== 'music') return this.sendReply("This command can only be used in Music.");
        var randjuke = jukebox[Math.floor(Math.random()*jukebox.length)];
        this.sendReply(randjuke)
},

songoftheday: 'sotd',
sotd: function(target, room, user, connection, cmd) {
        if (!this.can('potd')) return;
        if (!this.canBroadcast()) return;
        if (room.id !== 'music') return this.sendReply("This command can only be used in Music.");
	var sotd = jukebox[0];
	this.sendReply("Song Of The Day Is : Let It Go - Idina Menzel\n"+ sotd)
},

play: function(target, room, user, connection, cmd) {
        if (!this.can('potd')) return;
        if (!this.canBroadcast()) return;
        if (room.id !== 'music') return this.sendReply("This command can only be used in Music.");
	var targets = target.split(",");
        if (!targets[0] || !targets[1] || !targets[2] || !target.has('.mp3')) {
    	this.sendReply('The format is "/play songlink.mp3 , Song Title , Song Name".')
    	}else{
    	this.sendReply('|raw|<div class="infobox"><h2>'+targets[2]+'</h2><audio src="'+targets[0]+'" title="'+targets[1]+'" type="audio/mp3" controls="" style="width: 100% ;"></audio></div>');
}
},

jukeadd: function(target, room, user, connection, cmd) {
if (!this.can('hotpatch')) return;
if (room.id !== 'music') return this.sendReply("This command can only be used in Music.");
var targets = target.split(",");
if (!targets[0] || !targets[1] ) {
this.sendReply("The format is "+"/jukeadd link,name"+".")
}else{
jukebox[jukebox.length] = "|raw|<div class=\"infobox\"> <audio src=\""+targets[0]+"\" title=\""+ targets[1] +"\" type=\"audio/mp3\" controls=\"\" style=\"background-color:gold; border-radius:2px inset gold; width: 100% ;\"></audio></div>";
fs.writeFile('/home/ubuntu/workspace/config/jukebox.txt', JSON.stringify(jukebox));
this.sendReply("The Song "+ targets[1]+" was successfully added.")
}
},


playlist: function(target, room, user, connection, cmd) {
        if (!this.can('potd')) return;
        if (!this.canBroadcast()) return;
        if (room.id !== 'music') return this.sendReply("This command can only be used in Music.");
	if (target === "dragotic" || target === "Dragotic") {
		var dragoticplaylist = [jukebox[0]] 
		var randsong = 	dragoticplaylist[Math.floor(Math.random()*dragoticplaylist.length)];
		this.sendReply(randsong)
	}else if (target === "kuro" || target === "Kuro") {
		var kuroplaylist = ["Empty"] 
		var randsongkuro = kuroplaylist[Math.floor(Math.random()*kuroplaylist.length)];
		this.sendReply(randsongkuro)

	}else{
		this.sendReply("No playlist with this name found!.")
	}
},
};
