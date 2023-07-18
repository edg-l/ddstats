<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CardHeader from '$lib/components/CardHeader.svelte';
	import Container from '$lib/components/Container.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	const address_re = /.*\/\//;

	data.servers.servers.sort((a, b) => {
		if (a.info.clients.length < b.info.clients.length) {
			return 1;
		} else if (a.info.clients.length > b.info.clients.length) {
			return -1;
		} else {
			return 0;
		}
	});

	let totalPlayers = 0;
	$: {
		totalPlayers = data.servers.servers.map((x) => x.info.clients.length).reduce((a, b) => a + b, 0);
	}
</script>

<Container>
	<Card class="px-4 py-3">
		<p class="font-bold text-4xl mb-2">Server Browser</p>
		<p>Here you can search through the master server list.</p>
		<p>Total players: {totalPlayers}</p>
	</Card>

	{#each data.servers.servers as server}
		<Card class="my-2">
			<CardHeader>
				<div class="flex items-center justify-between flex-wrap">
					<h3 class="font-bold">{server.info.name}</h3>
					<span class="text-sm"
						><a class="text-teal-100 font-bold" href={server.addresses[0].replace(address_re, '')}
							>Connect to {server.addresses[0].replace(address_re, '')}</a
						></span
					>
				</div>
			</CardHeader>
			<div class="px-4 py-3">
				<p>Map: {server.info.map.name}</p>
				<p>Players: {server.info.clients.length} / {server.info.max_clients}</p>
			</div>
		</Card>
	{/each}
</Container>
