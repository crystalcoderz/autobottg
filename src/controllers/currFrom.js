// Currency From scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
const {enter, leave} = Stage;
import {handler, deleteFromSession} from '../helpers';
import {messages} from '../messages';
import {getFromKeyboard, getMainKeyboard} from '../keyboards';
import {selectFromCurrencyAction} from '../actions';
import {config} from '../config';

import Markup from 'telegraf/markup';
import Extra from 'telegraf/extra';

const currFrom = new Scene('curr_from');

currFrom.enter(ctx => {
  console.log('in curr_from scene');
  const currs = ctx.session.currs;
  ctx.replyWithHTML(messages.selectFromMsg, getFromKeyboard(currs));
});

currFrom.hears([/(.*)/gi, config.kb.cancel], async ctx => {
  const txt = ctx.message.text;
  if (config.kb.cancel === txt) {
    ctx.reply(
      'Your exchange is canceled. Do you want to start a new exchange?',
      getMainKeyboard(ctx)
    );
    ctx.scene.leave();
    return;
  }
  if (txt.match(/[^()A-Za-z\s]+/gi)) {
    ctx.reply('Please, use only Latin letters');
    return;
  }
  if (txt.match(/[()A-Za-z\s]+/gi)) {
    await selectFromCurrencyAction(ctx);
  }
});

const {btc, eth, bch, ltc, xmr, zec} = config.popularCurrs;

export default currFrom;
