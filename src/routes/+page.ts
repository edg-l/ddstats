import { fetchMaster } from '$lib';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
    const servers = await fetchMaster(fetch);

    return {
        servers
    };
};
