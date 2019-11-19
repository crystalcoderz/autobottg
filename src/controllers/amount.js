// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction, cancelTradeAction } from '../actions';
import { getMinimumAmount, saveToSession, startHandler } from '../helpers';
import { getAmountKeyboard, getMainKeyboard, getReplyKeyboard } from '../keyboards';
import { config } from '../config';
import { pause } from '../helpers';
import { messages } from '../messages';

const { leave } = Stage;
const amount = new Scene('amount');

amount.enter(async (ctx) => {
  const selectedFrom = ctx.session.curFrom;
  const selectedTo = ctx.session.curTo;
  const tradePair = `${selectedFrom}_${selectedTo}`;

  const minValue = await getMinimumAmount(tradePair);
  saveToSession(ctx, 'minValue', minValue);
  const minValueMsg = minValue ? `Minimal amount - <b>${minValue}</b>` : '';
  return ctx.replyWithHTML(
    `Enter the amount of <b>${selectedFrom.toUpperCase()}</b> you would like to exchange.\n${minValueMsg}`,
     getAmountKeyboard(ctx)
  );
  await pause(500);
});

amount.command('start', ctx => startHandler(ctx));
amount.hears([/[.,0-9]+/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('curr_to');
    return;
  }
  if(config.kb.cancel === txt) {
    ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    ctx.reply(messages.support);
    await pause(500);
    ctx.reply(process.env.CN_EMAIL);
    return;
  }
  await selectAmountAction(ctx);
});

export default amount;