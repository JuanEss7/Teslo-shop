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