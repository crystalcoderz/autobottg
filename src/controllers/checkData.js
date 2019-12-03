// Amount scene
import Scene from 'telegraf/scenes/base';
import { cancelTradeAction } from '../actions';
import { config } from '../config';
import { validatePair, deleteFromSession, pause, startHandler } from '../helpers';
import { inputAdditionalDataAction } from '../actions';
import { getReplyKeyboard } from '../keyboards';
import { messages } from '../messages';

const checkData = new Scene('check');

checkData.enter(async ctx => {
  const curFromInfo = ctx.session.curFromInfo;
  const curToInfo = ctx.session.curToInfo;
  const pair = `${curFromInfo.ticker}_${curToInfo.ticker}`;
  const hasPair = await validatePair(pair);

  if (hasPair) {
    await ctx.scene.enter('amount');
    return;
  } else {
    deleteFromSession(ctx, 'curFrom');
    deleteFromSession(ctx, 'curTo');
    deleteFromSession(ctx, 'curFromInfo');
    deleteFromSession(ctx, 'curToInfo');
    await ctx.reply(messages.invalidPair);
    await pause(1000);
    await ctx.scene.enter('curr_from');
    return;
  }
});

checkData.command('start', async ctx => await startHandler(ctx));
checkData.hears([/[A-Za-z0-9]/gi, config.kb.back, config.kb.cancel, config.kb.help], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    await ctx.scene.enter('amount');
    return;
  }
  if (config.kb.next === txt) {
    await ctx.scene.enter('agree');
    return;
  }
  if (config.kb.cancel === txt) {
    await ctx.reply(messages.cancel, getReplyKeyboard(ctx));
    await cancelTradeAction(ctx);
    return;
  }
  if (config.kb.help === txt) {
    await ctx.reply(messages.support);
    await pause(500);
    await ctx.reply(process.env.CN_EMAIL);
    return;
  }
  await inputAdditionalDataAction(ctx);
});

export default checkData;
