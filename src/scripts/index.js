import '../styles/index.scss';
import * as PIXI from 'pixi.js';

const app = new PIXI.Application();
document.body.appendChild(app.view);
const loader = PIXI.Loader.shared;

const animals = ['bear','buffalo','chick','chicken',
    'cow','crocodile','dog','duck','elephant','frog','giraffe',
    'goat','gorilla','hippo','horse','monkey','moose',
    'narwhal','owl','panda','parrot','penguin','pig',
    'rabbit','rhino','sloth','snake','walrus','whale','zebra'
], TILES_OX = 6, TILES_OY = 4, SPRITE_WIDTH = 138, SPRITE_HEIGHT = 138, sprites = [];

loader.add(animals.map(str => ({name: str,url: `public/images/${str}.png`}))).load(
    (loader, resources) => {
    for (let x = 0; x < TILES_OX; x++) {
        for (let y = 0; y < TILES_OY; y++) {
            const randomAnimal = animals[Math.trunc(Math.random() * animals.length)];
            const sprite = new PIXI.Sprite(resources[randomAnimal].texture);
            sprite.anchor.x = 0.5;
            sprite.anchor.y = 0.5;
            sprite.x = x * SPRITE_WIDTH + SPRITE_WIDTH/2;
            sprite.y = y * SPRITE_HEIGHT + SPRITE_HEIGHT/2;
            app.stage.addChild(sprite);
            sprites.push(sprite);
        }    
    }
});


    // Listen for frame updates
    app.ticker.add(() => {
        sprites.forEach((sprite, index) => {
            const scale = 1 + 0.1 * Math.sin(Date.now() / (400 + index * 10));
            sprite.scale.x = scale;
            sprite.scale.y = scale;
        })
    });