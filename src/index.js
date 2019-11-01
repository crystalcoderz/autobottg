import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import session from 'telegraf/session';
import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import Stage from 'telegraf/stage';
import TelegrafInlineMenu from 'telegraf-inline-menu';
import { messages } from './messages';

import { getAllCurrencies, getExchAmount } from './api';
import {
  handler,
  saveToSession,
  deleteFromSession,
  convertAndCheckCurr,
  validatePair,
  getMinimumAmount
} from './helpers';

import {
  getMainKeyboard,
  backKeyboard,
  getCurrenciesKeyboard,
  getAgreeButton
} from './keyboards';

import start from './controllers/start';
import currFrom from './controllers/currFrom';
import curTo from './controllers/curTo';
import amount from './controllers/amount';
import checkData from './controllers/checkData';
import estimateExchange from './controllers/estimateExchange';
import checkAgree from './controllers/checkAgree';
import getAddress from './controllers/getAddr';

const { enter, leave } = Stage;
const expressApp = express();

const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.API_KEY);

// Create scene manager

const stage = new Stage([
  start,
  currFrom,
  curTo,
  amount,
  checkData,
  estimateExchange,
  checkAgree,
  getAddress
]);
bot.use(session());
bot.use(stage.middleware());

stage.hears('Cancel', leave());


//--------------------------- BOT-----------------------------------------------

bot.start(handler(async (ctx) => await ctx.reply(messages.startMsg, getMainKeyboard(ctx))) );

bot.hears('Start exchange', handler(async (ctx) => ctx.scene.enter('start') ) );
// bot.hears('Cancel', leave());

bot.telegram.setWebhook('https://9f5a4511.ngrok.io/secret-path');

// const webhookStatus = await bot.telegram.getWebhookInfo();
// console.log('Webhook status', webhookStatus);

bot.catch((err) => {
  console.log('Ooops', err)
})

//--------------------------- Server -----------------------------------------------

expressApp.use(bot.webhookCallback('/secret-path'))
expressApp.use(morgan('combined'));

expressApp.get('/', function (req, res) {
  res.send('Hello World!');
});


expressApp.listen(6000, () => {
  console.log('Server listening on 6000');
})
