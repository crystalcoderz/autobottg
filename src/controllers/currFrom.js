// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler, deleteFromSession, pause } from '../helpers';
import { messages } from '../messages';
import { getFromKeyboard, getMainKeyboard, getReplyKeyboard } from '../keyboards';
import { selectFromCurrencyAction, cancelTradeAction } from '../actions';
import { config } from '../config';

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

const currFrom = new Scene('curr_from');

currFrom.enter(ctx => {
  console.log('in start scene');
  const currs = ctx.session.currs;
  ctx.replyWithHTML(messages.selectFromMsg, getFromKeyboard(currs));
});

currFrom.hears([/(.*)/gi, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.cancel === txt) {
    ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    ctx.reply(messages.support);
    await pause(500);
    ctx.reply(process.env.CN_EMAIL);
    return;
  }
  if (txt.match(/[^()A-Za-z\s]+/gi)) {
    ctx.reply(messages.validErr);
    return;
  }
  if (txt.match(/[()A-Za-z\s]+/gi)) {
    await selectFromCurrencyAction(ctx);
  }
});

export default currFrom;
