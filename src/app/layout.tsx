import type { Metadata } from "next";
import { inter } from "@/config/fonts";

import "./globals.css";
import { Providers } from "@/components";

export const metadata: Metadata = {
  title: {
    template: "%s - Teslo | Shop",
    default: "Home - Teslo | Shop",
  },
  description: "Una tienda virtual de productos",
  openGraph: {
    title: "Teslo | Shop",
    description: "Proyecto personal que simula una tienda virtual, diseñado para explorar y entender los procesos de comercio electrónico. Incluye la navegación de productos, gestión de carrito de compras y simulación de pagos, proporcionando una experiencia interactiva y educativa",
    images: "/teslo-shop.webp",
    url: "https://teslo-shop-vert.vercel.app/",
    type: "website"
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
