// Talent Space General Red Link Styling
// - Has the option of adding the prop "important" in order to make it bold
// ie. <Linktext href="" important/> Sign up </Linktext>

// You have constant right now change that
import styled from 'styled-components';

const LinkText = styled.a`
  font-family: 'Poppins';
  font-size: 12px;
  color: rgb(3, 13, 21);
  font-weight: ${props => (props.important ? 'bold' : 'normal')};
  &:hover {
    text-decoration: underline;
    color: rgb(0, 209, 107);
  }
`;

// Notes:
// Theme prop fontFamily doesn't work when passed here...

export default LinkText;
