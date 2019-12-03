import Scene from 'telegraf/scenes/base';
import { inputAdditionalDataAction, cancelTradeAction } from '../actions';
import { saveToSession, pause, startHandler } from '../helpers';
import { getExtraIDKeyboard, getReplyKeyboard } from '../keyboards';
import { config } from '../config';
import { messages } from '../messages';

const addInfo = new Scene('add_info');

addInfo.enter(async ctx => {
  const curToInfo = ctx.session.curToInfo;

  if (curToInfo.isAnonymous || curToInfo.hasExternalId) {
    await ctx.reply(
      `Enter the ${curToInfo.externalIdName}`,
      getExtraIDKeyboard(ctx)
    );
    saveToSession(ctx, 'addDataName', curToInfo.externalIdName);
    await pause(1000);
  } else {
    await ctx.scene.enter('agree');
  }
});

addInfo.command('start', async ctx => await startHandler(ctx));
addInfo.hears(
  [/(.*)/gi, config.kb.back, config.kb.next, config.kb.cancel, config.kb.help],
  async ctx => {
    const txt = ctx.message.text;
    if (config.kb.back === txt) {
      await ctx.scene.enter('est_exch');
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
    if (txt.match(/[^A-Za-z0-9\s]+/gi)) {
      await ctx.reply(messages.validErr);
      return;
    }
    if (txt.match(/[A-Za-z0-9\s]+/gi)) {
      await inputAdditionalDataAction(ctx);
    }
  }
);

export default addInfo;
