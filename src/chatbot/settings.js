var settings = {
on: true,
spamphase: 1,
jokes: true,
commandchar: '?',
motdOn: false,
modbot: {
name: 'Dratini',
   group: '@',
   rooms: [],
   joinAll: true
   },
regbot: { 
   name: 'AdvBot',
   group: '~',
   rooms: ['lobby'],
   joinAll: false
   },
suppbot: {
   name: 'Chansey',
   group: '+',
   rooms: ['lobby'],
   joinAll: false
}
}
exports.settings = settings;
