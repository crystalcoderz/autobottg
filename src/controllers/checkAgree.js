//checkAgree scene
import Scene from 'telegraf/scenes/base';
import { agreePressAction } from '../actions';
import { getAgreeKeyboard } from '../keyboards';
import { config } from '../config';
import { pause, getAmountTotal } from '../helpers';
import { messages } from '../messages';

const checkAgree = new Scene('agree');

checkAgree.enter(async ctx => {
  const amount = ctx.session.amount;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const walletCode = ctx.session.walletCode;
  const addData = ctx.session.addData;
  const addDataName = ctx.session.addDataName;
  const fromTo = `${curFrom}_${curTo}`;
  const amountTotal = await getAmountTotal(amount, fromTo);

  const addMsg = addData ? `Your ${addDataName} is <b>${addData}</b>\n` : '';

  await ctx.replyWithHTML(
    `
    You’re sending <b>${amount} ${curFrom}</b> and you’ll get ~<b>${amountTotal} ${curTo}</b>\nYour recipient’s <b>${curTo}</b> address is <b>${walletCode}</b>\n${addMsg}\nPlease, check all the information. If everything is correct, tap on the “Confirm” button below.`,
    getAgreeKeyboard(ctx)
  );
});

checkAgree.hears(config.kb.confirm, ctx => agreePressAction(ctx));
checkAgree.hears(config.kb.back, ctx => ctx.scene.enter('est_exch'));
checkAgree.hears(config.kb.help, async ctx => {
  ctx.reply(messages.support);
  await pause(500);
  ctx.reply(process.env.CN_EMAIL);
  return;
});

export default checkAgree;
