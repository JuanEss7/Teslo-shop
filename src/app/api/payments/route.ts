"use server"
import { clientMP } from "@/actions";
import prisma from "@/lib/prisma";
import { Payment } from "mercadopago";
import { revalidatePath } from "next/cache";
import { NextRequest } from "next/server";
interface Body {
    action: string,
    api_version: string,
    data: { id: string },
    date_created: string,
    id: string,
    live_mode: boolean,
    type: string,
    user_id: number
}
export async function POST(request: NextRequest) {
    const body: Body = await request.json();
    const { data } = body;
    if (!data.id) return
    try {
        const payment = await new Payment(clientMP).get({ id: data.id });
        const orderId = payment.additional_info?.items[0].id ?? '';
        await prisma.order.update({
            where: { id: orderId },
            data: {
                isPaid: true,
                paidAt: payment.date_approved
            }
        })
        return Response.json({ success: true }, { status: 200 })
    } catch (error) {
        console.log(error);
        return Response.json({ ok: false, message: '500 - El pago no se pudo realizar' }, { status: 500 })
    }
}