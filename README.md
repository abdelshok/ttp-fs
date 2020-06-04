# Seed Investment

<div align="center">
  <img alt="Logo" src="https://user-images.githubusercontent.com/20652426/83801530-4cead980-a677-11ea-9802-fcc5e942950b.png" width="100" />
</div>

These technologies were used:

- [simple-react-full-stack](#simple-react-full-stack)
- [Styled Components](https://www.styled-components.com/)
- [React-Redux](https://react-redux.js.org/)
- [Redux](https://redux.js.org/)
- [IEX API](https://iexcloud.io/docs/api/)

<div align="center">
  <img alt="seedInvestment" src="https://user-images.githubusercontent.com/20652426/83799623-18c1e980-a674-11ea-8549-f4cbddf8dd65.png"/>
</div>


## Why ⛩

Had the idea of creating a specific FinTech company, so I decided to get familiar with the different financial APIs and build a small application around that, while also refreshing my AWS-related knowledge. Users authenticate using Amazon Cognito and double authentication is implemented to improve security. Users are automatically given 10,000 fictional dollars to invest and can use them to trade stocks (e.g. AAPL), using real-time data powered by the iEX API. A live analysis of their portfolio, based on opening day prices, and a history of their transactions is also displayed uppon logging in.

## Documentation

### Development mode

In the development mode, we have 2 servers running. The front end code will be served by the [webpack dev server](https://webpack.js.org/configuration/dev-server/) which helps with hot and live reloading. The server side Express code will be served by a node server using [nodemon](https://nodemon.io/) which helps in automatically restarting the server whenever server side code changes.

### Production mode

In the production mode, we will have only 1 server running. All the client side code will be bundled into static files using webpack and it will be served by the Node.js/Express application.

### Folder Structure

All the source code will be inside **src** directory. Inside src, there is client and server directory. All the frontend code (react, css, js and any other assets) will be in client directory. Backend Node.js/Express code will be in the server directory.

### ESLint

[I am using Airbnb's Javascript Style Guide](https://github.com/airbnb/javascript) which is used by many JavaScript developers worldwide. Since we are going to write both client (browser) and server side (Node.js) code, I am setting the **env** to browser and node. Optionally, we can override the Airbnb's configurations to suit our needs. I have turned off [**no-console**](https://eslint.org/docs/rules/no-console), [**comma-dangle**](https://eslint.org/docs/rules/comma-dangle) and [**react/jsx-filename-extension**](https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md) rules.