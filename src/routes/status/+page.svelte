<script lang="ts">
	import type { PageData } from './$types';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';

	export let data: PageData;
</script>

<Container>
	<Card class="px-4 py-3">
		<p class="font-bold text-4xl mb-2">DDNet Status</p>
		<p>Here you can see the DDNet servers status.</p>

		<p>Ping is relative to Helsinki (europe)</p>

		<ul class="my-2 list-disc list-inside">
			<li><span class="font-bold">master1</span> ({data.status.master1?.status}) {data.status.master1?.ms} ms</li>
			<li><span class="font-bold">master2</span> ({data.status.master2?.status}) {data.status.master2?.ms} ms</li>
			<li><span class="font-bold">ddnet.org</span> ({data.status.ddnet?.status}) {data.status.ddnet?.ms} ms</li>
			<li><span class="font-bold">forum.ddnet.org</span> ({data.status.forum?.status}) {data.status.forum?.ms} ms</li>
			<li><span class="font-bold">wiki.ddnet.org</span> ({data.status.wiki?.status}) {data.status.wiki?.ms} ms</li>
		</ul>
	</Card>
</Container>
