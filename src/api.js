//------------------------------- API -------------------------------------------
import rp from 'request-promise';
import { config } from './config';


const _apiRequest = async (options) => {
  try {
    const resp = await rp(options);
    return resp;
  }
  catch (err) {
    console.log(err.error.error);
    throw new Error(err.error.error);
  }
}


export const getUserIp = async () => {
  const options = {
    uri: 'http://localhost:8080/get-api',
  };
  const req = await _apiRequest(options);
  return req;
}

export const getAllCurrencies = async () => {
  const options = {
    uri: `${config.api_url}/currencies?active=true?api_key=${config.api_key}`,
    json: true
  };
  const currs = await _apiRequest(options);
  return currs;
}

export const getPairs = async () => {
  const options = {
    uri: `${config.api_url}/market-info/available-pairs/?api_key=${config.api_key}`,
    json: true
  };
  const currs = await _apiRequest(options);
  return currs;
}

export const getMinimum = async (pair) => {
  const options = {
    uri: `${config.api_url}/min-amount/${pair}?api_key=${config.api_key}`,
    json: true
  };
  const amount = await _apiRequest(options);
  return amount;
}


export const getCurrInfo = async (cur) => {
  const options = {
    uri: `${config.api_url}/currencies/${cur}?api_key=${config.api_key}`,
    json: true
  };
  const curr = await _apiRequest(options);
  return curr;
}

export const getExchAmount = async (amount, fromTo) => {
  const options = {
    uri: `${config.api_url}/exchange-amount/${amount}/${fromTo}?api_key=${config.api_key}`,
    json: true
  };
  const summ = await _apiRequest(options);
  return summ;
}

export const sendTransactionData = async (data) => {
  const options = {
    method: 'POST',
    uri: `${config.api_url}/transactions/${config.api_key}`,
    body: data,
    json: true
  };
  const curr = await _apiRequest(options);
  return curr;
}


export const getTransactionStatus = async (id) => {
  const options = {
    uri: `${config.api_url}/transactions/${id}/${config.api_key}`,
    json: true
  }
  const status = await _apiRequest(options);
  return status;
}
