import React, {useState} from 'react';
import { ControlPanelWrapper, ButtonWrapper, InputGroup } from './styles';
import { Button } from '../Button';
import { Input } from '../Input';
import { compileGlb, generateAr } from '../utils';
import { Object3D } from 'three';

interface Response {
    name: string;
}

const ControlPanel: React.FC<{ url: string; resetApp: () => void, getArLink: (link: string) => void }> = ({ url, resetApp, getArLink }) => {

    const [loading, setLoading] = useState<Boolean>(false);

    const launchAr = () => {
        setLoading(true);
        compileGlb(url, 420, 594)
            .then(
                (file) => generateAr((file as Object3D))
                .then((data) => {
                    getArLink(`storage/ar-${(data as Response).name}.usdz`);
                    setLoading(false);
                })
            );
    }

    return (
        <ControlPanelWrapper>
            <InputGroup>
                <Input placeholder={'0'} unit="mm" label="Height from ground" inputId="ground_height" />
                <Input placeholder={'0'} unit="mm" label="Width" inputId="real_width" />
                <Input placeholder={'0'} unit="mm" label="Height" inputId="real_height" />
            </InputGroup>
            <ButtonWrapper>
                <Button onClick={resetApp} tier="secondary">Back</Button>
                <Button tier={loading ? 'loading' : 'primary'} onClick={launchAr}>{loading ? 'One moment...' : 'Generate AR'}</Button>
            </ButtonWrapper>

        </ControlPanelWrapper>
    );
};

export default ControlPanel;