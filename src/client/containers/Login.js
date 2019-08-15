// LOGIN CONTAINER
// - This is the login box, with the respective input fields for the email and password. 
// - Uses AWS-amplify for user authentication and AWS Lambda functions through APIs set up through
// API gateway in order to fetch the correct user information (name, amount in portfolio, list of 
// stocks, transactions, etc.)

// Future - Extra features that can be added later:
// - "Remember me" button 
// - Implement forgot password

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import axios from 'axios';
// App Components
import store from '../store/store';
import { 
  setEmail, setPassword, authenticateUser, setFullName, setPortfolioAmount, setUserId, setStocksLogin, setTransactionsLogin
} from '../action-creators/actions';
import Box from '../styledComponents/Box';
import Button from '../styledComponents/Button';
import LinkText from '../styledComponents/LinkText';
import Checkbox from '../styledComponents/Checkbox';
import InputField from '../styledComponents/InputField';
import NormalText from '../styledComponents/NormalText';
import CenteredDiv from '../styledComponents/CenteredDiv';
import BoxTitleText from '../styledComponents/BoxTitleText';
import InputFieldLogo from '../styledComponents/InputFieldLogo';
import InputFieldAndIconContainer from '../styledComponents/InputFieldAndIconContainer';
import FullstackTheme from '../styledComponents/FullstackTheme';
// Environment Variables
import config from '../config';

const SmallCenteredDiv = styled(CenteredDiv)`
  width: 50%;
  margin-top: 20px;
`;

const LongCenteredDiv = styled(CenteredDiv)`
  width: 60%;
  margin-bottom: 20px;
`;

const LeftFloatDiv = styled(CenteredDiv)`
  float: left;
  width: 50%;
`;

const LinkSignUpText = styled(LinkText)`
  margin-left: 10px;
`;

const NormalTextMarginLeft = styled(NormalText)`
  margin-left: 10px;
`;

const EmailIcon = require('../assets/icons/emailIcon.svg');
const LockIcon = require('../assets/icons/lockIcon.svg');

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      authenticated: false,
    };
  }

  // Method used to disable submit button while password and email lengths are not validated
  validateForm = () =>
    this.state.email.length > 0 && this.state.password.length > 0;

  // Method used to authenticate the user with AWS Cognito
  handleSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    store.dispatch(setEmail(email));
    store.dispatch(setPassword(password));

    const stockDataLink = config.gateway.GETSTOCK_LINK + this.state.email;
    console.log('The API link to retrieve stock information is', stockDataLink);
    const transactionDataLink = config.gateway.GETTRANSACTION_LINK + this.state.email;
    console.log('The API link to retrieve stock information is', transactionDataLink);

    try {
      // Authentication with AWS Cognito below
      const result = await Auth.signIn(store.getState().email, store.getState().password);
      console.log("The result of signing in is", result);
      // When the await call returns successfully works, then the code below gets executed, but
      // when it does not, the code does not get executed. As a result, handleSubmit's execution 
      // stops immediately
      
      store.dispatch(authenticateUser(true)); 
      // Dispatch does not run if the Auth call above does not return a successful message
      
      // Concatenates the API & the user's email, to get the final link that will be inputted
      // in the axios request
      const userDataLink = config.gateway.GETUSER_LINK + this.state.email;

      // Retrieves user data. Function declared below
      this.retrieveUserData(userDataLink);
    
      // Retrieves stock and transaction data. Function declared below
      this.retrieveStockTransactionData(stockDataLink, transactionDataLink);

      // If isAuthenticated state is true, then user has been correctly identified
      // - Clear password field for security purposes 
      // - Modify authenticated state to trigger React <Redirect> to the main page
      if (store.getState().isAuthenticated == true) {
        console.log("User authenticated");
        this.setState({
          authenticated: true,
          password: '',
        });
      };

      // In addition - clear out the password from local and redux state in order to avoid security
      // breach
      store.dispatch(setPassword(''));
    } catch (err) {
      alert(err.message); // eslint-disable-line
    }
  };

  // Function called in handleSubmit() to retrieve user general data
  // - Param is userDataLink which is the link to the respective API in API gateway
  // - Dispatches retrieved user information to redux store
  retrieveUserData = async (userDataLink) => {
    try {
      const userData = await axios.get(userDataLink);
      console.log('User data is ', userData);

      const fullName = userData.data.Items[0].name;
      const userId = userData.data.Items[0].user_id;
      const { amount } = userData.data.Items[0];

      store.dispatch(setFullName(fullName));
      store.dispatch(setUserId(userId));
      store.dispatch(setPortfolioAmount(amount));
    } catch (err) {
      console.log('Error fetching user data', err);
    };
  };

  // Function called in handleSubmit() function above to retrieve user's stock and transaction list
  // - Params include stockDataLink & transactionDataLink, which are links to the APIs in API gateway
  // - Does not return any value, but dispatches the stock and transaction arrays to redux store
  retrieveStockTransactionData = async (stockDataLink, transactionDataLink) => {
    try {
      const stockData = await axios.get(stockDataLink)
      const transactionData = await axios.get(transactionDataLink);
      const stockArray = stockData.data.Items;
      const transactionArray = transactionData.data.Items;
      console.log('Retrieved stock data', stockArray);
      console.log('Retrieved transaction data', transactionArray);

      store.dispatch(setStocksLogin(stockArray));
      store.dispatch(setTransactionsLogin(transactionArray));

    } catch (err) {
      alert('Error caught while attempting to retrieve stock and transaction data.');
      console.log('Error caught while attempting to retrieve stock and transaction data.');
    };     
  };

  // Modify current state of the email and password fields according to what the user types
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log('State of email', this.state.email); 
    console.log('State of password', this.state.password);
  };

  // Function uses <Redirect /> component from react-router-dom to redirect user to the 
  // main page once it is confirmed that user has authenticated
  renderRedirect = () => {
    if (store.getState().isAuthenticated === true) {
      return <Redirect to="/main" />;
    }
  }

  render() {
    return (
      <Box FullstackTheme={FullstackTheme}>
        <div>
          {this.renderRedirect()}
          <BoxTitleText FullstackTheme={FullstackTheme}>
            Login
            {''}
          </BoxTitleText>
          <form onSubmit={this.handleSubmit} value>
            <InputFieldAndIconContainer FullstackTheme={FullstackTheme}>
              <InputFieldLogo src={EmailIcon} />
              <InputField
                type="email"
                value={this.state.email}
                placeholder="Email"
                id="email"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIconContainer>
            {/* EmailFieldComponent would replace the above piece of code */}

            <InputFieldAndIconContainer FullstackTheme={FullstackTheme}>
              <InputFieldLogo src={LockIcon} />
              <InputField
                type="password"
                value={this.state.password}
                placeholder="Password"
                id="password"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIconContainer>

            <LongCenteredDiv>
              <LeftFloatDiv>
                <Checkbox type="checkbox" FullstackTheme={FullstackTheme} />
                <NormalTextMarginLeft> Remember me </NormalTextMarginLeft>
              </LeftFloatDiv>
              <LinkText href=""> Forgot password? </LinkText>
            </LongCenteredDiv>

            <Button
              type="submit"
              text="login"
              FullstackTheme={FullstackTheme}
              disabled={!this.validateForm()}
            >
              {' '}
              Log In
              {' '}
            </Button>
          </form>
        </div>

        <SmallCenteredDiv>
          <NormalText>
            Don't have an account? { this.props.password }
            {''}
          </NormalText>
          <LinkContainer to="/signup">
            <LinkSignUpText important>Sign Up</LinkSignUpText>
          </LinkContainer>
        </SmallCenteredDiv>
      </Box>
    );
  }
}

export default Login;
