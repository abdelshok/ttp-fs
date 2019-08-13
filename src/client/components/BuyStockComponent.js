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
// import action creators
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

      // In submit function, we will look up the stock.
      // receive the stock price, calculate the total price
      // Store the name of the stock and quantity in an array/hash_map
      // Store also the stock price of the morning? and compare it?
      // Update the amount in the database:
      // AWS lambda function to change the portfolio amount and return it
      // AWS lambda function to store the transaction, include the date?
      // AWS lambda function to store the stocks themselves (more complicated)
      // Do at the end
      try {
        const iexLink = config.IEX.IEX_LINK_FIRST + this.state.stockTicket + config.IEX.IEX_LINK_SECOND + config.IEX.IEXCLOUD_SECRET_KEY;
        console.log('IEX link will be sent to: ', iexLink);
        const returnedStockData = await axios.get(iexLink);
        console.log('Stock data is', returnedStockData);

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
  };
}

export default BuyStockComponent;

// <InputFieldLogo src={EmailIcon} />
// <InputFieldLogo src={LockIcon} />
