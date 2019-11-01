//------------------------------- HELPERS -------------------------------------------

import { getPairs, getMinimum } from './api';
import { messages } from './messages';
import { config } from './config';

export const getPopularNames = (currs) => {
  let names = [];
  currs.filter(curr => config.popularCurrs.includes(curr.name))
    .map(curr => names.push(curr.name));
  return names;
}

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
    selectedCurName = ctx.message.text;
  }
  return selectedCurName;
}

export const saveToSession = (ctx, field, data) => {
  ctx.session[field] = data;
}

export const deleteFromSession = (ctx, field) => {
  delete ctx.session[field];
}

export const prepareName = (name) => {
  if(typeof name === 'string') {
    return name.trim().toLowerCase();
  }
};

export const convertAndCheckCurr = async (ctx, from, to) => {
  const allCurrs = await ctx.session.currs;
  const fromCurr = allCurrs.find(item =>
    prepareName(item.ticker) === prepareName(from) ||
    prepareName(item.name) === prepareName(from)
  );
  const toCurr = allCurrs.find(item =>
    prepareName(item.ticker) === prepareName(to) ||
    prepareName(item.name) === prepareName(to)
  );

  // console.log(fromCurr);
  // console.log(toCurr);

  let curFromAbbr, curToAbbr;
  if(fromCurr) {
    curFromAbbr = fromCurr.ticker;
    saveToSession(ctx, 'curFrom', curFromAbbr);
  }
  if(toCurr) {
    curToAbbr = toCurr.ticker;
    saveToSession(ctx, 'curTo', curToAbbr);
  }
  if(!fromCurr || !toCurr) {
    await ctx.reply(messages.errorNameMsg);
    delete ctx.session['curFrom'];
    delete ctx.session['curTo'];
    await ctx.scene.leave('check');
    await ctx.scene.enter('curr_from');
    return null;
  }
  return `${curFromAbbr}_${curToAbbr}`;
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