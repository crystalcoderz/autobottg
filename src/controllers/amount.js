// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';

const { leave } = Stage;
const amount = new Scene('amount');

amount.enter(async (ctx) => {
  console.log('in amount scene');
  const selectedCurr = await ctx.session.curFrom;
  const minValue = await ctx.session.minAmount;
  const minValueMsg = minValue ? `Minimal amount - ${minValue}` : '';

  selectedCurr && await ctx.reply(`Enter an amount of ${selectedCurr} you want to change. ${minValueMsg}`);
});

amount.hears(/[0-9]/, ctx => selectAmountAction(ctx));
amount.hears('Cancel', leave());

export default amount;