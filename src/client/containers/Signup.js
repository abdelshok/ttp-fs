// Signup CONTAINER
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
import { Redirect } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import { Auth } from "aws-amplify";
// App Components
import store from '../store/store';
// POSSIBLY REMOVE THIS LOADER BUTTON
import LoaderButtonComponent from '../components/LoaderButtonComponent';
import {setEmail, setPassword, authenticateUser, setUserFirstName, setUserLastName} from '../action-creators/actions';
import Box from '../styledComponents/Box';
import Button from '../styledComponents/Button';
import LinkText from '../styledComponents/LinkText';
import Checkbox from '../styledComponents/Checkbox';
import InputField from '../styledComponents/InputField';
import NormalText from '../styledComponents/NormalText';
import CenteredDiv from '../styledComponents/CenteredDiv';
import BoxTitleText from '../styledComponents/BoxTitleText';
import InputFieldLogo from '../styledComponents/InputFieldLogo';
import InputFieldAndIcon from '../styledComponents/InputFieldAndIcon';
import FullstackTheme from '../styledComponents/FullstackTheme';
// Assets
const EmailIcon = require('../assets/icons/emailIcon.svg');
const LockIcon = require('../assets/icons/lockIcon.svg');
const ProfileIcon = require('../assets/icons/outline-person.svg');

// Div block that centers the Links/Text at the end of the Signup Container
const SmallCenteredDiv = styled(CenteredDiv)`
  width: 50%;
  margin-top: 20px;
`;

// Style of Box Component extended and size increased because SignUp container
// holds more components than the Login container
const BigSignUpBox = styled(Box)`
  height: 420px;
`;

const SmallSignUpBox = styled(Box)`
  height: 250px;
`;

const SignUpButton = styled(Button)`
  background-color: rgb(0, 209, 107);
`;

const LinkSignUpText = styled(LinkText)`
  margin-left: 10px;
`;


class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      confirmationCode: '',
      authenticated: false,
      userSignedUp: false
    };
  }
  
  // handleSubmit makes a call to aws-amplify to submit a new user
  // registers the user's name, email, in the database and initializes
  // the user with the correct data, ie. $5,000 in stocks/capital. 
  handleSubmit = async (event) => {
    event.preventDefault();

    // If email is correct and password match, dispatch to store, and 
    // beging authentication
    if (this.validateForm()) {
      console.log('Passwords match');
      try {
        store.dispatch(setEmail(this.state.email));
        store.dispatch(setPassword(this.state.password));

        // Authentication below
        // If authentication does not work, because either email or password is incorrect
        // then function returns alert() message.
        // If authentication works correctly, we save the user returned by handleSubmit()
        // to the state and finally change the authentication status of the user from false
        // to true by first dispatching the action to the reducer and then fetching the 
        // authenticated state from the store.
        const newUser = await Auth.signUp({
          username: store.getState().email,
          password: store.getState().password,
        });

        // Does not run if the Auth call above does not return a successful message.
        this.setState({
          newUser: newUser,
          userSignedUp: true
        });
        console.log("New user", this.state.newUser);
        console.log("Is the state updated", this.state.userSignedUp);
        console.log("User signed up. Next step in verification incoming.");
      } catch (err) {
        alert(err.message); // eslint-disable-line
      }
    } else {
      alert("Email incorrect or passwords don't match");
    }
  };

  handleConfirmationSubmit = async (event) => {
    event.preventDefault();

    try {
      await Auth.confirmSignUp(this.state.email, this.state.confirmationCode);
      await Auth.signIn(this.state.email, this.state.password);
      
      // Get the user information by fetching it from the database here

      store.dispatch(authenticateUser(true));
      console.log('Is user authenticated after dispatch', store.getState().isAuthenticated);

      // Sets local state authenticated attribute to true in order to trigger re-rendering
      // Potential modification???
      this.setState({
        authenticated: true,
      });
    } catch (err) {
      alert(err.message); // eslint-disable-line
    }
  };

  // Method synchronizes the value of the email, password, confirm password input fields
  // and ensures that the values in the component's local state matches those values
  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
    console.log('State of email', this.state.email); 
    console.log('State of password', this.state.password);
    console.log('State of confirmation password', this.state.confirmPassword);
    console.log('State of confirmation code is ', this.state.confirmationCode)
  };

  // Method used to disable the Sign Up button while email, password, and confirmation password
  // are not validated 
  validateForm = () => {
    return (
      this.state.email.length > 0 &&
      this.state.password.length > 0 &&
      this.state.password === this.state.confirmPassword
    );
  }

  // renderRedirect method used to verify the authentication state of the user.
  // if user is authenticated, it returns the <Redirect /> react-router-dom 
  // components which redirects us to the main page, which will contain the 
  // fetched new user data. 
  renderRedirect = () => {
    console.log('Redirected');
    console.log('Store state authentication', store.getState().isAuthenticated);
    if (store.getState().isAuthenticated === true) {
      return <Redirect to="/main" />;
    }
  }

  renderConfirmationForm() {
    return (
      <SmallSignUpBox FullstackTheme={FullstackTheme}>
        <div>
          <BoxTitleText FullstackTheme={FullstackTheme}>
            Sign Up
            {''}
          </BoxTitleText>

          <form onSubmit={this.handleConfirmationSubmit} value>

          <InputFieldAndIcon FullstackTheme={FullstackTheme}>
            <InputFieldLogo src={LockIcon} />
            <InputField
              type="text"
              value={this.state.confirmationCode}
              placeholder="Confirmation Code"
              id="confirmationCode"
              onChange={this.handleChange}
              FullstackTheme={FullstackTheme}
            />
          </InputFieldAndIcon>

          <SignUpButton
            type="submit"
            text="login"
            FullstackTheme={FullstackTheme}
          >
            {' '}
            Confirm
            {' '}
          </SignUpButton>
          </form>
        </div>
      </SmallSignUpBox>
    );
  }
  
  renderForm() {
    return (
      <BigSignUpBox FullstackTheme={FullstackTheme}>
        <div>
          <BoxTitleText FullstackTheme={FullstackTheme}>
            Sign Up
            {''}
          </BoxTitleText>
          <form onSubmit={this.handleSubmit} value>
          <InputFieldAndIcon FullstackTheme={FullstackTheme}>

              <InputFieldLogo src={ProfileIcon} />
              <InputField
                type="text"
                value={this.state.name}
                placeholder="Name"
                id="name"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIcon>

            <InputFieldAndIcon FullstackTheme={FullstackTheme}>
              <InputFieldLogo src={EmailIcon} />
              <InputField
                type="email"
                value={this.state.email}
                placeholder="Email"
                id="email"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIcon>
            {/* EmailFieldComponent would replace the above piece of code */}

            <InputFieldAndIcon FullstackTheme={FullstackTheme}>
              <InputFieldLogo src={LockIcon} />
              <InputField
                type="password"
                value={this.state.password}
                placeholder="Password"
                id="password"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIcon>

            <InputFieldAndIcon FullstackTheme={FullstackTheme}>
              <InputFieldLogo src={LockIcon} />
              <InputField
                type="password"
                value={this.state.confirmPassword}
                placeholder="Confirm password"
                id="confirmPassword"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIcon>

            <SignUpButton
              type="submit"
              text="login"
              FullstackTheme={FullstackTheme}
            >
              {' '}
              Sign Up
              {' '}
            </SignUpButton>

            <SmallCenteredDiv>
              <LinkContainer to="/login">
                <LinkSignUpText important>Back to Login</LinkSignUpText>
              </LinkContainer>
            </SmallCenteredDiv>

          </form>
        </div>
      </BigSignUpBox>
    );
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        {this.state.userSignedUp === false
          ? this.renderForm()
          : this.renderConfirmationForm()}
      </div>
    )
  }
}

export default Signup;
