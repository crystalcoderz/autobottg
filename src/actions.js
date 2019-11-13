//--------------------------- Actions -----------------------------------------------

import Stage from 'telegraf/stage';
import rp from 'request-promise';
import { messages } from './messages';
import { pause } from './helpers';
import UserModel from './models/User';
import { getCurrencyName, saveToSession, convertCurrency, deleteFromSession } from './helpers';
import { sendTransactionData, getCurrInfo, getUserIp } from './api';

const { enter, leave } = Stage;
class Transaction {
  constructor() {
    this.date = Number(new Date()),
    this.from = '',
    this.to = '',
    this.address = '',
    this.amount = 0,
    this.extraId = ''
  }
};

export const handleStartAction = async (ctx) => {
  const user = ctx.message.from;
  UserModel.insertMany({id: user.id, username: user.username});
  saveToSession(ctx, 'userId', user.id);
  // const site = await getUserIp();
  // console.log("TCL: handleStartAction -> site", site)
  await ctx.scene.enter('start');
}

export const selectFromCurrencyAction = async (ctx) => {
  console.log('selectFromCurrencyAction');
  const getFrom = getCurrencyName(ctx); // берем имя из сообщения
  const validFrom = await convertCurrency(ctx, getFrom); // делаем сокращение имени
  saveToSession(ctx, 'curFrom', validFrom); // сохраняем в сессию сокращение
  const curInfo = validFrom && await getCurrInfo(validFrom); // берем полое инфо

  if(curInfo) {
    saveToSession(ctx, 'curFromInfo', curInfo);
    ctx.replyWithHTML(`Selected currency - <b>${getFrom}</b>`);
    await pause(1000);
    ctx.scene.leave('curr_from');
    ctx.scene.enter('curr_to');
  } else {
    ctx.reply(messages.errorNameMsg);
    await pause(1000);
    ctx.scene.reenter();
    deleteFromSession(ctx, 'curFrom');
  }

}

export const selectToCurrencyAction = async (ctx) => {
  console.log('selectToCurrencyAction');
  const curTo = getCurrencyName(ctx);

  const getTo = getCurrencyName(ctx); // берем имя из сообщения
  const validTo = await convertCurrency(ctx, getTo); // делаем сокращение имени
  saveToSession(ctx, 'curTo', validTo); // сохраняем в сессию сокращение
  const curInfo = validTo && await getCurrInfo(validTo); // берем полое инфо

  if(curInfo) {
    saveToSession(ctx, 'curToInfo', curInfo);
    ctx.replyWithHTML(`Selected currency - <b>${curTo}</b>`);
    await pause(1000);
    ctx.scene.leave('curr_to');
    ctx.scene.enter('check');
  } else {
    ctx.reply(messages.errorNameMsg);
    await pause(1000);
    ctx.scene.reenter();
    deleteFromSession(ctx, 'curTo');
  }

  // DB
  // const userId = await ctx.session.userId;
  // const user = UserModel.findOne({ id : userId });
  //   if(user && user.transactions) {
  //   const transactionIndex = user.transactions.findIndex(t => t.id === entity.id);
  //   user.transactions.push({to: curTo});
  // }

}

export const inputAdditionalDataAction = async (ctx) => {
  const inputData = ctx.message.text;
  saveToSession(ctx, 'addData', inputData);
  await ctx.scene.leave('add_info');
  await ctx.scene.enter('agree');
}

export const selectAmountAction = async (ctx) => {
  const amount = Number(ctx.message.text.replace(',', '.'));
  if (!amount || isNaN(amount) || ctx.message.text.match(/0x[\da-f]/i)) {
    ctx.reply('Only numbers and dot/comma are allowed');
    await pause(1000);
    ctx.scene.reenter();
    return;
  }
  const minValue = await ctx.session.minValue;
  if(amount >= minValue) {
    saveToSession(ctx, 'amount', amount);
    ctx.scene.leave('amount');
    ctx.scene.enter('est_exch');
  } else {
    ctx.reply(`Enter an amount bigger than or equal to ${minValue}`);
    await pause(1000);
    ctx.scene.reenter();
  }
}

export const typeWalletAction = (ctx) => {
  console.log('typeWalletAction');
  const walletCode = ctx.message.text;
  saveToSession(ctx, 'walletCode', walletCode);
  ctx.scene.leave('est_exch');
  ctx.scene.enter('add_info');
}


export const agreePressAction = async (ctx) => {
  console.log('agreePressAction');
  const uId = await ctx.session.userId;
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const walletCode = await ctx.session.walletCode;
  const amount = await ctx.session.amount;
  const extraId = await ctx.session.addData;

  const data = {
    userId: uId,
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
    await ctx.reply('Sorry, the address you entered is invalid.');
    await pause(1000);
    await ctx.scene.leave('agree');
    await ctx.scene.enter('est_exch');
  }
}

export const cancelTradeAction = (ctx) => {
  deleteFromSession(ctx, 'curFrom');
  deleteFromSession(ctx, 'curTo');
  deleteFromSession(ctx, 'curFromInfo');
  deleteFromSession(ctx, 'curToInfo');
  deleteFromSession(ctx, 'addData');
  deleteFromSession(ctx, 'addDataName');
  deleteFromSession(ctx, 'amount');
  deleteFromSession(ctx, 'minValue');
  deleteFromSession(ctx, 'walletCode');
  deleteFromSession(ctx, 'response');
  ctx.scene.leave();
}