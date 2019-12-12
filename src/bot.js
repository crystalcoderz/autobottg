import Telegraf from 'telegraf';
import RedisSession from 'telegraf-session-redis';
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
import rateLimit from 'telegraf-ratelimit';
import rp from 'request-promise';

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

const session = new RedisSession({
  store: {
    host: process.env.DB_SESSION_HOST || '127.0.0.1',
    port: process.env.DB_SESSION_PORT || 6379
  }
});

const limitConfig = {
  window: 1500,
  limit: 1
}

bot.use(rateLimit(limitConfig));
bot.use(session);
bot.use(stage.middleware());
bot.start(ctx => ctx.reply(messages.startMsg, getMainKeyboard(ctx)));
bot.hears(/Start exchange/, ctx => ctx.scene.enter('curr_from'));
bot.hears(/Start new exchange/, ctx => ctx.scene.enter('curr_from'));
bot.hears(/Read and Accept/, async ctx => await handleStartAction(ctx));

bot.hears(config.kb.cancel, ctx => cancelTradeAction(ctx));

bot.catch(err => {
  process.stderr.write(`${err}`);
});

if(process.env.NODE_ENV === 'development') startDevMode(bot);
if(process.env.NODE_ENV === 'production') startProdMode(bot);

function startDevMode(bot) {
  rp(`https://api.telegram.org/bot${process.env.API_BOT_KEY}/deleteWebhook`).then(() =>
    bot.startPolling()
  );
}

async function startProdMode(bot) {
  await bot.telegram.setWebhook(
    `${process.env.APP_HOST}/webhook`,
    {
      source: '/etc/letsencrypt/live/cn-bot.evercodelab.com/cert.pem'
    }
  );
}


export default bot;