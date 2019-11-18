//estimateExchange  scene
import Scene from 'telegraf/scenes/base';
import { saveToSession, pause, getAmountTotal } from '../helpers';
import { getExchAmount } from '../api';
import { typeWalletAction, cancelTradeAction } from '../actions';
import { getAmountKeyboard, getMainKeyboard } from '../keyboards';
import { config } from '../config';
import { messages } from '../messages';

const estimateExchange = new Scene('est_exch');

estimateExchange.enter(async ctx => {
  const amount = ctx.session.amount;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const fromTo = `${curFrom}_${curTo}`;
  const amountTotal = await getAmountTotal(amount, fromTo);
  saveToSession(ctx, 'amountTotal', amountTotal);
  await pause(1000);
  ctx.replyWithHTML(
    `You’re sending <b>${amount} ${curFrom}</b> and you’ll get ~<b>${amountTotal} ${curTo}</b>.\nEnter the recipient’s <b>${curTo}</b> address`,
    getAmountKeyboard(ctx)
  );
});

estimateExchange.hears([/(.*)/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('amount');
    return;
  }
  if (config.kb.cancel === txt) {
    ctx.reply(messages.cancel, getMainKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    ctx.reply(messages.support);
    await pause(500);
    ctx.reply(process.env.CN_EMAIL);
    return;
  }
  if (txt.match(/[^()A-Za-z0-9\s]+/gi)) {
    ctx.reply(messages.validErr);
    return;
  }
  if (txt.match(/[()A-Za-z0-9\s]+/gi)) {
    await typeWalletAction(ctx);
  }
});

export default estimateExchange;
