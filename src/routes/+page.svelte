<script lang="ts">
	import type { ServerEntry } from '$lib';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import Paginate from '$lib/components/Paginate.svelte';
	import ServerCard from '$lib/components/ServerCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	data.servers.servers.sort((a, b) => {
		if (a.info.clients === undefined) {
			return 1;
		}
		if (b.info.clients === undefined) {
			return -1;
		}
		if (a.info.clients.length < b.info.clients.length) {
			return 1;
		} else if (a.info.clients.length > b.info.clients.length) {
			return -1;
		} else {
			return a.info.name.localeCompare(b.info.name);
		}
	});

	let page = 0;
	let perPage = 10;

	let totalPlayers = 0;
	let currentServers: ServerEntry[] = [];
	$: {
		totalPlayers = data.servers.servers
			.filter((x) => x.info.clients !== undefined)
			.map((x) => x.info.clients.length)
			.reduce((a, b) => a + b, 0);
	}
	$: {
		currentServers = data.servers.servers.slice(page * perPage, page * perPage + perPage);
	}
</script>

<Container>
	<Card class="px-4 py-3">
		<p class="font-bold text-4xl mb-2">Server Browser</p>
		<p>Here you can search through the master server list.</p>
		<p>Total players: {totalPlayers}</p>
	</Card>

	<Card class="px-4 py-3 my-2 flex justify-center">
		<Paginate total={Math.floor(data.servers.servers.length / perPage)} bind:page />
	</Card>

	{#each currentServers as server}
		<ServerCard {server} />
	{/each}
</Container>
