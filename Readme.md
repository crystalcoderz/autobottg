
# Changenow Bot

## Description

@ChangeNOW_officialbot helps you to exchange cryptocurrency securely and anonymously. No ID, no registration. Just crypto exchange

## How to start

To start Exchange, just visit [Telegram](http://t.me/changeNOW_officialbot_) and press /start!

## Server setup

1. Setup domain with SSL-certificate
2. git clone https://github.com/EvercodeLab/changenow-bot.git
3. cd changenow-bot
4. npm i @babel/core @babel/node @babel/preset-env -g
5. install mongodb (https://docs.mongodb.com/v4.0/administration/install-on-linux/) and enter `DB_HOST`, `DB_PORT`, `DB_NAME` from .env
6. npm install
7. Enter fields from _.env_ file
8. npm run start

## Development setup

1. git clone https://github.com/EvercodeLab/changenow-bot.git
2. cd changenow-bot
3. install mongodb (https://docs.mongodb.com/v4.0/administration/install-on-linux/) and enter `DB_HOST`, `DB_PORT`, `DB_NAME` from .env
4. npm install
5. Create _.env_ file
6. npm run dev

**.env:**
```
  CN_API_URL=https://changenow.io/api/v1
  CN_API_KEY={get from manager}
  CN_EMAIL=support@changenow.io
  API_BOT_KEY={get from manager}

  APP_HOST={your domain}
  APP_PORT=4000
  APP_WEBHOOK={webhook domain in case you use webhooks}
  DB_HOST=127.0.0.1(@same server)
  DB_PORT=27017
  DB_NAME=changenow_bot

```

Tip: Use `dev` branch for testing environment!



