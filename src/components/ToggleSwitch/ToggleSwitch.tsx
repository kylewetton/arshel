import React, {useState} from 'react';
import {ToggleLabel} from './styles';
import {MainLabel} from '../Input/styles';

/**
 * A general purpose toggle switch
 */

interface ToggleSwithcInterface {
    onChange: (checked: boolean) => void;
    defaultChecked: boolean;
    label: string;
}

const ToggleSwitch: React.FC<ToggleSwithcInterface> = ({onChange, defaultChecked, label}) => {

    const [isChecked, setIsChecked] = useState(defaultChecked);

    const handleOnChange = () => {
        setIsChecked(prev => !prev);
        onChange(!isChecked);
    }

    return (
    <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <MainLabel htmlFor="include_frame">{label}</MainLabel>
        <ToggleLabel>
            <input
            id="include_frame"
            onChange={() => handleOnChange()}
            type="checkbox" checked={isChecked} />
            <span>
                <span>OFF</span>
                <span>ON</span>
            </span>
            <i></i>
        </ToggleLabel>
    </div>
    );
};

export default ToggleSwitch;