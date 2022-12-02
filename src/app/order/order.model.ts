class Order{
    constructor(
        public address: string,
        public number: number,
        public optionalAddress: string,
        public paymentOption: string,
        public orderItems: OrderItem[] = [],
        public delivery: number,
        public totalOrder: number,
        public id?: string,
        public restaurantId?: string,
        public userId?: string

        ){}
}

class OrderItem{
    constructor(
        public quantity: number, 
        public menuId: string, 
        public valueItem: number,
        public name: string,
        ){}
}

export {Order, OrderItem};