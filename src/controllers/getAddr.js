// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import {getTransactionStatus} from '../api';
import {getBackKeyboard} from '../keyboards';
import {config} from '../config';
import {pause, intervalRequire, breakTransaction, getAmountTotal} from '../helpers';
const {leave} = Stage;
const getAddress = new Scene('get_addr');

getAddress.enter(async ctx => {
  console.log('in get_addr scene');
  const payinData = await ctx.session.response;
  const amount = ctx.session.amount;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const fromTo = `${curFrom}_${curTo}`;
  const amountTotal = await getAmountTotal(amount, fromTo);
  const uid = ctx.session.userId;

  payinData &&
    (await ctx.replyWithHTML(
      `You’re sending <b>${amount} ${curFrom}</b> and you’ll get ~<b>${amountTotal} ${curTo}</b>\nHere is the address for your exchange.\nCopy and paste this address into your wallet to start an exchange.`,
      getBackKeyboard(ctx)
    ));
  await pause(500);
  ctx.reply(`${payinData.payinAddress}`);
  await pause(500);
  // http://127.0.0.1
  await ctx.replyWithHTML(`To continue transaction please visit <a href="https://cn-bot.evercodelab.com/continue?id=${uid}">Our service site</a>`);
  await intervalRequire(ctx, payinData);
});

getAddress.hears(config.kb.startNew, ctx => breakTransaction(ctx));
getAddress.hears(config.kb.help, async ctx => {
  ctx.reply(
    'If you have any questions about your exchange, please contact our support team via email:'
  );
  await pause(500);
  ctx.reply('support@changenow.io');
  return;
});

export default getAddress;
