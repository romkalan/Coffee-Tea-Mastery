export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "student" | "expert" | "administrator";
    photo?: string;
    courses: { courseId: string; status: "enrolled" | "completed"; enrolledAt: string; completedAt?: string }[];
};
