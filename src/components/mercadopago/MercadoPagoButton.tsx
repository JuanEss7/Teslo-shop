"use client"
import { createPreference } from '@/actions'
import { Item } from '@/interfaces/order.interface'
import React from 'react'
interface Props {
    orderId: string
    orderItem: Item[]
}
function MercadoPagoButton({ orderItem, orderId }: Props) {
    function handleClick() {
        createPreference({ orderItem, orderId })
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