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
			if (a.score === -9999 && b.score !== -9999) {
				return 1;
			} else if (b.score === -9999 && a.score !== -9999) {
				return -1;
			} else if (b.score === -9999 && a.score === -9999) {
				return a.name.localeCompare(b.name);
			}

			if (a.score < b.score) {
				return -1;
			} else if (a.score > b.score) {
				return 1;
			} else {
				return a.name.localeCompare(b.name);
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
			<span class="flex-1" />
			<span class="mx-2 font-bold">{server.info.game_type}</span> |
			<span class="text-sm mx-2"
				><a class="text-teal-100 font-bold" href={`ddnet://${server.addresses[0].replace(address_re, '')}`}
					>Connect to {server.addresses[0].replace(address_re, '')}</a
				></span
			>
		</div>
	</CardHeader>
	<div class="px-4 py-3">
		{#if server.info.map !== undefined && server.info.map.name !== undefined}
			<p title={server.info.map.sha256 || 'unknown sha256'}>
				Map: {server.info.map.name}
				{#if server.info.game_type === 'DDraceNetwork'}
					(<a class="text-teal-400 font-bold" href="https://ddnet.org/maps/{server.info.map.name}/">DDNet</a>)
				{/if}
			</p>
			<p>Map Size: {(server.info.map.size / 1024).toFixed(2)} KiB</p>
		{/if}
		{#if server.location !== undefined}
			<p>Location: {server.location.toUpperCase()}</p>
		{/if}
		{#if server.info.version !== undefined}
			<p>Version: {server.info.version}</p>
		{/if}

		<p>Players: {(server.info.clients && server.info.clients.length) || 0} / {server.info.max_clients}</p>
	</div>
	<div class="px-4 py-3 cursor-pointer bg-gray-900" on:click={() => (open = !open)}>View Players</div>
	{#if open}
		<PlayerTable clients={server.info.clients} />
	{/if}
</Card>
