
[![version](https://img.shields.io/badge/version-1.0.3-green.svg)](https://semver.org)

## Magnify 3d
Real time optic magnifying glass for [three.js](https://github.com/mrdoob/three.js).
Get a high-res zoomed section of your 3d scene, with a single API.

## Demo
- [Live Demo](https://amitdiamant.github.io/magnify-3d)
- [Sample Code](sample/index.js#L165)

## Install
```$ npm install magnify-3d --save ```

## Usage
```js
import Magnify3d from 'magnify-3d';

const magnify3d = new Magnify3d();

magnify3d.render({

    renderer: renderer,
    
    pos: { mouse.x, mouse.y },
    
    renderSceneCB: (target) => {
    
        renderer.render(scene, camera, target);
      
    }
    
});
```

## Options
| Name | Type | Default | Mandatory | Description|
| - | - | - | - | - |
| `renderer` | WebGLRenderer | | V | The renderer used to render the original scene. |
| `renderSceneCB` | function | | V | A callback function used for rendering the original scene on a zoomed target. |
| `pos`  | { x, y } | | V | Position of the magnifying glass in client coordinates. |
| `zoom`  | number | 2.0 | | Zoom factor of the magnifying glass. |
| `exp`  | number | 35.0 | | Exponent used to calculate the glass' shape. Higher `exp` value means flatter glass shape. |
| `radius`  | number | 100.0 | | Radius of the magnifying glass in pixels. |
| `outlineColor`  | hex | 0xcccccc | | Color of the glass' outline. |
| `outlineThickness`  | number | 8.0 | | Thickness of the glass' outline in pixels. Can be set to 0. |
| `antialias` | Boolean | true | | Whether to add an antialiasing pass or not. |
| `inputBuffer`  | WebGLRenderTarget | | | Buffer filled with the original scene render. In case `inputBuffer` is not supplied, the canvas will be the input buffer.|
| `outputBuffer`  | WebGLRenderTarget | | | Render target. In case `outputBuffer` is not supplied, the output will be directly on the screen.|
  
                
## Contribute
If you have a feature request, please add it as an issue or make a pull request.

## References
- [three.js](https://github.com/mrdoob/three.js)
- [Fast Approximate Anti-Aliasing](https://github.com/mrdoob/three.js/blob/dev/examples/js/shaders/FXAAShader.js)
- [Teapot Geometry](https://github.com/mrdoob/three.js/blob/dev/examples/js/geometries/TeapotBufferGeometry.js)

## License
[MIT](LICENSE)
