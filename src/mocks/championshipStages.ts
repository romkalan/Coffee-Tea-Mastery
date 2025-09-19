import {generateUUID} from "../utils/utils.ts";
import type {TChampionshipStage} from "../types/championshipStages.ts";

export const championshipStages: TChampionshipStage[] = [
    {
        id: generateUUID(),
        stage: "Разработка типовой конкурсной документации",
        date: "август-сентябрь",
    },
    {
        id: generateUUID(),
        stage: "Внутренние отборочные",
        date: "октябрь-ноябрь",
    },
    {
        id: generateUUID(),
        stage: "Региональные чемпионаты",
        date: "ноябрь-март",
    },
    {
        id: generateUUID(),
        stage: "Межрегиональный чемпионат",
        date: "март-май",
    },
    {
        id: generateUUID(),
        stage: "Финал чемпионата",
        date: "июнь-август",
    },
]
