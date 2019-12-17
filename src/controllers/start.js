import Scene from 'telegraf/scenes/base';
import scenes from '../constants/scenes';

const start = new Scene(scenes.start);

start.enter(async ctx => {
  const { userId } = ctx.session;

  const opts = {
    parse_mode: 'HTML',
    disable_web_page_preview: true,
  };

  await ctx.reply(`Please follow this <a href="${process.env.APP_HOST_PORT}/user-ip/${userId}">link</a> to read our Terms of Use and Privacy Policy. Then, return to the bot to proceed.`, opts);
});

export default start;
