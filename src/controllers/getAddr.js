// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { getTransactionStatus } from '../api';
import { getBackKeyboard } from '../keyboards';
import { config } from '../config';
import { pause, intervalRequire, breakTransaction, getAmountTotal, startHandler, addTransactionToDB } from '../helpers';
import { messages } from '../messages';
import UserModel from '../models/User';

const { leave } = Stage;
const getAddress = new Scene('get_addr');

getAddress.enter(async ctx => {
  const uId = await ctx.session.userId;
  const payinData = await ctx.session.response;
  const amount = ctx.session.amount;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const fromTo = `${curFrom}_${curTo}`;
  const amountTotal = await getAmountTotal(amount, fromTo);
  payinData && addTransactionToDB(payinData.id, uId);
  payinData &&
    (await ctx.replyWithHTML(
      `You’re sending <b>${amount} ${curFrom.toUpperCase()}</b>; you’ll get ~<b>${amountTotal} ${curTo.toUpperCase()}</b>.\nHere is the deposit address for your exchange.\nIn order to start the exchange, use your wallet to send your deposit to this address.`,
      getBackKeyboard(ctx)
    ));
  await pause(500);
  ctx.reply(`${payinData.payinAddress}`);
  await intervalRequire(ctx, payinData);
});

getAddress.command('start', ctx => startHandler(ctx));
getAddress.hears(config.kb.startNew, ctx => breakTransaction(ctx));
getAddress.hears(config.kb.help, async ctx => {
  ctx.reply(messages.support);
  await pause(500);
  ctx.reply(process.env.CN_EMAIL);
  return;
});

export default getAddress;
