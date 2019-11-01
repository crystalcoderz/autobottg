// Currency To scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler } from '../helpers';
import { messages } from '../messages';
import { getCurrenciesKeyboard } from '../keyboards';
import { selectToCurrencyAction } from '../actions';

const curTo = new Scene('curr_to');

curTo.enter(handler(async (ctx) => {
  console.log('in curr_to scene');
  await ctx.reply(messages.selectToMsg, getCurrenciesKeyboard(ctx.session.currs));
  // await ctx.reply('', backKeyboard);
}));

curTo.action(/name/, ctx => selectToCurrencyAction(ctx, 'btn'));
curTo.hears(/[A-Za-z]/gi, ctx => selectToCurrencyAction(ctx, 'text'));

curTo.hears('Back', leave('curr_to'));
curTo.hears('Cancel', leave());

export default curTo;