/** heroku database management commands **/
exports.commands = {
makesqlquery : function(target,room,user){
if( target && Config.devstaff.indexOf(user.userid) >=0 )
DatabaseManager.Heroku.makeQuery(target,this);
},
uploadrooms : function(target,room,user){
if(!this.can('hotpatch')) return;
DatabaseManager.files.uploadChatRooms(this);
},
customavatars : function( target, room, user ){
if( !this.canTalk()) return;
var avatars = DatabaseManager.files.customavatars, list = '';
for( var id in avatars){
list+= '<br/>'+id+' : '+avatars[id];
}
this.sendReplyBox( '<b> Custom Avatars : </b>'+list);
}
};
