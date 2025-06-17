import { useFavorites } from "../hooks/useFavorites";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";

interface PokemonItem {
    name: string;
    url: string;
}

export default function Favorites() {
    const { favorites } = useFavorites();
    const navigate = useNavigate();
    const [pokemonData, setPokemonData] = useState<PokemonItem[]>([]);

    useEffect(() => {
        async function fetchFavorites() {
            try {
                const responses = await Promise.all(
                    favorites.map((name) => api.get(`/pokemon/${name}`))
                );
                setPokemonData(
                    responses.map((res) => ({
                        name: res.data.name,
                        url: res.data.sprites.other["official-artwork"]
                            .front_default,
                    }))
                );
            } catch (error) {
                console.error("Erro ao buscar favoritos:", error);
            }
        }

        fetchFavorites();
    }, [favorites]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 p-6">
            <div className="flex justify-between items-center max-w-7xl mx-auto mb-8">
                <h1 className="text-4xl font-extrabold text-pink-600">
                    Favoritos
                </h1>
                <button
                    onClick={() => navigate(-1)}
                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Voltar
                </button>
            </div>

            {pokemonData.length === 0 ? (
                <p className="text-center text-gray-600">
                    Nenhum favorito ainda.
                </p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {pokemonData.map((pokemon) => (
                        <div
                            key={pokemon.name}
                            onClick={() => navigate(`/pokemon/${pokemon.name}`)}
                            className="relative bg-white border border-gray-200 shadow-lg rounded-2xl p-4 flex flex-col items-center cursor-pointer hover:shadow-2xl transition-transform hover:-translate-y-1"
                        >
                            <img
                                src={pokemon.url}
                                alt={pokemon.name}
                                className="w-24 h-24 mb-2"
                            />
                            <span className="capitalize text-lg font-semibold text-gray-700">
                                {pokemon.name}
                            </span>
                            <span className="absolute top-2 right-2 text-red-500 text-xl animate-pulse">
                                ♥
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
