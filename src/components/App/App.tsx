import React, {useState} from 'react';
import {MainWrapper, Frame} from './styles';
import {Upload} from '../Upload';
import {Preview} from '../Preview';
import DebugViewer from '../DebugViewer/DebugViewer';
import { ControlPanel } from '../ControlPanel';
import {generateQr} from '../utils';

function App() {

  const [image, setImageUrl] = useState<string | null>(null);
  
  const handleReset = () => {
    setImageUrl(null);
  }

  const handleUpload = (url: string) => {
    setImageUrl(url);
  }

  const handleShareLink = (url: string) => {
    const qr = generateQr(url);
    setImageUrl(qr);
  }


  return (
    <MainWrapper>
      {/* <DebugViewer /> */}
      <Frame>
        {image ?
        <>
          <Preview url={image} />
          <ControlPanel
            url={image}
            resetApp={handleReset}
            getArLink={(url) => handleShareLink(url)}
          />
        </>
        : <Upload uploadImage={handleUpload} />}
      </Frame>
   </MainWrapper>

  );
}

export default App;
