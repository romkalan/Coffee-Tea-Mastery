import type {TUser} from "../types/user.ts";

export const users: TUser[] = [
    {
        id: "u1",
        name: "Роман",
        email: "romkalan@mail.ru",
        password: "123",
        role: "expert",
        photo: "/images/courseImage.png",
        courses: [
            { courseId: "course-1", status: "completed", enrolledAt: "2026-01-15", completedAt: "2026-01-17" },
            { courseId: "course-3", status: "completed", enrolledAt: "2026-02-01", completedAt: "2026-02-03" },
            { courseId: "course-8", status: "completed", enrolledAt: "2026-03-10", completedAt: "2026-03-12" },
        ],
    },
    {
        id: "u2",
        name: "Юлия",
        email: "romkalan@mail.ru",
        password: "123",
        role: "student",
        photo: "/images/courseImage.png",
        courses: [
            { courseId: "course-2", status: "completed", enrolledAt: "2026-02-20", completedAt: "2026-02-23" },
        ],
    },
    {
        id: "u3",
        name: "Денис",
        email: "romkalan@mail.ru",
        password: "123",
        role: "student",
        courses: [],
    },
]
