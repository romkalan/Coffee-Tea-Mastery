import classNames from "classnames";
import styles from "./styles.module.scss";

interface SkillArea {
    id: string;
    label: string;
    color: string;
    courses: string[];
}

const skillAreas: SkillArea[] = [
    { id: "basics", label: "Эспрессо", color: "#8B4513", courses: ["course-3", "course-7"] },
    { id: "latte-art", label: "Латте-арт", color: "#D2691E", courses: ["course-8"] },
    { id: "cupping", label: "Каппинг", color: "#A0522D", courses: ["course-1"] },
    { id: "tea", label: "Чай", color: "#2E7D32", courses: ["course-2", "course-5"] },
    { id: "management", label: "Управление", color: "#1565C0", courses: ["course-4", "course-6"] },
];

const islandLayout = {
    basics: { cx: "20%", cy: "30%", rx: "14%", ry: "14%" },
    "latte-art": { cx: "50%", cy: "22%", rx: "12%", ry: "12%" },
    cupping: { cx: "78%", cy: "55%", rx: "13%", ry: "13%" },
    tea: { cx: "30%", cy: "72%", rx: "14%", ry: "14%" },
    management: { cx: "58%", cy: "80%", rx: "15%", ry: "12%" },
};

interface SkillsMapProps {
    enrollments: { courseId: string; status: string }[];
}

function SkillsMap({ enrollments }: SkillsMapProps) {
    const completedCourseIds = new Set(
        enrollments.filter(e => e.status === "completed").map(e => e.courseId)
    );

    const isCompleted = (area: SkillArea) =>
        area.courses.some(cid => completedCourseIds.has(cid));

    return (
        <div className={classNames(styles.root)}>
            <svg viewBox="0 0 1000 600" className={classNames(styles.map)} role="img" aria-label="Карта навыков: острова навыков бариста">
                <rect width="100%" height="100%" fill="#FDF5E6" rx="16" />
                <text x="50%" y="48" textAnchor="middle" fill="#8B4513" fontSize="28" fontWeight="600">Моя карта навыков</text>

                {skillAreas.map((area) => {
                    const layout = islandLayout[area.id as keyof typeof islandLayout];
                    return (
                        <g key={area.id}>
                            <ellipse
                                cx={layout.cx}
                                cy={layout.cy}
                                rx={layout.rx}
                                ry={layout.ry}
                                fill={isCompleted(area) ? area.color : "#E8D5C4"}
                                className={classNames(styles.island)}
                            />
                            <text
                                x={layout.cx}
                                y={layout.cy}
                                textAnchor="middle"
                                dominantBaseline="central"
                                fill={isCompleted(area) ? "white" : "#C4A882"}
                                fontSize="22"
                                fontWeight="600"
                            >
                                {area.label}
                            </text>
                        </g>
                    );
                })}

                <text x="8%" y="12%" fontSize="32" fill="#D2691E" fillOpacity="0.15">~</text>
                <text x="88%" y="92%" fontSize="32" fill="#D2691E" fillOpacity="0.15">~</text>
                <text x="85%" y="10%" fontSize="28" fill="#D2691E" fillOpacity="0.15">~</text>
                <text x="15%" y="92%" fontSize="28" fill="#D2691E" fillOpacity="0.15">~</text>
            </svg>
        </div>
    );
}

export default SkillsMap;
