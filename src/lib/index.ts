// place files you want to import through the `$lib` alias in this folder.

type Fetch = (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>;

export interface ServerList {
	sorted: ServerEntry[];
	servers: {
		[address: string]: ServerEntry;
	};
	total_players: number;
	updated: Date;
}

interface InternalServerList {
	servers: ServerEntry[];
}

export interface ServerEntry {
	addresses: string[];
	location: string;
	info: {
		max_clients: number;
		max_players: number;
		passworded: boolean;
		game_type: string;
		name: string;
		map: {
			name: string;
			sha256?: string;
			size: number;
		};
		version: string;
		clients: ClientEntry[];
		[key: string]: any;
	};
}

export interface ClientEntry {
	name: string;
	clan: string;
	country: number;
	score: number;
	is_player: boolean;
	afk?: boolean;
	team?: number;
	skin?: {
		name: string;
		color_body?: number;
		color_feet?: number;
	};
	[key: string]: any;
}

export async function fetchMaster(fetch: Fetch): Promise<ServerList> {
	const controller = new AbortController();
	const id = setTimeout(() => controller.abort(), 5000);
	const res = await fetch('https://master1.ddnet.org/ddnet/15/servers.json', {
		mode: "cors",
		signal: controller.signal
	});
	clearTimeout(id);

	const list: InternalServerList = await res.json();

	const servers: ServerList = {
		sorted: list.servers,
		servers: {},
		total_players: list.servers
			.filter((x) => x.info.clients !== undefined)
			.map((x) => x.info.clients.length)
			.reduce((a, b) => a + b, 0),
		updated: new Date()
	};

	for (const server of list.servers) {
		for (const address of server.addresses) {
			servers.servers[address] = server;
		}
	}

	servers.sorted.sort((a, b) => {
		if (a.info.clients === undefined) {
			return 1;
		}
		if (b.info.clients === undefined) {
			return -1;
		}
		const a_len = a.info.clients.filter((x) => x.name !== '(connecting)');
		const b_len = b.info.clients.filter((x) => x.name !== '(connecting)');
		if (a_len < b_len) {
			return 1;
		} else if (a_len > b_len) {
			return -1;
		} else {
			return a.info.name.localeCompare(b.info.name);
		}
	});

	return servers;
}
