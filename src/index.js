import express from 'express';
import morgan from 'morgan';
import rp from 'request-promise';
import fs from 'fs';
// import bodyParser from 'body-parser';
import path from 'path';
import 'dotenv/config';
import session from 'telegraf/session';
import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import Stage from 'telegraf/stage';
import TelegrafInlineMenu from 'telegraf-inline-menu';
import { messages } from './messages';
import { config } from './config';
const Telegram = require('telegraf/telegram');
import mongoose from 'mongoose';
import { connectDatabase } from './connectDB';
import { getAllCurrencies, getExchAmount } from './api';
import {
  handler,
  saveToSession,
  deleteFromSession,
  convertAndCheckCurr,
  validatePair,
  getMinimumAmount
} from './helpers';
import { getMainKeyboard, backKeyboard, getCurrenciesKeyboard, getAgreeButton, replyKeyboard } from './keyboards';
import { handleStartAction, cancelTradeAction, getIpAction } from './actions';
import start from './controllers/start';
import currFrom from './controllers/currFrom';
import curTo from './controllers/curTo';
import amount from './controllers/amount';
import checkData from './controllers/checkData';
import estimateExchange from './controllers/estimateExchange';
import checkAgree from './controllers/checkAgree';
import getAddress from './controllers/getAddr';
import addInfo from './controllers/addInfo';
import { pause } from './helpers';
import { getAmountKeyboard } from './keyboards';

const { enter, leave } = Stage;

const expressApp = express();
// expressApp.use(bodyParser.urlencoded({
//   extended: true
// }));
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.API_BOT_KEY);

//  ------------------ APPLICATION ------------------

mongoose.connection.on('open', () => {
  const stage = new Stage([
    start,
    currFrom,
    curTo,
    amount,
    addInfo,
    checkData,
    estimateExchange,
    checkAgree,
    getAddress
  ]);
  bot.use(session());
  bot.use(stage.middleware());
  // const logger = async (ctx, next) => {
  //   console.log(ctx.from.first_name);
  //   await next(ctx);
  // };
  // bot.use(logger);
  bot.start(ctx => ctx.reply(messages.startMsg, getMainKeyboard(ctx)));
  bot.hears(/Start exchange/, ctx => ctx.scene.enter('curr_from'));
  bot.hears(/Start new exchange/, ctx => ctx.scene.enter('curr_from'));
  bot.hears(/Read and Accept/, ctx => handleStartAction(ctx));

  bot.hears(config.kb.cancel, ctx => cancelTradeAction(ctx));
  bot.catch(err => {
    console.log('Error: ', err);
  });
});

function startDevMode(bot) {
  rp(`https://api.telegram.org/bot${process.env.API_BOT_KEY}/deleteWebhook`).then(() =>
    bot.startPolling()
  );
}

async function startProdMode(bot) {
  // const tlsOptions = {
  //   key: fs.readFileSync('./privkey.pem'),
  //   cert: fs.readFileSync('./fullchain.pem')
  // };
  try {
    await bot.telegram.setWebhook(
      `https://${process.env.APP_WEBHOOK}/exchange-bot`
      // {
      //   source: '../privkey.pem'
      // }
    );
  } catch (err) {
    console.log(err);
  }
}

//--------------------------- Server -----------------------------------------------

export async function startApp() {
  await connectDatabase(process.env.DB_HOST, process.env.DB_PORT, process.env.DB_NAME);
  process.env.NODE_ENV === 'production' ? startDevMode(bot) : startDevMode(bot);
  expressApp.use(morgan('combined'));
  expressApp.listen(process.env.APP_PORT, '127.0.0.1',() => {
    console.log(`Server listening on ${process.env.APP_PORT}`);
  });
}
startApp();

const getHandle = async (req, res) => {
  const replyKeyboard = {
    reply_markup: {
      resize_keyboard: true,
      one_time_keyboard: true,
      keyboard: [['Start exchange']]
    }
  };
  await getIpAction(req);
  await pause(1000);
  bot.telegram.sendMessage(
    req.query.id,
    messages.agreed,
    replyKeyboard
  );
  res.redirect(302, 'https://changenow.io/terms-of-use');
  return;
};

expressApp.get('/terms-of-use/', getHandle);

expressApp.get('*', (req, res) => {
    res.sendFile('404.html', {
        root: path.join(__dirname, './')
    })
})
