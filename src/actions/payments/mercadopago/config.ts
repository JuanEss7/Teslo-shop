import { MercadoPagoConfig, Payment } from 'mercadopago';

// Step 2: Initialize the client object
export const clientMP = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? '' });