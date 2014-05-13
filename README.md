Showdown Boilerplate
========================================================================

Showdown Boilerplate is a template for private servers of [Pokémon Showdown][1]. Pokémon Showdown is created [Zarel][2].

What is a boilerplate? Boilerplate is any text that is or can be reused in new contexts or applications without being greatly changed from the original.

This repository contains the files needed to set up your own Pokémon Showdown server with all the amazing stuff that Pokémon Showdown private servers like Frost and Pandora has. This also includes [Pokemon-Showdown-Addons][3] created by [kota][4].

For more information on Pokémon Showdown, setting up your own server, or viewing the credits, go visit the main [Pokémon Showdown repository][1].

  [1]: https://github.com/Zarel/Pokemon-Showdown
  [2]: https://github.com/Zarel
  [3]: https://github.com/kotarou3/Pokemon-Showdown-Addons
  [4]: https://github.com/kotarou3


Features
------------------------------------------------------------------------

* Single Process Hack for improve performance.
* Up-to-date with [Pokemon Showdown][1]'s latest features.
* Money (bucks) system for winning tournaments.
* Polls for voting
* Profile command to check to see when the user's last online, their money, etc.
* A bunch of useful commands like /away, /hide, /poof, etc.

_More coming soon_

Configuration
------------------------------------------------------------------------

### Setting up files

Create __about.csv__, __elo.csv__, __money.csv__, __lastSeen.csv__, __money.csv__,  and __tourWins.csv__ files in __config__ folder.

### Modifying core

* For profile, you can change the color property. (_Line 69_) and also change the custom avatar url to your own server. (_Line 74 & Line 80_)
* For shop, you can add, remove, or change items in the shop.
In the array, each index means [Command, Description, Cost]. (_Lines 244 - 252_)
* For tournaments, you can change the amount of users it takes for the winner to win money in tournaments/frontend.js. 
If you decrease the amount of users require, also decrease the amount divided by the tourSize. For example, if you changed
it from 8 to 4. You would change the amount divided by the tourSize from 10 to 5. (_Lines 597-598_)


License
------------------------------------------------------------------------

Pokémon Showdown's server is distributed under the terms of the [MIT License][5].

  [5]: https://github.com/Zarel/Pokemon-Showdown/blob/master/LICENSE
