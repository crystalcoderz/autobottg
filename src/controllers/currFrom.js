import Scene from 'telegraf/scenes/base';
import { isAvailableCurr, getCurrencyName, pause, getMessageIfCurrencyNotFound } from '../helpers';
import { messages } from '../messages';
import { getAllCurrencies, getCurrInfo } from '../api';
import { getFromKeyboard } from '../keyboards';
import scenes from '../constants/scenes';

const currFrom = new Scene(scenes.currFrom);

currFrom.enter(async ctx => {

  if (!ctx.session.allCurrencies) {
    ctx.session.allCurrencies = await getAllCurrencies();
  }

  ctx.session.tradingData = {};

  const { tradingData } = ctx.session;
  const choosedCurr = tradingData.currFrom ? tradingData.currFrom.ticker : '';
  await ctx.replyWithHTML(messages.selectFromMsg, getFromKeyboard(choosedCurr));
});

currFrom.hears(/(.*)/gi, async (ctx) => {
  const { text } = ctx.message;
  const { allCurrencies, tradingData } = ctx.session;

  if (text && text.trim().length) {

    if (text.match(/^[\u{2705}]/gu)) {
      await ctx.scene.enter(scenes.currTo);
      return;
    }

    if (text.match(/[^()A-Za-z\s]+/gi)) {
      await ctx.reply(messages.validErr);
      return;
    }

    const currencyName = getCurrencyName(text);
    const currIndex = isAvailableCurr(currencyName, allCurrencies);

    if (currIndex === -1) {
      await ctx.reply(getMessageIfCurrencyNotFound(currencyName));
      await pause(500);
      await ctx.scene.reenter();
      return;
    }

    await ctx.replyWithHTML(`Selected currency - <b>${allCurrencies[currIndex].ticker.toUpperCase()}</b>.`);

    ctx.session.tradingData = { ...tradingData, currFrom: await getCurrInfo(allCurrencies[currIndex].ticker) };

    await ctx.scene.enter(scenes.currTo);
  }

});

export default currFrom;
