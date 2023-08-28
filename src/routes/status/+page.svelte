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
			<li>
				<a class="text-teal-400 font-bold" href="https://master1.ddnet.org/ddnet/15/servers.json">master1.ddnet.org</a>
				({data.status.master1?.status}) {data.status.master1?.ms} ms
			</li>
			<li>
				<a class="text-teal-400 font-bold" href="https://master2.ddnet.org/ddnet/15/servers.json">master2.ddnet.org</a>
				({data.status.master2?.status}) {data.status.master2?.ms} ms
			</li>
			<li>
				<a class="text-teal-400 font-bold" href="https://ddnet.org/">ddnet.org</a> ({data.status.ddnet?.status}) {data
					.status.ddnet?.ms} ms
			</li>
			<li>
				<a class="text-teal-400 font-bold" href="https://forum.ddnet.org/">forum.ddnet.org</a> ({data.status.forum
					?.status}) {data.status.forum?.ms} ms
			</li>
			<li>
				<a class="text-teal-400 font-bold" href="https://wiki.ddnet.org/">wiki.ddnet.org</a> ({data.status.wiki
					?.status}) {data.status.wiki?.ms} ms
			</li>
			<li>
				<a class="text-teal-400 font-bold" href="https://codedoc.ddnet.org/">codedoc.ddnet.org</a> ({data.status.codedoc
					?.status}) {data.status.codedoc?.ms} ms
			</li>
		</ul>
	</Card>
</Container>
