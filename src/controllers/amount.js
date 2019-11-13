// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction, cancelTradeAction } from '../actions';
import { getMinimumAmount, saveToSession } from '../helpers';
import { getAmountKeyboard, getMainKeyboard } from '../keyboards';
import { config } from '../config';
import { pause } from '../helpers';

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
  await pause(500);
});

amount.hears([/[.,0-9]+/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('curr_to');
    return;
  }
  if(config.kb.cancel === txt) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    ctx.reply(
      'If you have any questions about your exchange, please contact our support team via email:'
    );
    await pause(500);
    ctx.reply('support@changenow.io');
    return;
  }
  await selectAmountAction(ctx);
});

export default amount;