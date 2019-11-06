// Currency To scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler } from '../helpers';
import { messages } from '../messages';
import { getToKeyboard } from '../keyboards';
import { selectToCurrencyAction } from '../actions';
import { config } from '../config';

const curTo = new Scene('curr_to');

curTo.enter(handler(async (ctx) => {
  console.log('in curr_to scene');
  await ctx.replyWithHTML(messages.selectToMsg, getToKeyboard(ctx.session.currs));
}));

curTo.action(/name/, ctx => selectToCurrencyAction(ctx, 'btn'));
curTo.hears(/[A-Za-z]/gi, ctx => selectToCurrencyAction(ctx, 'text'));

curTo.hears(config.kb.back, ctx => ctx.scene.enter('curr_from'));

export default curTo;