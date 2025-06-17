export const typeStyles: Record<
    string,
    {
        badge: string; // texto do tipo
        background: string; // fundo da página
    }
> = {
    fire: {
        badge: "bg-red-500 text-white",
        background: "from-red-100 to-orange-200",
    },
    water: {
        badge: "bg-blue-500 text-white",
        background: "from-blue-100 to-blue-300",
    },
    grass: {
        badge: "bg-green-500 text-white",
        background: "from-green-100 to-lime-200",
    },
    electric: {
        badge: "bg-yellow-400 text-gray-900",
        background: "from-yellow-100 to-yellow-300",
    },
    psychic: {
        badge: "bg-pink-500 text-white",
        background: "from-pink-100 to-pink-300",
    },
    ice: {
        badge: "bg-cyan-300 text-gray-900",
        background: "from-cyan-100 to-blue-100",
    },
    dragon: {
        badge: "bg-indigo-700 text-white",
        background: "from-indigo-100 to-purple-200",
    },
    dark: {
        badge: "bg-gray-800 text-white",
        background: "from-gray-700 to-gray-900",
    },
    ghost: {
        badge: "bg-violet-700 text-white",
        background: "from-violet-100 to-indigo-200",
    },
    rock: {
        badge: "bg-yellow-600 text-white",
        background: "from-yellow-100 to-yellow-400",
    },
    bug: {
        badge: "bg-lime-500 text-gray-900",
        background: "from-lime-100 to-green-200",
    },
    normal: {
        badge: "bg-gray-300 text-gray-800",
        background: "from-gray-100 to-gray-200",
    },
    poison: {
        badge: "bg-purple-500 text-white",
        background: "from-purple-100 to-purple-300",
    },
    fairy: {
        badge: "bg-pink-300 text-gray-900",
        background: "from-pink-100 to-pink-200",
    },
    ground: {
        badge: "bg-yellow-700 text-white",
        background: "from-yellow-200 to-orange-300",
    },
    flying: {
        badge: "bg-sky-300 text-gray-900",
        background: "from-sky-100 to-blue-200",
    },
    fighting: {
        badge: "bg-orange-700 text-white",
        background: "from-orange-100 to-red-200",
    },
    steel: {
        badge: "bg-gray-400 text-gray-900",
        background: "from-gray-100 to-gray-300",
    },
};

export function getTypeBadgeColor(type: string): string {
    return typeStyles[type.toLowerCase()]?.badge || "bg-gray-200 text-gray-800";
}

export function getTypeBackground(type: string): string {
    return (
        typeStyles[type.toLowerCase()]?.background || "from-gray-50 to-gray-200"
    );
}
