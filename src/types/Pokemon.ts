export interface PokemonListItem {
    name: string;
    url: string;
}

export interface PokemonListResponse {
    results: PokemonListItem[];
    next: string | null;
    previous: string | null;
}
