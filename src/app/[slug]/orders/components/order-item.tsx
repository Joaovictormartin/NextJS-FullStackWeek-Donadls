"use client";

import Image from "next/image";
import { ConsumptionMethod, OrderStatus, Prisma } from "@prisma/client";

import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";

interface OrderItemProps {
  order: Prisma.OrderGetPayload<{
    include: {
      restaurant: {
        select: { name: true; avatarImageUrl: true };
      };
      orderProducts: {
        include: { product: true };
      };
    };
  }>;
}

const OrderItem = ({ order }: OrderItemProps) => {
  const statusLabel = (status: OrderStatus) => {
    if (status === OrderStatus.PENDING) return "Pendente";
    if (status === OrderStatus.FINISHED) return "Finalizado";
    if (status === OrderStatus.IN_PREPARATION) return "Em preparo";
    if (status === OrderStatus.PAYMENT_FAILED) return "Pagamento falhou";
    if (status === OrderStatus.PAYMENT_CONFIRMED) return "Pagamento confirmado";
    return " ";
  };

  const consumptionMethodLabel = (status: ConsumptionMethod) => {
    if (status === ConsumptionMethod.TAKEAWAY) return "Para levar";
    if (status === ConsumptionMethod.DINE_IN) return "Para comer aqui";
    return " ";
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-fit rounded-full px-3 py-1 text-xs font-semibold",
              [
                (OrderStatus.FINISHED,
                OrderStatus.PAYMENT_CONFIRMED) as OrderStatus,
              ].includes(order.status)
                ? "bg-green-500 text-white"
                : "bg-gray-300 text-gray-800/80",
            )}
          >
            {statusLabel(order.status)}
          </div>

          <div
            className={cn(
              "w-fit rounded-full px-3 py-1 text-xs font-semibold text-white",
              order.consumptionMethod === ConsumptionMethod.DINE_IN
                ? "bg-red-400"
                : "bg-green-500",
            )}
          >
            {consumptionMethodLabel(order.consumptionMethod)}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative h-5 w-5">
            <Image
              fill
              alt={order.restaurant.name}
              className="rounded-sm object-contain"
              src={order.restaurant.avatarImageUrl}
            />
          </div>
          <p className="text-sm font-semibold">{order.restaurant.name}</p>
        </div>

        <Separator />

        <div className="space-y-3">
          {order.orderProducts.map((orderProduct) => (
            <div key={orderProduct.id} className="flex items-center gap-2">
              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-400 font-semibold text-white">
                {orderProduct.quantity}
              </div>
              <p className="text-sm">{orderProduct.product.name}</p>
            </div>
          ))}
        </div>

        <Separator />

        <p className="text-sm font-medium">{formatCurrency(order.total)}</p>
      </CardContent>
    </Card>
  );
};

export default OrderItem;
