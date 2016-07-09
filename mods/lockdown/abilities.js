'use strict';

exports.BattleAbilities = {
   drought: {
     inherit: true,
     onStart: function (source) {
       for (let i = 0; i < this.queue.length; i++) {
         if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'groudon') return;
         if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
       }
       if (this.turn < 7) this.setWeather('sunnyday');
     },
   },
   drizzle: {
     inherit: true,
     onStart: function (source) {
       for (let i = 0; i < this.queue.length; i++) {
         if (this.queue[i].choice === 'runPrimal' && this.queue[i].pokemon === source && source.template.speciesid === 'kyogre') return;
         if (this.queue[i].choice !== 'runSwitch' && this.queue[i].choice !== 'runPrimal') break;
       }
       if (this.turn < 7) this.setWeather('raindance');
     },
   },
   sandstream: {
     inherit: true,
     onStart: function (source) {
       if (this.turn < 7) this.setWeather('sandstorm');
     },
   },
   snowwarning: {
     inherit: true,
     onStart: function (source) {
       if (this.turn < 7) this.setWeather('hail');
     },
   },
}
