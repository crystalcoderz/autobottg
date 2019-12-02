// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler, deleteFromSession, pause, startHandler } from '../helpers';
import { messages } from '../messages';
import { getFromKeyboard, getMainKeyboard, getReplyKeyboard } from '../keyboards';
import { selectFromCurrencyAction, cancelTradeAction } from '../actions';
import { config } from '../config';

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

const currFrom = new Scene('curr_from');

currFrom.enter(async ctx => {
  console.log('in curr from scene');
  const currs = ctx.session.currs;
  await ctx.replyWithHTML('', getFromKeyboard(currs));
});
//messages.selectFromMsg
currFrom.command('start', ctx => startHandler(ctx));
currFrom.hears([/(.*)/gi, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.cancel === txt) {
    await ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    await ctx.reply(messages.support);
    await pause(500);
    await ctx.reply(process.env.CN_EMAIL);
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
