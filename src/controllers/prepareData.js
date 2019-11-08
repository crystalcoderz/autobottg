// checkData scene
// Currency To scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { convertAndCheckCurr, getMinimumAmount, saveToSession, convertCurrency, pause, deleteFromSession } from '../helpers';
import { getCurrInfo } from '../api';
import { messages } from '../messages';
const { enter, leave } = Stage;

const prepareData = new Scene('prepare');

prepareData.enter(async ctx => {
  console.log('in prepare scene =====================================');
  const curFrom = await ctx.session.curFrom;
  // saveToSession(ctx, 'curFrom', curFrom);
  const curTo = await ctx.session.curTo;
  console.log("TCL: curFrom", curFrom);
  console.log("TCL: curTo", curTo);
  console.log('end prepare scene =====================================');


  if(curFrom && !curTo) {
    const validFrom = await convertCurrency(ctx, curFrom);

    saveToSession(ctx, 'curFrom', validFrom);
    const curInfo = validFrom && await getCurrInfo(validFrom);

    if(curInfo) {
      saveToSession(ctx, 'curFromInfo', curInfo);
      await ctx.scene.leave('prepare');
      await ctx.scene.enter('curr_to');
    } else {
      await ctx.reply(messages.errorNameMsg);
      deleteFromSession(ctx, curFrom);
      await pause(3000);
      await ctx.scene.leave('prepare');
      await ctx.scene.enter('curr_from');
    }

  }
  if(curTo) {
    const validTo = await convertCurrency(ctx, curTo);
    saveToSession(ctx, 'curTo', validTo);
    const curInfo = validTo && await getCurrInfo(validTo);
    if(curInfo) {
      saveToSession(ctx, 'curToInfo', curInfo);
      ctx.scene.leave('prepare');
      ctx.scene.enter('check');
    } else {
      ctx.reply(messages.errorNameMsg);
      deleteFromSession(ctx, curTo);
      await pause(1000);
      ctx.scene.leave('prepare');
      ctx.scene.enter('curr_to');
    }
  }
})

export default prepareData;