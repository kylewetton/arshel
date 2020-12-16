import React from 'react';
import {isTouchDevice} from '../../utils';
import {Loader} from './style';

/**
 * The overlay that shows when the QR code is being generated
 * TODO: disable this on mobile (QR isn't used on mobile)
 */

const LoadOverlay = () => {
    return (
        <Loader>
            <p>{isTouchDevice() ? 'Launching AR...' : 'Get ready to scan the QR code that appears'}
            </p>
        </Loader>
    );
};

export default LoadOverlay;