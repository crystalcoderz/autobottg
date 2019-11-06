// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { getTransactionStatus } from '../api';

const { leave } = Stage;
const getAddress = new Scene('get_addr');


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
  payinData && await ctx.reply(`Here is the address for your exchange.\n${payinData.payinAddress}\nCopy and paste this address into your wallet to start an exchange.`);
  let transactionStatus = 'new';
  setInterval(async () => {
    transactionStatus = await getTransactionStatus(payinData.id);
    await ctx.reply(statusMap[transactionStatus.status]);
  }, 15000);
});

getAddress.hears('Cancel', leave());

export default getAddress;