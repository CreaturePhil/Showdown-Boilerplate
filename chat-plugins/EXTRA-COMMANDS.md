Showdown-Boilerplate Commands 
========================================================================

Commands
------------------------------------------------------------------------

`authority`
*	Alias: stafflist, auth, authlist. Displays a list of the server's staff.

`away`
*	Adds a message to your username showing you are unavailble for a particular reason. Usage: /away [reason].

`back`
*	Removes an away message from your username on the userlist.

`blockemoticons - unblockemoticons`
*	Alias: blockemotes, blockemote, blockemoticon. Blocks emoticons from appearing for you in the chat and pms. 

`clearall`
*	Clears all messages in a chatroom. 

`customavatar`
*	Sets a customavatar for a user. (A registered server is required for these to show.) 
	Usage: /customavatar set, [user], [url] /customavatar delete, [user].

`customsymbol`
*	After purchasing customsymbol from the shop, this command is used to set a customsymbol. Usage: /customsymbol [symbol].

`define`
*	Alias: def. Gives the dictionary definition for a word. Usage: /define [word].

`economystats`  
*	Alias: bucks. Provides information on the amount of money in circulation on the server. 

`emoticons`
*	Alias: emotes. Shows a list of the emoticons usable in the chat. 
*	
`enddice - startdice`
*	Alias dicegame, dicestart: startdice: Starts a game of dice for a specified amount of bucks. Usage: /startdice [amount]
	enddice: Ends a game of dice in progress. 

`globalclearall`
*	Alias: gclearall. Clears all messages on the server in every chatroom. 

`givemoney`
*	Alias: givebuck, givebucks. Give a specific amount of money to a user. Usage: /givebucks [user], [amount].

`hide - show`
*	Hides and shows the auth symbol of the user respectively. 

`moneylog`
*	Shows the transaction history of a user or a list of the most recent transactions. Usage: /moneylog user or /moneylog

`picklottery`
*	Picks a lottery winner from the pool of tickets that were purchased in shop. 

`pmall - pmallstaff`
*	Alias: masspm. Send a no reply private message to all users on the server. Pmallstaff sends the message only to global staff.

`poof`
*	Disconnects the user from the server and sends a fun message when they leave. 

`poofon - poofoff`
*	Disables and enables the use of poof on the server. 

`pot`
*	Shows the total amount of money in the current jackpot that will be awarded when /picklottery is used. 

`randemote`
*	Shows a random emoticon when the command is used. 

`regdate`
*	Shows the date a particular username was registered on. Usage: /regdate [user].

`resetcustomsymbol`
*	When a user has a customsymbol, this command can be used to reset the symbol to the default. 

`resetmoney`
*	Remove all the money a target user has. Usage: /resetmoney [user].

`richestuser`
*	Shows a list of the top ten users with the most money on the server. 

`seen`
*	Shows the time a username was last logged on to the server. Usage: /seen [user].

`shop`
*	Displays the server shop from which users can purchase items with bucks. Items can be added in economy.js and by default will
  send an alert to the staffroom when an item is purchased. 

`showdownboilerplate`
*	Links to the Showdown-Boilerplate Repository. 

`takemoney`
*	Alias: takebuck, takebucks. Removes a specified amount of money from a user. Usage: /takemoney [user], [amount].

`tell`
*	Send a message to an offline user that will be received when they log in. Usage: /tell [user], [message].

`tickets`
*	Splits a target in the form `<user>, <message>` into its constituent parts.
	Returns `<message>`, and sets `this.targetUser` to the user, and
	`this.targetUsername` to the username.

`toggleemoticons`
*	Alias: toggleemote, toggleemotes. Toggles emoticons displaying or not in a particular chatroom. Usage: /toggleemoticons on 		        
  /toggleemoticons off.

`transfermoney`
*	Alias: transfer, transferbuck, transferbucks. Transfers money from the user to another user. /usage transfer [user], [amount]

`ud`
*	Alias: u, urbandefine. Displays the Urban Dictionary definition for a word. Usage: /ud [word].

`wallet`
*	Alias: atm, purse. Shows the amount of money a user has. Usage: /wallet [user] /wallet.


Pokemon Showdown Commands API 
------------------------------------------------------------------------
If you are looking for the PS Commands API refer to this page from the main PS repository. 
[PS Commands API](https://github.com/Zarel/Pokemon-Showdown/blob/master/chat-plugins/COMMANDS.md)
