export type TNew = {
    id: string;
    date: string;
    title: string;
    type: string;
    description: string;
    text: string;
    image: string;
    previewImage: string;
    video?: string;
    tag?: "coffee" | "tea";
};
