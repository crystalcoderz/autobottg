//--------------------------- Actions -----------------------------------------------

import Stage from 'telegraf/stage';
import rp from 'request-promise';
import { messages } from './messages';
import { pause } from './helpers';
import UserModel from './models/User';
import { getCurrencyName, saveToSession, convertCurrency, deleteFromSession } from './helpers';
import { sendTransactionData, getCurrInfo } from './api';

const { enter, leave } = Stage;
class Transaction {
  constructor() {
    (this.date = Number(new Date())),
      (this.from = ''),
      (this.to = ''),
      (this.address = ''),
      (this.amount = 0),
      (this.extraId = '');
  }
}

export const handleStartAction = async ctx => {
  const user = ctx.message.from;
  saveToSession(ctx, 'userId', user.id);
  const userInDB = await UserModel.findOne({ id: user.id });
  if (!userInDB) {
    UserModel.insertMany({ id: user.id, username: user.username, visits: [], transactions: [] });
  }
  ctx.scene.enter('start');
};

export const selectFromCurrencyAction = async ctx => {
  const getFrom = getCurrencyName(ctx); // берем имя из сообщения
  const validFrom = await convertCurrency(ctx, getFrom); // делаем сокращение имени
  saveToSession(ctx, 'curFrom', validFrom); // сохраняем в сессию сокращение
  const curInfo = validFrom && (await getCurrInfo(validFrom)); // берем полое инфо

  if (curInfo) {
    saveToSession(ctx, 'curFromInfo', curInfo);
    ctx.replyWithHTML(`Selected currency - <b>${getFrom}</b>.`);
    await pause(1000);
    ctx.scene.leave('curr_from');
    ctx.scene.enter('curr_to');
  } else {
    ctx.reply(messages.notFound);
    await pause(1000);
    ctx.scene.reenter();
    deleteFromSession(ctx, 'curFrom');
  }
};

export const selectToCurrencyAction = async ctx => {
  const curTo = getCurrencyName(ctx);
  const getTo = getCurrencyName(ctx); // берем имя из сообщения
  const validTo = await convertCurrency(ctx, getTo); // делаем сокращение имени
  saveToSession(ctx, 'curTo', validTo); // сохраняем в сессию сокращение
  const curInfo = validTo && (await getCurrInfo(validTo)); // берем полое инфо

  if (curInfo) {
    saveToSession(ctx, 'curToInfo', curInfo);
    ctx.replyWithHTML(`Selected currency - <b>${curTo}</b>.`);
    await pause(1000);
    ctx.scene.leave('curr_to');
    ctx.scene.enter('check');
  } else {
    ctx.reply(messages.notFound);
    await pause(1000);
    ctx.scene.reenter();
    deleteFromSession(ctx, 'curTo');
  }
};

export const inputAdditionalDataAction = async ctx => {
  const inputData = ctx.message.text;
  saveToSession(ctx, 'addData', inputData);
  await ctx.scene.leave('add_info');
  await ctx.scene.enter('agree');
};

export const selectAmountAction = async ctx => {
  const amount = Number(ctx.message.text.replace(',', '.'));
  if (!amount || isNaN(amount) || ctx.message.text.match(/0x[\da-f]/i)) {
    ctx.reply(messages.numErr);
    await pause(1000);
    ctx.scene.reenter();
    return;
  }
  const minValue = await ctx.session.minValue;
  if (amount >= minValue) {
    saveToSession(ctx, 'amount', amount);
    ctx.scene.leave('amount');
    ctx.scene.enter('est_exch');
  } else {
    ctx.reply(`Oops! Wrong amount.`);
    await pause(1000);
    ctx.scene.reenter();
  }
};

export const typeWalletAction = ctx => {
  const walletCode = ctx.message.text;
  saveToSession(ctx, 'walletCode', walletCode);
  ctx.scene.leave('est_exch');
  ctx.scene.enter('add_info');
};

export const agreePressAction = async ctx => {
  const uId = await ctx.session.userId;
  const curFrom = await ctx.session.curFrom;
  const curTo = await ctx.session.curTo;
  const walletCode = await ctx.session.walletCode;
  const amount = await ctx.session.amount;
  const extraId = await ctx.session.addData;

  const getIpFromDB = async () => {
    const userInDB = await UserModel.findOne({ id: uId });
    const visits = userInDB && userInDB.visits;
    if(!userInDB.visits.length) return '';
    const lastVisitIP = visits[visits.length - 1].userIp;
    return lastVisitIP;
  }

  const data = {
    userId: uId,
    from: curFrom,
    to: curTo,
    address: walletCode,
    amount: amount,
    extraId: extraId || '',
    ip: await getIpFromDB()
  };
  try {
    const response = await sendTransactionData(data);
    saveToSession(ctx, 'response', response);
    await ctx.scene.leave('agree');
    await ctx.scene.enter('get_addr');
  } catch (err) {
    await ctx.reply(`Sorry, the address you’ve entered is invalid.`);
    await pause(1000);
    await ctx.scene.leave('agree');
    await ctx.scene.enter('est_exch');
  }
};

export const cancelTradeAction = ctx => {
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
};

export const getIpAction = async req => {
  let ip;
  if (req.headers['x-forwarded-for']) {
    ip = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.connection && req.connection.remoteAddress) {
    ip = req.connection.remoteAddress;
  } else {
    ip = req.ip;
  }

  const user = await UserModel.findOne({ id: req.query.id });
  if (user && user.visits) {
    user.visits.push({ userIp: ip, ipParsed: new Date().toJSON() });
    await UserModel.updateOne({ id: req.query.id }, { visits: user.visits });
  }
};
