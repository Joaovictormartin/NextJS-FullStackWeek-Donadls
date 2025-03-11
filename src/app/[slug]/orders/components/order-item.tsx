"use client";

import Image from "next/image";
import { OrderStatus, Prisma } from "@prisma/client";

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
    if (status === "PENDING") return "Pendente";
    if (status === "FINISHED") return "Finalizado";
    if (status === "IN_PREPARATION") return "Em preparo";
    return " ";
  };

  return (
    <Card>
      <CardContent className="space-y-4 p-5">
        <div
          className={cn(
            "w-fit rounded-full bg-gray-500/50 px-3 py-1 text-xs font-semibold",
            order.status === OrderStatus.FINISHED
              ? "bg-green-400 text-white"
              : "bg-gray-300 text-gray-800/80",
          )}
        >
          {statusLabel(order.status)}
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
