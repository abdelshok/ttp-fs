// Footer is set at the bottom of the page.
// Notice: If the page is resized, the footer goes up to the navigation bar and hides the main menu
// which hides the login box, etc. This has to be changed so that the footer does not keep going up
import styled from 'styled-components';

const Footer = styled.div`
  background-color: ${props => props.FullstackTheme.footerBackgroundColor};
  height: 80px;
  width: 100%;
  position: absolute;
  justify-content: center;
  border-top: 1px solid #000;
  display: flex;
  left: 0;
  bottom: 0;
`;

export default Footer;

// TOFIX: position: absolute of footer component