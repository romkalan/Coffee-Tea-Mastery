import {generateUUID} from "../utils/utils.ts";
import type {TPartner} from "../types/partners.ts";

export const partners: TPartner[] = [
    {
        id: generateUUID(),
        name: "Submarine",
        image: "/images/submarineIcon.png",
    },
    {
        id: generateUUID(),
        name: "Cafe Store",
        image: "/images/serviceImage.jpg",
    },
    {
        id: generateUUID(),
        name: "Mahlkoning",
        image: "/images/MahlkoenigLogo.webp",
    },
    {
        id: generateUUID(),
        name: "Hi WATER",
        image: "/images/HiWaterLogo.svg",
    },
    {
        id: generateUUID(),
        name: "Tasty Coffee",
        image: "/images/rocketsCoffeeLogo.png",
    },
]
