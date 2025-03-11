"use client";

import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

import OrderItem from "./order-item";
import { Button } from "@/components/ui/button";

interface OrderListProps {
  orders: Array<
    Prisma.OrderGetPayload<{
      include: {
        restaurant: {
          select: { name: true; avatarImageUrl: true };
        };
        orderProducts: {
          include: { product: true };
        };
      };
    }>
  >;
}

const OrderList = ({ orders }: OrderListProps) => {
  const { back } = useRouter();

  const handleGoBack = () => back();

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Button
          size={"icon"}
          variant={"secondary"}
          onClick={handleGoBack}
          className="rounded-full"
        >
          <ChevronLeftIcon />
        </Button>
      </div>

      <div className="flex items-center gap-3">
        <ScrollTextIcon />
        <h2 className="text-lg font-semibold">Meus Pedidos</h2>
      </div>

      {orders.map((order) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </div>
  );
};

export default OrderList;
