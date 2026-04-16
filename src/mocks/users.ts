import type {TUser} from "../types/user.ts";
import {generateUUID} from "../utils/utils.ts";
import {RoleForUser} from "../utils/helpers.ts";

export const courses: TUser[] = [
    {
        id: generateUUID(),
        name: "Роман",
        email: "romkalan@mail.ru",
        status: RoleForUser.expert,
        photo: "/images/courseImage.png",
    },
    {
        id: generateUUID(),
        name: "Юлия",
        email: "romkalan@mail.ru",
        status: RoleForUser.student,
        photo: "/images/courseImage.png",
    },
    {
        id: generateUUID(),
        name: "Денис",
        email: "romkalan@mail.ru",
        status: RoleForUser.student,
    },
]
