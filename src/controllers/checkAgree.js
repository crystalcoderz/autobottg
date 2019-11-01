//checkAgree scene
import Scene from 'telegraf/scenes/base';
import { agreePressAction } from '../actions';
import { getAgreeButton } from '../keyboards';

const checkAgree = new Scene('agree');

checkAgree.enter(async (ctx) => {
  console.log('in checkAgree scene');
  const amount = await ctx.session.amount;
  const amountTotal = await ctx.session.amountTotal;
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const walletCode = await ctx.session.walletCode;

  await ctx.reply(`
    You’re sending ${amount} ${curFrom} and you’ll get ${amountTotal} ${curTo}\nYour recipient’s ${curTo} address is ${walletCode}\nYour Memo ID is *numbers*.\n\nPlease, check all the information. If everything is correct, tap on the “Confirm” button below.`,
    getAgreeButton(ctx));
});

checkAgree.action(/confirm/, ctx => agreePressAction(ctx));

export default checkAgree;