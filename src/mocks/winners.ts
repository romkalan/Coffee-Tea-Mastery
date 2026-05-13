import {generateUUID} from "../utils/utils.ts";
import type {TWinner} from "../types/winner.ts";

export const winners: TWinner[] = [
    {
        id: generateUUID(),
        name: "Афанасьева Полина",
        region: "Москва",
        year: 2026,
        photo: "/images/Афанасьева.png",
    },{
        id: generateUUID(),
        name: "Антоникова Вера",
        region: "Москва",
        year: 2025,
        photo: "/images/Антоникова.png",
    },
    {
        id: generateUUID(),
        name: "Королев Алексей",
        region: "Красноярск",
        year: 2024,
        photo: "/images/Королев.png",
    },
    {
        id: generateUUID(),
        name: "Коваленко Юлия",
        region: "Санкт-Петербург",
        year: 2023,
        photo: "/images/Афанасьева.png",
    },
]
