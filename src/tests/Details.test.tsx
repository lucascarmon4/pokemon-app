import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Details from "../pages/Details";
import api from "../services/api";
import { vi } from "vitest";

vi.mock("react-router-dom", async () => {
    const actual = await vi.importActual<typeof import("react-router-dom")>(
        "react-router-dom"
    );
    return {
        ...actual,
        useNavigate: () => vi.fn(),
        useParams: () => ({ name: "pikachu" }),
    };
});

vi.mock("../services/api");

describe("Details Page", () => {
    it("renderiza detalhes do pokémon", async () => {
        (api.get as any).mockResolvedValueOnce({
            data: {
                name: "pikachu",
                height: 4,
                weight: 60,
                types: [{ type: { name: "electric" } }],
                sprites: {
                    other: {
                        "official-artwork": {
                            front_default: "https://img/pikachu.png",
                        },
                    },
                },
                abilities: [
                    { ability: { name: "static" } },
                    { ability: { name: "lightning-rod" } },
                ],
                stats: [
                    { base_stat: 35, stat: { name: "hp" } },
                    { base_stat: 55, stat: { name: "attack" } },
                ],
            },
        });

        render(
            <MemoryRouter initialEntries={["/pokemon/pikachu"]}>
                <Routes>
                    <Route path="/pokemon/:name" element={<Details />} />
                </Routes>
            </MemoryRouter>
        );

        expect(await screen.findByAltText("pikachu")).toBeInTheDocument();
        expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
        expect(screen.getByText(/electric/i)).toBeInTheDocument();
        expect(screen.getByText(/static/i)).toBeInTheDocument();
        expect(screen.getByText(/lightning-rod/i)).toBeInTheDocument();
        expect(screen.getByText(/altura/i)).toBeInTheDocument();
        expect(screen.getByText(/peso/i)).toBeInTheDocument();
    });
});
