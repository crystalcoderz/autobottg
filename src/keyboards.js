//----------------- Keyboards ---------------------------------------------------------

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';
import { config } from './config';

export const getMainKeyboard = (ctx) => {
  return Markup
  .keyboard([config.kb.start])
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
  const amountKb = [
    ['9', '0', '.', 'Enter'],
    ['5', '6', '7', '8'],
    ['1', '2', '3', '4'],
    [config.kb.back, config.kb.cancel]
  ]
  return Markup.keyboard(amountKb)
  .oneTime()
  .resize()
  .extra()
}

export const getExtraIDKeyboard = (ctx) => {
  return Markup.keyboard([
    [config.kb.back, config.kb.next],
    [config.kb.cancel]
  ])
  .resize()
  .extra()
}

export const getAgreeKeyboard = (ctx) => {
  return Markup.keyboard(
    [config.kb.confirm, config.kb.back]
  )
  .resize()
  .extra()
}

export const getBackKeyboard = (ctx) => {
  return Markup.keyboard(
    [config.kb.startNew]
  )
  .resize()
  .extra()
}
