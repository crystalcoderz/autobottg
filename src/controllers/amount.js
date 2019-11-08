// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';
import { getMinimumAmount, saveToSession } from '../helpers';
import { getAmountKeyboard, getMainKeyboard } from '../keyboards';
import { config } from '../config';

const { leave } = Stage;
const amount = new Scene('amount');

amount.enter(async (ctx) => {
  console.log('in amount scene');
  const selectedFrom = ctx.session.curFrom;
  const selectedTo = ctx.session.curTo;
  const tradePair = `${selectedFrom}_${selectedTo}`;
  const minValue = await getMinimumAmount(tradePair);
  saveToSession(ctx, 'minValue', minValue);
  const minValueMsg = minValue ? `Minimal amount - <b>${minValue}</b>` : '';
  return ctx.replyWithHTML(
    `Enter an amount of <b>${selectedFrom}</b> you want to change. ${minValueMsg}`,
     getAmountKeyboard(ctx)
  );
});

amount.hears([/[0-9,]+/, config.kb.back, config.kb.cancel], async ctx => {
  if (config.kb.back === ctx.message.text) {
    ctx.scene.enter('curr_to');
    return;
  }
  if(config.kb.cancel === ctx.message.text) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  await selectAmountAction(ctx);
});

export default amount;