import '../styles/index.scss';
import * as PIXI from 'pixi.js';
import TWEEN from '@tweenjs/tween.js';
import PatternMatcher from './patterns';
import audio from './audio';
import { popIn, shrink, bounce } from './tween'
const app = new PIXI.Application(
    {
        width: 870,
        height: 870
    }
);
const patternMatcher = new PatternMatcher();
document.body.appendChild(app.view);
const loader = PIXI.Loader.shared;

const animals = ['bear', 'buffalo', 'chick', 'chicken',
    'cow', 'crocodile', 'dog', 'duck', 'elephant', 'frog', 'giraffe',
    'goat', 'gorilla', 'hippo', 'horse', 'monkey', 'moose',
    'narwhal', 'owl', 'panda', 'parrot', 'penguin', 'pig',
    'rabbit', 'rhino', 'sloth', 'snake', 'walrus', 'whale', 'zebra'
], TILES_OX = 6, TILES_OY = 6, SPRITE_WIDTH = 140, SPRITE_HEIGHT = 140, PADDING = 15, sprites = [];

let selected = undefined, selectedBounce = undefined, resources;

function getRandomAnimalName() {
    return animals[Math.trunc(Math.random() * 10)];
}

function onTexturesLoaded() {
    for (let x = 0; x < TILES_OX; x++) {
        sprites[x] = [];
        for (let y = 0; y < TILES_OY; y++) {
            const sprite = createSprite(getRandomAnimalName(), x, y);
            sprites[x][y] = sprite;
            app.stage.addChild(sprite);
        }
    }
}

function onSpriteClick(sprite) {
    audio.fx.click();
    if (!selected) {
        selected = sprite;
        selectedBounce?.stop();
        selectedBounce = bounce(selected);
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
        selectedBounce?.stop();
        selected = undefined;
        runPatternCheck();
    }
}

function runPatternCheck() {
    const strGroups = sprites.map(col => col.map( element => element.name ));
    const groups = patternMatcher.matchAllGroups(strGroups);

    if (groups.length) {
        audio.fx.nextLine();
        groups.forEach(({points}) => {
            points.map(({x,y})=>sprites[x][y]).forEach(sprite => {
                const {x,y } = sprite.customData;
                const newSprite = createSprite(getRandomAnimalName(), x, y);
                sprites[x][y] = newSprite;
                shrink(sprite).then(()=>{
                    app.stage.removeChild(sprite);
                    app.stage.addChild(newSprite);
                    runPatternCheck();
                })
            })
        });
    }
}

function createSprite(randomAnimal, x, y) {
    const texture = resources[randomAnimal].texture;
    const sprite = new PIXI.Sprite(texture);
    sprite.name = randomAnimal;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    sprite.x = x * SPRITE_WIDTH + SPRITE_WIDTH / 2 + PADDING;
    sprite.y = y * SPRITE_HEIGHT + SPRITE_HEIGHT / 2 + PADDING;
    sprite.interactive = true;
    sprite.buttonMode = true;
    // store array position
    sprite.customData = { x, y };
    sprite.on('pointerdown', ({ target }) => onSpriteClick(target));
    popIn(sprite);
    return sprite;
}

function update() {
    TWEEN.update(performance.now())
    // sprites.forEach((row, x) => {
    //     row.forEach((sprite, y) => {
    //         sprite.scale.set(1, 1);
    //     });
    // });
    // if (selected) {
    //     const scale = 1 + 0.1 * Math.sin(Date.now() / 100);
    //     selected.scale.x = scale;
    //     selected.scale.y = scale;
    // }
}

// executable beeps-and-boops
const imageFilesToLoad = animals.map(str => ({ name: str, url: `public/images/${str}.png` }));

loader.add(imageFilesToLoad).load(
    (loader, res) => {
        resources = res;
        onTexturesLoaded();
        runPatternCheck();
    }
);


// Listen for frame updates
app.ticker.add(update);