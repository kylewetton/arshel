import React, {useState} from 'react';
import { handleAllowedFiles } from '../../utils';
import Upload from './Upload';

const UploadContainer: React.FC<{uploadImage: (url: string) => void}> = ({uploadImage}) => {

    const [error, setError] = useState<string | false>(false);
    
    const convertToBlob = (files: FileList) => {
        
        
        const file = handleAllowedFiles(files[0]);
        if (!file)
            return false;

        if (!(file instanceof File) && file.hasOwnProperty('type') && file.type === 'error') {   
            setError(file.message);
            return false;
        }
            
        const url = URL.createObjectURL(file);
        uploadImage(url); 
    }

    return (
        <Upload
        error={error}
        clearError={() => setError(false)}
        handleFileUpload={convertToBlob}
        />
    );
};

export default UploadContainer;