//----------------- Keyboards ---------------------------------------------------------

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import { config } from './config';

export const getMainKeyboard = ctx => {
  return Markup.keyboard([config.kb.start])
    .oneTime()
    .resize()
    .extra();
};

export const getFromKeyboard = currs => {
  const { btc, eth, bch, ltc, xmr, zec } = config.popularCurrs;
  const fullKb = [[btc, eth], [bch, ltc], [xmr, zec], [config.kb.cancel], [config.kb.help]];
  return Markup.keyboard(fullKb)
    .resize()
    .extra();
};

export const getToKeyboard = ctx => {
  const curFrom = ctx.session.curFrom;
  const popularCurrs = {};
  Object.keys(config.popularCurrs).forEach(tiker => {
    tiker === curFrom
      ? (popularCurrs[tiker] = `✅ ${config.popularCurrs[tiker]}`)
      : (popularCurrs[tiker] = config.popularCurrs[tiker]);
  });
  const { btc, eth, bch, ltc, xmr, zec } = popularCurrs;
  const fullKb = [
    [btc, eth],
    [bch, ltc],
    [xmr, zec],
    [config.kb.back, config.kb.cancel],
    [config.kb.help]
  ];
  return Markup.keyboard(fullKb)
    .resize()
    .extra();
};

export const getAmountKeyboard = ctx => {
  return Markup.keyboard([[config.kb.back, config.kb.cancel], [config.kb.help]])
    .resize()
    .extra();
};

export const getExtraIDKeyboard = ctx => {
  return Markup.keyboard([[config.kb.back, config.kb.next], [config.kb.cancel], [config.kb.help]])
    .resize()
    .extra();
};

export const getAgreeKeyboard = ctx => {
  return Markup.keyboard([[config.kb.confirm, config.kb.back], [config.kb.help]])
    .resize()
    .extra();
};

export const getBackKeyboard = ctx => {
  return Markup.keyboard([[config.kb.startNew], [config.kb.help]])
    .resize()
    .extra();
};

export const getHelpKeyboard = ctx => {
  return Markup.keyboard([[config.kb.cancel]])
    .resize()
    .extra();
};
