// Style for the stock component text in the stock list
import styled from 'styled-components';

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
