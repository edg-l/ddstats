// place files you want to import through the `$lib` alias in this folder.

type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export interface ServerList {
    servers: ServerEntry[]
}

export interface ServerEntry {
    addresses: String[],
    location: String,
    info: {
        max_clients: number,
        max_players: number,
        passworded: boolean,
        game_type: String,
        name: String,
        map: {
            name: String,
            sha256?: String,
            size: number,
        },
        version: String,
        clients: ClientEntry[],
        [key: string]: any
    }
}

export interface ClientEntry {
    name: String,
    clan: String,
    country: number,
    score: number,
    is_player: boolean,
    afk?: boolean,
    team?: number,
    skin?: {
        name: String,
        color_body?: number,
        color_feet?: number,
    },
    [key: string]: any
}

export async function fetchMaster(fetch: Fetch): Promise<ServerList> {
    const res = await fetch("https://master1.ddnet.org/ddnet/15/servers.json");

    return await res.json();
}
