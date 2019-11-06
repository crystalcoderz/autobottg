//----------------- Keyboards ---------------------------------------------------------

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import { config } from './config';

export const getMainKeyboard = (ctx) => {
  return Markup
  .keyboard([config.kb.start, config.kb.cancel])
  .oneTime()
  .resize()
  .extra()
}

export const getFromKeyboard = (currs) => {
  const { btc, eth, bch, ltc, xmr, zec }  = config.popularCurrs;
  const fullKb = [
    [btc, eth],
    [bch, ltc],
    [xmr, zec],
    [config.kb.cancel]
  ]
  return Markup.keyboard(fullKb)
  .resize()
  .extra()
}


export const getToKeyboard = (currs) => {
  const { btc, eth, bch, ltc, xmr, zec }  = config.popularCurrs;
  const fullKb = [
    [btc, eth],
    [bch, ltc],
    [xmr, zec],
    [config.kb.back, config.kb.cancel]
  ]
  return Markup.keyboard(fullKb)
  .resize()
  .extra()
}

export const getAmountKeyboard = (ctx) => {
  return Markup.keyboard(
    [config.kb.back, config.kb.cancel]
  )
  .resize()
  .extra()
}

export const getAgreeKeyboard = (ctx) => {
  return Markup.keyboard(
    [config.kb.confirm, config.kb.back, config.kb.cancel]
  )
  .resize()
  .extra()
}



// export const getCurrenciesKeyboard = (currs) => {
//   const popCurrs = getPopularCurrs(currs);
//   return Extra.HTML().markup((m) =>
//     m.inlineKeyboard(
//       popCurrs.map(cur => [
//         m.callbackButton(
//           `${cur.name} (${cur.ticker.toUpperCase()})`,
//           JSON.stringify({ action: 'name', payload: `${cur.name}` }),
//           false
//         )
//       ]),
//       {}
//     )
//   );
// }

// export const getAgreeButton = (ctx) => {
//   return Extra.HTML().markup((m) =>
//     m.inlineKeyboard(
//       [
//         m.callbackButton(
//           'Confirm',
//           'confirm',
//           false
//         ),
//       ],
//     {}
//     )
//   );
// }