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


curTo.hears([/(.*)/gi, config.kb.back, config.kb.cancel], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('curr_from');
    return;
  }
  if (config.kb.cancel === txt) {
    ctx.reply(
      'Your exchange is canceled. Do you want to start a new exchange?',
      getMainKeyboard(ctx)
    );
    ctx.scene.leave();
    return;
  }
  if (txt.match(/[^()A-Za-z\s]+/gi)) {
    ctx.reply('Please, use only Latin letters');
    return;
  }
  if (txt.match(/[()A-Za-z\s]+/gi)) {
    await selectToCurrencyAction(ctx);
  }
});

export default curTo;