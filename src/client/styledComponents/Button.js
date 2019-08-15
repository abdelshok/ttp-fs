// Re-usable dark blue/black button used for sign up, login, confirmation, etc.
// Set to turn green when hovered.
import styled from 'styled-components';

const Button = styled.button`
  height: 40px;
  background-color: ${props => props.FullstackTheme.applicationGeneralColor};
  color: white;
  width: 75%;
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 12px;
  font-weight: 600;
  border-radius: ${props => props.FullstackTheme.buttonBorderRadius};
  &:hover {
    background: rgb(0, 209, 107);
  }
`;

export default Button;
