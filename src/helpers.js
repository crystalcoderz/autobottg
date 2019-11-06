//------------------------------- HELPERS -------------------------------------------

import { getPairs, getMinimum } from './api';
import { messages } from './messages';
import { config } from './config';


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

export const getCurrencyName = async (ctx, type) => {
  let selectedCurName;
  if(type === 'btn') {
    selectedCurName = JSON.parse(ctx.callbackQuery.data).payload;
    await ctx.answerCbQuery(`Selected currency – ${selectedCurName}`);
  } else if(type === 'text') {
    const text = ctx.message.text.split('(')[0].trim();
    selectedCurName = text;
  }
  console.log("TCL: getCurrencyName -> selectedCurName", selectedCurName)
  return selectedCurName;
}

export const saveToSession = (ctx, field, data) => {
  ctx.session[field] = data;
}

export const deleteFromSession = async (ctx, field) => {
  const hasField = await ctx.session.field;
  hasField && delete ctx.session[field];
}

export const prepareName = (name) => {
  if(typeof name === 'string') {
    return name.trim().toLowerCase();
  }
};

export const checkCurrency = async (ctx, curName) => {
  let curAbbr;
  const allCurrs = await ctx.session.currs;
  const currAvailable = allCurrs.find(item =>
    prepareName(item.ticker) === prepareName(curName) ||
    prepareName(item.name) === prepareName(curName)
  );
  return curAbbr = currAvailable ? currAvailable.ticker : null;
}


// export const convertAndCheckCurr = async (ctx, from, to) => {
//   const allCurrs = await ctx.session.currs;
//   const fromCurr = allCurrs.find(item =>
//     prepareName(item.ticker) === prepareName(from) ||
//     prepareName(item.name) === prepareName(from)
//   );
//   const toCurr = allCurrs.find(item =>
//     prepareName(item.ticker) === prepareName(to) ||
//     prepareName(item.name) === prepareName(to)
//   );

//   let curFromAbbr, curToAbbr;
//   if(fromCurr) {
//     curFromAbbr = fromCurr.ticker;
//     saveToSession(ctx, 'curFrom', curFromAbbr);
//   } else {}
//   if(toCurr) {
//     curToAbbr = toCurr.ticker;
//     saveToSession(ctx, 'curTo', curToAbbr);
//   }
//   if(!fromCurr || !toCurr) {
//     await ctx.reply(messages.errorNameMsg);
//     deleteFromSession(ctx, 'curFrom')
//     deleteFromSession(ctx, 'curTo')
//     await pause(3000);
//     await ctx.scene.leave('prepare');
//     await ctx.scene.enter('curr_from');
//     return null;
//   }
//   return `${curFromAbbr}_${curToAbbr}`;
// }

export const validatePair = async (pair) => {
  const availablePairs = await getPairs();
  const hasPair = availablePairs.includes(pair);
  return hasPair;
}

export const getMinimumAmount = async (pair) => {
  const getMin = await getMinimum(pair);
  return getMin.minAmount;
}