import React, {useState} from 'react';
import { Button } from '../Button';
import UploadFormlet from './UploadFormlet';
import {UploadArea} from './styles';

const Upload: React.FC<{handleFileUpload: (files: FileList) => void}> = ({handleFileUpload}) => {

    const [draggingOver, setDraggingOver] = useState<boolean>(false);
    
    const dragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    }
    
    const dragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingOver(true);
    }
    
    const dragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setDraggingOver(false);
    }
    
    const fileDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        handleFileUpload(files);
    }

    return (
        <UploadArea
        onDragOver={dragOver}
        onDragEnter={dragEnter}
        onDragLeave={dragLeave}
        onDrop={fileDrop}
        draggingOver={draggingOver}
        >
            <p>Drag artwork here or <UploadFormlet handleUpload={handleFileUpload} /></p>
        </UploadArea>
    );
};

export default Upload;