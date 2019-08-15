// Index JS File
// Renders the whole Application through the <App /> container
// Wrapped by Provider component in order to give the App access to the redux store
// Router component allows us to re-route between different routes

// React Packages
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Maybe get rid later?
import { Provider } from 'react-redux';
// AWS Packages
import Amplify from 'aws-amplify';

// App Components
import App from './App';
import store from './store/store';
import config from './config';

// Configuration of AWS Cognito
Amplify.configure({
    Auth: {
      mandatorySignIn: true,
      region: config.cognito.REGION,
      userPoolId: config.cognito.USER_POOL_ID,
      identityPoolId: config.cognito.IDENTITY_POOL_ID,
      userPoolWebClientId: config.cognito.APP_CLIENT_ID,
    },
});

ReactDOM.render(
<Provider store={store}>
    <Router>
        <App />
    </Router>
</Provider>,
document.getElementById('root')
);
