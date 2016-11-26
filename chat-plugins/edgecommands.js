//*Edge's Commands-Enjoy :3*//
exports.commands = {
	cc: 'cc',
  cc: function(target, room, user) {
    if (!this.runBroadcast()) return;
    if (user.can('lock', null, room)) this.sendReplyBox('<p style="font-size:22px;color:skyblue;text-shadow:1px 1px 1px #000"><b>Custom Commands:</b></p><p style="font-size:16px;color:skyblue;text-shadow:1px 1px 1px #000">Diancie | ACF | Kaiba | Edge | Bewd | Fischgrat</p>');
  },
  diancie: 'diancie',
  diancie: function(target, room, user) {
    if (!this.runBroadcast()) return;
    if (user.can('lock', null, room)) this.sendReplyBox('<img src=https://67.media.tumblr.com/0970a9844ef76d80ff2bb283ec717faf/tumblr_nf5nqhMvyV1t1n4q8o2_r2_500.gif width=400 height=300 />');
  },
    acf: 'acf',
  acf: function(target, room, user) {
    if (!this.runBroadcast()) return;
    if (user.can('lock', null, room)) this.sendReplyBox('<img src=http://www.smogon.com/dex/media/sprites/xy/charizard-mega-y.gif width=201 height=166 />');//http://i.imgur.com/hiJDUey.gif width=194 height=293 />');
  },
      kaiba: 'kaiba',
  kaiba: function(target, room, user) {
    if (!this.runBroadcast()) return;
    if (user.can('lock', null, room)) this.sendReplyBox('<img src=http://33.media.tumblr.com/tumblr_l51o2mZmxu1qczu1zo1_400.gif width=300 height=400 />');
  },
    bewd: function(target, room, user) {
      if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src=https://secure.static.tumblr.com/1d150983f5c5211ce20c2ede40fa4431/pkxqvsy/UJLo3jiex/tumblr_static_tumblr_static_5gage6noye4g0kgk4wwk8occw_640.gif width=499 height= 281')
    },
    fischgrat: function(target, room, user) {
      if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src= http://www.gifbin.com/bin/072011/reverse-1313397701_big_fish_vs_small_fish.gif width=400 height=287')
    },
    trump: function(target, room, user) {
      if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src=https://uproxx.files.wordpress.com/2015/09/trump.gif?w=650 width=360 height=201')
    },
    trumpnose: 'nonose',
    nonose: 'nnose',
    nnose: function(target, room, user) {
      if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src=http://i.imgur.com/tqZm14R.gif width=400 height=400')
    },
    madobama: function(target, room, user) {
      if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src=http://i1.kym-cdn.com/photos/images/newsfeed/000/531/485/574.gif width=370 height=227')
    },
    idk: function(target, room, user) {
      if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src=https://s3.amazonaws.com/wp-ag/wp-content/uploads/sites/72/2015/04/ClintonShruggiegif.gif width=640 height=352')
    },
    dragonkiller: function(target, room, user) {
            if (!this.runBroadcast()) return;
      this.sendReplyBox('<img src=http://pa1.narvii.com/6172/9c151d9601b1aad6aad0af89ea22576c1fe05ce5_hq.gif width=540 height=304')
    }
};
