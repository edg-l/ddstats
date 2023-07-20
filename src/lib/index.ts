// place files you want to import through the `$lib` alias in this folder.

type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export interface ServerList {
    servers: ServerEntry[]
}

export interface ServerEntry {
    addresses: string[],
    location: string,
    info: {
        max_clients: number,
        max_players: number,
        passworded: boolean,
        game_type: string,
        name: string,
        map: {
            name: string,
            sha256?: string,
            size: number,
        },
        version: string,
        clients: ClientEntry[],
        [key: string]: any
    }
}

export interface ClientEntry {
    name: string,
    clan: string,
    country: number,
    score: number,
    is_player: boolean,
    afk?: boolean,
    team?: number,
    skin?: {
        name: string,
        color_body?: number,
        color_feet?: number,
    },
    [key: string]: any
}

export async function fetchMaster(fetch: Fetch): Promise<ServerList> {
    const res = await fetch("https://master1.ddnet.org/ddnet/15/servers.json");

    return await res.json();
}
