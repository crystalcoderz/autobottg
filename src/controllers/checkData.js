// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction, cancelTradeAction } from '../actions';
import { config } from '../config';
import { validatePair, saveToSession, deleteFromSession, pause, startHandler } from '../helpers';
import { inputAdditionalDataAction } from '../actions';
import { getExtraIDKeyboard, getReplyKeyboard } from '../keyboards';
import { messages } from '../messages';

const { leave } = Stage;
const checkData = new Scene('check');

checkData.enter(async ctx => {
  const curFromInfo = ctx.session.curFromInfo;
  const curToInfo = ctx.session.curToInfo;
  const pair = `${curFromInfo.ticker}_${curToInfo.ticker}`;
  const hasPair = await validatePair(pair);

  if (hasPair) {
    ctx.scene.leave('check');
    ctx.scene.enter('amount');
    return;
  } else {
    deleteFromSession(ctx, 'curFrom');
    deleteFromSession(ctx, 'curTo');
    deleteFromSession(ctx, 'curFromInfo');
    deleteFromSession(ctx, 'curToInfo');
    await ctx.reply(messages.invalidPair);
    await pause(1000);
    ctx.scene.leave('check');
    ctx.scene.enter('curr_from');
    return;
  }
});

checkData.command('start', ctx => startHandler(ctx));
checkData.hears([/[A-Za-z0-9]/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('amount');
    return;
  }
  if (config.kb.next === txt) {
    ctx.scene.enter('agree');
    return;
  }
  if (config.kb.cancel === txt) {
    await ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    await ctx.reply(messages.support);
    await pause(500);
    await ctx.reply(process.env.CN_EMAIL);
    return;
  }
  inputAdditionalDataAction(ctx);
});

export default checkData;
