import * as THREE from 'three';
import MagnifyingShaderFrag from './shaders/MagnifyingShaderFrag.glsl';
import MagnifyingShaderVert from './shaders/MagnifyingShaderVert.glsl';

export default class Magnify3d {
    constructor() {
        this.material = new THREE.ShaderMaterial({
            vertexShader: MagnifyingShaderVert,
            fragmentShader: MagnifyingShaderFrag,
            uniforms: {
                "zoomedTexture": { type: "t" },
                "originalTexture": { type: "t" },
                'pos': { type: 'v2' },
                'outlineColor': { type: 'v3' },
                'resolution': { type: 'v2' },
                'zoom': { type: 'f' },
                'radius': { type: 'f' },
                'outlineThickness': { type: 'f' },
                'exp': { type: 'f' }
            }
        });

        this.material.transparent = true; // Needed if inputBuffer is undefined.

        const renderPlane = new THREE.BufferGeometry();
        const p = new Float32Array([
            -1.0, -1.0,  0.0,
            1.0, -1.0,  0.0,
            1.0,  1.0,  0.0,
            1.0,  1.0,  0.0,
           -1.0,  1.0,  0.0,
           -1.0, -1.0,  0.0
        ]);

        renderPlane.addAttribute("position", new THREE.BufferAttribute(p, 3));

        const quad = new THREE.Mesh(renderPlane, this.material);

        this.scene = new THREE.Scene();
        this.scene.add(quad);

        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        // Size is not really matter here. It gets updated inside `render`.
        this.zoomTarget = new THREE.WebGLRenderTarget(0, 0);
    }

    render({    
                renderer,
                pos = null,
                zoom = 2.0,
                exp = 35.0,
                outlineColor = new THREE.Color( 0xCCCCCC ),
                radius = 100.0,
                outlineThickness = 8.0,
                inputBuffer = undefined,
                outputBuffer = undefined,
                renderSceneCB = undefined    
            }) {

        if (!renderer) {
            console.warn('Magnify-3d: No renderer attached!');
            return;
        }
        
        if (!pos) {
             // No pos - Just render original scene.
             renderSceneCB(outputBuffer);
            return;
        }

        const pixelRatio = renderer.getPixelRatio();
        pos = { x: pos.x * pixelRatio, y: pos.y * pixelRatio };

        let { width, height } = renderer.getSize();

        width *= pixelRatio;
        height *= pixelRatio;

        // Set shader uniforms.
        this.material.uniforms['zoomedTexture'].value = this.zoomTarget.texture;
        this.material.uniforms['originalTexture'].value = (inputBuffer && inputBuffer.texture) || inputBuffer;
        this.material.uniforms['pos'].value = pos;
        this.material.uniforms['outlineColor'].value = outlineColor;
        this.material.uniforms['resolution'].value = new THREE.Vector2( width, height );
        this.material.uniforms['zoom'].value = zoom;
        this.material.uniforms['radius'].value = radius * pixelRatio;
        this.material.uniforms['outlineThickness'].value = outlineThickness * pixelRatio;
        this.material.uniforms['exp'].value = exp;

        // Make viewport centered according to pos.
        const zoomedViewport = [
            -pos.x * (zoom - 1),
            -pos.y * (zoom - 1),
            width * zoom,
            height * zoom
        ];

        this.zoomTarget.width = width;
        this.zoomTarget.height = height;
        this.zoomTarget.viewport.set(...zoomedViewport);
        this.zoomTarget.scissor.set(...zoomedViewport);

        this.zoomTarget.dispose();
        
        const autoClearBackup = renderer.autoClear;
        renderer.autoClear = false; // Make sure autoClear is not set, so calling `render` won't erase the original rendering.

        renderSceneCB(this.zoomTarget);

        renderer.render(this.scene, this.camera, outputBuffer); // Render final pass to output buffer.
        renderer.autoClear = autoClearBackup;
    }
};
