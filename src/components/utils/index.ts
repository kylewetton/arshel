import { TextureLoader, MeshBasicMaterial, Mesh, Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { GLTFExporter } from 'three/examples/jsm/exporters/GLTFExporter';

const debugMode = true;
const debugIP = '192.168.1.2';

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
        link.download = 'test.glb';
        link.click();
    }, { binary: true });
}

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

export const generateQr = (file: string) => {
    const base = debugMode ? `http://${debugIP}:3000` : window.location.origin;
    const api = `https://api.qrserver.com/v1/create-qr-code/?format=svg&color=E11D48&size=600x600&data=${base}/${file}`;
    return api;
}

export const compileGlb = (url: string, width: number, height: number) => {
    const loader = new GLTFLoader();
    const tLoader = new TextureLoader();
    return new Promise((res, rej) => {
        tLoader.load(url, (texture) => {
            texture.flipY = true;
            const material = new MeshBasicMaterial({ map: texture });

            loader.load('./frame.glb', (gltf) => {
                const { scene } = gltf;
                const paperScale = (w: number, h: number) => [w / 1000, h / 1000];
                const paper = paperScale(width, height);

                scene.traverse((o) => {
                    if ((o as Mesh).isMesh && o.name === 'viewport') {
                        (o as Mesh).material = material;
                        o.scale.set(paper[0], 1, paper[1]);
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


                });

                res(scene);
            });
        });

    });
};

export { };

