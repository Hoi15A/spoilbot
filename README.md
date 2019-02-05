# Spoilbot [![Bot Invite](https://img.shields.io/badge/invite-Spoilbot%236163-7289DA.svg?style=for-the-badge)](https://discordapp.com/oauth2/authorize?client_id=542376958181376030&scope=bot&permissions=11328) [![Travis Build](https://img.shields.io/travis/com/Hoi15A/spoilbot.svg?style=for-the-badge)](https://travis-ci.com/Hoi15A/spoilbot) [![Code Style](https://img.shields.io/badge/code--style-standard-brightgreen.svg?style=for-the-badge)](https://standardjs.com)

A Discord bot that can reveal multiple spoliers quickly for you.

<hr>

## Setup
### Configuration
Create a `.env` file and set the following values:
```
TOKEN=bot_token
EMOTE=🔍
BOT_OWNER=user_id
```
Then just run `npm i` to install dependencies and run with `npm start`


The bot will now watch out for messages containing two or more spoilers and add a reaction that allows for showing all at once without having to click on every spoiler manually.
