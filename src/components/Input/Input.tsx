import React from 'react';
import {InputStyled, InputWrapper, MainLabel} from './styles';

interface InputInterface {
    label: string;
    handleValue: (val: number) => void;
    value: number;
    inputId: string;
    unit?: string;
    type?: "number" | "text";
}

const Input: React.FC<InputInterface> = ({label, handleValue, inputId, value, unit, type = "number"}) => {

    const handleChange = (val: string) => {
        handleValue(+val);
    }

    return (
        <InputWrapper>
            <MainLabel htmlFor={`#${inputId}`}>{label}</MainLabel>
            <InputStyled
                onChange={(e) => handleChange(e.target.value)}
                value={value} 
                id={`#${inputId}`} 
                placeholder={`${value}`} 
                type={type} />
            <label htmlFor={`#${inputId}`}>{unit}</label>
        </InputWrapper>
    );
};

export default Input;