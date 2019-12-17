import Telegraf from 'telegraf';
import rp from 'request-promise';
import RedisSession from 'telegraf-session-redis';
import Stage from 'telegraf/stage';
import start from './controllers/start';
import currFrom from './controllers/currFrom';
import curTo from './controllers/curTo';
import amount from './controllers/amount';
import addInfo from './controllers/addInfo';
import estimateExchange from './controllers/estimateExchange';
import checkAgree from './controllers/checkAgree';
import { messages } from './messages';
import { getMainKeyboard, getReplyKeyboard } from './keyboards';
import scenes from './constants/scenes';
import buttons from './constants/buttons';
import UserModel from './models/User';

export const bot = new Telegraf(process.env.API_BOT_KEY);

const stage = new Stage([
  start,
  currFrom,
  curTo,
  amount,
  addInfo,
  estimateExchange,
  checkAgree,
]);

const session = new RedisSession({
  store: {
    host: process.env.DB_REDIS_HOST || '127.0.0.1',
    port: process.env.DB_REDIS_PORT || 6379,
  }
});

stage.hears([buttons.help, buttons.cancel], async ctx => {
  const { text } = ctx.message;

  if (!ctx.session && text !== buttons.help) {
    await ctx.reply(messages.startMsg, getReplyKeyboard());
    return;
  }

  if (ctx.session && !ctx.session.userId && text !== buttons.help) {
    stage.session = null;
    await ctx.reply(messages.startMsg, getReplyKeyboard());
    return;
  }

  if (text === buttons.help) {
    await ctx.reply(`${messages.support}\n${process.env.CN_EMAIL}`);
    return;
  }

  if (text === buttons.cancel) {

    ctx.session.tradingData = {};

    await ctx.scene.enter(scenes.currFrom);
  }
});

stage.command('start', async (ctx, next) => {
  await ctx.scene.leave();
  return next();
});

bot.use(session);

bot.use(stage.middleware());

bot.start(async ctx => {
  await ctx.reply(messages.startMsg, getMainKeyboard());
});

bot.hears(/Start exchange/, async ctx => await ctx.scene.enter(scenes.currFrom));

bot.hears(/Start new exchange/, async ctx => await ctx.scene.enter(scenes.currFrom));

bot.hears(/Read/, async ctx => {
  const { from } = ctx.message;
  const user = from;
  const { id: userId, username } = user;

  ctx.session.userId = userId;
  ctx.session.tradingData = {};

  const userInDB = await UserModel.findOne({ userId: user.id });

  if (!userInDB) {
    await UserModel.create({ userId, username });
  }

  await ctx.scene.enter(scenes.start);
});

export async function initBot() {
  if (process.env.NODE_ENV === 'development') {
    rp(`https://api.telegram.org/bot${process.env.API_BOT_KEY}/deleteWebhook`).then(() =>
      bot.startPolling()
    );
  } else {
    await bot.telegram.setWebhook(
      `${process.env.APP_HOST}/webhook`,
      {
        source: process.env.SSL_CERTIFICATE_PATH
      }
    );
  }
}
