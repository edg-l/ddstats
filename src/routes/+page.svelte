<script lang="ts">
	import Card from '$lib/components/Card.svelte';
	import CardHeader from '$lib/components/CardHeader.svelte';
	import Container from '$lib/components/Container.svelte';
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
			return 0;
		}
	});
	let totalPlayers = 0;
	$: {
		totalPlayers = data.servers.servers
			.filter((x) => x.info.clients !== undefined)
			.map((x) => x.info.clients.length)
			.reduce((a, b) => a + b, 0);
	}
</script>

<Container>
	<Card class="px-4 py-3">
		<p class="font-bold text-4xl mb-2">Server Browser</p>
		<p>Here you can search through the master server list.</p>
		<p>Total players: {totalPlayers}</p>
	</Card>

	{#each data.servers.servers as server}
		<ServerCard {server} />
	{/each}
</Container>
