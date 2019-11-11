// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';
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
});

  // const amount = Number(ctx.message.text.replace(',', '.'));
  // if (!amount || isNaN(amount)) {
  //   ctx.reply('Amount must be a number.');
  //   // await pause(1000);
  //   // ctx.scene.reenter();
  //   return;
  // }

amount.hears([/(.*)/ig, config.kb.enter, config.kb.back, config.kb.cancel], async ctx => {
  const txt = ctx.message.text;

  const validTxt = txt.replace(/[,]/g, '.');
  if (config.kb.back === txt) {
    ctx.scene.enter('curr_to');
    return;
  }
  if(config.kb.cancel === txt) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  if(validTxt.match(/[.0-9]+/ig) ) {
    await selectAmountAction(ctx);
  }
  if(validTxt.match(/[^.0-9]+/ig)) {
    ctx.reply('Only numbers and dots!');
  }
});

export default amount;