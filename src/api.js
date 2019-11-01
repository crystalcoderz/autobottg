//------------------------------- API -------------------------------------------
import rp from 'request-promise';
import { config } from './config'

export const getAllCurrencies = async () => {
  const options = {
    uri: `https://changenow.io/api/v1/currencies?active=true?api_key=${config.api_key}`,
    json: true
  };
  try {
    const resp = await rp(options);
    return resp;
  }
  catch (err) {
    console.log(err);
  }
};


export const getPairs = async () => {
  const options = {
    uri: `https://changenow.io/api/v1/market-info/available-pairs/?api_key=${config.api_key}`,
    json: true
  };
  try {
    const resp = await rp(options);
    return resp;
  }
  catch (err) {
    console.log(err);
  }
}

export const getMinimum = async (pair) => {
  const options = {
    uri: `https://changenow.io/api/v1/min-amount/${pair}?api_key=${config.api_key}`,
    json: true
  };
  try {
    const resp = await rp(options);
    return resp;
  }
  catch (err) {
    console.log(err);
  }
}

export const getExchAmount = async (amount, fromTo) => {
  const options = {
    uri: `https://changenow.io/api/v1/exchange-amount/${amount}/${fromTo}?api_key=${config.api_key}`,
    json: true
  };
  try {
    const resp = await rp(options);
    return resp;
  }
  catch (err) {
    console.log(err);
  }
}

export const sendTransactionData = async (data) => {
  const options = {
    method: 'POST',
    uri: `https://changenow.io/api/v1/transactions/${config.api_key}`,
    body: data,
    json: true
  };
  try {
    const response = await rp(options);
    return response;
  }
  catch (err) {
    console.log(err)
    throw new Error(err.error.error);
  }
}
