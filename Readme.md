
# Changenow Bot

## Description

@ChangeNOW_officialbot helps you to exchange cryptocurrency securely and anonymously. No ID, no registration. Just crypto exchange

## How to start

To start using Exchange, simply add her in [Telegram](http://t.me/changeNOW_officialbot_) and press /start!

## Server setup

1. git clone https://github.com/EvercodeLab/changenow-bot.git
2. cd changenow-bot
3. npm install
4. create hidden _.env_ file with fields:
```
  API_KEY={get from manager}
  APP_PORT=6000
  DB_HOST=localhost
  DB_PORT=27017
  DB_NAME=changenow_bot

```
5. npm run start

П.С. Планируется использовать webhook для работы бота. Для этого заранее установить для production домена ssl-сертфикиат.
Если сертификат будет самописный - нужны будут пути к .pem файлам на сервере.
