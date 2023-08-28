import { fetchMaster } from '$lib';
import { serverStore } from '$lib/stores';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	try {
		const servers = await fetchMaster(fetch);

		serverStore.set(servers);
	} catch (e) {
		console.log(e);
	}
};
