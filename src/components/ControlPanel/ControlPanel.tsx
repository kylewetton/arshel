import React, {useState} from 'react';
import { ControlPanelWrapper, ButtonWrapper, InputGroup } from './styles';
import { Button } from '../Button';
import { Input } from '../Input';
import { compileGlb, generateAr } from '../utils';
import { Object3D } from 'three';

interface Response {
    name: string;
}

interface ControlPanelInterface {
    url: string;
    loadingState: 'waiting' | 'loading' | 'completed'; 
    resetApp: () => void;
    getArLink: (link: string) => void;
    destroyQr: () => void;
    handleSetLoading: () => void;
}

const ControlPanel: React.FC<ControlPanelInterface> = ({ url, resetApp, getArLink, destroyQr, handleSetLoading, loadingState }) => {

    const [ground, setGround] = useState<number>(30);
    const [width, setWidth] = useState<number>(30);
    const [height, setHeight] = useState<number>(30);

    const updateGround = (val: number) => {
        setGround(val);
        destroyQr();
    }
    const updateWidth = (val: number) => {
        setWidth(val);
        destroyQr();
    }
    const updateHeight = (val: number) => {
        setHeight(val);
        destroyQr();
    }

    const launchAr = () => {
        handleSetLoading();
        compileGlb(url, width, height)
            .then(
                (file) => generateAr((file as Object3D))
                .then((data) => {
                    getArLink(`storage/ar-${(data as Response).name}.usdz`);
                })
            );
    }

    return (
        <ControlPanelWrapper>
            <InputGroup>
                <Input handleValue={updateGround} value={ground} unit="mm" label="Height from ground" inputId="ground_height" />
                <Input handleValue={updateWidth} value={width} unit="mm" label="Width" inputId="real_width" />
                <Input handleValue={updateHeight} value={height} unit="mm" label="Height" inputId="real_height" />
            </InputGroup>
            <ButtonWrapper>
                <Button onClick={resetApp} tier="secondary">Back</Button>
                <Button
                    tier={loadingState === 'loading' ? 'loading' : loadingState === 'completed' ? 'completed' : 'primary'}
                    onClick={launchAr}
                    disabled={loadingState !== 'waiting'}
                    >
                        {loadingState === 'loading' ? 'Loading...' :
                        loadingState === 'completed' ? 'Scan QR code': 'Generate AR'}</Button>
            </ButtonWrapper>

        </ControlPanelWrapper>
    );
};

export default ControlPanel;