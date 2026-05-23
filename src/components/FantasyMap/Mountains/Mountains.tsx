export {};

function Mountain({ cx, cy, height, width }: { cx: number; cy: number; height: number; width: number }) {
    const hw = width / 2;
    return (
        <g>
            <path d={`M ${cx - hw},${cy} L ${cx},${cy - height} L ${cx + hw},${cy}`} fill="#4a3728" stroke="#3e2723" strokeWidth={0.5} opacity={0.6} />
            <path d={`M ${cx - hw},${cy} L ${cx - hw + width * 0.15},${cy - height * 0.3} L ${cx + hw},${cy}`} fill="#5d4037" opacity={0.4} />
            <path d={`M ${cx - hw + width * 0.2},${cy} L ${cx},${cy - height * 0.85} L ${cx + hw - width * 0.15},${cy}`} fill="#6d4c41" opacity={0.3} />
        </g>
    );
}

function Mountains() {
    return (
        <g>
            <Mountain cx={175} cy={258} height={14} width={10} />
            <Mountain cx={188} cy={255} height={18} width={12} />
            <Mountain cx={202} cy={258} height={12} width={9} />
            <Mountain cx={215} cy={256} height={10} width={8} />

            <Mountain cx={520} cy={222} height={16} width={11} />
            <Mountain cx={534} cy={218} height={20} width={13} />
            <Mountain cx={550} cy={224} height={14} width={10} />

            <Mountain cx={890} cy={350} height={15} width={11} />
            <Mountain cx={905} cy={346} height={20} width={13} />
            <Mountain cx={920} cy={350} height={12} width={9} />

            <Mountain cx={195} cy={575} height={14} width={10} />
            <Mountain cx={210} cy={572} height={18} width={12} />
            <Mountain cx={225} cy={576} height={11} width={8} />

            <Mountain cx={565} cy={570} height={16} width={11} />
            <Mountain cx={580} cy={566} height={20} width={13} />
            <Mountain cx={595} cy={572} height={14} width={10} />
        </g>
    );
}

export default Mountains;
