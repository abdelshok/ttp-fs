// BOX
// - Styled component called box used to create Login boxes, Sign up boxes, etc.
// Simply creates the box with the right style. The component can be expanded to
// have different sizes depending on the current need.
// - Input fields, checkboxes, submission buttons, etc. can be added to it.

// BOX THAT WILL BE USED FOR BOTH LOGIN/SIGNUP

import styled from 'styled-components';

const Box = styled.div`
  height: 365px;
  background-color: ${props => props.FullstackTheme.blockBackgroundColor};
  width: 400px;
  margin: 0 auto;
  box-shadow: ${props => props.FullstackTheme.boxShadow};
  margin-top: 5%;
  border-radius: ${props => props.FullstackTheme.blockBorderRadius};
  text-align: center;
  margin-bottom: 5%;
  border: 1px solid #3c3c3c;
  border-top: 20px solid #000;
`;

export default Box;
