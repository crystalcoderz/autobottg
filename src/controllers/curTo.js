// Currency To scene
import Scene from 'telegraf/scenes/base';
import { messages } from '../messages';
import { getToKeyboard, getReplyKeyboard } from '../keyboards';
import { selectToCurrencyAction, cancelTradeAction } from '../actions';
import { config } from '../config';
import { pause, startHandler } from '../helpers';

const curTo = new Scene('curr_to');

curTo.enter(ctx => {
  ctx.replyWithHTML(messages.selectToMsg, getToKeyboard(ctx));
});

curTo.command('start', ctx => startHandler(ctx));
curTo.hears([/(.*)/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('curr_from');
    return;
  }
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
  if (txt.match(/^[\u{2705}]/gu)) {
    ctx.reply(messages.sameCurErr);
    return;
  }
  if (txt.match(/[^()A-Za-z\s]+/gi)) {
    ctx.reply(messages.validErr);
    return;
  }
  if (txt.match(/[()A-Za-z\s]+/gi)) {
    await selectToCurrencyAction(ctx);
  }
});

export default curTo;
