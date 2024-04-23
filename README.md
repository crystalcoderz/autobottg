# Evercode Exchange Bot

[Flow description](./FLOW.md)

## Description

@ChangeNOW_officialbot helps you to exchange cryptocurrency securely and anonymously. No ID, no registration. Just crypto exchange

## Requirements

- node `18+`
- redis
- mongodb

## Description of .env config parameters:

`NODE_ENV` - mode in which production or development application is launched (development/production)

`CN_API_URL` - URL for API ChahgeNOW usage, by default: https://changenow.io/api/v1

`CN_API_KEY` - API key provided by ChangeNOW

`REDIRECT_URL` - URL to redirect the user to the exchange Terms of Use and Privacy Policy page

`CN_EMAIL` - E-mail displayed in support message

`API_BOT_KEY` - Bot's key (token) in Telegram

`APP_PORT` - Port on which express application is launched (example: 4000)

`APP_HOST` - Host on which express application is launched

`WEBHOOK_PART` - Bot URL part (example: /bot)

`WEBHOOK_PORT` - Bot ports for its operation (Different from APP_PORT. example: 3000)

`APP_USE_CERTIFICATE` - Sets up the application to use SSL certificate, accepts value `true/false`

`DB_HOST` - Host on which MongoDB database is running

`DB_PORT` - Port on which MongoDB database is running

`DB_NAME` - Database name, by default: changenow_bot

`DB_USERNAME` - Database username

`DB_PASS` - Database user password

`DB_REDIS_HOST` - Host on which Redis is running

`DB_REDIS_PORT` - Port on which Redis is running

`SSL_CERTIFICATE_PATH` - Path to cert.pem on server, e.g. /etc/letsencrypt/live/yourdomain/cert.pem

## How to start

To start Exchange, just visit [Telegram](http://t.me/changeNOW_officialbot) and press /start!

## Server setup

1. Setup domain with SSL-certificate to let webhooks work
2. git clone https://github.com/EvercodeLab/whitelabel-evercode-tgbot.git
3. Install RedisDB (https://redis.io/) and insert parameters to .env
4. npm install
5. create _.env_ file and enter fields from .env.example
6. sh bot_start.sh

## Server autostart

1. sudo chmod +x bot_start.sh
2. sudo nano /lib/systemd/system/shellscript-bot.service
3. Paste:
   [Unit]
   Description=Telegram Bot Service
   After=multi-user.target
   [Service]
   Type=idle
   ExecStart=path-bot-folder/bot_start.sh
   [Install]
   WantedBy=multi-user.target

4. sudo systemctl daemon-reload
5. sudo systemctl enable shellscript-bot.service
6. sudo systemctl start shellscript-bot.service
7. sudo systemctl status shellscript-bot.service
8. see status

## Database setup

1. Install [mongodb](https://www.mongodb.com/docs/manual/installation/)
2. Set db name in DB_NAME .env parameter
3. Enter to `mongosh`
4. Create user and password in this db name (`db.createUser({user: "DB_USERNAME", pwd: "DB_PASS", roles: [ { role: "dbOwner", db: "NAME_DB" } ], passwordDigestor: "server" })`)
5. Set DB_USERNAME, DB_PASS & NAME_DB parameters

## Development setup

if you need build - `yarn build` & `yarn serverRun`
to quickly receive changes during development - it will be enough - `yarn start`
