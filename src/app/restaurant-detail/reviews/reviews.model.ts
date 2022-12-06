export interface Review {
    userName: string;
    id: string,
    date?: Date,
    rating: number,
    comments: string,
    restaurant?: string,
    user?: string,
}