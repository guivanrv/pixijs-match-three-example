import TWEEN from '@tweenjs/tween.js';

export function popIn(sprite, time = 300) {
	const props = { x: 0.8, y: 0.8 };
	new TWEEN.Tween(props)
		.to({ x: 1, y: 1 }, time)
		.easing(TWEEN.Easing.Bounce.Out) // Use an easing function to make the animation smooth.
		.onUpdate(() => {
			sprite.scale.x = props.x;
			sprite.scale.y = props.y
		})
		.start()
}

export function shrink(sprite, time = 300) {
	return new Promise((resolve) => {
		const props = { x: 1, y: 1 };
		new TWEEN.Tween(props)
			.to({ x: 0.5, y: 0.5 }, time)
			.easing(TWEEN.Easing.Bounce.InOut) // Use an easing function to make the animation smooth.
			.onUpdate(() => {
				sprite.scale.x = props.x;
				sprite.scale.y = props.y
			})
			.start()
			.onComplete(() => {
				resolve()
			})
	})
}

export function bounce(sprite, time = 300) {
	const props = { x: 0.95, y: 0.95 };
	return new TWEEN.Tween(props)
		.to({ x: 1.05, y: 1.05 }, time)
		.easing(TWEEN.Easing.Sinusoidal.InOut) // Use an easing function to make the animation smooth.
		.onUpdate(() => {
			sprite.scale.x = props.x;
			sprite.scale.y = props.y
		})
		.repeat(Infinity)
		.start()
}
