//estimateExchange  scene
import Scene from 'telegraf/scenes/base';
import { saveToSession } from '../helpers';
import { getExchAmount } from '../api';
import { typeWalletAction } from '../actions';
import { getAmountKeyboard } from '../keyboards';
import { config } from '../config';

const estimateExchange = new Scene('est_exch');

estimateExchange.enter(async (ctx) => {
  console.log('in estimateExchange scene');
  const amount = await ctx.session.amount;
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const fromTo = `${curFrom}_${curTo}`;
  const amountReq = await getExchAmount(amount, fromTo);
  const amountTotal = amountReq.estimatedAmount;
  saveToSession(ctx, 'amountTotal', amountTotal);
  await ctx.replyWithHTML(`You’re sending <b>${amount} ${curFrom}</b> and you’ll get <b>${amountTotal} ${curTo}</b>.\nEnter the recipient’s <b>${curTo}</b> address`, getAmountKeyboard(ctx));
});

estimateExchange.hears(/^[A-Za-z0-9]+$/gi, ctx => typeWalletAction(ctx));
estimateExchange.hears(config.kb.back, ctx => ctx.scene.enter('amount'));

export default estimateExchange;