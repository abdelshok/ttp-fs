// Styled component for the links that will be put in the footer.
import styled from 'styled-components';

const FooterLink = styled.a`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: ${props => props.FullstackTheme.footerTextSize};
  color: ${props => props.FullstackTheme.applicationTextColor};
  &:hover {
    color: black;
  }
  &:visited {
    color: none;
  }
  width: 80px;
`;

export default FooterLink;
