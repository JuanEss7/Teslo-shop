"use client"
import { createPreference } from '@/actions'
import { Order } from '@/interfaces/order.interface'
import React from 'react'
interface Props {
    order: Order
}
function MercadoPagoButton(order: Props) {
    function handleClick() {
        createPreference(order.order)
    }
    return (
        <button
            className='p-3 mb-3 w-full bg-blue-500 text-white text-center rounded-sm hover:bg-blue-400 transition-all'
            type='button'
            onClick={handleClick}
        >MercadoPago</button>
    )
}

export default MercadoPagoButton