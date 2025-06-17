import { useEffect, useState } from "react";

const STORAGE_KEY = "favorite_pokemons";

export function useFavorites() {
    const [favorites, setFavorites] = useState<string[]>([]);

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) setFavorites(JSON.parse(stored));
    }, []);

    const toggleFavorite = (name: string) => {
        setFavorites((prev) => {
            const updated = prev.includes(name)
                ? prev.filter((n) => n !== name)
                : [...prev, name];

            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const isFavorite = (name: string) => favorites.includes(name);

    return { favorites, toggleFavorite, isFavorite };
}
