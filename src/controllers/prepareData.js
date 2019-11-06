// checkData scene
// Currency To scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { convertAndCheckCurr, getMinimumAmount, saveToSession, checkCurrency, pause } from '../helpers';
import { getCurrInfo } from '../api';
import { messages } from '../messages';
const { enter, leave } = Stage;

const prepareData = new Scene('prepare');

prepareData.enter(async ctx => {
  console.log('in prepare scene');
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;

  if(curFrom && !curTo) {
    const validFrom = await checkCurrency(ctx, curFrom);
    saveToSession(ctx, 'curFrom', validFrom);
    const curInfo = validFrom && await getCurrInfo(validFrom);
    if(curInfo) {
      saveToSession(ctx, 'curFromInfo', curInfo);
      await ctx.scene.leave('prepare');
      await ctx.scene.enter('curr_to');
    } else {
      await ctx.reply(messages.errorNameMsg);
      await pause(3000);
      await ctx.scene.leave('prepare');
      await ctx.scene.enter('curr_from');
    }

  }
  if(curTo) {
    const validTo = await checkCurrency(ctx, curTo);
    saveToSession(ctx, 'curTo', validTo);
    const curInfo = validTo && await getCurrInfo(validTo);
    if(curInfo) {
      saveToSession(ctx, 'curToInfo', curInfo);
      await ctx.scene.leave('prepare');
      await ctx.scene.enter('check');
    } else {
      await ctx.reply(messages.errorNameMsg);
      await pause(3000);
      await ctx.scene.leave('prepare');
      await ctx.scene.enter('curr_to');
    }
  }

  // if(curFrom) {
  //   const curInfo = await getCurrInfo(curFrom);
  //   console.log(curInfo);
  // }

  // const getTradePair = await convertAndCheckCurr(ctx, curFrom, curTo);
  // if(getTradePair) {
  //   const getMinAmount = await validatePair(getTradePair) && await getMinimumAmount(getTradePair);
  //   saveToSession(ctx, 'minAmount', getMinAmount);
  //   await ctx.scene.leave();
  //   await ctx.scene.enter('amount');
  // }
})

export default prepareData;