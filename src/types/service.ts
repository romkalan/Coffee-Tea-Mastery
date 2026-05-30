export type TService = {
    id: string;
    title: string;
    type: string;
    price: number;
    time: string;
    format: string;
    description: string;
    actions: string[];
    results: string[];
    image: string;
    previewImage: string;
    reviews: string[];
    video?: string;
    audience?: "coffee-shop" | "restaurant" | "hotel" | "production";
};
