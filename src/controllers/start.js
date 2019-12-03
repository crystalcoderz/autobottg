// Start scene
import Scene from 'telegraf/scenes/base';
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';

const start = new Scene('start');

start.enter(async ctx => {
  const hash = +new Date();
  const uid = ctx.session.userId;

  const opts = {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };

  await ctx.reply(`Please follow this <a href="${process.env.APP_HOST_PORT}/terms-of-use/${hash}?id=${uid}">link</a> to accept our Terms of Use and Privacy Policy. Then, return to the bot to proceed.`, opts);

  try {
    const currs = await getAllCurrencies();
    if (!currs || !currs.length) {
      await ctx.reply('Server error. Try later.');
      return;
    }
    saveToSession(ctx, 'currs', currs);
  } catch (error) {
    await ctx.reply('Server error. Try later.');
    return;
  }
});

start.hears(/Start exchange/, async ctx => await ctx.scene.enter('curr_from'));

export default start;
