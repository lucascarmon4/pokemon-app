import { useEffect, useState } from "react";
import api from "../services/api";
import type { PokemonListItem, PokemonListResponse } from "../types/Pokemon";
import { useNavigate } from "react-router-dom";

const LIMIT = 20;

export default function Home() {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const handleNext = () => setOffset((prev) => prev + LIMIT);
    const handlePrevious = () => setOffset((prev) => Math.max(prev - LIMIT, 0));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-6">
            <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-10">
                Pokédex
            </h1>

            {loading ? (
                <p className="text-center text-blue-600">Carregando...</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {pokemonList.map((pokemon) => (
                        <div
                            key={pokemon.name}
                            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                            className="bg-white border border-gray-200 shadow-lg rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-2xl transition-transform hover:-translate-y-1"
                        >
                            <img
                                src={getPokemonImage(pokemon.url)}
                                alt={pokemon.name}
                                className="w-24 h-24 object-contain mb-2"
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
                    onClick={handlePrevious}
                    disabled={offset === 0}
                    className="px-6 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition"
                >
                    ◀ Anterior
                </button>
                <button
                    onClick={handleNext}
                    className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                >
                    Próximo ▶
                </button>
            </div>
        </div>
    );
}
