export type TUserCourse = {
    courseId: string;
    status: "enrolled" | "completed";
    enrolledAt: string;
    completedAt?: string;
};
