<script lang="ts">
	import Button from '$lib/components/Button.svelte';
	import Card from '$lib/components/Card.svelte';
	import Container from '$lib/components/Container.svelte';
	import { eventsStore } from '$lib/stores';
	import type { MasterEvent } from '$lib/teeobserver';
	import { onMount } from 'svelte';

	let events: MasterEvent[] = [];
	let observers = 0;
	eventsStore.subscribe((x) => {
		events = x;
	});

	onMount(() => {
		let eventsBuffer: MasterEvent[] = [];
		let last_update = Date.now();
		const socket = new WebSocket('wss://observer.ddstats.org/ws');

		socket.addEventListener('message', (event) => {
			let eventParsed: MasterEvent = JSON.parse(event.data);
			eventsBuffer.push(eventParsed);
			observers = eventParsed.observers;

			let now = Date.now();
			if (eventsBuffer.length > 50 || last_update + 1000 < now) {
				eventsStore.update((events) => {
					events = [...events, ...eventsBuffer];

					if (events.length > 200) {
						events = events.splice(events.length - 200);
					}
					return events;
				});
				eventsBuffer = [];
				last_update = now;
			}

			// console.log("Message from server ", event.data);
		});
		return () => {
			socket.close(0, 'disconnected');
		};
	});
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
		<p class="font-bold text-4xl mb-2">Master Events</p>
		<p>
			A live view on the events tracked on master by <a
				href="https://github.com/edg-l/teeobserver"
				class="text-teal-400 font-bold">teeobserver</a
			>.
		</p>
		<p>There are currently <span class="font-bold">{observers}</span> users watching.</p>
	</Card>

	<div class="overflow-y-auto" style="max-height: 60vh;">
		{#each { length: events.length } as _, index (index)}
			{@const reverseIndex = events.length - 1 - index}
			{@const event = events[reverseIndex].event}
			{@const time = events[reverseIndex].time}

			<Card class="px-4 py-3 my-2">
				<p class="text-gray-300">On {new Date(time).toLocaleString()}</p>
				{#if event.ClientJoined !== undefined}
					<p class="text-lg">
						Player <span class="font-bold text-cyan-300">{event.ClientJoined.client.name}</span>
						<span class="text-green-500">joined</span>
						<span class="font-bold"
							>{event.ClientJoined.server.info.name} ({event.ClientJoined.server.info.clients.length} / {event
								.ClientJoined.server.info.max_clients})</span
						>
					</p>
				{/if}
				{#if event.ClientLeft !== undefined}
					<p class="text-lg">
						Player <span class="font-bold text-cyan-300">{event.ClientLeft.client.name}</span>
						<span class="text-red-500">left</span>
						<span class="font-bold"
							>{event.ClientLeft.server.info.name} ({event.ClientLeft.server.info.clients.length} / {event.ClientLeft
								.server.info.max_clients})</span
						>
					</p>
				{/if}
				{#if event.ServerWentOnline !== undefined}
					<p class="text-lg">
						Server <span class="font-bold">{event.ServerWentOnline.info.name}</span> went
						<span class="text-green-500">online</span>
					</p>
				{/if}
				{#if event.ServerWentOffline !== undefined}
					<p class="text-lg">
						Server <span class="font-bold">{event.ServerWentOffline.info.name}</span> went
						<span class="text-red-500">offline</span>
					</p>
				{/if}
			</Card>
		{/each}
	</div>
</Container>
