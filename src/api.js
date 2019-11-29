//------------------------------- API -------------------------------------------
import rp from 'request-promise';
import { config } from './config';

const _apiRequest = async options => {
  try {
    const resp = await rp(options);
    return resp;
  } catch (err) {
    console.log(err.error.error);
    throw new Error(err.error.error);
  }
};

export const getAllCurrencies = async () => {
  const options = {
    uri: `${process.env.CN_API_URL}/currencies?active=true?api_key=${process.env.CN_API_KEY}`,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };
  const currs = await _apiRequest(options);
  return currs;
};

export const getPairs = async () => {
  const options = {
    uri: `${process.env.CN_API_URL}/market-info/available-pairs/?api_key=${process.env.CN_API_KEY}`,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };
  const currs = await _apiRequest(options);
  return currs;
};

export const getMinimum = async pair => {
  const options = {
    uri: `${process.env.CN_API_URL}/min-amount/${pair}?api_key=${process.env.CN_API_KEY}`,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };
  const amount = await _apiRequest(options);
  return amount;
};

export const getCurrInfo = async cur => {
  const options = {
    uri: `${process.env.CN_API_URL}/currencies/${cur}?api_key=${process.env.CN_API_KEY}`,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };
  const curr = await _apiRequest(options);
  return curr;
};

export const getExchAmount = async (amount, fromTo) => {
  const options = {
    uri: `${process.env.CN_API_URL}/exchange-amount/${amount}/${fromTo}?api_key=${process.env.CN_API_KEY}`,
    headers: {
        'Content-Type': 'application/json'
    },
    json: true
  };
  const summ = await _apiRequest(options);
  return summ;
};

export const sendTransactionData = async data => {
  const options = {
    method: 'POST',
    uri: `${process.env.CN_API_URL}/transactions/${process.env.CN_API_KEY}`,
    body: data,
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };
  const curr = await _apiRequest(options);
  return curr;
};

export const getTransactionStatus = async id => {
  const options = {
    uri: `${process.env.CN_API_URL}/transactions/${id}/${process.env.CN_API_KEY}`,
    headers: {
      'Content-Type': 'application/json'
    },
    json: true
  };
  const status = await _apiRequest(options);
  return status;
};
