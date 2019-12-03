import Telegraf from 'telegraf';
import session from 'telegraf/session';
import Stage from 'telegraf/stage';
import start from './controllers/start';
import currFrom from './controllers/currFrom';
import curTo from './controllers/curTo';
import amount from './controllers/amount';
import addInfo from './controllers/addInfo';
import checkData from './controllers/checkData';
import estimateExchange from './controllers/estimateExchange';
import checkAgree from './controllers/checkAgree';
import getAddress from './controllers/getAddr';
import { messages } from './messages';
import { getMainKeyboard } from './keyboards';
import { cancelTradeAction, handleStartAction } from './actions';
import { config } from './config';

const bot = new Telegraf(process.env.API_BOT_KEY);

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
bot.start(ctx => ctx.reply(messages.startMsg, getMainKeyboard(ctx)));
bot.hears(/Start exchange/, ctx => ctx.scene.enter('curr_from'));
bot.hears(/Start new exchange/, ctx => ctx.scene.enter('curr_from'));
bot.hears(/Read and Accept/, async ctx => await handleStartAction(ctx));

bot.hears(config.kb.cancel, ctx => cancelTradeAction(ctx));

bot.startPolling();

export default bot;