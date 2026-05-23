import { MAP_VIEWBOX } from "../../../data/mapTerritories.ts";

const { width, height } = MAP_VIEWBOX;

function FrameCorners() {
    return (
        <g>
            <g stroke="#c8a96e" fill="none" opacity={0.5}>
                <path d={`M 20,40 L 20,20 L 40,20`} strokeWidth={2} />
                <path d={`M 60,20 L 80,20`} strokeWidth={1.5} />
                <path d={`M 20,60 L 20,80`} strokeWidth={1.5} />

                <path d={`M ${width - 40},20 L ${width - 20},20 L ${width - 20},40`} strokeWidth={2} />
                <path d={`M ${width - 80},20 L ${width - 60},20`} strokeWidth={1.5} />
                <path d={`M ${width - 20},60 L ${width - 20},80`} strokeWidth={1.5} />

                <path d={`M 20,${height - 40} L 20,${height - 20} L 40,${height - 20}`} strokeWidth={2} />
                <path d={`M 60,${height - 20} L 80,${height - 20}`} strokeWidth={1.5} />
                <path d={`M 20,${height - 80} L 20,${height - 60}`} strokeWidth={1.5} />

                <path d={`M ${width - 40},${height - 20} L ${width - 20},${height - 20} L ${width - 20},${height - 40}`} strokeWidth={2} />
                <path d={`M ${width - 80},${height - 20} L ${width - 60},${height - 20}`} strokeWidth={1.5} />
                <path d={`M ${width - 20},${height - 80} L ${width - 20},${height - 60}`} strokeWidth={1.5} />
            </g>

            <g fill="#c8a96e" opacity={0.3}>
                <circle cx={40} cy={40} r={4} />
                <circle cx={width - 40} cy={40} r={4} />
                <circle cx={40} cy={height - 40} r={4} />
                <circle cx={width - 40} cy={height - 40} r={4} />
            </g>

            <g stroke="#c8a96e" fill="none" opacity={0.2} strokeWidth={0.5}>
                <path d={`M 20,100 Q 60,80 100,20`} />
                <path d={`M ${width - 20},100 Q ${width - 60},80 ${width - 100},20`} />
                <path d={`M 20,${height - 100} Q 60,${height - 80} 100,${height - 20}`} />
                <path d={`M ${width - 20},${height - 100} Q ${width - 60},${height - 80} ${width - 100},${height - 20}`} />
            </g>
        </g>
    );
}

export default FrameCorners;
