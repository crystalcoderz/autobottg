// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';

const { leave } = Stage;
const getAddress = new Scene('get_addr');

getAddress.enter(async (ctx) => {
  console.log('in get_addr scene');
  const payinData = await ctx.session.response;
  console.log("TCL: payinData", payinData)
  payinData && await ctx.reply(`Here is the address for your exchange\n${payinData.payinAddress}\nCopy and paste this address into your wallet to start an exchange.`);
});

getAddress.hears('Cancel', leave());

export default getAddress;