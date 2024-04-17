import Markup from "telegraf/markup";
import buttons from "./constants/buttons";
import popularCurrs from "./constants/popularCurrs";

class Keyboards {
  getLangKeyboard(lang) {
    Markup.removeKeyboard();
    return Markup.inlineKeyboard([
      Markup.callbackButton(lang.t(buttons.en), "/en"),
      Markup.callbackButton(lang.t(buttons.ru), "/ru"),
    ]);
  }
  getMainKeyboard(lang) {
    return Markup.keyboard([lang.t(buttons.accept)])
      .oneTime()
      .resize()
      .extra();
  }

  getReplyKeyboard() {
    return Markup.keyboard([buttons.start]).oneTime().resize().extra();
  }
  getFromKeyboard(chosenCurr, lang) {
    const popularCurrsWithActive = {
      ...popularCurrs,
      [chosenCurr]: `✅ ${popularCurrs[chosenCurr]}`,
    };
    const { btc, eth, ltc, xmr, trx, bnb } = popularCurrsWithActive;
    const fullKb = [
      [btc, eth],
      [ltc, xmr],
      [trx, bnb],
      [lang.t(buttons.cancel)],
      [lang.t(buttons.help)],
    ];

    return Markup.keyboard(fullKb).resize().extra();
  }

  getToKeyboard(chosenCurr, lang) {
    const popularCurrsWithActive = {
      ...popularCurrs,
      [chosenCurr]: `✅ ${popularCurrs[chosenCurr]}`,
    };
    const { btc, eth, ltc, xmr, trx, bnb } = popularCurrsWithActive;
    const fullKb = [
      [btc, eth],
      [ltc, xmr],
      [trx, bnb],
      [lang.t(buttons.cancel)],
      [lang.t(buttons.help)],
    ];
    return Markup.keyboard(fullKb).resize().extra();
  }

  getAmountKeyboard(lang) {
    return Markup.keyboard([
      [lang.t(buttons.back), lang.t(buttons.cancel)],
      [lang.t(buttons.help)],
    ])
      .resize()
      .extra();
  }

  getExtraIDKeyboard(lang) {
    return Markup.keyboard([
      [lang.t(buttons.back), lang.t(buttons.next)],
      [lang.t(buttons.cancel)],
      [lang.t(buttons.help)],
    ])
      .resize()
      .extra();
  }

  getAgreeKeyboard(lang) {
    return Markup.keyboard([
      [lang.t(buttons.back), lang.t(buttons.confirm)],
      [lang.t(buttons.help)],
    ])
      .resize()
      .extra();
  }

  getBackKeyboard(lang) {
    return Markup.keyboard([[lang.t(buttons.startNew)], [lang.t(buttons.help)]])
      .resize()
      .extra();
  }

  getStartEmptyKeyboard(lang) {
    // return Markup.removeKeyboard().extra();
    return Markup.keyboard([[lang.t(buttons.startNew)], [lang.t(buttons.help)]])
      .resize()
      .extra();
  }
}
export const keyboards = new Keyboards();
