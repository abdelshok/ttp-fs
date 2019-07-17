// General style for the normal texts that will be in the footer. Position
// can be set within the container itself
import styled from 'styled-components';

const FooterText = styled.p`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 10px;
  color: rgb(199, 199, 199);
  display: block;
  position: relative;
  width: 80px;
`;

export default FooterText;
