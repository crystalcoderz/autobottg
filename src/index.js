import express from 'express';
import morgan from 'morgan';
import rp from 'request-promise';
import fs from 'fs';
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
import { getMainKeyboard, backKeyboard, getCurrenciesKeyboard, getAgreeButton } from './keyboards';
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
    addInfo,
    checkData,
    estimateExchange,
    checkAgree,
    getAddress
  ]);
  bot.use(session());
  bot.use(stage.middleware());
  const logger = async (ctx, next) => {
    const start = new Date();
    console.log(ctx.from.first_name);
    await next(ctx);
  };
  bot.use(logger);
  bot.start(ctx => ctx.reply(messages.startMsg, getMainKeyboard(ctx)));
  bot.hears(/Start trading/, (ctx) => handleStartAction(ctx));

  bot.hears(config.kb.cancel, ctx => cancelTradeAction(ctx));
  // const webhookStatus = await bot.telegram.getWebhookInfo();
  // console.log('Webhook status', webhookStatus);
  bot.catch(err => {
    console.log('Ooops', err);
  });

});

function startDevMode(bot) {
  rp(`https://api.telegram.org/bot${process.env.API_KEY}/deleteWebhook`).then(() =>
    bot.startPolling()
  );
}

async function startProdMode(bot) {
  console.log('TCL: startProdMode -> startProdMode');
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
  expressApp.use(bot.webhookCallback('/exchange-bot'));
  process.env.NODE_ENV === 'production' ? startProdMode(bot) : startDevMode(bot);
  expressApp.use(morgan('combined'));
  expressApp.listen(process.env.APP_PORT, () => {
    console.log(`Server listening on ${process.env.APP_PORT}`);
  });
}
startApp();

const getHandle = async (req, res) => {
    const replyKb = {
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        keyboard: [
          ['Start exchange'],
        ],
      },
    };
    await getIpAction(req);
    await pause(1000);
    bot.telegram.sendMessage(req.query.id, 'You have agreed to the Terms of Use and Privacy Policy. To start an exchange, please, tap on the button below', replyKb);
    res.redirect(301, 'https://changenow.io/terms-of-use');
};

expressApp.get('/continue/:id', getHandle);
