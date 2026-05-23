import { MAP_VIEWBOX } from "../../../data/mapTerritories.ts";

const { width } = MAP_VIEWBOX;

function TitleBanner() {
    return (
        <g>
            <path
                d={`M ${width / 2 - 220},22 L ${width / 2 + 220},22 L ${width / 2 + 200},58 L ${width / 2 - 200},58 Z`}
                fill="#0f2440"
                fillOpacity={0.7}
                stroke="#c8a96e"
                strokeWidth={1}
                opacity={0.9}
            />
            <path
                d={`M ${width / 2 - 200},58 L ${width / 2 + 200},58`}
                stroke="#c8a96e"
                strokeWidth={0.5}
                opacity={0.4}
            />

            <path d={`M ${width / 2 - 220},22 L ${width / 2 - 238},28 L ${width / 2 - 220},34 Z`} fill="#c8a96e" opacity={0.4} />
            <path d={`M ${width / 2 + 220},22 L ${width / 2 + 238},28 L ${width / 2 + 220},34 Z`} fill="#c8a96e" opacity={0.4} />
            <path d={`M ${width / 2 - 200},58 L ${width / 2 - 218},52 L ${width / 2 - 200},46 Z`} fill="#c8a96e" opacity={0.4} />
            <path d={`M ${width / 2 + 200},58 L ${width / 2 + 218},52 L ${width / 2 + 200},46 Z`} fill="#c8a96e" opacity={0.4} />
        </g>
    );
}

export default TitleBanner;
