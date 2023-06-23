export interface IActionRequest {
    date: Date;
    name: string;
    description: string;
    imagePath: string;
}

export interface IActionResponce extends IActionRequest{
    id: number,
}