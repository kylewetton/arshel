import React from 'react';
import {Image} from './style';

const Preview: React.FC<{url: string}> = ({url}) => {
    return (
        <Image src={url} alt=""/>
    );
};

export default Preview;