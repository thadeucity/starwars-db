import React from 'react';
import { FiHeart } from 'react-icons/fi';

import Container from './styles';

const Footer = (): React.ReactElement => {
  return (
    <Container>
      Made with
      <FiHeart size={16} />
      by
      <a href="https://github.com/thadeucity">Victor Alvarenga</a>
    </Container>
  );
};

export default Footer;
