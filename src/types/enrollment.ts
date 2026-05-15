export type TEnrollment = {
    id: string;
    userId: string;
    courseId: string;
    status: "enrolled" | "completed";
    enrolledAt: string;
    completedAt?: string;
};
