import React from 'react';
import {LabelPill} from './styles';

const UploadFormlet: React.FC<{handleUpload: (files: FileList) => void}> = ({handleUpload}) => {
    return (
        <>
            <input
            onChange={ (e) => handleUpload((e.target.files as FileList))}
            type="file" id="BtnBrowseHidden" name="files" style={{display: 'none'}} />
            <LabelPill htmlFor="BtnBrowseHidden">
                    upload
            </LabelPill>
        </>
    );
};

export default UploadFormlet;