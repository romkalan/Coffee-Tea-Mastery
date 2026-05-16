export type TUser = {
    id: string;
    name: string;
    email: string;
    password: string;
    role: "student" | "expert" | "administrator";
    photo?: string;
};
