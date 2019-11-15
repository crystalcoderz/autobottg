// Start scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import Extra from 'telegraf/extra';
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';

const start = new Scene('start');
const { leave } = Stage;

start.enter(async (ctx) => {
  console.log('in start scene');
  const isVerified = ctx.session.status.isVerified;
  const uid = ctx.session.userId;
  //  https://cn-bot.evercodelab.com
  const termsOfUseBtn = Extra.HTML().markup(m =>
    m.inlineKeyboard(
      [
        [m.urlButton(`<a href="">Terms of Use and Privacy Policy</a>`, `http://127.0.0.1:4000/continue?id=${uid}`, false)],
      ],
      {}
    )
  );
  ctx.replyWithHTML(`In order to conduct an exchange you must read and agree to the ChangeNOW Terms of Use and Privacy Policy. You are agreeing to them by following the link`, termsOfUseBtn);

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
  if(!isVerified) return;
  ctx.scene.enter('curr_from');
});

export default start;