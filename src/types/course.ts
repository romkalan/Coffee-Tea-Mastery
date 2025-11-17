import type {TExpert} from "./expert.ts";

export type TCourse = {
    id: string;
    title: string;
    type: string;
    price: number;
    time: string;
    date?: string;
    seats?: number;
    format: string;
    description: string;
    text: string;
    expert: TExpert;
    image: string;
    previewImage: string;
    video?: string;
};
