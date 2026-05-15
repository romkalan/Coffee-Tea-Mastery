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
            <svg viewBox="0 0 600 400" className={classNames(styles.map)}>
                <rect width="600" height="400" fill="#FDF5E6" rx="16" />

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
                            y={getCy(area.id) + 5}
                            textAnchor="middle"
                            fill={isCompleted(area) ? "white" : "#C4A882"}
                            fontSize="14"
                            fontWeight="600"
                        >
                            {area.label}
                        </text>
                    </g>
                ))}

                <text x="40" y="60" fontSize="24" fill="#D2691E" fill-opacity="0.15">~</text>
                <text x="520" y="370" fontSize="24" fill="#D2691E" fill-opacity="0.15">~</text>
                <text x="500" y="50" fontSize="20" fill="#D2691E" fill-opacity="0.15">~</text>
                <text x="80" y="370" fontSize="20" fill="#D2691E" fill-opacity="0.15">~</text>
            </svg>
        </div>
    );
}

function getCx(id: string): number {
    const map: Record<string, number> = { basics: 150, "latte-art": 350, cupping: 450, tea: 200, management: 350 };
    return map[id] ?? 300;
}

function getCy(id: string): number {
    const map: Record<string, number> = { basics: 120, "latte-art": 100, cupping: 220, tea: 280, management: 320 };
    return map[id] ?? 200;
}

function getRx(id: string): number {
    const map: Record<string, number> = { basics: 80, "latte-art": 70, cupping: 75, tea: 80, management: 90 };
    return map[id] ?? 70;
}

function getRy(id: string): number {
    const map: Record<string, number> = { basics: 50, "latte-art": 45, cupping: 45, tea: 50, management: 45 };
    return map[id] ?? 45;
}

export default SkillsMap;
