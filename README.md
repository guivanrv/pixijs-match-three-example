# This repo is code-sample for the article i've written 

Read it [here](https://dev.to/roman_guivan_17680f142e28/match-3-game-in-pixi-js-36hm)

A copy of article down below:





YouTube: {% youtube Unz-V2NGGCg %}

Match 3 games are on average at least 80% more exciting to develop compared to what you're actually paid for (unless you're developing a match 3 game for living, of course). So i say lets just make one, for the science.

This ain't a "definitive guide", more like a "your first match 3 game in pixi" or "your first game ever". 

In this part#1 we'll build an animated screen with buncha animal faces tiled 

![image](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/eszx9l20l8i4nnl4k82d.png)
 
## Step 1 - Get ready
Just clone this repository and rewind to {1} commit.

You'll have a [webpack-starter](https://github.com/wbkd/webpack-starter) with 'pixi.js' module installed and some graphic assets from [kenney.nl](https://www.kenney.nl/assets) unpacked into `/public/images` folder. 

Script in `script/index.js` is just a starter example from [PIXI.js npm page](https://www.npmjs.com/package/pixi.js/v/5.0.0-rc)

## [Stage](https://pixijs.download/dev/docs/PIXI.Application.html#stage), [Sprite](https://pixijs.download/dev/docs/PIXI.Sprite.html) and [Update-loop](https://pixijs.download/dev/docs/PIXI.Ticker.html)

Of course you totally can develop a match 3 browser game, where your bejeweled GEMs are just <div> elements, but for the sake of our 2d animations fluidity and performance, I'll use pixi.js here. Pixi will render graphics into canvas, using webgl-based renderer that would ensure all your visual transforms are calculated and rendered lightning fast.

Since this might be your first game i'll quickly explain the basic terms here.

#### What is a ["stage"](https://pixijs.download/dev/docs/PIXI.Application.html#stage)
A stage is a top-level root container. Think "scene" from Flash or Unity, or your document.body if we make analogies with DOM.

#### What is a ["sprite"](https://pixijs.download/dev/docs/PIXI.Ticker.html)
A sprite is a 2d raster image. Like a div with fixed size and position-absolute-like placement. Except it's better than div because it can transform and resize really fast. Like 60 times per second and faster (if you disable vsync in your browser).

#### What is an update-loop
Now this is a big one. I'm sure you've played a videogame at least once, before. You press a button - shit happens on screen - you're the one who caused all of this to happen and it makes you feel truly special and very engaged, right? 

There's an update loop in the heart of each and every game. A function that executes 60 times per second or more, usually clears and completely re-paints the screen 60 times per second or more, reads your inputs and so on and so on. 

One re-paint is one FRAME of both rendering, and input reading. Why 60? - Because 60 is considered to be "smooth" and to feel "interactive". It has been 40 years ago, it still is. Going more frequent than 60 in browser is possible, if you disable vsync, but not a common thing yet.

in earlier days people literally used 

    const fps = 60;
    setTimeout(function update(){...}, 1000/fps)


But of course if your update function was too computations-heavy - everything de-synced and just played horrible. Without any libraries today you can use [requestAnimationFrame](https://developer.mozilla.org/en-US/docs/Web/API/window/requestAnimationFrame). Think of it as a 60 fps setTimeout, that can "slow down gracefully" in case anything computation-heavy happens. Ah, and also it won't run when the tab aint active, unlike setTimeout.

Many libs provide a Timer abstraction, in Pixi it's called [Ticker](https://pixijs.download/dev/docs/PIXI.Ticker.html)

Theory class is over, it's only code from now on. Open `scripts/index.js`, let me walk you through this real quick:

    const app = new PIXI.Application();
    document.body.appendChild(app.view);
    const loader = PIXI.Loader.shared;

creates a pixi app, and adds it's stage's <canvas> to document.body.

    loader.add('bear', 'public/images/bear.png').load((loader, resources) => {

is async image pre-loader. 

    const bear = new PIXI.Sprite(resources.bear.texture);

is you creating your sprite, and 


    app.ticker.add(() => {
         // each frame we spin the bear around a bit
        bear.rotation += 0.01;
    });

is your update loop. 

## Task 1: create a 6x4 grid of randomized animal sprites.

There's plenty of other cute animals aside of bear.png under `public/images/`. I want you to modify the code, so it draws a 10x10 grid of random animals. I suggest you do it yourself, and in case you're stuck - come back to check my solution.

Few hints:
 - [loader.add has an array overload](https://pixijs.download/dev/docs/PIXI.Loader.html)
- every Sprite, like our bear, has 

    bear.x
    bear.y

Both are number values, hope you got the idea.

**Now stop reading and just do it!** 

**Done?** If you're not - no worries, here's how i would solve this.

Lets define some constants:


    const animals = ['bear','buffalo','chick','chicken','cow','crocodile','dog','duck','elephant','frog','giraffe', 'goat','gorilla','hippo','horse','monkey','moose','narwhal','owl','panda','parrot','penguin','pig','rabbit','rhino','sloth','snake','walrus','whale','zebra'],

    TILES_OX = 6, TILES_OY = 4, SPRITE_WIDTH = 138, SPRITE_HEIGHT = 138, sprites = [];

Here's a tip how to not type all 40 animals manually: 

    ls -l &> out.txt 

and then just paste the contents between two square braces, multiline edit first quotation mark, and find-replace '.png' with '",' for second one.

On windows you can use dir instead of ls, and > instead of &>. Back to displaying animals in a grid:

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

One thing to explain here: sprite.anchor is the "center" of the sprite. If you want {x:0, y:0} to be TOP LEFT POINT of sprite: anchor is 0,0. If you want bottom right to be the "start" for positions it's 1,1. The benefit of using 0.5 0.5 will show mostly in animating: it's way more common to rotate a sprite around it's center, or scale it around the center. Also the images we have arent all equal in size, due to some animals having ears and horns.

By fixing the width to 138px and using center as anchor - we can place them in a grid with equal spaces (ears will overlap with neighbours, so what :p )

But of course, since now 0,0 of a sprite is it's center - all positions have to be offset by half of a sprite width or height.

Now remember the ticker we had, the one that rotated sprites?

Of course you can

    sprites.forEach((sprite) => /*rotate them*/)

again, but i have a cooler effect to suggest!

Each sprite has scale.x and scale.y, where 1 is 100% scale. So to make our sprites zoom in and out randomly we can 


    // Listen for frame updates
    app.ticker.add(() => {
        sprites.forEach((sprite, index) => {
            const scale = 1 + 0.1 * Math.sin(Date.now() / (400 + index * 10));
            sprite.scale.x = scale;
            sprite.scale.y = scale;
        })
    });

If you havent seen the trick with sin / cos before - i'm willing to defend it right here in this article too! Sin and Cos are cool! You give them any value - they'll return you a value from -1 to 1, so it's a perfect function for animating some cycling process. Swings of a pendulum, a spring jumping back and fourth - all easily doable with sin.

Sin of Date.now() would result in scale going from 0 to 2, which is too EXTREME. I'd like it to stay whithin 0.9 ~ 1.1, thats why its 1 + sin of time * 0.1;

And sin of time changes just too fast, so you can divide Date.now() to "slow things down a bit" 

YouTube: {% youtube CDks1udquHo %}

In the second part we'll implement "selecting" a tile, and making it swap places with another one. Till then - make it a 200x200 grid and set the canvas in the background of your website. HYPNOTIZING af.

As all of my writing, i devote this to the one and only [Barbara](https://dev.to/barbara)
