export interface Review {
    id: string,
    date?: Date,
    rating: number,
    comments: string,
    restaurantId?: string,
    userId?: string,
    userName?: string
}