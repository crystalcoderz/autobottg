//estimateExchange  scene
import Scene from 'telegraf/scenes/base';
import { saveToSession } from '../helpers';
import { getExchAmount } from '../api';
import { typeWalletAction } from '../actions';

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
  await ctx.reply(`You’re sending ${amount} ${curFrom} and you’ll get ${amountTotal} ${curTo}.\nEnter the recipient’s ${curTo} address`);
});

estimateExchange.hears(/^[A-Za-z0-9]+$/gi, ctx => typeWalletAction(ctx));

export default estimateExchange;