// Start scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
// const { enter, leave } = Stage;
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';

const start = new Scene('start');
const { leave } = Stage


start.enter(async (ctx) => {
  console.log('in start scene');
  try {
    const currs = await getAllCurrencies();
    if(!currs || !currs.length) {
      await ctx.reply('No currencies found');
      return;
    }
    saveToSession(ctx, 'currs', currs);
  } catch (error) {
    await ctx.reply('No currencies found');
    return;
  }
  ctx.scene.leave();
  await ctx.scene.enter('curr_from');
});

export default start;