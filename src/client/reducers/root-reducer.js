// ROOT REDUCER
// - Sets three different states for now: the email, password, and the
// authentication status of the user.

import {
  SET_EMAIL,
  SET_PASSWORD,
  USER_AUTHENTICATED,
  SET_MAIN_PAGE,
  SET_FULL_NAME,
  SET_PORTFOLIO_AMOUNT,
  SET_USER_ID,
} from '../action-creators/constants';

// Still need to add the UserAuthenticated, etc. attributes here.
const initialState = {
  email: '',
  password: '',
  isAuthenticated: false,
  userFullName: '',
  mainPageType: 'portfolio', // Might modify this set up for page shift between
  // portfolio and transactions.
  portfolioAmount: 0,
  userId: '',
};

// Storing the user ID could be perceived as a potential security flaw, but in this case
// the user ID is simply stored in the database, which is stored separately from the db
// containing user authentication information, which itself doesn't contain the user ID
// User ID is stored in redux store in order to be used when transactions are being made
// by the user, so that the stocks & transactions can be stored in the database according
// to the user's ID and therefore retrieved more easily

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
    case SET_FULL_NAME:
      return Object.assign({}, state, { userFullName: action.userFullName });
    case SET_PORTFOLIO_AMOUNT:
      return Object.assign({}, state, { portfolioAmount: action.portfolioAmount });
    case SET_USER_ID:
      return Object.assign({}, state, { userId: action.userId });
    default:
      return state;
  }
}
