//estimateExchange  scene
import Scene from 'telegraf/scenes/base';
import { saveToSession, pause, getAmountTotal } from '../helpers';
import { getExchAmount } from '../api';
import { typeWalletAction, cancelTradeAction } from '../actions';
import { getAmountKeyboard, getMainKeyboard } from '../keyboards';
import { config } from '../config';

const estimateExchange = new Scene('est_exch');

estimateExchange.enter(async (ctx) => {
  console.log('in estimateExchange scene');
  const amount = ctx.session.amount;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const fromTo = `${curFrom}_${curTo}`;
  const amountTotal = await getAmountTotal(amount, fromTo);
  saveToSession(ctx, 'amountTotal', amountTotal);
  await pause(1000);
  ctx.replyWithHTML(`You’re sending <b>${amount} ${curFrom}</b> and you’ll get ~<b>${amountTotal} ${curTo}</b>.\nEnter the recipient’s <b>${curTo}</b> address`, getAmountKeyboard(ctx));
});


estimateExchange.hears([/(.*)/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('amount');
    return;
  }
  if (config.kb.cancel === txt) {
    ctx.reply(
      'Your exchange is canceled. Do you want to start a new exchange?',
      getMainKeyboard(ctx)
    );
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    ctx.reply(
      'If you have any questions about your exchange, please contact our support team via email:'
    );
    await pause(500);
    ctx.reply('support@changenow.io');
    return;
  }
  if (txt.match(/[^()A-Za-z0-9\s]+/gi)) {
    ctx.reply('Please, use only Latin letters');
    return;
  }
  if (txt.match(/[()A-Za-z0-9\s]+/gi)) {
    await typeWalletAction(ctx);
  }
});


export default estimateExchange;