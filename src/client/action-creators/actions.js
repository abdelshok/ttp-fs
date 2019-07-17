import {
  SET_EMAIL,
  SET_PASSWORD,
  USER_AUTHENTICATED,
  SET_MAIN_PAGE,
  SET_FIRST_NAME,
  SET_LAST_NAME,
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

export const setUserFirstName = function(userFirstName) { // eslint-disable-line
  return {
    type: SET_FIRST_NAME,
    userFirstName,
  };
};

export const setUserLastName = function(userLastName) { // eslint-disable-line
  return {
    type: SET_LAST_NAME,
    userLastName,
  };
};
