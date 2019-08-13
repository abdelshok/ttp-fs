// BUY STOCK COMPONENT
// Re-usable component used to purchase stocks. 
// Constitutes a box, with basic input fields for the stock name
// and stock quantity.
// Connected here to the IEX trading API through axios.

// Packages
import styled from 'styled-components';
import React, { Component } from 'react';
import axios from 'axios';
// Internal modules
import store from '../store/store';
import { setPortfolioAmount, setPassword }from '../action-creators/actions';
import Box from '../styledComponents/Box';
import Button from '../styledComponents/Button';
import LinkText from '../styledComponents/LinkText';
import InputField from '../styledComponents/InputField';
import NormalText from '../styledComponents/NormalText';
import CenteredDiv from '../styledComponents/CenteredDiv';
import BoxTitleText from '../styledComponents/BoxTitleText';
import InputFieldLogo from '../styledComponents/InputFieldLogo';
import InputFieldAndIconContainer from '../styledComponents/InputFieldAndIconContainer';
import FullstackTheme from '../styledComponents/FullstackTheme';
// Environment Variables
import config from '../config';

const SpecialBox = styled(Box)`
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  border-color: rgb(199, 199, 199);
  &:hover {
    border-color: black;
  }
  border-width: thin;
  border-style: solid;
  margin-left: 20%;
  margin-top: 12%;
`;

const PurchaseBox = styled(Button)`
  margin-top: 20px;
`;

class BuyStockComponent extends Component {

    constructor(props) {
        super(props);

        this.state = {
            stockTicket: '',
            quantity: 1
        };
    }

    // Method used to disable submit button while stockTicket and quantity 
    // lengths are not validated
    validateForm = () => this.state.stockTicket.length > 0 && this.state.quantity.length > 0;

    handleChange = (event) => {
        this.setState({
          [event.target.id]: event.target.value,
        });
        console.log('State of email', this.state.stockTicket); 
        console.log('State of quantity', this.state.quantity);
      };

    handleSubmit = async (event) => {
      event.preventDefault();
      const { stockTicket, quantity } = this.state;

      // In handleSubmit function, we will 1. look up the stock through IEX API
      // receive the stock price, 2. calculate the total price and store locally
      // 3. Store the name of the stock and quantity in an array/hash_map locally and update
      // frontend accordingly 4. send new portfolio amount to DB
      // 5. Update the transaction and portfolio databases accordingly
      // 6. Set up a timer so that the function is triggered every hour to retrieve
      // the stocks and compare them to the opening prices
      // AWS lambda function to change the portfolio amount and return it (?)
      // AWS lambda function to store the transaction, include the date, etc.
      // AWS lambda function to store the stocks themselves (More complicated)
      // Do at the end
      try {
        const iexLink = config.IEX.IEX_LINK_FIRST + stockTicket + config.IEX.IEX_LINK_SECOND + config.IEX.IEXCLOUD_SECRET_KEY;
        console.log('IEX link will be sent to: ', iexLink);
        const returnedData = await axios.get(iexLink);
        console.log('Stock data is', returnedData);
        const stockData = returnedData.data;
        const { portfolioAmount, userId, email } = store.getState();
        const totalPrice = Number(stockData.latestPrice) * quantity;
        // A body object is created with the associated user email in order
        // to store the transaction and the newly bought stocks in the database
        const bodyParameters = {
          email,
          userId,
          symbol: stockData.symbol,
          companyName: stockData.companyName,
          latestPrice: Number(stockData.latestPrice),
          quantity: Number(quantity),
          totalPrice,
          openPrice: stockData.open
        };
        // NOTE: Make sure that the open attribute of the returned data
        // references the actual opening price of the day

        console.log('Body of new transaction:', bodyParameters);
        const newPortfolioAmount = Number(portfolioAmount) - Math.floor(quantity * bodyParameters.latestPrice);
        console.log('Amount remaining in portfolio: ', newPortfolioAmount);
        // Set the new remaining portfolio in store before dispatching it and updating it in
        // DynamoDB - ensuring that the amount shown on the client is the same as the one stored 
        // in the backend
        try {
          store.dispatch(setPortfolioAmount(newPortfolioAmount));
        } catch (err) {
          alert('Error in dispatch to set portfolio');
        }
        // 1. Send data to database to store transaction and stock (last order of business)
        // 2. Update data locally and re-render (do it second)
        // 3. Calculate the amount left and send it to database (first order of business)

        console.log('Body of newly bought stock', bodyParameters);
      } catch (err) {
        alert(err.message); // eslint-disable-line
      }
    }
    
    render() {
      return (
        <SpecialBox FullstackTheme={FullstackTheme}>
        <div>
          <BoxTitleText FullstackTheme={FullstackTheme}>
            Stocks
            {''}
          </BoxTitleText>
          <form onSubmit={this.handleSubmit} value>
            <InputFieldAndIconContainer FullstackTheme={FullstackTheme}>
              <InputField
                type="text"
                value={this.state.stockTicket.toUpperCase()}
                placeholder="Ticket"
                id="stockTicket"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIconContainer>
            {/* EmailFieldComponent would replace the above piece of code */}

            <InputFieldAndIconContainer FullstackTheme={FullstackTheme}>
              <InputField
                type="number"
                value={Math.abs(Math.floor(this.state.quantity))}
                placeholder="Quantity"
                id="quantity"
                onChange={this.handleChange}
                FullstackTheme={FullstackTheme}
              />
            </InputFieldAndIconContainer>

            <PurchaseBox
              type="submit"
              text="login"
              FullstackTheme={FullstackTheme}
              disabled={!this.validateForm()}
            >
              {' '}
              Purchase
              {' '}
            </PurchaseBox>
          </form>
        </div>
        </SpecialBox>
    );
  }
}

export default BuyStockComponent;
