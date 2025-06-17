import { renderHook, act } from "@testing-library/react";
import { useFavorites } from "../hooks/useFavorites";

beforeEach(() => {
    localStorage.clear();
});

describe("useFavorites", () => {
    it("inicia com favoritos vazios", () => {
        const { result } = renderHook(() => useFavorites());
        expect(result.current.favorites).toEqual([]);
    });

    it("adiciona um favorito", async () => {
        const { result } = renderHook(() => useFavorites());

        act(() => {
            result.current.toggleFavorite("pikachu");
        });

        expect(result.current.favorites).toContainEqual("pikachu");
    });

    it("remove um favorito existente", () => {
        const { result } = renderHook(() => useFavorites());

        act(() => {
            result.current.toggleFavorite("pikachu");
            result.current.toggleFavorite("pikachu");
        });

        expect(result.current.favorites).not.toContain("pikachu");
    });

    it("verifica corretamente se é favorito", () => {
        const { result } = renderHook(() => useFavorites());

        act(() => {
            result.current.toggleFavorite("bulbasaur");
        });

        expect(result.current.isFavorite("bulbasaur")).toBe(true);
        expect(result.current.isFavorite("charmander")).toBe(false);
    });
});
