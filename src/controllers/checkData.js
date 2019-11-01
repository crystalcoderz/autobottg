// checkData scene
// Currency To scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { convertAndCheckCurr, getMinimumAmount, saveToSession, validatePair } from '../helpers';
const { enter, leave } = Stage;

const checkData = new Scene('check');

checkData.enter(async ctx => {
  console.log('in check scene');
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const getTradePair = await convertAndCheckCurr(ctx, curFrom, curTo);
  if(getTradePair) {
    const getMinAmount = await validatePair(getTradePair) && await getMinimumAmount(getTradePair);
    saveToSession(ctx, 'minAmount', getMinAmount);
    await ctx.scene.leave();
    await ctx.scene.enter('amount');
  }
})

export default checkData;