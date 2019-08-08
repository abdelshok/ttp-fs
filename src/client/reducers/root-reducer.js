// ROOT REDUCER
// - Sets three different states for now: the email, password, and the
// authentication status of the user.

import {
  SET_EMAIL,
  SET_PASSWORD,
  USER_AUTHENTICATED,
  SET_MAIN_PAGE,
  SET_NAME,
  SET_PORTFOLIO_AMOUNT,
} from '../action-creators/constants';

// Still need to add the UserAuthenticated, etc. attributes here.
const initialState = {
  email: '',
  password: '',
  isAuthenticated: false,
  userName: '',
  mainPageType: 'portfolio', // Might modify this set up for page shift between
  // portfolio and transactions.
  portfolioAmount: ''
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return Object.assign({}, state, { email: action.email });
    case SET_PASSWORD:
      return Object.assign({}, state, { password: action.password });
    case USER_AUTHENTICATED:
      return Object.assign({}, state, { isAuthenticated: action.isAuthenticated });
    case SET_MAIN_PAGE:
      return Object.assign({}, state, { mainPageType: action.mainPageType });
    case SET_NAME:
      return Object.assign({}, state, { userName: action.userName });
    case SET_PORTFOLIO_AMOUNT:
      return Object.assign({}, state, { portfolioAmount: action.porfolioAmount });
    default:
      return state;
  }
}
