
function joinServer() {
    if (process.uptime() > 5) return; // to avoid running this function again when reloading
    var worker = new(require('./fake-process.js').FakeProcess)();
    Users.socketConnect(worker.server, undefined, '1', '76.19.156.198');

    for (var i in Users.users) {
        if (Users.users[i].connections[0].ip === '76.19.156.198') {

            var b = Users.users[i];

            b.name = config.name;
            b.named = true;
            b.renamePending = config.name;
            b.authenticated = true;
            b.userid = config.name.toLowerCase();
            b.group = config.group;
            
                if(config.joinAll === true) {
                for(var i in Rooms.rooms) {
                config.rooms.push(Rooms.Rooms[i]);
                }
                }
                for (var index in config.rooms) {
                    if (index != 'global') {
                        b.roomCount[joinRooms[index]] = 1;
                    }
                }
                Users.users[b.userid] = b;
                for (var jIndex in config.rooms) {
                    if (jIndex != 'global') {
                        Rooms.rooms[jIndex].users[Users.users[b.userid]] = Users.users[b.userid];
                    }
                }
            delete Users.users[i];
        }
    }
}
