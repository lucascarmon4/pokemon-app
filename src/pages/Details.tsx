import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import type { PokemonDetails } from "../types/Pokemon";
import { getTypeBackground, getTypeBadgeColor } from "../utils/getTypeColor";
import AnimatedBackground from "../components/AnimatedBackground";

export default function Details() {
    const { name } = useParams();
    const navigate = useNavigate();
    const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);

    useEffect(() => {
        async function fetchPokemon() {
            try {
                const res = await api.get<PokemonDetails>(`pokemon/${name}`);
                setPokemon(res.data);
            } catch (error) {
                console.error("Erro ao buscar detalhes:", error);
            }
        }

        fetchPokemon();
    }, [name]);

    if (!pokemon) {
        return <p className="text-center mt-10 text-blue-600">Carregando...</p>;
    }
    const mainType = pokemon.types[0]?.type.name || "normal";
    return (
        <div
            className={`relative min-h-screen bg-gradient-to-br ${getTypeBackground(
                mainType
            )} p-6 overflow-hidden`}
        >
            <div className="relative z-[5] max-w-2xl mx-auto bg-white/80 backdrop-blur-md rounded-3xl shadow-xl p-8 text-center">
                <img
                    src={
                        pokemon.sprites.other["official-artwork"].front_default
                    }
                    alt={pokemon.name}
                    className="w-48 h-48 mx-auto mb-4"
                />
                <h1 className="text-3xl font-bold capitalize text-gray-800 mb-4">
                    {pokemon.name}
                </h1>

                <div className="flex justify-center gap-3 mb-6">
                    {pokemon.types.map((t) => (
                        <span
                            key={t.type.name}
                            className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getTypeBadgeColor(
                                t.type.name
                            )}`}
                        >
                            {t.type.name}
                        </span>
                    ))}
                </div>

                <div className="grid grid-cols-2 gap-4 text-gray-700 text-sm mb-6">
                    <div>
                        <span className="font-semibold">Altura:</span>{" "}
                        {pokemon.height / 10} m
                    </div>
                    <div>
                        <span className="font-semibold">Peso:</span>{" "}
                        {pokemon.weight / 10} kg
                    </div>
                    <div className="col-span-2">
                        <span className="font-semibold">Habilidades:</span>{" "}
                        {pokemon.abilities
                            .map((a) => a.ability.name)
                            .join(", ")}
                    </div>
                </div>

                <h2 className="text-lg font-semibold mb-2">Status</h2>
                <div className="space-y-2 text-left">
                    {pokemon.stats.map((s) => (
                        <div key={s.stat.name}>
                            <div className="flex justify-between text-sm">
                                <span className="capitalize">
                                    {s.stat.name}
                                </span>
                                <span>{s.base_stat}</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded h-2">
                                <div
                                    className="h-2 rounded bg-blue-500"
                                    style={{
                                        width: `${Math.min(s.base_stat, 100)}%`,
                                    }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    onClick={() => navigate("/")}
                    className="mt-8 px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-800 transition"
                >
                    Voltar
                </button>
            </div>
            <AnimatedBackground type={mainType} />
        </div>
    );
}
