import { MAP_VIEWBOX } from "../../../data/mapTerritories.ts";

const { width, height } = MAP_VIEWBOX;

function WindLines() {
    return (
        <g fill="none" stroke="#c8a96e" strokeWidth={0.4} opacity={0.08}>
            <path d={`M ${width * 0.05},${height * 0.1} Q ${width * 0.2},${height * 0.12} ${width * 0.15},${height * 0.25}`} strokeDasharray="3,6" />
            <path d={`M ${width * 0.08},${height * 0.15} Q ${width * 0.25},${height * 0.18} ${width * 0.2},${height * 0.3}`} strokeDasharray="2,8" />

            <path d={`M ${width * 0.7},${height * 0.12} Q ${width * 0.85},${height * 0.1} ${width * 0.9},${height * 0.22}`} strokeDasharray="3,5" />
            <path d={`M ${width * 0.72},${height * 0.16} Q ${width * 0.88},${height * 0.14} ${width * 0.93},${height * 0.26}`} strokeDasharray="2,7" />

            <path d={`M ${width * 0.02},${height * 0.55} Q ${width * 0.12},${height * 0.5} ${width * 0.08},${height * 0.65}`} strokeDasharray="3,6" />
            <path d={`M ${width * 0.04},${height * 0.58} Q ${width * 0.15},${height * 0.53} ${width * 0.1},${height * 0.68}`} strokeDasharray="2,8" />

            <path d={`M ${width * 0.75},${height * 0.65} Q ${width * 0.9},${height * 0.6} ${width * 0.95},${height * 0.75}`} strokeDasharray="3,5" />
            <path d={`M ${width * 0.78},${height * 0.68} Q ${width * 0.92},${height * 0.63} ${width * 0.97},${height * 0.78}`} strokeDasharray="2,7" />

            <path d={`M ${width * 0.3},${height * 0.3} Q ${width * 0.4},${height * 0.35} ${width * 0.38},${height * 0.45}`} strokeDasharray="3,6" />
            <path d={`M ${width * 0.55},${height * 0.35} Q ${width * 0.65},${height * 0.4} ${width * 0.62},${height * 0.5}`} strokeDasharray="2,8" />
            <path d={`M ${width * 0.45},${height * 0.7} Q ${width * 0.55},${height * 0.75} ${width * 0.52},${height * 0.85}`} strokeDasharray="3,6" />
        </g>
    );
}

export default WindLines;
