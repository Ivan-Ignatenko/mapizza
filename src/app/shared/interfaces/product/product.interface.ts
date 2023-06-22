import { ICategoryResponce } from "../category/category.interface";

export interface IProductRequest {
    price: number;
    weight: number;
    name: string;
    path: string;
    description: string;
    imagePath: string;
    category: ICategoryResponce
};

export interface IProductResponce extends IProductRequest {
    id: number;
}