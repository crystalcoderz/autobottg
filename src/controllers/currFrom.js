// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler, deleteFromSession } from '../helpers';
import { messages } from '../messages';
import { getFromKeyboard, getMainKeyboard } from '../keyboards';
import { selectFromCurrencyAction } from '../actions';
import { config } from '../config';

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

const currFrom = new Scene('curr_from');

currFrom.enter(ctx => {
  console.log('in curr_from scene');
  const currs = ctx.session.currs;
  ctx.replyWithHTML(messages.selectFromMsg, getFromKeyboard(currs));
});

currFrom.hears([/[A-Za-z]+/i, config.kb.back, config.kb.cancel], async (ctx) => {
  if (config.kb.back === ctx.message.text) {
    ctx.scene.enter('curr_from');
    return;
  }
  if(config.kb.cancel === ctx.message.text) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  await selectFromCurrencyAction(ctx);
});

const { btc, eth, bch, ltc, xmr, zec }  = config.popularCurrs;

// currFrom.hears(btc, ctx => selectFromCurrencyAction(ctx));
// currFrom.hears(eth, ctx => selectFromCurrencyAction(ctx));
// currFrom.hears(bch, ctx => selectFromCurrencyAction(ctx));
// currFrom.hears(ltc, ctx => selectFromCurrencyAction(ctx));
// currFrom.hears(xmr, ctx => selectFromCurrencyAction(ctx));
// currFrom.hears(zec, ctx => selectFromCurrencyAction(ctx));

export default currFrom;