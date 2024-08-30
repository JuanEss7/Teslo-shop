"use server"
import { clientMP } from "@/actions";
import { Payment } from "mercadopago";
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
    const { id } = body;
    console.log({ body })
    const payment = await new Payment(clientMP).get({ id });
    console.log({ payment })
    return Response.json({ success: true }, { status: 200 })
}