import {generateUUID} from "../utils/utils.ts";
import {DetailInfoTypes} from "../utils/helpers.ts";
import type {TNew} from "../types/new.ts";

export const news: TNew[] = [
    {
        id: generateUUID(),
        date: new Date(2024, 1, 6),
        title: "Экстракция",
        type: DetailInfoTypes.news,
        description: "Экстракция - это процесс извлечения вкусовых и ароматических веществ из кофейных зерен под воздействием воды. От нее зависит, будет ваш напиток горьким, кислым или сбалансированным",
        text: "Экстракция - это процесс извлечения вкусовых и ароматических веществ из кофейных зерен под воздействием воды. От нее зависит, будет ваш напиток горьким, кислым или сбалансированным",
        image: "../src/assets/serviceImage.jpg",
        previewImage: "../src/assets/serviceImage.jpg",
        video: "#",
    },
    {
        id: generateUUID(),
        title: "Дескрипторы кофе",
        date: new Date(2024, 3, 9),
        type: DetailInfoTypes.news,
        description: "Вы когда-нибудь задумывались, почему кофе описывается как “с нотками черники и шоколада”, а чай как “с оттенками меда и цветов”. Все дело в сложных химических соединениях, формирующихся в процессе выращивания, обработки и приготовления!",
        text: "Вы когда-нибудь задумывались, почему кофе описывается как “с нотками черники и шоколада”, а чай как “с оттенками меда и цветов”. Все дело в сложных химических соединениях, формирующихся в процессе выращивания, обработки и приготовления!",
        image: "../src/assets/serviceImage.jpg",
        previewImage: "../src/assets/serviceImage.jpg",
        video: "#",
    },
    {
        id: generateUUID(),
        title: "Латте-арт",
        date: new Date(2024, 9, 21),
        type: DetailInfoTypes.news,
        description: "Вы когда-нибудь задумывались, что ваша утренняя чашка кофе может стать не просо бодрящим напитком, но и холстом для творчества?\n" +
            "\n" +
            "Латте-арт - это волшебство, которое превращает обычный кофе в произведение искусства",
        text: "Вы когда-нибудь задумывались, что ваша утренняя чашка кофе может стать не просо бодрящим напитком, но и холстом для творчества?\n" +
            "\n" +
            "Латте-арт - это волшебство, которое превращает обычный кофе в произведение искусства",
        image: "../src/assets/serviceImage.jpg",
        previewImage: "../src/assets/serviceImage.jpg",
        video: "#",
    },
    {
        id: generateUUID(),
        title: "Чайная церемония",
        date: new Date(2024, 12, 7),
        type: DetailInfoTypes.news,
        description: "Чайная церемоняи - это культурное наследие и ритуал, отражающий национальную идентичность и мровозрение.",
        text: "Чайная церемоняи - это культурное наследие и ритуал, отражающий национальную идентичность и мровозрение.",
        image: "../src/assets/serviceImage.jpg",
        previewImage: "../src/assets/serviceImage.jpg",
        video: "#",
    },
    {
        id: generateUUID(),
        title: "Я новость",
        date: new Date(2025, 13, 5),
        type: DetailInfoTypes.news,
        description: "Какой-то текст",
        text: "Экстракция - это процесс извлечения вкусовых и ароматических веществ из кофейных зерен под воздействием воды. От нее зависит, будет ваш напиток горьким, кислым или сбалансированным",
        image: "../src/assets/serviceImage.jpg",
        previewImage: "../src/assets/serviceImage.jpg",
        video: "#",
    },
    {
        id: generateUUID(),
        title: "Я новость",
        date: new Date(2025, 1, 20),
        type: DetailInfoTypes.news,
        description: "Какой-то текст",
        text: "Экстракция - это процесс извлечения вкусовых и ароматических веществ из кофейных зерен под воздействием воды. От нее зависит, будет ваш напиток горьким, кислым или сбалансированным",
        image: "../src/assets/serviceImage.jpg",
        previewImage: "../src/assets/serviceImage.jpg",
        video: "#",
    },
]
