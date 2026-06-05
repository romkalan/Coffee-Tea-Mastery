import {generateUUID} from "../utils/utils.ts";
import type {TPartner} from "../types/partners.ts";

export const partners: TPartner[] = [
    {
        id: generateUUID(),
        name: "Submarine",
        image: "/images/submarineIcon.png",
        url: "https://sbmrne.ru/",
    },
    {
        id: generateUUID(),
        name: "BobCoffer",
        image: "/images/bobcofferLogo.svg",
        url: "https://bobcoffer.com/?ysclid=mq12hdfdwv224081555",
    },
    {
        id: generateUUID(),
        name: "Mahlkoning",
        image: "/images/MahlkoenigLogo.webp",
        url: "https://www.mahlkoenig.com/",
    },
    {
        id: generateUUID(),
        name: "Hi WATER",
        image: "/images/HiWaterLogo.svg",
        url: "https://hiwater.ru/",
    },
    {
        id: generateUUID(),
        name: "Tasty Coffee",
        image: "/images/rocketsCoffeeLogo.png",
        url: "https://shop.tastycoffee.ru/",
    },
]
