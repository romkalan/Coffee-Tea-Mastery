import classNames from "classnames";
import styles from "./styles.module.scss";

interface TSkillArea {
    id: string;
    label: string;
    color: string;
    courseIds: string[];
}

interface TUserCourse {
    courseId: string;
    status: string;
}

interface SkillsMapProps {
    skillAreas: TSkillArea[];
    userCourses: TUserCourse[];
}

const islandLayout: Record<string, { cx: string; cy: string; rx: string; ry: string }> = {
    basics: { cx: "20%", cy: "30%", rx: "14%", ry: "14%" },
    "latte-art": { cx: "50%", cy: "22%", rx: "12%", ry: "12%" },
    cupping: { cx: "78%", cy: "55%", rx: "13%", ry: "13%" },
    tea: { cx: "30%", cy: "72%", rx: "14%", ry: "14%" },
    management: { cx: "58%", cy: "80%", rx: "15%", ry: "12%" },
};

function SkillsMap({ skillAreas, userCourses }: SkillsMapProps) {
    const completedCourseIds = new Set(
        userCourses.filter(c => c.status === "completed").map(c => c.courseId)
    );

    const isCompleted = (area: TSkillArea) =>
        area.courseIds.some(cid => completedCourseIds.has(cid));

    if (skillAreas.length === 0) return null;

    return (
        <div className={classNames(styles.root)}>
            <svg viewBox="0 0 1000 600" className={classNames(styles.map)} role="img" aria-label="Карта навыков: острова навыков бариста">
                <rect width="100%" height="100%" fill="#FDF5E6" rx="16" />
                <text x="50%" y="48" textAnchor="middle" fill="#8B4513" fontSize="28" fontWeight="600">Моя карта навыков</text>

                {skillAreas.map((area) => {
                    const layout = islandLayout[area.id];
                    if (!layout) return null;
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
