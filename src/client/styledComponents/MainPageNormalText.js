// General styling for the text across the website
// Will be used in main page and is created here with minimal styling
// specifications, except for the font-family and the margin/padding
// Font-size and font-style (boldness) will be specified in the components
// where the text will be imported

import styled from 'styled-components';

const MainPageNormalText = styled.p`
  font-family: ${props => props.FullstackTheme.fontFamily};
  font-size: 20px;
  color: ${props => props.FullstackTheme.applicationTextColor};
  text-align: left;
  padding-left: 20px;
  display: inline-block;
`;

export default MainPageNormalText;
