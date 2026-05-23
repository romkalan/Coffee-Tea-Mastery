import type { TTerritory, TTerritoryRoute } from "../../../types/map.ts";

interface RouteLayerProps {
    routes: TTerritoryRoute[];
    territories: TTerritory[];
}

function getTerritoryCenter(
    id: string,
    territories: TTerritory[]
): { x: number; y: number } | null {
    const t = territories.find(
        (territory) => territory.id === id
    );
    if (!t) return null;
    return { x: t.labelX, y: t.labelY };
}

function RouteLayer({ routes, territories }: RouteLayerProps) {
    return (
        <g>
            {routes.map((route, i) => {
                const from = getTerritoryCenter(route.from, territories);
                const to = getTerritoryCenter(route.to, territories);
                if (!from || !to) return null;

                const midX = (from.x + to.x) / 2;
                const midY = (from.y + to.y) / 2;
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const cpx = midX - dy * 0.15;
                const cpy = midY + dx * 0.15;

                return (
                    <path
                        key={i}
                        d={`M ${from.x},${from.y} Q ${cpx},${cpy} ${to.x},${to.y}`}
                        fill="none"
                        stroke="#c8a96e"
                        strokeWidth={1.5}
                        strokeDasharray="4,6"
                        strokeOpacity={0.5}
                        style={{ pointerEvents: "none" }}
                    />
                );
            })}
        </g>
    );
}

export default RouteLayer;
