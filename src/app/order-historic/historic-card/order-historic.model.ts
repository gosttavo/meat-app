export interface OrderHistoric {
    user: string,
    address: string,
    number: number,
    rating: number,
    optionalAddress: string,
    paymentOption: string,
    orderItems: Array<OrderItems>,
    id: string,
}

export interface OrderItems{
    quantity: number,
    menuId: string,
    price: number
}