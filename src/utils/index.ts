import { TextureLoader, MeshBasicMaterial, MeshPhongMaterial, Mesh, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';


const debugMode = process.env.NODE_ENV === 'development';
const debugIP = process.env.REACT_APP_IPADD;
const binaryExport = false;

/**
 * If this has issues, it may be worth looking into it here
 * https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
 */
export const isTouchDevice = () => 'ontouchstart' in window || navigator.msMaxTouchPoints;


/**
 * This function is used in testing only, it bypasses the AR stage and directly downloads the .glb file
 * 
 * @param scene     The Scene extracted from the .glb file
 */
export const downloadFile = (scene: Object3D) => {
    const exporter = new GLTFExporter();
    exporter.parse(scene, function (glb) {
        const link = document.createElement('a');
        link.style.display = 'none';
        document.body.appendChild(link);


        const blob = new Blob([(glb as ArrayBuffer)], { type: 'application/octet-stream' });
        const objectURL = URL.createObjectURL(blob);

        link.href = objectURL;
        link.href = URL.createObjectURL(blob);
        link.download = `test.${binaryExport ? 'glb' : 'gltf'}`;
        link.click();
    }, {});
}

/**
 * Takes the .glb scene after artwork has been applied, exports it a blob
 * and sends it to the generate-ar endpoint
 * 
 * @param scene     The Scene extracted from the .glb file
 */

export const generateAr = (scene: Object3D) => {

    const exporter = new GLTFExporter();

    return new Promise((resolve, reject) => {
        exporter.parse(scene, function (glb) {
            const fd = new FormData();
            fd.append('file', new Blob([(glb as ArrayBuffer)], { type: 'application/octet-stream' }));

            fetch('/generate-ar', {
                method: 'POST',
                body: fd
            })
                .then(res => res.json())
                .then(data => resolve(data));

        }, { binary: true });
    });
}

/**
 * Returns a link to a QR code that opens the .usdz file
 * 
 * @param file      The path to the .usdz file compiled by the usdpython script
 */

export const generateQr = (file: string) => {
    const base = debugMode ? `http://${debugIP}:3000` : window.location.origin;
    const api = `https://api.qrserver.com/v1/create-qr-code/?format=svg&color=E11D48&size=600x600&data=${base}/${file}`;
    return api;
}

/**
 * Loads the base frame.glb. Texture's the viewport mesh with the supplied artwork,
 * Does frame resizing and resolves the ThreeJS Scene, ready to be converted to blob  
 *    
 * @param url               The URL of the artwork
 * @param width             Width in mm of the artwork
 * @param height            Height in mm of the artwork
 * @param floorHeight       Height in mm from floor to bottom of frame
 * @param includeFrame      Whether to include the frame
 * @param frameColor        The Hex color of the frame
 */

export const compileGlb = (url: string, width: number, height: number, floorHeight: number, includeFrame: boolean, frameColor: string) => {
    const loader = new GLTFLoader();
    const tLoader = new TextureLoader();
    return new Promise((res, rej) => {
        tLoader.load(url, (texture) => {
            texture.flipY = true;
            const artworkMaterial = new MeshBasicMaterial({ map: texture });
            const frameMaterial = new MeshPhongMaterial({ color: frameColor });
            const frameParts = ['bottom', 'top', 'left', 'right', 'corner_tl', 'corner_tr', 'corner_bl', 'corner_br'];

            loader.load('./frame.glb', (gltf) => {
                const { scene } = gltf;
                const paperScale = (w: number, h: number) => [w / 1000, h / 1000];
                const floorScale = (floorHeight: number, scaleHeight: number) => {
                    const res = (floorHeight / 1000 - 1) - ((1 - scaleHeight / 1000) / 2);
                    return res;
                }
                const paper = paperScale(width, height);
                const floor = floorScale(floorHeight, height);

                scene.traverse((o) => {
                    if ((o as Mesh).isMesh && o.name === 'viewport') {
                        (o as Mesh).material = artworkMaterial;
                        o.scale.set(paper[0], 1, paper[1]);
                    }

                    /** 
                     * Height controller
                     */

                    if (o.name === 'h_controller') {
                       o.translateY(floor);
                    } 

                    /** Resize based on size input */

                    if (o.name === 'left' || o.name === 'right') {
                        const movementFactorX = o.name === 'left' ? 2 : -2;
                        o.scale.set(1, paper[1] * 1.1, 1);
                        o.translateX((1 - paper[0]) / movementFactorX);
                    }

                    if (o.name === 'bottom' || o.name === 'top') {
                        const movementFactorY = o.name === 'bottom' ? 2 : - 2;
                        o.scale.set(paper[0] * 1.1, 1, 1);
                        o.translateY((1 - paper[1]) / movementFactorY);
                    }

                    if (o.name === 'corner_tl' || o.name === 'corner_tr') {
                        const movementFactor = o.name === 'corner_tl' ? 2 : -2;
                        o.translateX((1 - paper[0]) / movementFactor);
                        o.translateY((1 - paper[1]) / -2);
                    }

                    if (o.name === 'corner_bl' || o.name === 'corner_br') {
                        const movementFactor = o.name === 'corner_bl' ? 2 : -2;
                        o.translateX((1 - paper[0]) / movementFactor);
                        o.translateY((1 - paper[1]) / 2);
                    }

                    /** Frame */

                    if (frameParts.includes(o.name)) {
                        if (includeFrame) { 
                            (o as Mesh).material = frameMaterial;
                        } else {
                            o.visible = false;
                        }
                    }


                });

                res(scene);
            });
        });

    });
};

/**
 * Creates a faux link element compliant with AR linking, and triggers
 * a click on the element. Runs on mobile only.
 * 
 * @param url       The url of the .usdz file complied by usdpython script
 */

export const generateFauxArLink = (url: string) => {
    const link = document.createElement('a');
      link.href = url;
      link.rel = 'ar';
      link.innerHTML = '<img src="ar.png" />';
      link.click();
}

interface UploadError {
    type: 'error';
    message: string;
}

export const handleAllowedFiles = (file: File): UploadError | File => {
    if (/\.(jpe?g|png)$/i.test(file.name) === false )
        return {type: 'error', 'message': 'Sorry, the file must be a JPEG or PNG.'};

    if (file.size * 1e-6 > 2)
        return {type: 'error', message: 'Sorry, the file must be below 2MB'};

    return file;
}


export { };

