//--------------------------- Actions -----------------------------------------------
import Stage from 'telegraf/stage';
const { enter, leave } = Stage;
import { getCurrencyName, saveToSession } from './helpers';
import { sendTransactionData } from './api';

export const selectFromCurrencyAction = async (ctx, type) => {
  console.log('selectFromCurrencyAction');
  const curFrom = getCurrencyName(ctx, type);
  saveToSession(ctx, 'curFrom', curFrom);
  await ctx.scene.leave('curr_from');
  await ctx.scene.enter('curr_to');
}

export const selectToCurrencyAction = async (ctx, type) => {
  console.log('selectToCurrencyAction');
  const curTo = getCurrencyName(ctx, type);
  saveToSession(ctx, 'curTo', curTo);
  await ctx.scene.leave('curr_to');
  await ctx.scene.enter('check');
}

export const selectAmountAction = async (ctx) => {
  console.log('selectAmountAction');
  const amount = ctx.message.text;
  saveToSession(ctx, 'amount', amount);
  await ctx.scene.leave('amount');
  await ctx.scene.enter('est_exch');
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

  const data = {
    from: curFrom,
    to: curTo,
    address: walletCode,
    amount: amount
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