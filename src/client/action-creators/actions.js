import {
  SET_EMAIL,
  SET_PASSWORD,
  USER_AUTHENTICATED,
  SET_MAIN_PAGE,
  SET_FULL_NAME,
  SET_PORTFOLIO_AMOUNT,
  SET_USER_ID,
  SET_STOCKS_LOGIN,
  SET_TRANSACTIONS_LOGIN
} from './constants';

export const setEmail = function(email) { // eslint-disable-line
  return {
    type: SET_EMAIL,
    email,
  };
};

export const setPassword = function(password) { // eslint-disable-line
  return {
    type: SET_PASSWORD,
    password,
  };
};

export const authenticateUser = function(state) { // eslint-disable-line
  return {
    type: USER_AUTHENTICATED,
    isAuthenticated: state,
  };
};
export const setMainPage = function(mainPageType) { // eslint-disable-line
  return {
    type: SET_MAIN_PAGE,
    mainPageType,
  };
};

export const setFullName = function(userFullName) { // eslint-disable-line
  return {
    type: SET_FULL_NAME,
    userFullName,
  };
};

export const setPortfolioAmount = function(portfolioAmount) { // eslint-disable-line
  return {
    type: SET_PORTFOLIO_AMOUNT,
    portfolioAmount,
  };
};

export const setUserId = function(userId) { // eslint-disable-line
  return {
    type: SET_USER_ID,
    userId
  };
};

export const setStocksLogin = function(stocksArray) { // eslint-disable-line
  return {
    type: SET_STOCKS_LOGIN,
    stocksArray
  };
};

export const setTransactionsLogin = function(transactionsArray) { // eslint-disable-line
  return {
    type: SET_TRANSACTIONS_LOGIN,
    transactionsArray
  };
};



// To later potentially store in the redux/reducer/actions: actions/functions that will store
// the actual portfolio of the user. It is probably better to store the current stocks owned
// locally, than the transactions, which may amount to a lot, after some time. But research if this
// might affect performance.
