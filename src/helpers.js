//------------------------------- HELPERS -------------------------------------------

import { getPairs, getMinimum, getTransactionStatus, getExchAmount, getAllCurrencies } from './api';
import { getMainKeyboard } from './keyboards';
import { messages } from './messages';
import { config } from './config';
import UserModel from './models/User';
let intervalStatus;

export const pause = time => new Promise(resolve => setTimeout(resolve, time));

export const handler = fn => {
  return async function(ctx, next) {
    try {
      return await fn(ctx);
    } catch (error) {
      console.log(error);
      await ctx.reply('Error: ' + error);
      return next();
    }
  };
};

export const getCurrencyName = ctx => {
  const selectedCurName = ctx.message.text
    .replace('✅', '')
    .split('(')[0]
    .trim();
  return selectedCurName;
};

export const saveToSession = (ctx, field, data) => {
  ctx.session[field] = data;
};

export const deleteFromSession = (ctx, field) => {
  const hasField = ctx.session[field];
  hasField && delete ctx.session[field];
};

export const prepareName = name => {
  if (typeof name === 'string') {
    return name.trim().toLowerCase();
  }
};

export const convertCurrency = async (ctx, curName) => {
  let curAbbr;
<<<<<<< HEAD
  const allCurrs = await ctx.session.currs || getAllCurrencies();
  // const allCurrs = await ctx.session.currs;
=======
  const allCurrs = ctx.session.currs || await getAllCurrencies();
>>>>>>> don't remove user session
  const currAvailable = allCurrs.find(
    item =>
      prepareName(item.ticker) === prepareName(curName) ||
      prepareName(item.name) === prepareName(curName)
  );
  return (curAbbr = currAvailable ? currAvailable.ticker : null);
};

export const validatePair = async pair => {
  const availablePairs = await getPairs();
  const hasPair = availablePairs.includes(pair);
  return hasPair;
};

export const getAmountTotal = async (amount, fromTo) => {
  const amountReq = await getExchAmount(amount, fromTo);
  const amountTotal = amountReq.estimatedAmount;
  return amountTotal;
};

export const getMinimumAmount = async pair => {
  const getMin = await getMinimum(pair);
  return getMin.minAmount;
};

const processStatus = async (ctx, status, payinData) => {
  if (status === 'waiting') {
    ctx.replyWithHTML(`Transaction ID - <b>${payinData.id}</b>`);
    return;
  }
  if (status === 'finished') {
    const newStatus = await getTransactionStatus(payinData.id);
    ctx.replyWithHTML(' The transaction hash is');
    await pause(500);
    ctx.reply(`${newStatus.payoutHash}`);
    return;
  }
};

export const intervalRequire = async (ctx, payinData) => {
  const curTo = await ctx.session.curTo;
  const statusMap = {
    new: '',
    waiting: 'We are waiting for your coins to be received. No pressure, though.',
    confirming: 'We have received your deposit. Nice!',
    exchanging: 'The exchange process has been initiated. Just a little bit left...',
    finished: `Yay! The transaction is successfully finished. Your ${curTo} have been sent to your wallet.\nThank you for choosing ChangeNOW - hope to see you again soon!`,
    failed:
      'We weren’t able to start the transaction process. Please, try again later.',
    expired:
      'We didn’t get your deposit. :(\nWould you like to start a new exchange?'
  };

  let status = '';
  intervalStatus = setInterval(async () => {
    const getStatus = await getTransactionStatus(payinData.id);
    if (status !== getStatus.status) {
      ctx.reply(statusMap[getStatus.status]);
      status = getStatus.status;
      await pause(1000);
      await processStatus(ctx, status, payinData);
    }
  }, config.interval);
};

export const breakTransaction = async ctx => {
  clearInterval(intervalStatus);
  await ctx.scene.enter('curr_from');
};

export const startHandler = async ctx => {
  await ctx.scene.leave();
  await ctx.reply(messages.startMsg, getMainKeyboard(ctx));
};

export const addTransactionToDB = async (trID, uId) => {
  const user = await UserModel.findOne({ id: uId });
  if (user && user.transactions) {
    user.transactions.push({ transactionId: trID});
    await UserModel.updateOne({ id: uId }, { transactions: user.transactions });
  }
};
