'use strict';

exports.BattleStatuses = {
   raindance: {
     inherit: true,
     durationCallback: function () {
       if (this.turn > 2) {
         return 999;
       }
       return 5;
     },
   },
   sunnyday: {
     inherit: true,
     durationCallback: function () {
       if (this.turn > 2) {
         return 999;
       }
       return 5;
     },
   },
   sandstorm: {
     inherit: true,
     durationCallback: function () {
       if (this.turn > 2) {
         return 999;
       }
       return 5;
     },
   },
   hail: {
     inherit: true,
     durationCallback: function () {
       if (this.turn > 2) {
         return 999;
       }
       return 5;
     },
   },
}
