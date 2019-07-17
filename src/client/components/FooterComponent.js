// FOOTER COMPONENT
// - Basic grey footer with social media logo, copyright, legal text.
// - Footer styles the size, color of the footer and centering of the elements within it
// - FooterBlock contains the two texts: the FooterLink "Imprint" that leads to legal documents
// and the FooterTextCopyright. The FooterBlock wraps them both and ensures that they are centered
// and that the margin is right
// - FooterLink adn FooterText take care of the sizing and font family of the font
// - SocialMediaComponent wraps all the Social Media icons in a div of specific width and ensures
// that the margin is such so that it is centered with the above text.

// Packages
import React from 'react';

import FooterLink from '../styledComponents/FooterLink';
import Footer from '../styledComponents/FooterComponent';
import FooterText from '../styledComponents/FooterText';
import FooterBlock from '../styledComponents/FooterBlock';
import FullstackTheme from '../styledComponents/FullstackTheme';

// Styles
// import '../css/FooterComponent.css';

// const FooterImprintLink = FooterLink.extend`
//  padding-top: 10px;
// `;

// const FooterTextCopyright = FooterText.extend`
//  padding-top: 10px;
// `;

const FooterComponent = () => (
  <Footer FullstackTheme={FullstackTheme}>
    <FooterBlock>
      <FooterLink
        href=""
        FullstackTheme={FullstackTheme}
      >
        {' '}
        Imprint
        {' '}
      </FooterLink>
      <FooterText FullstackTheme={FullstackTheme}>
        {' '}
        © Seed
        {' '}
      </FooterText>
    </FooterBlock>
  </Footer>
);

export default FooterComponent;
