import React, {useState} from 'react';
import {BlockPicker, ColorResult} from 'react-color';
import { ControlPanelWrapper, ButtonWrapper, InputGroup, ScrollTrack, PanelPositioning } from './styles';
import { Button } from '../Button';
import {ToggleSwitch} from '../ToggleSwitch';
import { Input } from '../Input';
import {HeightLock} from '../AspectLock';
import {isTouchDevice} from '../../utils';

interface ControlPanelInterface {
    loadingState: 'waiting' | 'loading' | 'completed'; 
    resetApp: () => void;
    destroyQr: () => void;
    launchAr: (w: number, h: number, floor: number) => void;
    toggleFrame: (state: boolean) => void;
    frameColor: string;
    handleFrameColor: (color: ColorResult) => void;
    aspectRatio: {x: number, y:number} | null;
}

const ControlPanel: React.FC<ControlPanelInterface> = ({ resetApp, destroyQr, loadingState, launchAr, toggleFrame, frameColor, handleFrameColor, aspectRatio }) => {


    const [floor, setFloor] = useState<number>(1000);
    const [width, setWidth] = useState<number>(500);
    const [height, setHeight] = useState<number>(aspectRatio ? 500 * aspectRatio.y : 500);
    const [aspectLocked, setAspectLocked] = useState<boolean>(true);


    /**
     * 
     * @param val Height in mm from floor to bottom of the artworks frame
     */

    const updateFloor = (val: number) => {
        setFloor(val);
        destroyQr();
    }

    /**
     * 
     * @param val Width in mm of the frame
     */
    const updateWidth = (val: number) => {
        setWidth(val);
        if (aspectLocked) {
            setHeight(aspectRatio ?  val * aspectRatio.y : val);
        }
        destroyQr();
    }

    /**
     * 
     * @param val Height in mm of the frame
     */
    const updateHeight = (val: number) => {
        setHeight(val);
        if (aspectLocked) {
            setWidth(aspectRatio ? val * aspectRatio.x : val);
        }
        destroyQr();
    }

    /**
     * Toggle whether the aspect ratio should be locked when resizing
     */

    const handleAspectLock = () => {
        setAspectLocked(prev => !prev);
    }

    return (
        <ControlPanelWrapper className={loadingState === 'completed' ? 'completed' : ''}>
            <PanelPositioning>
                    <ScrollTrack className={loadingState === 'completed' ? 'completed' : ''}>
                        <div style={{width: '100%'}}>
                            <InputGroup>
                                <h2>Set a few real world dimensions</h2>
                                <Input handleValue={updateWidth} value={Math.floor(width)} unit="mm" label="Width" inputId="real_width" />

                                <Input handleValue={updateHeight} value={Math.floor(height)} unit="mm" label="Height" inputId="real_height">
                                    <HeightLock state={aspectLocked} onToggle={() => handleAspectLock()} />
                                </Input>

                                <Input handleValue={updateFloor} value={floor} unit="mm" label="Height from floor" inputId="floor_height" />
                            </InputGroup>

                            <InputGroup>
                                <h2>Adjust the frame</h2>
                                <ToggleSwitch label="Include frame" defaultChecked={true} onChange={toggleFrame} />
                                <BlockPicker
                                    color={frameColor}
                                    onChange={handleFrameColor}
                                    triangle='hide'
                                    colors={['#FAFAFA', '#1f1e1e', '#b0b0b0', '#c2b99b', '#545042']}
                                />
                            </InputGroup>
                        </div>
                    </ScrollTrack>
                    <ButtonWrapper>
                            <Button onClick={resetApp} tier="secondary">Back</Button>
                            <Button
                                tier={loadingState === 'loading' ? 'loading' : loadingState === 'completed' ? 'completed' : 'primary'}
                                onClick={() => launchAr(width, height, floor)}
                                disabled={loadingState !== 'waiting'}
                                >
                                    {loadingState === 'loading' ? 'Loading...' :
                                    loadingState === 'completed' ?
                                    isTouchDevice() ? 'Ready' : 'Scan QR code':
                                    'Generate AR'}</Button>
                    </ButtonWrapper>
                </PanelPositioning>
        </ControlPanelWrapper>
    );
};

export default ControlPanel;