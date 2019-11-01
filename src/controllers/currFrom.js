// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler } from '../helpers';
import { messages } from '../messages';
import { getCurrenciesKeyboard } from '../keyboards';
import { selectFromCurrencyAction } from '../actions';

const currFrom = new Scene('curr_from');

currFrom.enter(handler(async (ctx) => {
  console.log('in curr_from scene');
  await ctx.reply(messages.selectFromMsg, getCurrenciesKeyboard(ctx.session.currs));
  // await ctx.reply(messages.selectFromMsg);
  // await ctx.reply('', backKeyboard);
}));

currFrom.action(/name/, ctx => selectFromCurrencyAction(ctx, 'btn'));
currFrom.hears(/[A-Za-z]/gi, ctx => selectFromCurrencyAction(ctx, 'text'));

// curFrom.leave((ctx) => ctx.reply(messages.leaveMsg));
// curFrom.hears('Back', leave('curr_from'));
currFrom.hears('Cancel', leave());

export default currFrom;