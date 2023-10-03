import type { ServerList } from '$lib';
import type { MasterEvent } from '$lib/teeobserver';
import { writable } from 'svelte/store';

export const serverStore = writable<ServerList>({
	servers: {},
	sorted: [],
	total_players: 0,
	updated: new Date(),
});

export const eventsStore = writable<MasterEvent[]>([]);
