import React from 'react';
import {Image} from './style';

const Preview: React.FC<{url: string, handleOnLoad: () => void}> = ({url, handleOnLoad}) => {
    return (
        <Image onLoad={handleOnLoad} src={url} alt=""/>
    );
};

export default Preview;