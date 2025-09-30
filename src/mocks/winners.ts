import {generateUUID} from "../utils/utils.ts";
import type {TWinner} from "../types/winner.ts";

export const winners: TWinner[] = [
    {
        id: generateUUID(),
        name: "Антоникова Вера",
        region: "Москва",
        year: 2025,
        photo: "",
    },
    {
        id: generateUUID(),
        name: "Коваленко Юлия",
        region: "Санкт-Петербург",
        year: 2024,
        photo: "",
    },
    {
        id: generateUUID(),
        name: "Бугров Денис",
        region: "Красноярск",
        year: 2023,
        photo: "",
    },
]
