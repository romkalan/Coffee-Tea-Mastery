export {};

function CompassRose() {
    return (
        <g transform="translate(1040, 100)">
            <circle cx={0} cy={0} r={52} fill="none" stroke="#c8a96e" strokeWidth={1.5} opacity={0.4} />
            <circle cx={0} cy={0} r={48} fill="none" stroke="#c8a96e" strokeWidth={0.5} opacity={0.3} strokeDasharray="2,2" />
            <circle cx={0} cy={0} r={28} fill="none" stroke="#c8a96e" strokeWidth={1} opacity={0.5} />

            {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
                const rad = (angle * Math.PI) / 180;
                const isCardinal = i % 2 === 0;
                const length = isCardinal ? 40 : 28;
                const baseWidth = isCardinal ? 16 : 10;

                const tipX = Math.sin(rad) * length;
                const tipY = -Math.cos(rad) * length;
                const baseX = Math.sin(rad) * (length - (isCardinal ? 16 : 12));
                const baseY = -Math.cos(rad) * (length - (isCardinal ? 16 : 12));
                const cx = Math.sin(rad);
                const cy = -Math.cos(rad);

                return (
                    <polygon
                        key={angle}
                        points={`${tipX},${tipY} ${baseX + cx * baseWidth},${baseY + cy * baseWidth} ${baseX - cx * baseWidth},${baseY - cy * baseWidth}`}
                        fill={isCardinal ? "#c8a96e" : "#a08050"}
                        opacity={isCardinal ? 0.7 : 0.4}
                        stroke="#8b6914"
                        strokeWidth={0.5}
                    />
                );
            })}

            <circle cx={0} cy={0} r={12} fill="#0f2440" stroke="#c8a96e" strokeWidth={1} />
            <circle cx={0} cy={0} r={4} fill="#c8a96e" />

            <text x={0} y={-56} textAnchor="middle" fill="#c8a96e" fontSize={14} fontWeight={700} opacity={0.7} fontFamily="'Roboto Slab', Georgia, serif">N</text>
            <text x={0} y={68} textAnchor="middle" fill="#c8a96e" fontSize={14} fontWeight={700} opacity={0.7} fontFamily="'Roboto Slab', Georgia, serif">S</text>
            <text x={64} y={5} textAnchor="middle" fill="#c8a96e" fontSize={14} fontWeight={700} opacity={0.7} fontFamily="'Roboto Slab', Georgia, serif">E</text>
            <text x={-64} y={5} textAnchor="middle" fill="#c8a96e" fontSize={14} fontWeight={700} opacity={0.7} fontFamily="'Roboto Slab', Georgia, serif">W</text>
        </g>
    );
}

export default CompassRose;
