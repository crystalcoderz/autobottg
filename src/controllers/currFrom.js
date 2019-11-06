// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler } from '../helpers';
import { messages } from '../messages';
import { getFromKeyboard } from '../keyboards';
import { selectFromCurrencyAction } from '../actions';
import { config } from '../config';

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

const currFrom = new Scene('curr_from');

currFrom.enter(handler(async (ctx) => {
  console.log('in curr_from scene');
  const currs = await ctx.session.currs;
  await ctx.replyWithHTML(messages.selectFromMsg, getFromKeyboard(currs));
}));

// currFrom.action(/name/, ctx => selectFromCurrencyAction(ctx, 'btn'));
currFrom.hears(/[A-Za-z]/gi, ctx => selectFromCurrencyAction(ctx, 'text'));
const { btc, eth, bch, ltc, xmr, zec }  = config.popularCurrs;

currFrom.hears(btc, ctx => selectFromCurrencyAction(ctx, 'text'));
currFrom.hears(eth, ctx => selectFromCurrencyAction(ctx, 'text'));
currFrom.hears(bch, ctx => selectFromCurrencyAction(ctx, 'text'));
currFrom.hears(ltc, ctx => selectFromCurrencyAction(ctx, 'text'));
currFrom.hears(xmr, ctx => selectFromCurrencyAction(ctx, 'text'));
currFrom.hears(zec, ctx => selectFromCurrencyAction(ctx, 'text'));
currFrom.hears(config.kb.cancel, leave());

export default currFrom;