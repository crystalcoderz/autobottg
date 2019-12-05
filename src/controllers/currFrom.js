// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { leave } = Stage;
import { pause, startHandler } from '../helpers';
import { messages } from '../messages';
import { getAllCurrencies } from '../api';
import { getFromKeyboard, getReplyKeyboard } from '../keyboards';
import { selectFromCurrencyAction, cancelTradeAction } from '../actions';
import { config } from '../config';

const currFrom = new Scene('curr_from');

currFrom.enter(async ctx => {
  const currs = ctx.session.currs || await getAllCurrencies();
  await ctx.replyWithHTML(messages.selectFromMsg, getFromKeyboard(currs));
});

currFrom.command('start', async ctx => await startHandler(ctx));
currFrom.hears([/(.*)/gi, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.cancel === txt) {
    await ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    await cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    await ctx.reply(messages.support);
    await pause(500);
    await ctx.reply(config.email);
    return;
  }
  if (txt.match(/[^()A-Za-z\s]+/gi)) {
    await ctx.reply(messages.validErr);
    return;
  }
  if (txt.match(/[()A-Za-z\s]+/gi)) {
    await selectFromCurrencyAction(ctx);
  }
});

currFrom.command('start', leave());

export default currFrom;
