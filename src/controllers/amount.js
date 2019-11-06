// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';
import { getMinimumAmount, saveToSession } from '../helpers';
import { getAmountKeyboard } from '../keyboards';
import { config } from '../config';

const { leave } = Stage;
const amount = new Scene('amount');

amount.enter(async (ctx) => {
  console.log('in amount scene');
  const selectedFrom = await ctx.session.curFrom;
  const selectedTo = await ctx.session.curTo;
  const tradePair = `${selectedFrom}_${selectedTo}`;
  const minValue = await getMinimumAmount(tradePair);
  saveToSession(ctx, 'minValue', minValue);
  const minValueMsg = minValue ? `Minimal amount - <b>${minValue}</b>` : '';
  await ctx.replyWithHTML(
    `Enter an amount of <b>${selectedFrom}</b> you want to change. ${minValueMsg}`,
     getAmountKeyboard(ctx)
  );
});

amount.hears(/[0-9]/, ctx => selectAmountAction(ctx));
amount.hears(config.kb.back, ctx => ctx.scene.enter('curr_to'));

export default amount;