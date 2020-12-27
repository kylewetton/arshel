import React, { useRef } from 'react';
import { Image } from './style';

/**
 * The actual image component that either shows the image or the QR code
 */

interface PreviewInterface {
    url: string;
    handleOnLoad: (artworkRef: HTMLImageElement | null) => void
}

const Preview: React.FC<PreviewInterface> = ({ url, handleOnLoad }) => {

    const artworkRef = useRef<HTMLImageElement>(null);
    return (
        <Image
            onLoad={() => handleOnLoad(artworkRef.current)}
            ref={artworkRef}
            src={url} alt="" />
    );
};

export default Preview;