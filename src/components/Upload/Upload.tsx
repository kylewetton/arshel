import React, {useState} from 'react';
import { Button } from '../Button';
import {UploadArea} from './styles';

const Upload: React.FC<{handleFileUpload: (files: FileList) => void}> = ({handleFileUpload}) => {

    const [draggingOver, setDraggingOver] = useState<Boolean>(false);
    
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
            <p>Drag and artwork here or <Button onClick={() => {}} tier='secondary'>upload</Button></p>
        </UploadArea>
    );
};

export default Upload;