// Start scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import Extra from 'telegraf/extra';
import Markup from 'telegraf/markup';
import { getAllCurrencies } from '../api';
import { saveToSession } from '../helpers';

const start = new Scene('start');
const { leave } = Stage;

start.enter(async (ctx) => {

  console.log('in start scene');
  const uid = ctx.session.userId;
  // http://127.0.0.1:4001
  const termsOfUseBtn = Extra.HTML().markup(m =>
    m.inlineKeyboard(
      [
        [m.urlButton(`Terms of Use and Privacy Policy`, `https://cn-bot.evercodelab.com/continue?id=${uid}`, false)],
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
});


start.hears(/Start exchange/, (ctx) => ctx.scene.enter('curr_from'));

export default start;