export {};

interface SailingShipProps {
    cx: number;
    cy: number;
    scale?: number;
}

function SailingShip({ cx, cy, scale = 1 }: SailingShipProps) {
    return (
        <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={0.7}>
            <path d="M -8,0 L 8,0 L 10,4 L -10,4 Z" fill="#5d4037" stroke="#3e2723" strokeWidth={0.5} />
            <path d="M -2,-2 L 6,-2 L 6,0 L -2,0 Z" fill="#8d6e63" stroke="#5d4037" strokeWidth={0.3} />
            <line x1={2} y1={-2} x2={2} y2={-18} stroke="#5d4037" strokeWidth={0.8} />
            <path d="M 2,-16 Q 8,-10 6,-2" fill="none" stroke="#e8d5b0" strokeWidth={0.8} opacity={0.8} />
            <path d="M 2,-14 Q -4,-8 -2,-2" fill="none" stroke="#e8d5b0" strokeWidth={0.6} opacity={0.6} />
            <path d="M -10,4 Q 0,8 10,4" fill="none" stroke="#5d4037" strokeWidth={0.4} opacity={0.5} />
            <path d="M 0,4 L 0,8" stroke="#5d4037" strokeWidth={0.4} />
            <path d="M -6,0 L -8,3 L -6,6" fill="none" stroke="#3e2723" strokeWidth={0.5} />
        </g>
    );
}

export default SailingShip;
