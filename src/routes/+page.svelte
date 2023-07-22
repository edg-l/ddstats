<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import ServerCard from '$lib/components/ServerCard.svelte';
	import VirtualList from '$lib/components/VirtualList.svelte';
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

	let totalPlayers = 0;

	$: {
		totalPlayers = data.servers.servers
			.filter((x) => x.info.clients !== undefined)
			.map((x) => x.info.clients.length)
			.reduce((a, b) => a + b, 0);
	}
</script>

<Button
	class="fixed bottom-8 right-8"
	on:click={() =>
		window.scrollTo({
			top: 0
		})}>Go to top</Button
>

<Container>
	<Card class="px-4 py-3 mb-4">
		<p class="font-bold text-4xl mb-2">Server Browser</p>
		<p>Here you can search through the master server list.</p>
		<p>Total players: {totalPlayers}</p>
	</Card>

	<VirtualList height="200vh" items={data.servers.servers} let:item>
		<!-- this will be rendered for each currently visible item -->
		<ServerCard server={item} />
	</VirtualList>
</Container>
