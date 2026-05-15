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
            <svg viewBox="0 0 800 500" className={classNames(styles.map)}>
                <rect width="800" height="500" fill="#FDF5E6" rx="16" />

                {skillAreas.map((area) => (
                    <g key={area.id}>
                        <ellipse
                            cx={getCx(area.id)}
                            cy={getCy(area.id)}
                            rx={getRx(area.id)}
                            ry={getRy(area.id)}
                            fill={isCompleted(area) ? area.color : "#E8D5C4"}
                            className={classNames(styles.island)}
                        />
                        <text
                            x={getCx(area.id)}
                            y={getCy(area.id) + 6}
                            textAnchor="middle"
                            fill={isCompleted(area) ? "white" : "#C4A882"}
                            fontSize="18"
                            fontWeight="600"
                        >
                            {area.label}
                        </text>
                    </g>
                ))}

                <text x="60" y="70" fontSize="28" fill="#D2691E" fill-opacity="0.15">~</text>
                <text x="700" y="460" fontSize="28" fill="#D2691E" fill-opacity="0.15">~</text>
                <text x="680" y="60" fontSize="24" fill="#D2691E" fill-opacity="0.15">~</text>
                <text x="120" y="460" fontSize="24" fill="#D2691E" fill-opacity="0.15">~</text>
            </svg>
        </div>
    );
}

function getCx(id: string): number {
    const map: Record<string, number> = { basics: 200, "latte-art": 470, cupping: 600, tea: 270, management: 470 };
    return map[id] ?? 400;
}

function getCy(id: string): number {
    const map: Record<string, number> = { basics: 150, "latte-art": 125, cupping: 275, tea: 350, management: 400 };
    return map[id] ?? 250;
}

function getRx(id: string): number {
    const map: Record<string, number> = { basics: 110, "latte-art": 95, cupping: 100, tea: 110, management: 120 };
    return map[id] ?? 90;
}

function getRy(id: string): number {
    const map: Record<string, number> = { basics: 65, "latte-art": 55, cupping: 55, tea: 65, management: 55 };
    return map[id] ?? 55;
}

export default SkillsMap;
