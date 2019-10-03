// General style for the 'normal' texts that will be in the footer. Position
// can be set within the container itself
import styled from 'styled-components';

const FooterText = styled.p`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size:  ${props => props.FullstackTheme.footerTextSize};
  color: ${props => props.FullstackTheme.applicationTextColor};
  display: block;
  position: relative;
  width: 80px;
`;

export default FooterText;
