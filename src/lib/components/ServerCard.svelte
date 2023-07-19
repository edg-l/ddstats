<script lang="ts">
	import type { ServerEntry } from '$lib';
	import Card from './Card.svelte';
	import CardHeader from './CardHeader.svelte';
	import countries from '../countries.json';
	import PlayerTable from './PlayerTable.svelte';

	export let server: ServerEntry;
	if (server.info.clients !== undefined) {
		server.info.clients = server.info.clients.filter((x) => x.name !== '(connecting)');
		server.info.clients.sort((a, b) => {
			if (a.score === -9999) {
				return 1;
			}
			if (b.score === -9999) {
				return -1;
			}
			if (a.score < b.score) {
				return -1;
			} else if (a.score > b.score) {
				return 1;
			} else {
				return 0;
			}
		});
	}

	const code_to_country: Record<number, String> = {};
	for (let c of countries) {
		code_to_country[c.id] = c.alpha2.toUpperCase();
	}

	code_to_country[-1] = 'default';

	const address_re = /.*\/\//;

	let open = false;
</script>

<Card class="my-2">
	<CardHeader>
		<div class="flex items-center justify-between flex-wrap">
			<h3 class="font-bold">{server.info.name}</h3>
			<span class="text-sm"
				><a class="text-teal-100 font-bold" href={`ddnet://${server.addresses[0].replace(address_re, '')}`}
					>Connect to {server.addresses[0].replace(address_re, '')}</a
				></span
			>
		</div>
	</CardHeader>
	<div class="px-4 py-3">
		{#if server.info.map !== undefined && server.info.map.name !== undefined}
			<p>Map: {server.info.map.name}</p>
		{/if}

		<p>Players: {(server.info.clients && server.info.clients.length) || 0} / {server.info.max_clients}</p>
	</div>
	<div class="px-4 py-3 cursor-pointer bg-teal-700" on:click={() => (open = !open)}>View Players</div>
	{#if open}
		<PlayerTable clients={server.info.clients} />
	{/if}
</Card>
