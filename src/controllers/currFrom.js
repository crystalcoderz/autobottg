// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler } from '../helpers';
import { messages } from '../messages';
import { getCurrenciesKeyboard, getAgreeButton } from '../keyboards';
import { selectFromCurrencyAction } from '../actions';

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

const currFrom = new Scene('curr_from');

const log = (data) => {
  console.log(data)
}

currFrom.enter(handler(async (ctx) => {
  console.log('in curr_from scene');
  const currs = await ctx.session.currs;
  await ctx.reply(messages.selectFromMsg, getCurrenciesKeyboard(currs));
}));

currFrom.action(/name/, ctx => selectFromCurrencyAction(ctx, 'btn'));
currFrom.hears(/[A-Za-z]/gi, ctx => selectFromCurrencyAction(ctx, 'text'));

// curFrom.leave((ctx) => ctx.reply(messages.leaveMsg));
// curFrom.hears('Back', leave('curr_from'));
currFrom.hears('Cancel', leave());

export default currFrom;