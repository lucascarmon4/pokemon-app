export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
}

export interface Stat {
    base_stat: number;
    stat: { name: string };
}

export interface Ability {
    ability: { name: string };
}

export interface Type {
    type: { name: string };
}

export interface PokemonDetails {
    name: string;
    sprites: {
        other: {
            ["official-artwork"]: {
                front_default: string;
            };
        };
    };
    height: number;
    weight: number;
    abilities: Ability[];
    stats: Stat[];
    types: Type[];
}
