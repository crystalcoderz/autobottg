// Amount scene
import Scene from 'telegraf/scenes/base';
import { selectAmountAction, cancelTradeAction } from '../actions';
import { getMinimumAmount, saveToSession, startHandler } from '../helpers';
import { getAmountKeyboard, getReplyKeyboard } from '../keyboards';
import { config } from '../config';
import { pause } from '../helpers';
import { messages } from '../messages';

const amount = new Scene('amount');

amount.enter(async (ctx) => {
  const selectedFrom = ctx.session.curFrom;
  const selectedTo = ctx.session.curTo;
  const tradePair = `${selectedFrom}_${selectedTo}`;

  const minValue = await getMinimumAmount(tradePair);
  saveToSession(ctx, 'minValue', minValue);
  const minValueMsg = minValue ? `Minimal amount - <b>${minValue}</b>` : '';
  await ctx.replyWithHTML(
    `Enter the amount of <b>${selectedFrom.toUpperCase()}</b> you would like to exchange.\n${minValueMsg}`,
     getAmountKeyboard(ctx)
  );
});

amount.command('start', async ctx => await startHandler(ctx));
amount.hears([/[.,0-9a-zA-Zа-яА-Я]+/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    await ctx.scene.enter('curr_to');
    return;
  }
  if(config.kb.cancel === txt) {
    await ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    await cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    await ctx.reply(messages.support);
    await pause(500);
    await ctx.reply(config.email);
    return;
  }
  await selectAmountAction(ctx);
});

export default amount;