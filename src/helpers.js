//------------------------------- HELPERS -------------------------------------------

import { getPairs, getMinimum, getTransactionStatus } from './api';
import { messages } from './messages';
import { config } from './config';
let intervalStatus;

export const pause = time => new Promise(resolve => setTimeout(resolve, time));

// export const getPopularCurrs = (currs) => {
//   let popCurrs = [];
//   currs.filter(curr => config.popularCurrs.includes(curr.name))
//     .map(curr => popCurrs.push({name: curr.name, ticker: curr.ticker}));
//   return popCurrs;
// }

export const handler = (fn) => {
  return async function(ctx, next) {
    try {
      return await fn(ctx);
    } catch (error) {
      console.log(error);
      await ctx.reply('Something went wrong');
      return next();
    }
  };
};



export const getCurrencyName = (ctx) => {
  const selectedCurName = ctx.message.text.replace('✅', '').split('(')[0].trim();
  return selectedCurName;
}

export const saveToSession = (ctx, field, data) => {
  ctx.session[field] = data;
}

export const deleteFromSession = (ctx, field) => {
  const hasField = ctx.session[field];
  hasField && delete ctx.session[field];
}

export const prepareName = (name) => {
  if(typeof name === 'string') {
    return name.trim().toLowerCase();
  }
};

export const convertCurrency = async (ctx, curName) => {
  let curAbbr;
  const allCurrs = await ctx.session.currs;
  const currAvailable = allCurrs.find(item =>
    prepareName(item.ticker) === prepareName(curName) ||
    prepareName(item.name) === prepareName(curName)
  );
  return curAbbr = currAvailable ? currAvailable.ticker : null;
}

export const validatePair = async (pair) => {
  const availablePairs = await getPairs();
  const hasPair = availablePairs.includes(pair);
  return hasPair;
}

export const getMinimumAmount = async (pair) => {
  const getMin = await getMinimum(pair);
  return getMin.minAmount;
}

const processStatus = async (ctx, status, payinData) => {
  if(status === 'waiting') {
    ctx.replyWithHTML(`Transaction ID - <b>${payinData.id}</b>`);
    return;
  }
  if(status === 'finished') {
    const newStatus = await getTransactionStatus(payinData.id);
    ctx.replyWithHTML('Transaction hash is');
    await pause(500);
    ctx.reply(`${newStatus.payoutHash}`);
    return;
  }
};

export const intervalRequire = async (ctx, payinData) => {
  const curTo = await ctx.session.curTo;
  const statusMap = {
    new: '',
    waiting: 'We are waiting for your coins to be received.',
    confirming: 'We received your deposit.',
    exchanging: 'The exchange process has initiated.',
    finished: `The transaction was successfully finished. Your ${curTo} coins were sent to your wallet.\nThank you for choosing us.`,
    failed: 'Sorry, something is wrong. We didn’t manage to start the transaction process. Please, try again later.',
    expired: 'The transaction status is Expired. We didn’t get your coins for exchange. Do you want to start a new exchange?'
  }

  let status = '';
  intervalStatus = setInterval(async () => {
    const getStatus = await getTransactionStatus(payinData.id);
    if(status !== getStatus.status) {
      ctx.reply(statusMap[getStatus.status]);
      status = getStatus.status;
      await pause(1000);
      await processStatus(ctx, status, payinData);
    }
  }, config.interval);
}

export const breakTransaction = (ctx) => {
  clearInterval(intervalStatus);
  ctx.scene.enter('start');
}