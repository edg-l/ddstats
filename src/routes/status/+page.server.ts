import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import fetch from "node-fetch"

async function fetchPing(url: string): Promise<{ ms: number, status: number } | null> {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 10000);
    const now = new Date().getTime();
    try {
        const res = await fetch(url, {
            signal: controller.signal
        });
        clearTimeout(id);
        const after = new Date().getTime();
        return {
            ms: after - now,
            status: res.status
        };
    } catch (e) {
        clearTimeout(id);
        return null;
    }
}

let lastStatus: {
    ddnet: {
        ms: number;
        status: number;
    } | null;
    forum: {
        ms: number;
        status: number;
    } | null;
    wiki: {
        ms: number;
        status: number;
    } | null;
    master1: {
        ms: number;
        status: number;
    } | null;
    master2: {
        ms: number;
        status: number;
    } | null;
    last: Date,
} = {
    master1: null,
    forum: null,
    wiki: null,
    master2: null,
    ddnet: null,
    last: new Date("01-01-2000")
}


export const load: PageServerLoad = async ({ params }) => {
    const older = Date.now() - 1000 * 30;
    if (lastStatus.last.getTime() < older) {
        lastStatus = {
            ddnet: await fetchPing('https://ddnet.org/'),
            forum: await fetchPing('https://forum.ddnet.org/'),
            wiki: await fetchPing('https://ddnet.org/'),
            master1: await fetchPing('https://master1.ddnet.org/ddnet/15/servers.json'),
            master2: await fetchPing('https://master2.ddnet.org/ddnet/15/servers.json'),
            last: new Date()
        }
    }

    return {
        status: lastStatus
    };
};
