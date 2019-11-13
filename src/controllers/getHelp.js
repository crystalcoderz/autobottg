// getHelp scene
import Scene from 'telegraf/scenes/base';
import Stage from 'telegraf/stage';
import { selectAmountAction, cancelTradeAction } from '../actions';
import { getMinimumAmount, saveToSession, breakTransaction } from '../helpers';
import { getHelpKeyboard, getMainKeyboard } from '../keyboards';
import { config } from '../config';
import { pause } from '../helpers';

const { leave } = Stage;
const getHelp = new Scene('help');

getHelp.enter(async (ctx) => {
  console.log('in help scene');
  ctx.reply(
    'If you have any questions about your exchange, please contact our support team via email:',
     getHelpKeyboard(ctx)
  );
  await pause(500);
  ctx.reply('support@changenow.io');
});

getHelp.hears([config.kb.cancel], async ctx => {
  const txt = ctx.message.text;
  if(config.kb.cancel === txt) {
    breakTransaction(ctx);
    ctx.reply('Your exchange is canceled. Do you want to start a new exchange?', getMainKeyboard(ctx));
    cancelTradeAction(ctx);
    return;
  }
});

export default getHelp;