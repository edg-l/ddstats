<script lang="ts">
	import type { ClientEntry } from '$lib';
	import Card from '$lib/components/Card.svelte';
	import CardHeader from '$lib/components/CardHeader.svelte';
	import countries from '../countries.json';

	const code_to_country: Record<number, { id: string; name: string }> = {};
	for (let c of countries) {
		code_to_country[c.id] = { id: c.alpha2.toUpperCase(), name: c.name };
	}

	code_to_country[-1] = { id: 'default', name: '' };

	export let clients: ClientEntry[];
</script>

<div class="flex w-full bg-gray-700 shadow-md">
	<div class="overflow-y-auto w-full" style="max-height: 600px;">
		<table class="table-auto border-collapse rounded-lg shadow w-full text-center border border-gray-800">
			<thead class="bg-gray-900 top-0 sticky">
				<tr>
					<th class="px-2 py-2">#</th>
					<th class="px-2 py-2 text-left">Name</th>
					<th class="px-2 py-2 text-left">Clan</th>
					<th class="px-2 py-2">Flag</th>
					<th class="px-2 py-2 text-left">Score / Time</th>
					<th class="px-2 py-2 text-left">Team</th>
					<th class="px-2 py-2 text-left">Skin</th>
					<th class="px-2 py-2 text-left">AFK</th>
					<th class="px-2 py-2 text-left">Spectating</th>
				</tr>
			</thead>
			<tbody class="bg-gray-800 border border-gray-800">
				{#each clients as client, i}
					<tr class="border border-gray-700">
						<td>{i + 1}</td>
						<td class="px-2 py-2 font-bold text-left">{client.name}</td>
						<td class="px-2 py-2 font-bold text-left">{client.clan}</td>
						<td class="px-2 py-2 font-bold text-center flex justify-center"
							>{#if code_to_country[client.country] !== undefined}
								<img
									alt={code_to_country[client.country].name}
									title={code_to_country[client.country].name}
									width="64px"
									height="32px"
									src={`https://ddnet.org/status/countryflags/${code_to_country[client.country].id}.png`}
								/>
							{/if}</td
						>
						<td class="px-2 py-2 font-bold text-left"
							>{client.score} / {client.score === -9999
								? '00:00'
								: `${Math.floor(Math.abs(client.score) / 60)
										.toString()
										.padStart(2, '0')}:${((Math.abs(client.score) - Math.floor(Math.abs(client.score) / 60)) % 60)
										.toString()
										.padStart(2, '0')}`}</td
						>
						<td class="px-2 py-2 font-bold text-left">{client.team}</td>
						<td class="px-2 py-2 font-bold text-left">
							{#if client.skin !== undefined}
								{client.skin.name}
							{/if}
						</td>
						<td class="px-2 py-2 font-bold text-left">{client.afk ? 'Yes' : 'No'}</td>
						<td class="px-2 py-2 font-bold text-left">{client.is_player ? 'No' : 'Yes'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
