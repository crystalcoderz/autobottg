// Start scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';
import { messages } from '../messages';
import { config } from '../config';

const start = new Scene('start');
const { leave } = Stage;

start.enter(async ctx => {
  console.log('in start scene');
  const hash = +new Date();
  const uid = ctx.session.userId;

  const opts = {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  }

  ctx.reply(`Please follow this <a href="${process.env.APP_HOST}/terms-of-use/${hash}?id=${uid}">link</a> to accept our Terms of Use and Privacy Policy. Then, return to the bot to proceed.`, opts);

  try {
    const currs = await getAllCurrencies();
    if (!currs || !currs.length) {
      await ctx.reply();
      return;
    }
    saveToSession(ctx, 'currs', currs);
  } catch (error) {
    await ctx.reply('Server error. Try later.');
    return;
  }
});

start.hears(/Start exchange/, ctx => ctx.scene.enter('curr_from'));

export default start;
