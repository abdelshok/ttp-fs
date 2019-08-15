// Stock and Portfolio Container
// Div container that wraps all of the list and items of stocks 
// and transaction that the user owns
// - Purpose is to set size and ensure that the container is centered

import styled from 'styled-components';

const StockPortfolioContainer = styled.div`
  height: 340px;
  background-color: ${props => props.FullstackTheme.blockBackgroundColor};
  width: 100%;
  max-width: 320px;
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  border-color: rgb(199, 199, 199);
  &:hover {
    border-color: rgb(0, 209, 107);
  }
  border-width: thin;
  border-style: solid;
  margin: 0 auto;
  padding: 30px;
`;

export default StockPortfolioContainer;

// To decide: these two don't seem to make a difference
// display: flex;
// align-items: center;