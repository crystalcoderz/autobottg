// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { getTransactionStatus } from '../api';
import { getBackKeyboard } from '../keyboards';
import { config } from '../config';
import { pause, intervalRequire, breakTransaction } from '../helpers';
const { leave } = Stage;
const getAddress = new Scene('get_addr');

getAddress.enter(async (ctx) => {
  console.log('in get_addr scene');
  const payinData = await ctx.session.response;
  payinData && await ctx.reply(`Here is the address for your exchange.\nCopy and paste this address into your wallet to start an exchange.`, getBackKeyboard(ctx));
  await pause(500);
  ctx.reply(`${payinData.payinAddress}`);
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