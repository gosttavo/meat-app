export interface Review {
    id: string,
    date?: Date,
    rating: number,
    comments: string,
    restaurant?: string,
    user?: string,
}