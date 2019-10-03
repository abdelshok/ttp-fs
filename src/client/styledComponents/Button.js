// Re-usable white button with black borders and black text used for sign up, login, confirmation, etc.
// Set so that text turns light grey: rgb(153,153,153), when hovered

import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  background-color: ${props => props.FullstackTheme.buttonBackgroundColor};
  color: black;
  border-color: black;
  cursor pointer;
  width: 75%;
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 14px;
  font-weight: 600;
  border-radius: ${props => props.FullstackTheme.buttonBorderRadius};
  &:hover {
    color: rgb(153,153,153);
  }
`;

export default Button;
