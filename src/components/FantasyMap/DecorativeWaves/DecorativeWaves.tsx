import { MAP_VIEWBOX } from "../../../data/mapTerritories.ts";

const { width, height } = MAP_VIEWBOX;

function DecorativeWaves() {
    return (
        <g>
            <defs>
                <pattern id="shoreWaves" x="0" y="0" width="80" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 0,15 Q 10,5 20,15 T 40,15 T 60,15 T 80,15" fill="none" stroke="#4a8ab5" strokeWidth="0.8" strokeOpacity="0.25" />
                </pattern>
            </defs>

            <rect x={0} y={0} width={width} height={height} fill="url(#shoreWaves)" />

            <g fill="none" strokeWidth="0.6" opacity="0.12">
                {[60, 160, 260, 360, 460, 560, 660, 760].map((y, i) => (
                    <path
                        key={y}
                        d={`M 0,${y} Q ${width * 0.1},${y - 10 + i * 3} ${width * 0.2},${y} T ${width * 0.4},${y} T ${width * 0.6},${y} T ${width * 0.8},${y} T ${width},${y}`}
                        stroke="#6ab0d8"
                        strokeOpacity={0.3 - i * 0.03}
                    />
                ))}
            </g>

            <g fill="none" stroke="#2a5a8c" strokeWidth="0.5" opacity="0.08">
                {[100, 200, 300, 400, 500, 600, 700].map((y) => (
                    <path key={`w2-${y}`} d={`M 0,${y} Q ${width * 0.15},${y - 8} ${width * 0.3},${y} T ${width * 0.6},${y} T ${width * 0.9},${y}`} />
                ))}
            </g>

            <g fill="#2a6a9c" opacity="0.06">
                {[
                    { x: width * 0.05, y: height * 0.15, r: 30 },
                    { x: width * 0.92, y: height * 0.1, r: 25 },
                    { x: width * 0.08, y: height * 0.75, r: 35 },
                    { x: width * 0.88, y: height * 0.7, r: 28 },
                    { x: width * 0.5, y: height * 0.95, r: 40 },
                    { x: width * 0.03, y: height * 0.45, r: 20 },
                    { x: width * 0.97, y: height * 0.5, r: 22 },
                ].map((b, i) => (
                    <circle key={i} cx={b.x} cy={b.y} r={b.r} />
                ))}
            </g>
        </g>
    );
}

export default DecorativeWaves;
