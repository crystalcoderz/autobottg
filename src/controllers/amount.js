// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';
import { getMinimumAmount, saveToSession } from '../helpers';

const { leave } = Stage;
const amount = new Scene('amount');

amount.enter(async (ctx) => {
  console.log('in amount scene');
  const selectedFrom = await ctx.session.curFrom;
  const selectedTo = await ctx.session.curTo;
  const tradePair = `${selectedFrom}_${selectedTo}`;
  const minValue = await getMinimumAmount(tradePair);
  saveToSession(ctx, 'minValue', minValue);
  const minValueMsg = minValue ? `Minimal amount - ${minValue}` : '';
  await ctx.reply(`Enter an amount of ${selectedFrom} you want to change. ${minValueMsg}`);
});

amount.hears(/[0-9]/, ctx => selectAmountAction(ctx));

export default amount;