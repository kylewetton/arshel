import React, {useEffect} from 'react';
import * as THREE from 'three';
import { Vector3 } from 'three';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';




const DebugViewer = () => {

    useEffect(() => {

    // === THREE.JS CODE START ===
    const BACKGROUND_COLOR = 0xf1f1f1;
     const loader = new GLTFLoader();   

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    scene.background = new THREE.Color(BACKGROUND_COLOR );
    const light = new THREE.HemisphereLight( 0xffffbb, 0x080820, 5 );
    scene.add( light );

    
    loader.load('frame.glb', (gltf) => {

        const paperScale = (width, height) => [width / 1000, height / 1000];
        const paper = paperScale(420, 594);

        gltf.scene.traverse(o => {
            if (o.isMesh && o.name === 'viewport') {
                o.scale.set(paper[0], 1, paper[1]);
            }

            if (o.name === 'left' || o.name === 'right') {
                const movementFactorX = o.name === 'left' ? 2 : -2;
                o.scale.set(1 ,paper[1] * 1.1, 1);
                // o.visible = false;
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
        })
        scene.add(gltf.scene);
    });


    camera.position.z = 2;
    camera.position.y = 1;


    var animate = function () {
      requestAnimationFrame( animate );
      renderer.render( scene, camera );
    };
    animate();
    // === THREE.JS EXAMPLE CODE END ===
    }, [])

    return (
        <div>
        </div>
    );
};

export default DebugViewer;