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
                success: "https://teslo-shop-vert.vercel.app/orders",
                failure: "https://teslo-shop-vert.vercel.app/orders",
                pending: "https://teslo-shop-vert.vercel.app/orders"
            },
            auto_return: 'approved'
        }
    });
    redirect(preference.sandbox_init_point!)
}