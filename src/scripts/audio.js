import { Howl } from 'howler';

const clicks = [
    new Howl({ src: ['public/sounds/drop_002.ogg'] }),
    new Howl({ src: ['public/sounds/drop_003.ogg'] }),
    new Howl({ src: ['public/sounds/drop_004.ogg'] }),
    new Howl({ src: ['public/sounds/select_007.ogg'] }),
    new Howl({ src: ['public/sounds/select_008.ogg'] }),
    new Howl({ src: ['public/sounds/tick_002.ogg'] }),
];

const jingles = [
    new Howl({ src: ['public/sounds/jingles_PIZZI10.ogg'] }),
    new Howl({ src: ['public/sounds/jingles_PIZZI11.ogg'] }),
    new Howl({ src: ['public/sounds/jingles_PIZZI12.ogg'] }),
    new Howl({ src: ['public/sounds/jingles_PIZZI13.ogg'] }),
    new Howl({ src: ['public/sounds/jingles_PIZZI14.ogg'] }),
    new Howl({ src: ['public/sounds/jingles_PIZZI15.ogg'] }),
    new Howl({ src: ['public/sounds/jingles_PIZZI16.ogg'] }),
];

const menuMusic = new Howl({
    src: ['public/sounds/325611_4548252-lq.mp3'],
    autoplay: true,
    loop: true,
    volume: 0.5,
});

function playRandomSound(array) {
    array[Math.trunc(Math.random() * array.length)].play();
}

class Audio {
    fx = {
        click: () => { playRandomSound(clicks) },
        nextLine: () => { playRandomSound(jingles) }
    }
}

export default new Audio();