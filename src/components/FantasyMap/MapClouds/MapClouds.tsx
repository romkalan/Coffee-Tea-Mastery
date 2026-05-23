export {};

function Cloud({ cx, cy, scale = 1 }: { cx: number; cy: number; scale?: number }) {
    return (
        <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={0.15}>
            <circle cx={0} cy={0} r={12} fill="#c8d8e8" />
            <circle cx={14} cy={-4} r={16} fill="#c8d8e8" />
            <circle cx={28} cy={2} r={10} fill="#c8d8e8" />
            <circle cx={8} cy={4} r={8} fill="#d0e0f0" />
            <circle cx={20} cy={-2} r={10} fill="#d0e0f0" />
        </g>
    );
}

function MapClouds() {
    return (
        <g>
            <Cloud cx={80} cy={100} scale={1.2} />
            <Cloud cx={220} cy={60} scale={0.8} />
            <Cloud cx={450} cy={90} scale={1} />
            <Cloud cx={780} cy={70} scale={1.1} />
            <Cloud cx={950} cy={120} scale={0.9} />
            <Cloud cx={1120} cy={80} scale={1} />

            <Cloud cx={150} cy={740} scale={1} />
            <Cloud cx={400} cy={760} scale={1.3} />
            <Cloud cx={700} cy={750} scale={0.9} />
            <Cloud cx={1000} cy={730} scale={1.1} />
            <Cloud cx={1150} cy={760} scale={0.8} />
        </g>
    );
}

export default MapClouds;
