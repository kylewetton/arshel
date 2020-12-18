import React, { useState } from 'react';
import { ColorResult } from 'react-color';
import { MainWrapper, Frame, } from './styles';
import {Header} from '../Header';
import { Upload } from '../Upload';
import { Preview } from '../Preview';
import { ControlPanel } from '../ControlPanel';
import { generateQr, compileGlb, generateAr, isTouchDevice, generateFauxArLink } from '../../utils';
import { Object3D } from 'three';
import { LoadOverlay } from '../LoadOverlay';
import { Footer } from '../Footer';


interface ResponseInterface {
  name: string;
}

interface AspectRatioInterface {
  x: number;
  y: number;
}


function App() {

  const [image, setImageUrl] = useState<string | null>(null);
  const [qrUrl, setQrUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<'loading' | 'waiting' | 'completed'>('waiting');
  const [includeFrame, setIncludeFrame] = useState(true);
  const [frameColor, setFrameColor] = useState('#FAFAFA');
  const [aspectRatio, setAspectRatio] = useState<AspectRatioInterface | null>(null);

  /**
   * Reset the app to default
   */
  const handleReset = () => {
    setImageUrl(null);
    setQrUrl(null);
    setLoading('waiting');
    setAspectRatio(null);
  }

  /**
   * 
   * @param url Url of the .usdz file and either generates a QR or opens the file directly (on mobile)
   */
  const handleDeliverAr = (url: string) => {
    if (isTouchDevice()) {
      setLoading('completed');
      generateFauxArLink(url);
    } else {
      const qr = generateQr(url);
      setQrUrl(qr);
    }
  }

  /**
   * Set image state after file upload
   * 
   * @param url   The URL returned by the drop pad / Upload button
   */
  const handleUpload = (url: string) => {
    setImageUrl(url);
  }

  /**
   * Set the UI to 'loading' state
   */
  const handleSetLoading = () => {
    setLoading('loading');
  }

  /**
   * Calculates the relative width and height of the image,
   * no strictly the format of aspect ratios, this value
   * is used when the user has aspect lock enabled while
   * resizing.
   * 
   * @param artworkNode DOM element of the uploaded image
   */

  const setArtworkAspectRatio = (artworkNode: HTMLImageElement | null) => {

    if (!artworkNode || qrUrl)
      return null;
    const {width, height} = artworkNode.getBoundingClientRect();
    const widthAspect = width/height;  
    const heightAspect = height/width;
    const aspect = {x: widthAspect, y: heightAspect};
    setAspectRatio(aspect);
  }

  /**
   * Change the UI loading state to 'loaded' once the QR code is displayed
   */
  const handleImageLoaded = (artworkNode: HTMLImageElement | null) => {
    if (qrUrl)
        setLoading('completed');
    else {
      setArtworkAspectRatio(artworkNode);
    }
  }

  /**
   * Compiles the frame .glb with the image as a texture, then sends to server to 
   * generate the .usdz file and generates the QR code
   * 
   * @param width   Width in mm of the artwork
   * @param height  Height in mm of the artwork
   * @param floorHeight Height in mm from floor to bottom of frame
   */
  const launchAr = (width: number, height: number, floorHeight: number) => {
    if (!image)
      return false;

    handleSetLoading();
    compileGlb(image, width, height, floorHeight, includeFrame, frameColor)
      .then(
        (file) => generateAr((file as Object3D))
          .then((data) => {
            const url = `storage/ar-${(data as ResponseInterface).name}.usdz`;
            handleDeliverAr(url);
          })
      );
  }

  /**
   * 
   * @param state Whether the 3D file should render with a frame
   */
  const handleToggleFrame = (state: boolean) => {
    setIncludeFrame(state);
  }

  /**
   * Remove QR code when control panel settings change
   */
  const handleDestroyQr = () => {
    setQrUrl(null);
    setLoading('waiting');
  }

  /**
   * Returns current color object
   * https://casesandberg.github.io/react-color/
   * 
   * @param color   ColorResult Object
   */
  const handleFrameColor = (color: ColorResult) => {
    setFrameColor(color.hex);
  }

  return (
    <MainWrapper>
      <Header />

      <Frame
        frameColor={frameColor}
        includeFrame={includeFrame}
      >
        {loading === 'loading' ? <LoadOverlay /> : ''}
        {image ?
          <>
            <Preview
              handleOnLoad={ (artworkNode: HTMLImageElement | null) => handleImageLoaded(artworkNode)}
              url={qrUrl ? qrUrl : image}
              />
          </>
          : <Upload uploadImage={handleUpload} />}
      </Frame>

      {aspectRatio && <ControlPanel
              loadingState={loading}
              launchAr={launchAr}
              resetApp={handleReset}
              destroyQr={() => handleDestroyQr()}
              toggleFrame={handleToggleFrame}
              frameColor={frameColor}
              handleFrameColor={handleFrameColor}
              aspectRatio={aspectRatio}
            />}


        <Footer />
    </MainWrapper>

  );
}

export default App;
