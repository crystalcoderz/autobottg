import Scene from 'telegraf/scenes/base';
import scenes from '../constants/scenes';
import { getEmptyKeyboard } from '../keyboards';

const start = new Scene(scenes.start);

start.enter(async ctx => {
  const { userId } = ctx.session;

  await ctx.replyWithHTML(`Please follow this <a href="${process.env.APP_HOST_PORT}/user-ip/${userId}">link</a> to read our Terms of Use and Privacy Policy. Then, return to the bot to proceed.`, getEmptyKeyboard());
});

export default start;
