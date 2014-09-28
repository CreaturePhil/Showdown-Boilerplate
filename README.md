# Showdown Boilerplate

Showdown Boilerplate is a template for private servers of [Pokémon Showdown][1]. Pokémon Showdown is created by [Zarel][2].

What is a boilerplate? Boilerplate is any text that is or can be reused in new contexts or applications without being greatly changed from the original.

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

* Single Process Hack for improve performance.
* Money (bucks) system for winning tournaments.
* Polls for voting
* Profile command to check to see when the user's last online, their money, etc.
* A bunch of useful commands like /away, /hide, /poof, etc.
* Built-in bot for moderation and fun
* Emoticons in chat

Getting Started
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

![Control Panel](http://i.imgur.com/ImBbK5x.png "Control Panel")

License
------------------------------------------------------------------------

Pokémon Showdown's server is distributed under the terms of the [MIT License][7].

  [7]: https://github.com/Zarel/Pokemon-Showdown/blob/master/LICENSE
