import {generateUUID} from "../utils/utils.ts";
import type {TPartner} from "../types/partners.ts";

export const partners: TPartner[] = [
    {
        id: generateUUID(),
        name: "Submarine",
        image: "",
    },
    {
        id: generateUUID(),
        name: "Cafe Store",
        image: "",
    },
    {
        id: generateUUID(),
        name: "Mahlkoning",
        image: "",
    },
    {
        id: generateUUID(),
        name: "Hi WATER",
        image: "",
    },
    {
        id: generateUUID(),
        name: "Tasty Coffee",
        image: "",
    },
]
