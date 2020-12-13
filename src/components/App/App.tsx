import React, {useState} from 'react';
import {MainWrapper, Frame} from './styles';
import {Upload} from '../Upload';
import {Preview} from '../Preview';
import DebugViewer from '../DebugViewer/DebugViewer';
import { ControlPanel } from '../ControlPanel';
import {generateQr} from '../utils';
import { LoadOverlay } from '../LoadOverlay';

function App() {

  const [image, setImageUrl] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<'loading' | 'waiting' | 'completed'>('waiting');


  const handleReset = () => {
    setImageUrl(null);
    setQrUrl(null);
    setLoading('waiting');
  }

  const handleUpload = (url: string) => {
    setImageUrl(url);
  }

  const handleShareLink = (url: string) => {
    const qr = generateQr(url);
    setQrUrl(qr);
  }

  const handleDestroyQr = () => {
    setQrUrl(null);
    setLoading('waiting');
  }

  const handleSetLoading = () => {
    setLoading('loading');
  }

  const handleImageLoaded = () => {
    if (qrUrl)
        setLoading('completed');
  }


  return (
    <MainWrapper>
      
      <Frame>
       {loading === 'loading' ? <LoadOverlay /> : ''}
        {image ?
        <>
          <Preview
          handleOnLoad={handleImageLoaded}
          url={qrUrl ? qrUrl : image} />
          <ControlPanel
            url={image}
            loadingState={loading}
            handleSetLoading={handleSetLoading}
            resetApp={handleReset}
            getArLink={(url) => handleShareLink(url)}
            destroyQr={() => handleDestroyQr()}
          />
        </>
        : <Upload uploadImage={handleUpload} />}
      </Frame>
   </MainWrapper>

  );
}

export default App;
