// Currency To scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { handler, deleteFromSession } from '../helpers';
import { messages } from '../messages';
import { getToKeyboard, getMainKeyboard } from '../keyboards';
import { selectToCurrencyAction } from '../actions';
import { config } from '../config';

const curTo = new Scene('curr_to');

curTo.enter(handler(async (ctx) => {
  console.log('in curr_to scene');
  await deleteFromSession(ctx, 'curTo');
  console.log(ctx.session.curFrom);
  console.log(ctx.session.curTo);
  await ctx.replyWithHTML(messages.selectToMsg, getToKeyboard(ctx.session.currs));
}));

curTo.hears([/[A-Za-z]+/i, config.kb.back, config.kb.cancel], ctx => {
  if (config.kb.back === ctx.message.text) {
    ctx.scene.enter('curr_from');
    return;
  }
  if(config.kb.cancel === ctx.message.text) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  selectToCurrencyAction(ctx)
});

// curTo.leave(ctx => ctx.reply('', getMainKeyboard(ctx)));
// curTo.hears(config.kb.back, ctx => ctx.scene.enter('curr_from'));

export default curTo;