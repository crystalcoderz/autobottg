

import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { inputAdditionalDataAction } from '../actions';
import { saveToSession, pause } from '../helpers';
import { getExtraIDKeyboard } from '../keyboards';
import { config } from '../config';

const { leave } = Stage;
const addInfo = new Scene('add_info');

addInfo.enter(async (ctx) => {
  console.log('in add_info');
  const curFromInfo = ctx.session.curFromInfo;
  const curToInfo = ctx.session.curToInfo;

  if((curFromInfo.isAnonymous || curToInfo.isAnonymous) || curFromInfo.hasExternalId) {
    ctx.reply(`Please, enter ${curFromInfo.externalIdName} for ${curFromInfo.name} (optional)`, getExtraIDKeyboard(ctx));
    saveToSession(ctx, 'addDataName', curFromInfo.externalIdName);
    await pause(1000);
  } else {
    ctx.scene.leave('add_info');
    ctx.scene.enter('agree');
  }
});


addInfo.hears([/(.*)/gi, config.kb.back, config.kb.cancel], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.back === txt) {
    ctx.scene.enter('est_exch');
    return;
  }
  if (config.kb.cancel === txt) {
    ctx.reply(
      'Your exchange is canceled. Do you want to start a new exchange?',
      getMainKeyboard(ctx)
    );
    ctx.scene.leave();
    return;
  }
  if (txt.match(/[^()A-Za-z0-9\s]+/gi)) {
    ctx.reply('Please, use only Latin letters');
    return;
  }
  if (txt.match(/[()A-Za-z0-9\s]+/gi)) {
    await inputAdditionalDataAction(ctx);
  }
});

export default addInfo;