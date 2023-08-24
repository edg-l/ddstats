<script lang="ts">
	import { fetchMaster, type ClientEntry, type ServerEntry, type ServerList } from '$lib';
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import Paginate from '$lib/components/Paginate.svelte';
	import { serverStore } from '$lib/stores';
	import countries from '$lib/countries.json';
	import Tee from '$lib/components/Tee.svelte';
	import Fuse from 'fuse.js';

	interface ClientInfo {
		client: ClientEntry;
		server: ServerEntry;
	}

	let players: ClientInfo[] = [];
	let playerSearch: ClientInfo[] = [];

	let page = 0;
	let perPage = 50;
	let inputSearch = '';

	const fuseOptions = {
		keys: [
			{
				name: 'client.name',
				weight: 2
			},
			{
				name: 'client.clan',
				weight: 1
			}
		]
	};

	let fuse: Fuse<ClientInfo> | null = null;

	serverStore.subscribe((servers) => {
		players = [];
		for (const server of servers.sorted) {
			if (server.info.clients !== undefined) {
				for (const player of server.info.clients) {
					if (player.name !== undefined && player.name !== '') {
						players.push({
							client: player,
							server: server
						});
					}
				}
			}
		}
		players.sort((a, b) => {
			return a.client.name.localeCompare(b.client.name, undefined, {
				usage: 'sort',
				ignorePunctuation: true
			});
		});
		players.reverse();
		playerSearch = players;
		fuse = new Fuse(players, fuseOptions);
		onSearch();
	});

	async function update() {
		const servers = await fetchMaster(fetch);
		serverStore.set(servers);
	}

	const code_to_country: Record<number, { id: string; name: string }> = {};
	for (let c of countries) {
		code_to_country[c.id] = { id: c.alpha2.toUpperCase(), name: c.name };
	}

	code_to_country[-1] = { id: 'default', name: '' };
	code_to_country[906] = { id: 'XCA', name: '' };

	const address_re = /.*\/\//;

	let currentPlayers: ClientInfo[] = [];
	$: {
		currentPlayers = playerSearch.slice(page * perPage, page * perPage + perPage);
	}

	async function onSearch() {
		let what = inputSearch.trim();
		if (what.length > 0) {
			playerSearch = fuse!.search(what).map((x) => x.item);
		} else {
			playerSearch = players;
		}
		page = 0;
	}

	function truncate(str: string, n: number) {
		return str.length > n ? str.slice(0, n - 1) + '...' : str;
	}
</script>

<Container>
	<Card class="px-4 py-3">
		<p class="font-bold text-4xl mb-2">Player Browser</p>
		<p>Here you can search through the connected player list.</p>
		<p>Total players: <b>{players.length}</b></p>
		<Button class="float-right" on:click={() => update()}>Update</Button>

		<form on:submit|preventDefault={() => onSearch()}>
			<input
				type="text"
				name="search"
				placeholder="Player name or clan"
				class="my-2 shadow border border-teal-400 rounded
            w-3/5
						py-2 px-3 text-white bg-gray-700 focus:bg-gray-800
						flex-1 max-w-screen-sm
					 	focus:outline-none focus:shadow-outline"
				bind:value={inputSearch}
			/>
			<Button class="ml-2">Search player</Button>
		</form>
	</Card>

	<Card class="px-4 py-3 my-2 flex justify-center">
		<Paginate total={Math.floor(playerSearch.length / perPage)} bind:page />
	</Card>

	<div class="flex w-full bg-gray-700 shadow-md">
		<div class="overflow-y-auto w-full" style="max-height: 600px;">
			<table class="table-auto border-collapse rounded-lg shadow w-full text-center border border-gray-800">
				<thead class="bg-gray-900 top-0 sticky">
					<tr>
						<th class="px-2 py-2 text-left">Name</th>
						<th class="px-2 py-2 text-left">Clan</th>
						<th class="px-2 py-2 text-left">Map</th>
						<th class="px-2 py-2 text-left">Server</th>
						<th class="px-2 py-2">Flag</th>
						<th class="px-2 py-2 text-left">Skin</th>
						<th class="px-2 py-2 text-left">AFK</th>
						<th class="px-2 py-2 text-left">Spectating</th>
					</tr>
				</thead>
				<tbody class="bg-gray-800 border border-gray-800">
					{#each currentPlayers as client (client)}
						<tr class="border border-gray-700">
							<td class="px-2 py-2 font-bold text-left">{client.client.name}</td>
							<td class="px-2 py-2 font-bold text-left">{client.client.clan}</td>
							<td class="px-2 py-2 font-bold text-left">
								{#if client.server.info.map !== undefined}
									<span title={client.server.info.map.name}>{truncate(client.server.info.map.name.trim(), 20)}</span>
								{/if}
							</td>
							<td class="px-2 py-2 font-bold text-left"
								><a
									class="text-teal-400 font-bold"
									href={`ddnet://${client.server.addresses[0].replace(address_re, '')}`}>{client.server.info.name}</a
								></td
							>
							<td class="px-2 py-2 font-bold text-center flex justify-center" title={client.client.country.toString()}
								>{#if code_to_country[client.client.country] !== undefined}
									<img
										alt={code_to_country[client.client.country].name}
										title={code_to_country[client.client.country].name}
										width="64px"
										height="32px"
										src={`https://ddnet.org/status/countryflags/${code_to_country[client.client.country].id}.png`}
									/>
								{/if}</td
							>
							<td class="px-2 py-2 font-bold text-left" title={client.client.skin ? client.client.skin.name : ''}>
								{#if client.client.skin !== undefined}
									<Tee name={client.client.skin.name} />
								{/if}
							</td>
							<td class="px-2 py-2 font-bold text-left">{client.client.afk ? 'Yes' : 'No'}</td>
							<td class="px-2 py-2 font-bold text-left">{client.client.is_player ? 'No' : 'Yes'}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>

	<Card class="px-4 py-3 my-2 flex justify-center">
		<Paginate total={Math.floor(playerSearch.length / perPage)} bind:page />
	</Card>
</Container>
