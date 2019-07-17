// Styled component for the links that will be put in the footer.
import styled from 'styled-components';

const FooterLink = styled.a`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 10px;
  color: rgb(222, 222, 222);
  &:hover {
    color: white;
  }
  &:visited {
    color: none;
  }
  width: 80px;
`;

export default FooterLink;
