//estimateExchange  scene
import Scene from 'telegraf/scenes/base';
import { saveToSession, pause, getAmountTotal, startHandler } from '../helpers';
import { typeWalletAction, cancelTradeAction } from '../actions';
import { getAmountKeyboard, getReplyKeyboard } from '../keyboards';
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
  await ctx.replyWithHTML(
    `You’re sending <b>${amount} ${curFrom.toUpperCase()}</b>; you’ll get ~<b>${amountTotal} ${curTo.toUpperCase()}</b>.\nEnter the recipient <b>${curTo.toUpperCase()}</b> wallet address.`,
    getAmountKeyboard(ctx)
  );
});

estimateExchange.command('start', async ctx => await startHandler(ctx));
estimateExchange.hears([/(.*)/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    await ctx.scene.enter('amount');
    return;
  }
  if (config.kb.cancel === txt) {
    await ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    await cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    await ctx.reply(messages.support);
    await pause(500);
    await ctx.reply(process.env.CN_EMAIL);
    return;
  }
  if (txt.match(/[^()A-Za-z0-9\s]+/gi)) {
    await ctx.reply(messages.validErr);
    return;
  }
  if (txt.match(/[()A-Za-z0-9\s]+/gi)) {
    await typeWalletAction(ctx);
  }
});

export default estimateExchange;
