import { getPairs } from './api';
import UserModel from './models/User';
import TransactionModel from './models/Transaction';
import VisitModel from './models/Visit';

export const getIpFromDB = async (userId) => {
  const { visits } = await UserModel.findOne({ userId }).populate('visits');
  return visits[visits.length - 1].userIp;
};

export const isAvailableCurr = (name, allCurr) => {
  return allCurr.findIndex(c => {
    return c.ticker.toLowerCase() === name.toLowerCase() ||
      c.name.toLowerCase() === name.toLowerCase();
  });
};

export const pause = time => new Promise(resolve => setTimeout(resolve, time));

export const getCurrencyName = text => {
  const textFromBtn = text.match(/(?<=\().+?(?=\))/gi);
  return textFromBtn ? textFromBtn[0].trim() : text.trim();
};

export const validatePair = async pair => {
  const availablePairs = await getPairs();

  return availablePairs.includes(pair);
};

export const addTransactionToDB = async (trn, telegramUserId) => {
  const user = await UserModel.findOne({ userId: telegramUserId });
  const { id: transactionId, ...fields } = trn;
  await TransactionModel.create({ ...fields, transactionId, owner: user.id });
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

  const user = await UserModel.findOne({ userId: req.params.id }).populate('Visit');
  const visit = await VisitModel.create({ userIp, ipParsed: new Date(), user: user.id });

  user.visits.push(visit);

  await user.save();
  await visit.save();
};
