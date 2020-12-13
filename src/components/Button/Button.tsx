import React from 'react';
import {Pill} from './styles';

interface ButtonInterface {
    tier?: 'primary' | 'secondary' | 'loading' | 'completed';
    disabled?: boolean;
    onClick: () => void
}

const Button: React.FC<ButtonInterface> = ({children, disabled = false, tier = 'primary', onClick}) => {
    return (
        <Pill disabled={disabled} onClick={onClick} tier={tier}>{children}</Pill>
    );
};

export default Button;