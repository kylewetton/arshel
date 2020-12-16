import React from 'react';
import {HeaderWrapper, Logo} from './styles';

const Header = () => {
    return (
        <HeaderWrapper>
        <Logo src="ar-logo-inline.svg" alt="arshel" />
        <p>Display framed artwork in AR</p>
      </HeaderWrapper>
    );
};

export default Header;