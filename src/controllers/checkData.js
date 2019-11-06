// Amount scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction } from '../actions';
import { validatePair, pause, saveToSession } from '../helpers';
import { inputAdditionalDataAction } from '../actions';

const { leave } = Stage;
const checkData = new Scene('check');

checkData.enter(async (ctx) => {
  console.log('in checkData scene');
  const curFromInfo = await ctx.session.curFromInfo;
  const curToInfo = await ctx.session.curToInfo;
  const pair = `${curFromInfo.ticker}_${curToInfo.ticker}`;
  const hasPair = validatePair(pair); /// ??????

  if(hasPair) {
    if(curFromInfo.isAnonymous && curToInfo.isAnonymous) {
      if(curFromInfo.hasExternalId) {
        await ctx.reply(`Please, enter ${curFromInfo.externalIdName} for ${curFromInfo.name} (optional)`);
        saveToSession(ctx, 'addDataName', curFromInfo.externalIdName);
      } else if(curToInfo.hasExternalId) {
        await ctx.reply(`Please, enter ${curFromInfo.externalIdName} data for ${curFromInfo.name} (optional)`);
        saveToSession(ctx, 'addDataName', curFromInfo.externalIdName);
      }
    } else {
      await ctx.scene.leave('check');
      await ctx.scene.enter('amount');
    }
  } else {
    await ctx.reply('No pair found');
    await pause(3000);
    await ctx.scene.leave('check');
    await ctx.scene.enter('cur_from');
  }


});

checkData.hears(/[A-Za-z0-9]/gi, ctx => inputAdditionalDataAction(ctx));
// amount.hears('Cancel', leave());

export default checkData;