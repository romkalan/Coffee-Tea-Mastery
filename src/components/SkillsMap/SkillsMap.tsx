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
            <svg viewBox="0 0 1000 600" className={classNames(styles.map)}>
                <rect width="1000" height="600" fill="#FDF5E6" rx="16" />

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
                            y={getCy(area.id) + 8}
                            textAnchor="middle"
                            fill={isCompleted(area) ? "white" : "#C4A882"}
                            fontSize="22"
                            fontWeight="600"
                        >
                            {area.label}
                        </text>
                    </g>
                ))}

                <text x="80" y="85" fontSize="32" fill="#D2691E" fillOpacity="0.15">~</text>
                <text x="880" y="560" fontSize="32" fill="#D2691E" fillOpacity="0.15">~</text>
                <text x="850" y="75" fontSize="28" fill="#D2691E" fillOpacity="0.15">~</text>
                <text x="150" y="560" fontSize="28" fill="#D2691E" fillOpacity="0.15">~</text>
            </svg>
        </div>
    );
}

function getCx(id: string): number {
    const map: Record<string, number> = { basics: 250, "latte-art": 590, cupping: 750, tea: 340, management: 590 };
    return map[id] ?? 500;
}

function getCy(id: string): number {
    const map: Record<string, number> = { basics: 180, "latte-art": 150, cupping: 330, tea: 420, management: 480 };
    return map[id] ?? 300;
}

function getRx(id: string): number {
    const map: Record<string, number> = { basics: 140, "latte-art": 120, cupping: 125, tea: 140, management: 150 };
    return map[id] ?? 110;
}

function getRy(id: string): number {
    const map: Record<string, number> = { basics: 80, "latte-art": 65, cupping: 65, tea: 80, management: 65 };
    return map[id] ?? 65;
}

export default SkillsMap;
