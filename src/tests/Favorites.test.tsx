import { render, screen } from "@testing-library/react";
import Favorites from "../pages/Favorites";
import { MemoryRouter } from "react-router-dom";
import * as hook from "../hooks/useFavorites";
import api from "../services/api";
import { vi } from "vitest";

vi.mock("../hooks/useFavorites");
vi.mock("../services/api");

describe("Favorites Page", () => {
    it("mostra mensagem quando não há favoritos", () => {
        vi.spyOn(hook, "useFavorites").mockReturnValue({
            favorites: [],
            toggleFavorite: vi.fn(),
            isFavorite: vi.fn(),
        });

        render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>
        );

        expect(screen.getByText("Nenhum favorito ainda.")).toBeInTheDocument();
    });

    it("renderiza cards de favoritos corretamente", async () => {
        vi.spyOn(hook, "useFavorites").mockReturnValue({
            favorites: ["pikachu", "bulbasaur"],
            toggleFavorite: vi.fn(),
            isFavorite: vi.fn(() => true),
        });

        (api.get as any).mockImplementation((url: string) => {
            const name = url.split("/").pop();
            return Promise.resolve({
                data: {
                    name,
                    sprites: {
                        other: {
                            "official-artwork": {
                                front_default: `https://pokeapi.co/media/${name}.png`,
                            },
                        },
                    },
                },
            });
        });

        render(
            <MemoryRouter>
                <Favorites />
            </MemoryRouter>
        );

        expect(await screen.findByText("pikachu")).toBeInTheDocument();
        expect(await screen.findByText("bulbasaur")).toBeInTheDocument();
    });
});
