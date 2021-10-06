import '../styles/index.scss';
import * as PIXI from 'pixi.js';

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application();
 
// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);
const loader = PIXI.Loader.shared;
// load the texture we need
loader.add('bear', 'public/images/bear.png').load((loader, resources) => {
 
    // This creates a texture from a 'bear.png' image.
    const bear = new PIXI.Sprite(resources.bear.texture);
 
    // Setup the position of the bear
    bear.x = app.renderer.width / 2;
    bear.y = app.renderer.height / 2;
 
    // Rotate around the center
    bear.anchor.x = 0.5;
    bear.anchor.y = 0.5;
 
    // Add the bear to the scene we are building.
    app.stage.addChild(bear);
 
    // Listen for frame updates
    app.ticker.add(() => {
         // each frame we spin the bear around a bit
        bear.rotation += 0.01;
    });
});