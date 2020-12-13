import React from 'react';
import {Pill} from './styles';

interface ButtonInterface {
    tier?: 'primary' | 'secondary' | 'loading';
    onClick: () => void
}

const Button: React.FC<ButtonInterface> = ({children, tier = 'primary', onClick}) => {
    return (
        <Pill disabled={tier === 'loading'} onClick={onClick} tier={tier}>{children}</Pill>
    );
};

export default Button;