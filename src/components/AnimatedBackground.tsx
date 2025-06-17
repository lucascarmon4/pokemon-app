interface Props {
    type: string;
}

export default function AnimatedBackground({ type }: Props) {
    return (
        <div className="absolute inset-0 z-[1]">
            <img
                src={`/effects/${type}.gif`}
                alt={`${type} effect`}
                className="w-full h-full object-cover opacity-30 pointer-events-none"
            />
        </div>
    );
}
