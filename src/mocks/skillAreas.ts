export interface TSkillArea {
    id: string;
    label: string;
    color: string;
    courseIds: string[];
}

export const skillAreas: TSkillArea[] = [
    {
        id: "basics",
        label: "Эспрессо",
        color: "#8B4513",
        courseIds: ["course-3", "course-7", "course-4", "course-6"],
    },
    {
        id: "latte-art",
        label: "Латте-арт",
        color: "#D2691E",
        courseIds: ["course-8", "course-7"],
    },
    {
        id: "cupping",
        label: "Земля Свободных Водопадов",
        color: "#A0522D",
        courseIds: ["course-1"],
    },
    {
        id: "tea",
        label: "Чай",
        color: "#2E7D32",
        courseIds: ["course-2", "course-5", "course-7"],
    },
    {
        id: "roasting",
        label: "Обжарка",
        color: "#E65100",
        courseIds: ["course-9"],
    },
];
