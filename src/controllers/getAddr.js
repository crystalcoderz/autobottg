// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { getTransactionStatus } from '../api';
import { getBackKeyboard } from '../keyboards';
import { config } from '../config';
const { leave } = Stage;
const getAddress = new Scene('get_addr');
let intervalStatus;

getAddress.enter(async (ctx) => {
  console.log('in get_addr scene');
  const curTo = await ctx.session.curTo;

  const statusMap = {
    new: '',
    waiting: 'We are waiting for your coins to be received.',
    confirming: 'We received your deposit.',
    exchanging: 'The exchange process has initiated.',
    finished: `The transaction was successfully finished. Your ${curTo} coins were sent to your wallet.\n\nThank you for choosing us.`,
  }

  const payinData = await ctx.session.response;
  payinData && await ctx.reply(`Here is the address for your exchange.\n${payinData.payinAddress}\nCopy and paste this address into your wallet to start an exchange.`, getBackKeyboard(ctx));
  let status = '';
  intervalStatus = setInterval(async () => {
    const getStatus = await getTransactionStatus(payinData.id);
    if(status !== getStatus.status) {
      await ctx.reply(statusMap[getStatus.status]);
      status = getStatus.status;
    }
  }, 15000);
});

getAddress.leave(ctx => clearInterval(intervalStatus));
getAddress.hears(config.kb.startNew, ctx => ctx.scene.enter('start'));

export default getAddress;