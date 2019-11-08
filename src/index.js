import express from 'express';
import morgan from 'morgan';
import 'dotenv/config';

import session from 'telegraf/session';
import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import Stage from 'telegraf/stage';
import TelegrafInlineMenu from 'telegraf-inline-menu';
import { messages } from './messages';
import { config } from './config';

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

import {
  getMainKeyboard,
  backKeyboard,
  getCurrenciesKeyboard,
  getAgreeButton
} from './keyboards';

import { handleStartAction, cancelTradeAction } from './actions';

import start from './controllers/start';
import currFrom from './controllers/currFrom';
import curTo from './controllers/curTo';
import amount from './controllers/amount';
import prepareData from './controllers/prepareData';
import checkData from './controllers/checkData';
import estimateExchange from './controllers/estimateExchange';
import checkAgree from './controllers/checkAgree';
import getAddress from './controllers/getAddr';

const { enter, leave } = Stage;
const expressApp = express();
const Telegraf = require('telegraf');
const bot = new Telegraf(process.env.API_KEY);

//  ------------------ APPLICATION ------------------

mongoose.connection.on('open', () => {

  // Create scene manager

  const stage = new Stage([
    start,
    currFrom,
    curTo,
    amount,
    prepareData,
    checkData,
    estimateExchange,
    checkAgree,
    getAddress
  ]);
  bot.use(session());
  bot.use(stage.middleware());

  const logger = async (ctx, next) =>  {
    const start = new Date();
    console.log(ctx.from.first_name);
    await next(ctx);
  }
  bot.use(logger);

  bot.start((ctx) => ctx.reply(messages.startMsg, getMainKeyboard(ctx)));

  bot.hears(/Start exchange/, ctx => handleStartAction(ctx) );
  bot.hears(config.kb.cancel, (ctx) => cancelTradeAction(ctx));
  bot.telegram.setWebhook(`https://${process.env.APP_DEVELOPMENT_WEBHOOK}/exchange-bot`);


  // const webhookStatus = await bot.telegram.getWebhookInfo();
  // console.log('Webhook status', webhookStatus);

  bot.catch((err) => {
    console.log('Ooops', err)
  })

});

//--------------------------- Server -----------------------------------------------

export async function startApp () {
  await connectDatabase(process.env.DB_DEVELOPMENT_HOST, process.env.DB_DEVELOPMENT_PORT, process.env.DB_DEVELOPMENT_NAME);
  expressApp.use(bot.webhookCallback('/exchange-bot'));
  expressApp.use(morgan('combined'));
  expressApp.listen(process.env.APP_DEVELOPMENT_PORT, () => {
    console.log(`Server listening on ${process.env.APP_DEVELOPMENT_PORT}`);
  })
}

startApp();

expressApp.get('/', function (req, res) {
  res.send('Hello World!');
});

// console.log(process.memoryUsage().heapTotal / 1024 / 1024);
