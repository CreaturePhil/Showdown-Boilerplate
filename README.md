# Showdown Boilerplate

Showdown Boilerplate is a template for private servers of [Pokémon Showdown][1]. Pokémon Showdown is created by [Zarel][2].

<<<<<<< HEAD
What is a boilerplate? Boilerplate is any text that is or can be reused in new contexts or applications without being greatly changed from the original.
=======
  [1]: http://pokemonshowdown.com/
  [2]: https://github.com/Zarel/Pokemon-Showdown-Client

[![Build Status](https://travis-ci.org/Zarel/Pokemon-Showdown.svg)](https://travis-ci.org/Zarel/Pokemon-Showdown)
[![Dependency Status](https://david-dm.org/zarel/Pokemon-Showdown.svg)](https://david-dm.org/zarel/Pokemon-Showdown)
[![devDependency Status](https://david-dm.org/zarel/Pokemon-Showdown/dev-status.svg)](https://david-dm.org/zarel/Pokemon-Showdown#info=devDependencies)

Introduction
------------------------------------------------------------------------

This is the source code for the game server of [Pokémon Showdown][3], a website for Pokémon battling. Pokémon Showdown simulates singles, doubles and triples battles in all the games out so far (Generations 1 through 6).
>>>>>>> 803c202c5fff2faae6dcaa5eefa1b9508f821ad2

This repository contains the files needed to set up your own Pokémon Showdown server with all the amazing stuff that Pokémon Showdown private servers like Frost and Pandora has. This also includes [Pokemon-Showdown-Addons][3] created by [kota][4] and parser from [Pokemon-Showdown-Bot][5] by [TalkTakesTime][6].

For more information on Pokémon Showdown, setting up your own server, or viewing the credits, go visit the main [Pokémon Showdown repository][1].

  [1]: https://github.com/Zarel/Pokemon-Showdown
  [2]: https://github.com/Zarel
  [3]: https://github.com/kotarou3/Pokemon-Showdown-Addons
  [4]: https://github.com/kotarou3
  [5]: https://github.com/TalkTakesTime/Pokemon-Showdown-Bot
  [6]: https://github.com/TalkTakesTime


Features
------------------------------------------------------------------------

<<<<<<< HEAD
* Single Process Hack for improve performance.
* Money (bucks) system for winning tournaments.
* Polls for voting
* Profile command to check to see when the user's last online, their money, etc.
* A bunch of useful commands like /away, /hide, /poof, etc.
* Built-in bot for moderation and fun
* Emoticons in chat

Getting Started
=======
Pokémon Showdown requires you to have [io.js][5] installed, any version. (Alternatively, you can install [node.js][6] version 0.10.2 or later.)

Next, obtain a copy of Pokémon Showdown. If you're reading this outside of GitHub, you've probably already done this. If you're reading this in GitHub, there's a "Clone" button in the bottom of the right sidebar, or if you're really lazy, there's a "ZIP" download button. I recommend the Clone method - it's more time-consuming to set up, but much easier to update.

Pokémon Showdown is installed and run using a command line. In Mac OS X, open `Terminal` (it's in Utilities). In Windows, open `Command Prompt` (type `cmd` into the Start menu and it should be the first result). Type this into the command line:

    cd LOCATION

Replace `LOCATION` with the location Pokémon Showdown is in (ending up with, for instance, `cd "~/Downloads/Pokemon-Showdown"` or `cd "C:\Users\Bob\Downloads\Pokemon-Showdown\"`).

This will set your command line's location to Pokémon Showdown's folder. You'll have to do this each time you open a command line to run commands for Pokémon Showdown.

To install dependencies, run the command:

    npm install --production

Copy `config/config-example.js` into `config/config.js`, and edit as you please.

Congratulations, you're done setting up Pokémon Showdown.

Now, to start Pokémon Showdown, run the command:

    node app.js

You can also specify a port:

    node app.js 8000

Visit your server at `http://SERVER:8000`

Replace `SERVER` with your server domain or IP. Replace `8000` with your port if it's not `8000` (the default port).

Yes, you can test even if you are behind a NAT without port forwarding: `http://localhost:8000` will connect to your local machine. Some browser setups might prevent this sort of connection, however (NoScript, for instance). If you can't get connecting locally to work in Firefox, try Chrome.

You will be redirected to `http://SERVER.psim.us`. The reason your server is visited through `psim.us` is to make it more difficult for servers to see a user's password in any form, by handling logins globally. You can embed this in an `iframe` in your website if the URL is a big deal with you.

If you truly want to host the client yourself, there is [a repository for the Pokémon Showdown Client][7]. It's not recommended for beginners, though.

  [5]: https://iojs.org/
  [6]: http://nodejs.org/
  [7]: https://github.com/Zarel/Pokemon-Showdown-Client


Setting up an Administrator account
>>>>>>> 803c202c5fff2faae6dcaa5eefa1b9508f821ad2
------------------------------------------------------------------------
To get started with this boilerplate, just download this as a zip or clone it and install a [Pokemon Showdown server][1] as you usually do.
If you forgot how to do this, here is a quick reference:

	git clone https://github.com/CreaturePhil/Showdown-Boilerplate.git showdown-boilerplate
	cd showdown-boilerplate
	npm install

Once you done that, create __usergroups.csv__, __about.csv__, __elo.csv__, __money.csv__, __lastSeen.csv__, and __tourWins.csv__ files in the _config_ folder.

To do this quickly in your terminal or command line:

On Windows:

	cd config
	Type NUL > usergroups.csv
	Type NUL > about.csv
	Type NUL > elo.csv
	Type NUL > money.csv
	Type NUL > lastSeen.csv
	Type NUL > tourWins.csv
	cd ..

On Linux or Mac:

	cd config
	touch usergroups.csv about.csv elo.csv money.csv lastSeen.csv tourWins.csv
	cd ..

`cd ..` is to go back to the showdown-boilerplate directory.
Once you get your server up and running, you can manage certain settings with the `/controlpanel` or `/cp` command.

<<<<<<< HEAD
![Control Panel](http://i.imgur.com/ImBbK5x.png "Control Panel")
=======
Browser support
------------------------------------------------------------------------

Pokémon Showdown currently supports, in order of preference:

 - Chrome
 - Firefox
 - Safari
 - Chrome/Firefox/Safari for various mobile devices
 - Opera
 - Firefox for Android
 - IE9+

IE8 support can technically be added without too much difficulty, but it doesn't run PS fast enough to be usable.

As for older browsers (Firefox 3.6), I won't go out of my way to support them, but if there's a simple fix, you can suggest it to me and I'll implement it.


Community
------------------------------------------------------------------------

PS has a built-in chat service. Join our main server to talk to us!

You can also visit the [Pokémon Showdown forums][8] for discussion and help.

  [8]: http://www.smogon.com/forums/forums/pok%C3%A9mon-showdown.209/

>>>>>>> 803c202c5fff2faae6dcaa5eefa1b9508f821ad2

License
------------------------------------------------------------------------

<<<<<<< HEAD
Pokémon Showdown's server is distributed under the terms of the [MIT License][7].

  [7]: https://github.com/Zarel/Pokemon-Showdown/blob/master/LICENSE
=======
Pokémon Showdown's server is distributed under the terms of the [MIT License][9].

  [9]: https://github.com/Zarel/Pokemon-Showdown/blob/master/LICENSE


Credits
------------------------------------------------------------------------

Owner

- Guangcong Luo [Zarel] - Development, Design

Staff

- Hugh Gordon [V4] - Research (game mechanics), Development
- Juanma Serrano [Joim] - Development
- Leonardo Julca [Slayer95] - Development
- [The Immortal] - Development

Retired Staff

- Bill Meltsner [bmelts] - Development
- Cathy J. Fitzpatrick [cathyjf] - Development

Contributors

- Andrew Goodsell [Zracknel] - Art (battle weather backdrops)
- Ben Davies [Morfent] - Development
- Ben Frengley [TalkTakesTime] - Development
- Cody Thompson [Rising_Dusk] - Development
- Jacob Zimmer [SolarisFox] - Development
- Kevin Lau [Ascriptmaster] - Development
- Konrad Borowski [xfix] - Development
- Kyle Dove [Kyle_Dove] - Art (battle backdrops)
- Mathieu Dias-Martins [Marty-D] - Research (game mechanics), Development
- Quinton Lee [sirDonovan] - Development
- Robin Vandenbrande [Quinella] - Development
- Samuel Teo [Yilx] - Art (main background)
- Vivian Zou [Vtas] - Art (alternate main background)
>>>>>>> 803c202c5fff2faae6dcaa5eefa1b9508f821ad2
