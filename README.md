## Magnify 3d
Real time optic magnifying glass for [three.js](https://github.com/mrdoob/three.js).
Get a high-res zoomed section of your 3d scene, with a single API.

## Demo
- [Live Demo](https://amitdiamant.github.io/magnify-3d)
- [Sample Code](sample/index.js)

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

## Contribute
If you have a feature request, please add it as an issue or make a pull request.

## License
[MIT](LICENSE)
