export interface MasterEvent {
    event: Event
    time: string
}

export interface Event {
    ClientJoined?: ClientJoined
    ClientLeft?: ClientLeft
    ServerWentOffline?: ServerWentOffline
    ServerWentOnline?: ServerWentOnline
}

export interface ClientLeft {
    client: Client
    server: Server
}

export interface ClientJoined {
    client: Client
    server: Server
}

export interface ServerWentOffline {
    addresses: string[]
    info: Info
    location: string
}

export interface ServerWentOnline {
    addresses: string[]
    info: Info
    location: string
}

export interface Client {
    afk?: boolean
    clan: string
    country: number
    is_player: boolean
    name: string
    score: number
    skin: Skin
    team?: number
}

export interface Skin {
    color_body?: number
    color_feet?: number
    name: string
}

export interface Server {
    addresses: string[]
    info: Info
    location: string
}

export interface Info {
    client_score_kind?: string
    clients: Client[]
    game_type: string
    map: Map
    max_clients: number
    max_players: number
    name: string
    passworded: boolean
    version: string
}

export interface Map {
    name: string
    sha256?: string
    size: number
}
