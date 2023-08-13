import type { ServerList } from '$lib';
import { readable, writable } from 'svelte/store';

export const serverStore = writable<ServerList>({
	servers: {},
	sorted: [],
	total_players: 0,
	updated: new Date()
});
