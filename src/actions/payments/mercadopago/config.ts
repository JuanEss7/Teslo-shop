import { MercadoPagoConfig } from 'mercadopago';

export const clientMP = new MercadoPagoConfig({ accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN ?? '' });