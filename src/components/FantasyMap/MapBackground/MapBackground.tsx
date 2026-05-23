import { MAP_VIEWBOX } from "../../../data/mapTerritories.ts";
import DecorativeWaves from "../DecorativeWaves/DecorativeWaves.tsx";
import FrameCorners from "../FrameCorners/FrameCorners.tsx";
import CompassRose from "../CompassRose/CompassRose.tsx";
import MapClouds from "../MapClouds/MapClouds.tsx";
import Mountains from "../Mountains/Mountains.tsx";
import WindLines from "../WindLines/WindLines.tsx";
import SailingShip from "../SailingShip/SailingShip.tsx";
import TitleBanner from "../TitleBanner/TitleBanner.tsx";

const { width, height } = MAP_VIEWBOX;

function MapBackground() {
    return (
        <g>
            <defs>
                <radialGradient id="seaGrad" cx="50%" cy="50%" r="70%">
                    <stop offset="0%" stopColor="#1a3a5c" />
                    <stop offset="60%" stopColor="#0f2440" />
                    <stop offset="100%" stopColor="#081428" />
                </radialGradient>

                <radialGradient id="parchmentGrad" cx="50%" cy="50%" r="60%">
                    <stop offset="0%" stopColor="#f5e6c8" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#f5e6c8" stopOpacity="0" />
                </radialGradient>

                <filter id="islandShadow" x="-10%" y="-10%" width="130%" height="130%">
                    <feDropShadow dx="2" dy="3" stdDeviation="4" floodColor="#000" floodOpacity="0.35" />
                </filter>
            </defs>

            <rect width={width} height={height} fill="url(#seaGrad)" rx="16" />

            <rect width={width} height={height} fill="url(#parchmentGrad)" rx="16" />

            <DecorativeWaves />

            <WindLines />

            <MapClouds />

            <g stroke="#c8a96e" strokeWidth="2" fill="none" opacity={0.4}>
                <path d={`M 20,20 L ${width - 20},20 L ${width - 20},${height - 20} L 20,${height - 20} Z`} />
                <path d={`M 28,28 L ${width - 28},28 L ${width - 28},${height - 28} L 28,${height - 28} Z`} strokeWidth="1" />
            </g>

            <g stroke="#c8a96e" strokeWidth="0.5" fill="none" opacity={0.2}>
                <path d={`M 36,36 L ${width - 36},36 L ${width - 36},${height - 36} L 36,${height - 36} Z`} strokeDasharray="4,4" />
            </g>

            <FrameCorners />

            <CompassRose />

            <TitleBanner />

            <Mountains />

            <SailingShip cx={380} cy={285} scale={0.8} />
            <SailingShip cx={720} cy={420} scale={0.6} />
            <SailingShip cx={350} cy={450} scale={0.7} />
        </g>
    );
}

export default MapBackground;
