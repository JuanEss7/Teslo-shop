import { Address } from "./address.interface"
import { Size } from "./product.interface"

interface ProductImage {
    url: string
}
interface OrderAddress extends Address {
    id: string,
    orderId: string
}
interface OrderItem {
    price: number,
    quantity: number,
    size: Size,
    product: {
        title: string,
        slug: string,
        ProductImage: ProductImage
    }
}
export interface Order {
    id: string,
    subTotal: number,
    tax: number,
    total: number,
    itemsInOrder: number,
    isPaid: boolean,
    paidAt: null | Date,
    createdAt: Date,
    updatedAt: Date,
    userId: string,
    transactionId: null | string,
    OrderAddress: OrderAddress,
    OrderItem: OrderItem[]
}