// Style for the grey text that will be inside the different Sign up, Login boxes.
import styled from 'styled-components';

const BoxTitleText = styled.p`
  font-family: ${props => props.FullstackTheme.fontFamily};
  height: 40px;
  font-size: 20px;
  font-weight: bold;
  color: black;
  padding-top: 40px;
`;

export default BoxTitleText;
