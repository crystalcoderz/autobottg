// Start scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
// const { enter, leave } = Stage;
import { handler } from '../helpers';
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';

const start = new Scene('start');

start.enter(handler(async (ctx) => {
  console.log('in start scene');
  const currs = await getAllCurrencies();
  if(!currs || !currs.length) {
    await ctx.reply('No currencies found');
    return;
  }
  saveToSession(ctx, 'currs', currs);
  await ctx.scene.leave();
  await ctx.scene.enter('curr_from');
}));

export default start;