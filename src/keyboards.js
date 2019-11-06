//----------------- Keyboards ---------------------------------------------------------
import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

import { getPopularCurrs } from './helpers';

export const getMainKeyboard = (ctx) => {
  return Extra.markup(Markup.keyboard(['Start exchange', 'Cancel']).resize());
}

export const backKeyboard = (ctx) => {
  return Extra.markup(Markup.keyboard(['Cancel']).resize());
}

export const getCurrenciesKeyboard = (currs) => {
  const popCurrs = getPopularCurrs(currs);
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      popCurrs.map(cur => [
        m.callbackButton(
          `${cur.name} (${cur.ticker.toUpperCase()})`,
          JSON.stringify({ action: 'name', payload: `${cur.name}` }),
          false
        )
      ]),
      {}
    )
  );
}

export const getAgreeButton = (ctx) => {
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      [
        m.callbackButton(
          'Confirm',
          'confirm',
          false
        ),
      ],
    {}
    )
  );
}