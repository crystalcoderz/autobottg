import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { inputAdditionalDataAction, cancelTradeAction } from '../actions';
import { saveToSession, pause, startHandler } from '../helpers';
import { getExtraIDKeyboard, getReplyKeyboard } from '../keyboards';
import { config } from '../config';
import { messages } from '../messages';

const { leave } = Stage;
const addInfo = new Scene('add_info');

addInfo.enter(async ctx => {
  const curToInfo = ctx.session.curToInfo;

  if (curToInfo.isAnonymous || curToInfo.hasExternalId) {
    ctx.reply(
      `Enter the ${curToInfo.externalIdName}`,
      getExtraIDKeyboard(ctx)
    );
    saveToSession(ctx, 'addDataName', curToInfo.externalIdName);
    await pause(1000);
  } else {
    ctx.scene.leave('add_info');
    ctx.scene.enter('agree');
  }
});

addInfo.command('start', ctx => startHandler(ctx));
addInfo.hears(
  [/(.*)/gi, config.kb.back, config.kb.next, config.kb.cancel, config.kb.help],
  async ctx => {
    const txt = ctx.message.text;
    if (config.kb.back === txt) {
      ctx.scene.enter('est_exch');
      return;
    }
    if (config.kb.next === txt) {
      ctx.scene.enter('agree');
      return;
    }
    if (config.kb.cancel === txt) {
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
    if (txt.match(/[^A-Za-z0-9\s]+/gi)) {
      ctx.reply(messages.validErr);
      return;
    }
    if (txt.match(/[A-Za-z0-9\s]+/gi)) {
      await inputAdditionalDataAction(ctx);
    }
  }
);

export default addInfo;
