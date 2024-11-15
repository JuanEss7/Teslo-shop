"use server"

import { Preference } from "mercadopago"
import { clientMP } from "./config"
import { redirect } from "next/navigation";
import type { Item } from "@/interfaces/order.interface";
interface Props {
    orderId: string
    orderItem: Item[]
}
export async function createPreference({ orderId, orderItem }: Props) {
    if (!orderId) return
    if (!orderItem) return
    if (orderItem.length < 1) return
    const items = orderItem.map((item) => {
        return {
            id: orderId,
            title: item.product.title,
            quantity: item.quantity,
            unit_price: Number(item.price * 1000)
        }
    }
    )
    const preference = await new Preference(clientMP).create({
        body: {
            items,
            back_urls: {
                success: "https://ffa7-190-90-132-155.ngrok-free.app/orders",
                failure: "https://ffa7-190-90-132-155.ngrok-free.app/orders",
                pending: "https://ffa7-190-90-132-155.ngrok-free.app/orders"
            },
            auto_return: 'approved'
        }
    });
    redirect(preference.sandbox_init_point!)
}