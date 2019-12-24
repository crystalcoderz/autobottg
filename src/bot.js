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
import { getBackKeyboard, getMainKeyboard, getReplyKeyboard } from './keyboards';
import scenes from './constants/scenes';
import buttons from './constants/buttons';
import UserModel from './models/User';
import { captureMessage, captureException } from '@sentry/node';
import { createAnswerByUpdateSubType } from './helpers';
import updateTypes from './constants/updateTypes';
import subTypes from './constants/updateSubTypes';

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

    await ctx.scene.leave();

    await ctx.reply(messages.cancel, getBackKeyboard());
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

bot.hears(messages.read, async ctx => {
  const { from } = ctx.message;
  const user = from;
  const { id: userId, username } = user;

  captureMessage(`username: ${username}`);

  ctx.session.userId = userId;
  ctx.session.tradingData = {};

  try {
    const userInDB = await UserModel.findOne({ userId: user.id });

    if (!userInDB) {
      await UserModel.create({ userId, username });
    }
  } catch (e) {
    captureException(e);
  }

  await ctx.scene.enter(scenes.start);
});

bot.on(updateTypes.message, async (ctx, next) => {
  const { updateSubTypes, message, scene } = ctx;

  const promises = updateSubTypes.map(async type => {
    if (type === subTypes.text) {

      if (message.text === messages.startNewExchange || message.text === messages.startExchange) {
        await ctx.scene.enter(scenes.currFrom);
        return;
      }

      await ctx.reply(messages.pressButton);
      return;
    }

    const textMessage = createAnswerByUpdateSubType(type);

    if (textMessage) {
      await ctx.reply(textMessage);
    }

    if (scene.current && scene.current.id === scenes.agree && ![buttons.back, buttons.confirm, buttons.help].includes(message.text)) {
      await ctx.reply(messages.pressButton);
    }

  });

  await Promise.all(promises);

  return next();
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
