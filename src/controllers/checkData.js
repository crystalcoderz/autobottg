// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';
import { config } from '../config';
import { validatePair, pause, saveToSession, deleteFromSession } from '../helpers';
import { inputAdditionalDataAction } from '../actions';

const { leave } = Stage;
const checkData = new Scene('check');

checkData.enter(async (ctx) => {
  console.log('in checkData scene');
  const curFromInfo = ctx.session.curFromInfo;

  const curToInfo = await ctx.session.curToInfo;
  const pair = `${curFromInfo.ticker}_${curToInfo.ticker}`;
  const hasPair = await validatePair(pair);

  if(hasPair) {
    if((curFromInfo.isAnonymous || curToInfo.isAnonymous) || curFromInfo.hasExternalId) {
      ctx.reply(`Please, enter ${curFromInfo.externalIdName} for ${curFromInfo.name} (optional)`, getAmountKeyboard(ctx));
      saveToSession(ctx, 'addDataName', curFromInfo.externalIdName);
    } else {
      ctx.scene.leave('check');
      ctx.scene.enter('amount');
    }
    return;
  }

  deleteFromSession(ctx, 'curFrom');
  deleteFromSession(ctx, 'curTo');
  deleteFromSession(ctx, 'curFromInfo');
  deleteFromSession(ctx, 'curToInfo');
  ctx.reply('No pair found');
  await pause(1000);
  ctx.scene.leave('check');
  ctx.scene.enter('curr_from');
  return;
});

// checkData.hears(/[A-Za-z0-9]/gi, ctx => inputAdditionalDataAction(ctx));

checkData.hears([/[A-Za-z0-9]/gi, config.kb.back, config.kb.cancel], ctx => {
  if (config.kb.back === ctx.message.text) {
    ctx.scene.enter('amount');
    return;
  }
  if(config.kb.cancel === ctx.message.text) {
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    ctx.scene.leave();
    return;
  }
  inputAdditionalDataAction(ctx);
});

export default checkData;