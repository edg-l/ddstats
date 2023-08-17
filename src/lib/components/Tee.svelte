<script lang="ts">
	import { onMount } from 'svelte';

	let clazz: string = '';
	export { clazz as class };

	export let name: string;

	let imageLink = `https://assets.ddstats.org/skins/${name}.png`;

	let canvas: HTMLCanvasElement;
	let found = false;

	async function loadImage(imageLink: string) {
		let blob = await fetch(imageLink).then((r) => r.blob());
		let bitmap = await createImageBitmap(blob, {
			resizeWidth: 256,
			resizeHeight: 128
		});
		return bitmap;
	}

	function renderSkin(skin: CanvasImageSource) {
		let ctx = canvas.getContext('2d');

		if (ctx === null) {
			throw new Error('error getting canvas');
		}

		ctx.drawImage(skin, 192, 64, 64, 32, 8, 32, 64, 30); //back feet shadow
		ctx.drawImage(skin, 96, 0, 96, 96, 16, 0, 64, 64); // body shadow
		ctx.drawImage(skin, 192, 64, 64, 32, 24, 32, 64, 30); // front feet shadow
		ctx.drawImage(skin, 192, 32, 64, 32, 8, 32, 64, 30); // back feet
		ctx.drawImage(skin, 0, 0, 96, 96, 16, 0, 64, 64); // body
		ctx.drawImage(skin, 192, 32, 64, 32, 24, 32, 64, 30); // front feet
		ctx.drawImage(skin, 64, 96, 32, 32, 39, 18, 26, 26); // left eye
		//right eye (flip and draw)
		ctx.save();
		ctx.scale(-1, 1);
		ctx.drawImage(skin, 64, 96, 32, 32, -73, 18, 26, 26);
		ctx.restore();
	}
	onMount(async () => {
		if (name !== '' && name !== undefined) {
			try {
				let imgData = await loadImage(imageLink);
				if (imgData) renderSkin(imgData);
			} catch (e) {
				found = false;
			}
		}
	});
</script>

{#if !found}
	<span class={clazz}>{name}</span>
{:else}
	<canvas bind:this={canvas} class={clazz} width="96" height="64" />
{/if}
