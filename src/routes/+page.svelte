<script lang="ts">
	import { fetchMaster, type ServerEntry, type ServerList } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import Paginate from '$lib/components/Paginate.svelte';
	import ServerCard from '$lib/components/ServerCard.svelte';
	import { formatDistanceToNow } from 'date-fns';
	import { serverStore } from '$lib/stores';

	let servers: ServerList = {
		servers: {},
		sorted: [],
		total_players: 0,
		updated: new Date()
	};

	serverStore.subscribe((x) => {
		servers = x;
	});

	let page = 0;
	let perPage = 100;

	let currentServers: ServerEntry[] = [];
	$: {
		currentServers = servers.sorted.slice(page * perPage, page * perPage + perPage);
	}

	async function update() {
		const servers = await fetchMaster(fetch);
		serverStore.set(servers);
	}
</script>

<Button
	class="fixed bottom-8 right-8 z-10"
	on:click={() =>
		window.scrollTo({
			top: 0
		})}>Go to top</Button
>

<Container>
	<Card class="px-4 py-3">
		<p class="font-bold text-4xl mb-2">Server Browser</p>
		<p>Here you can search through the master server list.</p>
		<Button class="float-right" on:click={() => update()}>Update</Button>
		<p>Total players: <b>{servers.total_players}</b></p>
		<p title={servers.updated.toString()}>Updated {formatDistanceToNow(servers.updated)} ago.</p>
	</Card>

	<Card class="px-4 py-3 my-2 flex justify-center">
		<Paginate total={Math.floor(servers.sorted.length / perPage)} bind:page />
	</Card>

	{#each currentServers as server, index (page * perPage + index)}
		<ServerCard {server} />
	{/each}

	<Card class="px-4 py-3 my-2 flex justify-center">
		<Paginate total={Math.floor(servers.sorted.length / perPage)} bind:page />
	</Card>
</Container>
