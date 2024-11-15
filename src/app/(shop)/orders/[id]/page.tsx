import { redirect } from "next/navigation";
import Image from "next/image";

import { getOrderById } from "@/actions/order/get-order-by-id";
import { currencyFormat } from "@/utils";
import { OrderStatus, PayPalButton, Title } from "@/components";
import MercadoPagoButton from "@/components/mercadopago/MercadoPagoButton";

interface Props {
  params: {
    id: string;
  };
}

export default async function OrdersByIdPage({ params }: Props) {
  const { id } = params;

  const { ok, order } = await getOrderById(id);

  if (!ok) {
    redirect("/");
  }
  const address = order!.OrderAddress!;

  return (
    <section className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden #${id.split("-").at(-1)}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order?.isPaid ?? false} />

            {/* Items */}
            {order!.OrderItem.map((item) => (
              <div
                key={item.product.slug + "-" + item.size}
                className="flex mb-5"
              >
                <Image
                  src={`/products/${item.product.ProductImage[0].url}`}
                  width={100}
                  height={100}
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  alt={item.product.title}
                  className="mr-5 rounded"
                />

                <div>
                  <p>{item.product.title}</p>
                  <p>
                    ${item.price} x {item.quantity}
                  </p>
                  <p className="font-bold">
                    Subtotal: {currencyFormat(item.price * item.quantity)}
                  </p>
                </div>
              </div>
            ))}

            <aside className="px-4 py-2 bg-white shadow-md dark:bg-zinc-900">
              <h3 className="text-sm font-bold">Pudes simular el proceso de pago usando estas cuentas:</h3>
              <div className="mt-2">
                <h4 className="text-md font-bold">Mercado Pago:</h4>
                <span className="block text-sm"><strong>Tarjeta de credito:</strong> 3743 781877 55283</span>
                <span className="block text-sm"><strong>Codigo de seguridad:</strong> 1234</span>
                <span className="block text-sm"><strong>Fecha de caducidad:</strong> 11/25</span>
                <span className="block text-sm"><strong>Usuario:</strong> User</span>
                <span className="block text-sm"><strong>CC:</strong> 1234567890</span>
                <span className="block text-sm"><strong>Email:</strong> userprueba@prueba.com</span>
              </div>
              <div className="mt-2">
                <h4 className="text-md font-bold">Paypal:</h4>
                <span className="block text-sm"><strong>Email:</strong> feliperuiz@gmil.com</span>
                <span className="block text-sm"><strong>Contraseña:</strong> 12345678</span>
              </div>
            </aside>
          </div>

          {/* Checkout - Resumen de orden */}
          <div className="bg-white rounded-xl shadow-xl p-7 dark:bg-zinc-900">
            <h2 className="text-2xl mb-2">Dirección de entrega</h2>
            <div className="mb-10">
              <p className="text-xl">
                {address!.firstName} {address!.lastName}
              </p>
              <p>{address!.address}</p>
              <p>{address!.address2}</p>
              <p>{address!.postalCode}</p>
              <p>
                {address!.city}, {address!.countryId}
              </p>
              <p>{address!.phone}</p>
            </div>

            {/* Divider */}
            <div className="w-full h-0.5 rounded bg-gray-200 mb-10" />

            <h2 className="text-2xl mb-2">Resumen de orden</h2>

            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">
                {order?.itemsInOrder === 1
                  ? "1 artículo"
                  : `${order?.itemsInOrder} artículos`}
              </span>

              <span>Subtotal</span>
              <span className="text-right">
                {currencyFormat(order!.subTotal)}
              </span>

              <span>Impuestos (15%)</span>
              <span className="text-right">{currencyFormat(order!.tax)}</span>

              <span className="mt-5 text-2xl">Total:</span>
              <span className="mt-5 text-2xl text-right">
                {currencyFormat(order!.total)}
              </span>
            </div>

            <div className="mt-5 mb-2 w-full border-blackr">
              {order?.isPaid ? (
                <OrderStatus isPaid={order?.isPaid ?? false} />
              ) : (
                <>
                  <MercadoPagoButton orderId={order!.id} orderItem={order!.OrderItem} />
                  <PayPalButton amount={order!.total} orderId={order!.id} />
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
