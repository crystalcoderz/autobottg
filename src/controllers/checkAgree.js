//checkAgree scene
import Scene from 'telegraf/scenes/base';
import { agreePressAction } from '../actions';
import { getAgreeKeyboard } from '../keyboards';
import { config } from '../config';

const checkAgree = new Scene('agree');

checkAgree.enter(async (ctx) => {
  console.log('in checkAgree scene');
  const amount = await ctx.session.amount;
  const amountTotal = await ctx.session.amountTotal;
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const walletCode = await ctx.session.walletCode;
  const addData = await ctx.session.addData;
  const addDataName = await ctx.session.addDataName;

  const addMsg = addData ? `Your ${addDataName} is ${addData}\n`: '';

  await ctx.replyWithHTML(`
    You’re sending <b>${amount} ${curFrom}</b> and you’ll get <b>${amountTotal} ${curTo}</b>\nYour recipient’s <b>${curTo}</b> address is <b>${walletCode}</b>\n${addMsg}\nPlease, check all the information. If everything is correct, tap on the “Confirm” button below.`,
    getAgreeKeyboard(ctx));
});

checkAgree.hears(config.kb.confirm, ctx => agreePressAction(ctx));
checkAgree.hears(config.kb.back, ctx => ctx.scene.enter('est_exch'));

export default checkAgree;