"use client"
import { createPreference } from '@/actions'
import { Order } from '@/interfaces/order.interface'
import React from 'react'
interface Props {
    order: Order
}
function MercadoPagoButton(order: Props) {
    function handleClick() {
        console.log({ order })
        console.log('jp;a')
        createPreference(order.order)
    }
    return (
        <button
            type='button'
            onClick={handleClick}
        >Pagar con MercadoPago</button>
    )
}

export default MercadoPagoButton