export interface IAction {
    id: number;
    title: string;
    description: string;
    imagePath: string;
}

export interface IActionRequest {
    title: string;
    description: string;
    imagePath: string;
}

export interface IActionResponce extends IActionRequest{
    id: number,
}