import React from 'react';
import Upload from './Upload';

const UploadContainer: React.FC<{uploadImage: (url: string) => void}> = ({uploadImage}) => {
    
    const convertToBlob = (files: FileList) => {
        const file = files[0];
        if (!file || /\.(jpe?g|png|gif)$/i.test(file.name) === false )
            return false;
        const url = URL.createObjectURL(file);
        uploadImage(url); 
    }

    return (
        <Upload handleFileUpload={convertToBlob} />
    );
};

export default UploadContainer;