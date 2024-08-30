"use server"

import { Preference } from "mercadopago"
import { clientMP } from "./config"
import { redirect } from "next/navigation";
import type { Order } from "@/interfaces/order.interface";

export async function createPreference(order: Order) {
    if (!order) return
    if (!order.OrderItem) return
    if (order.OrderItem.length < 1) return
    const items = order.OrderItem.map((item) => {
        return {
            id: order.id,
            title: item.product.title,
            quantity: item.quantity,
            unit_price: item.price
        }
    }
    )
    const preference = await new Preference(clientMP).create({
        body: {
            items
        }
    });
    redirect(preference.sandbox_init_point!)
}