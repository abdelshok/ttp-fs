// LOGIN CONTAINER
// - This is the login box, with the respective input fields for the email and password. 

// TO DO:
// - Authentication going to be set up later
// - "Remember me button to keep"
// -  delete forgot password
// - "Sign up" button wired to redirect to the sign up page
// - Set up react-router

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from 'aws-amplify';
import axios from 'axios';
// App Components
import store from '../store/store';
import { 
  setEmail, setPassword, authenticateUser, setFullName, setPortfolioAmount, setUserId
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

// PropTypes is not necessary here because PropTypes is used in order
// to ensure that the prop passed by the parent component is of the
// right type. Type checking allows us to see if we pass in a type 
// different from the intended prop by the child component.
// Says here that propTypes are never used because they are used
// as the value of the inputs, not directly used in the code. 

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
    store.dispatch(setEmail(this.state.email));
    store.dispatch(setPassword(this.state.password));
    try {  
      // AUTHENTICATION WITH COGNITO BELOW
      // In Long Run
      // - after login is successful
      // - send call to API with email to fetch data
      // - Now we are assuming that the data got back with the right format
      const result = await Auth.signIn(store.getState().email, store.getState().password);
      console.log("The result of signing in is", result);
      // When the await works, then the code below gets executed, but when it does not, the code does not get executed
      // Was going to add an if statement that executed the code below only if the async call returned successfully
      // But it seems like everything stops immediately if the async fails
      store.dispatch(authenticateUser(true)); // Does not run if the Auth call does not return a successful message.
      
      // Concatenates the API & the user's email, to get the final link that will be inputted
      // in the axios request
      const apiGatewayLink = config.gateway.GETUSER_LINK + this.state.email;

      axios.get(
        apiGatewayLink
      ).then((response) => {
        console.log('The data returned is', response);

        const fullName = response.data.Items[0].name;
        const userId = response.data.Items[0].user_id;
        const { amount } = response.data.Items[0];

        store.dispatch(setFullName(fullName));
        store.dispatch(setUserId(userId));
        store.dispatch(setPortfolioAmount(amount));
      })
      .catch((error) => {
        console.log('Error is: ', error);
      })
      .finally(() => {
        // always executed
      });

      console.log(' The API Gateway link that will be triggered is', apiGatewayLink);

      // AXIOS request in order to retrieve the user's information from the DynamoDB database
     if (store.getState().isAuthenticated == true) {
       console.log("User authenticated");
       this.setState({
         authenticated: true,
         password: '',
       });
     };

     // Clear out the password from local and redux state
     store.dispatch(setPassword(''));
    } catch (err) {
      alert(err.message); // eslint-disable-line
    }
  };

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log('State of email', this.state.email); 
    console.log('State of password', this.state.password);
  };

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
