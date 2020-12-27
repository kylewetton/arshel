import React, {useEffect, useRef} from 'react';
import {LabelPill} from './styles';

interface UploadFormletInterface {
    onClick: () => void;
    handleUpload: (files: FileList) => void;
    error: string | false;
}

const UploadFormlet: React.FC<UploadFormletInterface> = ({handleUpload, onClick}) => {

    const handleClick = (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => {
        const element = e.target as HTMLInputElement;
        element.value = '';
        onClick();
    }

    return (
        <>
            <input
            onClick={(e) => handleClick(e)}
            onChange={ (e) => handleUpload((e.target.files as FileList))}
            type="file" id="BtnBrowseHidden" name="files" style={{display: 'none'}} />
            <LabelPill htmlFor="BtnBrowseHidden">
                    upload
            </LabelPill>
        </>
    );
};

export default UploadFormlet;