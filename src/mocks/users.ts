import type {TUser} from "../types/user.ts";
import {generateUUID} from "../utils/utils.ts";

export const users: TUser[] = [
    {
        id: generateUUID(),
        name: "Роман",
        email: "romkalan@mail.ru",
        password: "123",
        role: "expert",
        photo: "/images/courseImage.png",
    },
    {
        id: generateUUID(),
        name: "Юлия",
        email: "romkalan@mail.ru",
        password: "123",
        role: "student",
        photo: "/images/courseImage.png",
    },
    {
        id: generateUUID(),
        name: "Денис",
        email: "romkalan@mail.ru",
        password: "123",
        role: "student",
    },
]
