import React, {useState} from 'react';
import {InputStyled, InputWrapper, MainLabel} from './styles';

interface InputInterface {
    label: string;
    placeholder?: string;
    inputId: string;
    unit?: string;
    type?: "number" | "text";
}

const Input: React.FC<InputInterface> = ({label, inputId, placeholder, unit, type = "number"}) => {

    const [inputVal, setInputVal] = useState('30');

    const handleChange = (val: string) => {
        setInputVal(val);
    }

    return (
        <InputWrapper>
            <MainLabel htmlFor={`#${inputId}`}>{label}</MainLabel>
            <InputStyled
                onChange={(e) => handleChange(e.target.value)}
                value={inputVal} 
                id={`#${inputId}`} 
                placeholder={placeholder} 
                type={type} />
            <label htmlFor={`#${inputId}`}>{unit}</label>
        </InputWrapper>
    );
};

export default Input;