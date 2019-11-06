//--------------------------- Actions -----------------------------------------------

import messages from './messages';
import { pause } from './helpers';
import { deleteFromSession } from './helpers';

import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { getCurrencyName, saveToSession } from './helpers';
import { sendTransactionData } from './api';

export const selectFromCurrencyAction = async (ctx, type) => {
  console.log('selectFromCurrencyAction');
  const curFrom = await getCurrencyName(ctx, type);
  saveToSession(ctx, 'curFrom', curFrom);
  ctx.reply(`Selected currency - ${curFrom}`);
  await pause(2000);
  await ctx.scene.leave('curr_from');
  await ctx.scene.enter('prepare');
}

export const selectToCurrencyAction = async (ctx, type) => {
  console.log('selectToCurrencyAction');
  const curTo = await getCurrencyName(ctx, type);
  saveToSession(ctx, 'curTo', curTo);
  ctx.reply(`Selected currency - ${curTo}`);
  await pause(2000);
  await ctx.scene.leave('curr_to');
  await ctx.scene.enter('prepare');
}

export const inputAdditionalDataAction = async (ctx) => {
  const inputData = ctx.message.text;
  saveToSession(ctx, 'addData', inputData);
  await ctx.scene.leave('check');
  await ctx.scene.enter('amount');
}

export const selectAmountAction = async (ctx) => {
  const amount = ctx.message.text;
  const minValue = await ctx.session.minValue;
  if(amount >= minValue) {
    saveToSession(ctx, 'amount', amount);
    await ctx.scene.leave('amount');
    await ctx.scene.enter('est_exch');
  } else {
    ctx.reply(`Enter an amount greater than or equal to ${minValue}`);
  }
}

export const typeWalletAction = async (ctx) => {
  console.log('typeWalletAction');
  const walletCode = ctx.message.text;
  saveToSession(ctx, 'walletCode', walletCode);
  await ctx.scene.leave('est_exch');
  await ctx.scene.enter('agree');
}


export const agreePressAction = async (ctx) => {
  console.log('agreePressAction');
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const walletCode = await ctx.session.walletCode;
  const amount = await ctx.session.amount;
  const extraId = await ctx.session.addData;

  const data = {
    from: curFrom,
    to: curTo,
    address: walletCode,
    amount: amount,
    extraId: extraId || ''
  }
  try {
    const response = await sendTransactionData(data);
    saveToSession(ctx, 'response', response);
    await ctx.scene.leave('agree');
    await ctx.scene.enter('get_addr');
  } catch (err) {
    await ctx.reply(err.message);
    await ctx.scene.leave('agree');
    await ctx.scene.enter('est_exch');
  }
}

export const cancelTradeAction = async (ctx, stage) => {
  await deleteFromSession(ctx, 'curFrom');
  await deleteFromSession(ctx, 'curTo');
  await deleteFromSession(ctx, 'curFromInfo');
  await deleteFromSession(ctx, 'curToInfo');
  await deleteFromSession(ctx, 'addData');
  await deleteFromSession(ctx, 'addDataName');
  await deleteFromSession(ctx, 'amount');
  await deleteFromSession(ctx, 'minValue');
  await deleteFromSession(ctx, 'walletCode');
  await deleteFromSession(ctx, 'response');
  await leave();
}