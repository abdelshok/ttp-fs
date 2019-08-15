// Style for the stock component text in the stock list
import styled from 'styled-components';

// The ${props} expression below, on the right of the 'color' property, 
// enables us to pass the different retrieved stock objects to this styledComponent
// and decide the color of the text based on whether or not the currentPrice is below
// the opening price

// Hover is set up to be 1px larger in order to make the UX/UI experience clearer
// for the user

const PortfolioText = styled.div`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 16px;
  color: ${props => props.stock.openPrice < props.stock.currentPrice ? 'green' : 'red'};
  width: 100%;
  max-width: 320px;
  &:hover {
    font-size: 17px;
  }
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default PortfolioText;
