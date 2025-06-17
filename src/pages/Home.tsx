import { useEffect, useState } from "react";
import api from "../services/api";
import type { PokemonListItem, PokemonListResponse } from "../types/Pokemon";
import { useNavigate } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";

const LIMIT = 20;

export default function Home() {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { toggleFavorite, isFavorite, favorites } = useFavorites();

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            try {
                const res = await api.get<PokemonListResponse>(
                    `pokemon?limit=${LIMIT}&offset=${offset}`
                );
                setPokemonList(res.data.results);
            } catch (err) {
                console.error("Erro ao buscar Pokémon:", err);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [offset]);

    const getPokemonImage = (url: string): string => {
        const id = url.split("/").filter(Boolean).pop();
        return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
    };

    const getLengthFavoritos = (): number => favorites.length;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <div className="flex justify-between items-center max-w-7xl mx-auto mb-8">
                <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
                    Pokédex
                </h1>
                <button
                    onClick={() => navigate("/favoritos")}
                    className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition"
                >
                    Ver Favoritos ({getLengthFavoritos()})
                </button>
            </div>
            {loading ? (
                <p className="text-center text-blue-600">Carregando...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {pokemonList &&
                        pokemonList.map((pokemon) => (
                            <div
                                key={pokemon.name}
                                onClick={() =>
                                    navigate(`/pokemon/${pokemon.name}`)
                                }
                                className="relative bg-white border border-gray-200 shadow-lg rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-2xl transition-transform hover:-translate-y-1"
                            >
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(pokemon.name);
                                    }}
                                    className="absolute top-2 right-2 text-red-500 text-xl hover:scale-110 transition"
                                >
                                    {isFavorite(pokemon.name) ? "♥" : "♡"}
                                </button>
                                <img
                                    src={getPokemonImage(pokemon.url)}
                                    alt={pokemon.name}
                                    className="w-24 h-24 mb-2"
                                />
                                <span className="capitalize text-lg font-semibold text-gray-700">
                                    {pokemon.name}
                                </span>
                            </div>
                        ))}
                </div>
            )}

            <div className="flex justify-center gap-6 mt-10">
                <button
                    onClick={() =>
                        setOffset((prev) => Math.max(prev - LIMIT, 0))
                    }
                    disabled={offset === 0}
                    className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    ◀ Anterior
                </button>
                <button
                    onClick={() => setOffset((prev) => prev + LIMIT)}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                    Próximo ▶
                </button>
            </div>
        </div>
    );
}
