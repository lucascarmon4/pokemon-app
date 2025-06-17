import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../pages/Home";
import api from "../services/api";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

vi.mock("../services/api");

describe("Home Page", () => {
    it("renderiza nomes e imagens dos pokémons", async () => {
        (api.get as any).mockResolvedValueOnce({
            data: {
                results: [
                    {
                        name: "bulbasaur",
                        url: "https://pokeapi.co/api/v2/pokemon/1/",
                    },
                    {
                        name: "ivysaur",
                        url: "https://pokeapi.co/api/v2/pokemon/2/",
                    },
                ],
            },
        });

        render(
            <MemoryRouter>
                <Home />
            </MemoryRouter>
        );

        expect(await screen.findByAltText("bulbasaur")).toBeInTheDocument();
        expect(await screen.findByAltText("ivysaur")).toBeInTheDocument();

        expect(screen.getByText(/bulbasaur/i)).toBeInTheDocument();
        expect(screen.getByText(/ivysaur/i)).toBeInTheDocument();
    });
});
