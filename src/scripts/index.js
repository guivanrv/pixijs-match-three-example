import '../styles/index.scss';
import * as PIXI from 'pixi.js';

const app = new PIXI.Application();

document.body.appendChild(app.view);
const loader = PIXI.Loader.shared;

const animals = ['bear', 'buffalo', 'chick', 'chicken',
    'cow', 'crocodile', 'dog', 'duck', 'elephant', 'frog', 'giraffe',
    'goat', 'gorilla', 'hippo', 'horse', 'monkey', 'moose',
    'narwhal', 'owl', 'panda', 'parrot', 'penguin', 'pig',
    'rabbit', 'rhino', 'sloth', 'snake', 'walrus', 'whale', 'zebra'
], TILES_OX = 6, TILES_OY = 4, SPRITE_WIDTH = 138, SPRITE_HEIGHT = 120, sprites = [];

let selected = undefined;

loader.add(animals.map(str => ({ name: str, url: `public/images/${str}.png` }))).load(
    (loader, resources) => {
        for (let x = 0; x < TILES_OX; x++) {
            sprites[x] = [];
            for (let y = 0; y < TILES_OY; y++) {
                const randomAnimal = animals[Math.trunc(Math.random() * animals.length)];
                const sprite = new PIXI.Sprite(resources[randomAnimal].texture);
                sprite.name = randomAnimal;
                sprite.anchor.x = 0.5;
                sprite.anchor.y = 0.5;
                sprite.x = x * SPRITE_WIDTH + SPRITE_WIDTH / 2;
                sprite.y = y * SPRITE_HEIGHT + SPRITE_HEIGHT / 2;
                sprite.interactive = true;
                sprite.buttonMode = true;
                app.stage.addChild(sprite);
                sprites[x][y] = sprite;
                // store array position
                sprite.customData = { x, y };
                sprite.on('pointerdown', (e) => {
                    if (!selected) {
                        selected = sprite;
                    } else {
                        if (selected === sprite) {
                            // can't swap element with itself
                            return;
                        }
                        // swap pixi coordinates
                        const xa = selected.x, ya = selected.y;
                        selected.x = sprite.x;
                        selected.y = sprite.y;
                        sprite.x = xa;
                        sprite.y = ya;
                        // swap array position
                        const positionA = selected.customData, positionB = sprite.customData;
                        selected.customData = positionB;
                        sprite.customData = positionA;
                        sprites[positionA.x][positionA.y] = sprite;
                        sprites[positionB.x][positionB.y] = selected;
                        selected = undefined;
                    }
                });
            }
        }
    });


// Listen for frame updates
app.ticker.add(() => {
    sprites.forEach((row, x) => {
        row.forEach((sprite, y) => {
            sprite.scale.set(1, 1);
        });
    });
    if (selected) {
        const scale = 1 + 0.1 * Math.sin(Date.now() / 100);
        selected.scale.x = scale;
        selected.scale.y = scale;
    }
});