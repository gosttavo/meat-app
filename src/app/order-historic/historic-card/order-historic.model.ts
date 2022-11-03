export interface OrderHistoric {
    name: string,
    email: string,
    address: string,
    number: number,
    optionalAddress: string,
    paymentOption: string,
    orderItems: Array<OrderItems>,
    id: number,
}

export interface OrderItems{
    quantity: number,
    menuId: string
}