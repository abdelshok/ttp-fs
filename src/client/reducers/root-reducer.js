// ROOT REDUCER
// - Sets three different states for now: the email, password, and the
// authentication status of the user.

import {
  SET_EMAIL,
  SET_PASSWORD,
  USER_AUTHENTICATED,
  SET_MAIN_PAGE,
  SET_FIRST_NAME,
  SET_LAST_NAME,
} from '../action-creators/constants';

// Still need to add the UserAuthenticated, etc. attributes here.
const initialState = {
  email: '',
  password: '',
  isAuthenticated: false,
  userFirstName: '', // Placeholder name will be changed in order
  userLastName: '', // Placeholder name will be changed in order,
  mainPageType: 'portfolio', // Might modify this set up for page shift between
  // portfolio and transactions.
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET_EMAIL:
      return Object.assign({}, state, { email: action.email });
    case SET_PASSWORD:
      return Object.assign({}, state, { password: action.password });
    case USER_AUTHENTICATED:
      return Object.assign({}, state, {
        isAuthenticated: action.isAuthenticated,
      });
    case SET_MAIN_PAGE:
      return Object.assign({}, state, { mainPageType: action.mainPageType });
    case SET_FIRST_NAME:
      return Object.assign({}, state, { userFirstName: action.userFirstName });
      // Written here under the assumption that the JSON file (dummy one being used)
    case SET_LAST_NAME:
      return Object.assign({}, state, { userLastName: action.userLastName });
      // is an array with one element at Index 0, which is an object { userFirstName: ... , etc.}
    default:
      return state;
  }
}
