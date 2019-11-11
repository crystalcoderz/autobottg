// Currency To scene
import Scene from 'telegraf/scenes/base';
import { messages } from '../messages';
import { getToKeyboard, getMainKeyboard } from '../keyboards';
import { selectToCurrencyAction } from '../actions';
import { config } from '../config';

const curTo = new Scene('curr_to');

curTo.enter((ctx) => {
  ctx.replyWithHTML(messages.selectToMsg, getToKeyboard(ctx));
});

curTo.hears([/[A-Za-z]+/i, config.kb.back, config.kb.cancel], async ctx => {
  if (config.kb.back === ctx.message.text) {
    ctx.scene.enter('curr_from');
    return;
  }
  if(config.kb.cancel === ctx.message.text) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  await selectToCurrencyAction(ctx)
});

export default curTo;