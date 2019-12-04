//--------------------------- Actions -----------------------------------------------

import { messages } from './messages';
import { pause } from './helpers';
import UserModel from './models/User';
import VisitModel from './models/Visit';
import { getCurrencyName, saveToSession, convertCurrency, deleteFromSession } from './helpers';
import { sendTransactionData, getCurrInfo } from './api';

export const handleStartAction = async ctx => {
  const { from } = ctx.message;
  const user = from;
  const { id: userId, username } = user;

  saveToSession(ctx, 'userId', user.id);

  const userInDB = await UserModel.findOne({ userId: user.id });

  if (!userInDB) {
    await UserModel.create({ userId, username });
  }

  await ctx.scene.enter('start');
};

export const selectFromCurrencyAction = async ctx => {
  const getFrom = getCurrencyName(ctx); // берем имя из сообщения
  const validFrom = await convertCurrency(ctx, getFrom); // делаем сокращение имени
  saveToSession(ctx, 'curFrom', validFrom); // сохраняем в сессию сокращение
  const curInfo = validFrom && (await getCurrInfo(validFrom)); // берем полое инфо

  if (curInfo) {
    saveToSession(ctx, 'curFromInfo', curInfo);
    await ctx.replyWithHTML(`Selected currency - <b>${getFrom}</b>.`);
    await pause(1000);
    await ctx.scene.enter('curr_to');
  } else {
    await ctx.reply(messages.notFound);
    await pause(1000);
    await ctx.scene.reenter();
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
    await ctx.replyWithHTML(`Selected currency - <b>${curTo}</b>.`);
    await pause(1000);
    await ctx.scene.enter('check');
  } else {
    await ctx.reply(messages.notFound);
    await pause(1000);
    await ctx.scene.reenter();
    deleteFromSession(ctx, 'curTo');
  }
};

export const inputAdditionalDataAction = async ctx => {
  const inputData = ctx.message.text;
  saveToSession(ctx, 'addData', inputData);
  await ctx.scene.enter('agree');
};

export const selectAmountAction = async ctx => {
  const amount = Number(ctx.message.text.replace(',', '.'));
  if (!amount || isNaN(amount) || ctx.message.text.match(/0x[\da-f]/i)) {
    await ctx.reply(messages.numErr);
    await pause(1000);
    await ctx.scene.reenter();
    return;
  }
  const minValue = ctx.session.minValue;
  if (amount >= minValue) {
    saveToSession(ctx, 'amount', amount);
    await ctx.scene.enter('est_exch');
  } else {
    await ctx.reply(`Oops! Wrong amount.`);
    await pause(1000);
    await ctx.scene.reenter();
  }
};

export const typeWalletAction = async ctx => {
  const walletCode = ctx.message.text;
  saveToSession(ctx, 'walletCode', walletCode);
  await ctx.scene.enter('add_info');
};

export const agreePressAction = async ctx => {
  const uId = ctx.session.userId || ctx.message.from.id;
  const curFrom = ctx.session.curFrom;
  const curTo = ctx.session.curTo;
  const walletCode = ctx.session.walletCode;
  const amount = ctx.session.amount;
  const extraId = ctx.session.addData;

  const getIpFromDB = async () => {
    const userInDB = await UserModel.findOne({ id: uId });
    const visits = userInDB && userInDB.visits;
    if (!userInDB.visits.length) return '';
    return visits[visits.length - 1].userIp;
  };

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
    await ctx.scene.enter('get_addr');
  } catch (err) {
    await ctx.reply(`Sorry, the address you’ve entered is invalid.`);
    await pause(1000);
    await ctx.scene.enter('est_exch');
  }
};

export const cancelTradeAction = async ctx => {
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
  ctx.session = null;
  await ctx.scene.leave();
};

export const getIpAction = async req => {
  let userIp;
  if (req.headers['x-forwarded-for']) {
    userIp = req.headers['x-forwarded-for'].split(',')[0];
  } else if (req.connection && req.connection.remoteAddress) {
    userIp = req.connection.remoteAddress;
  } else {
    userIp = req.ip;
  }

  const user = await UserModel.findOne({ userId: req.query.id }).populate('Visit');
  const visit = await VisitModel.create({ userIp, ipParsed: new Date(), user: user.id });

  user.visits.push(visit);

  await user.save();
  await visit.save();
};
