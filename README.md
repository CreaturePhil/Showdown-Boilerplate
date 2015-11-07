# Showdown-Boilerplate

[![Build Status](https://travis-ci.org/CreaturePhil/Showdown-Boilerplate.svg)](https://travis-ci.org/CreaturePhil/Showdown-Boilerplate)
[![Dependency Status](https://david-dm.org/CreaturePhil/Showdown-Boilerplate.svg)](https://david-dm.org/CreaturePhil/Showdown-Boilerplate)
[![devDependency Status](https://david-dm.org/CreaturePhil/Showdown-Boilerplate/dev-status.svg)](https://david-dm.org/CreaturePhil/Showdown-Boilerplate#info=devDependencies)

Showdown Boilerplate is a template for [Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown)
private servers.

What is a boilerplate? Boilerplate is any text that is or can be reused in new
contexts or applications without being greatly changed from the original.

This repository contains the files needed to set up your own Pokémon Showdown
server with all the amazing stuff that private Pokémon Showdown servers like
EOS, Frost, or Pandora has.

For more information on Pokémon Showdown, visit the main
[Pokémon Showdown](https://github.com/Zarel/Pokemon-Showdown) repository.

If you would like to use the old version of Showdown-Boilerplate, go to this
[commit](https://github.com/CreaturePhil/Showdown-Boilerplate/tree/79ede733015af70047fef1f5ea53011f6d5368df).

## Features

- Numerous *cool* commands such as /urbandefine or /poof
- Emoticons in chat and private messages
- Polls, Hangman, Profile, and Tells
- Economy (bucks system, shop, tournament winnings, lottery)
- Lowdb and MySql database support

## Quick Start

```bash
$ git clone https://github.com/CreaturePhil/Showdown-Boilerplate.git
$ cd Showdown-Boilerplate && npm install
$ node app.js
```

## Maintainers
Pokémon Showdown requires you to have [Node.js][5] installed, 4.x or later. (Alternatively, most versions of [io.js][6] also work, but is not recommended.)
This boilerplate is brought to you and maintained by the following people:

[![Philip La](https://avatars3.githubusercontent.com/u/5875574?s=117)](http://creaturephil.github.io) | [![jd](https://avatars1.githubusercontent.com/u/2987451?s=117)](https://github.com/jd4564)
:---:|:---:|:---:|:---:|:---:
[Philip La](http://creaturephil.github.io) | [jd](https://github.com/jd4564)

## License

[MIT](LICENSE)
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

  [5]: http://nodejs.org/
  [6]: https://iojs.org/
  [7]: https://github.com/Zarel/Pokemon-Showdown-Client


Setting up an Administrator account
------------------------------------------------------------------------

Once your server is up, you probably want to make yourself an Administrator (~) on it.

### config/usergroups.csv

To become an Administrator, create a file named `config/usergroups.csv` containing

    USER,~

Replace `USER` with the username that you would like to become an Administrator. Do not put a space between the comma and the tilde.

This username must be registered. If you do not have a registered account, you can create one using the Register button in the settings menu (it looks like a gear) in the upper-right of Pokémon Showdown.

Once you're an administrator, you can promote/demote others easily with the `/admin`, `/leader`, `/mod`, etc commands.


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


License
------------------------------------------------------------------------

Pokémon Showdown's server is distributed under the terms of the [MIT License][9].

  [9]: https://github.com/Zarel/Pokemon-Showdown/blob/master/LICENSE


Credits
------------------------------------------------------------------------

Owner

- Guangcong Luo [Zarel] - Development, Design, Sysadmin

Staff

- Chris Monsanto [chaos] - Sysadmin
- Hugh Gordon [V4] - Research (game mechanics), Development
- Juanma Serrano [Joim] - Development, Sysadmin
- Leonardo Julca [Slayer95] - Development
- Mathieu Dias-Martins [Marty-D] - Research (game mechanics), Development
- [The Immortal] - Development

Retired Staff

- Bill Meltsner [bmelts] - Development, Sysadmin
- Cathy J. Fitzpatrick [cathyjf] - Development, Sysadmin

Contributors

- Andrew Goodsell [Zracknel] - Art (battle weather backdrops)
- Ben Davies [Morfent] - Development
- Ben Frengley [TalkTakesTime] - Development
- Cody Thompson [Rising_Dusk] - Development
- Jacob Zimmer [SolarisFox] - Development
- Kevin Lau [Ascriptmaster] - Development, Art (battle animations)
- Konrad Borowski [xfix] - Development
- Quinton Lee [sirDonovan] - Development
- Robin Vandenbrande [Quinella] - Development

Special thanks

- See http://pokemonshowdown.com/credits
