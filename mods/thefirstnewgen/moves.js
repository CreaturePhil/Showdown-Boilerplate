'use strict';

exports.BattleMovedex = {
        "headslam": {
          accuracy: 90,
          basePower: 140,
          category: "Physical",
          id: "headslam",
          isViable: true,
		      name: "Head Slam",
          pp: 15,
          priority: 0,
          flags: {contact: 1, protect: 1, mirror: 1},
          recoil: [2, 5],
          secondary: {
                    chance: 10,
			              status: 'par',
          },
          target: "normal",
          type: "Fighting",
      },
};
