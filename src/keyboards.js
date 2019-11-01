//----------------- Keyboards ---------------------------------------------------------
import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

import { getPopularNames } from './helpers';

export const getMainKeyboard = (ctx) => {
  return Extra.markup(Markup.keyboard(['Start exchange']).resize());
}

export const backKeyboard = (ctx) => {
  return Extra.markup(Markup.keyboard(['Cancel']).resize());
}

export const getCurrenciesKeyboard = (currs) => {
  const popCurrs = getPopularNames(currs);
  return Extra.HTML().markup((m) =>
    m.inlineKeyboard(
      popCurrs.map(cur => [
        m.callbackButton(
          cur,
          JSON.stringify({ action: 'name', payload: `${cur}` }),
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