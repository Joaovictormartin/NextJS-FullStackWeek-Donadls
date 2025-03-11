"use client";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { useParams } from "next/navigation";
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
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="max-w-1200 mx-auto space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Button
          asChild
          size={"icon"}
          variant={"secondary"}
          className="rounded-full"
        >
          <Link href={`/${slug}`}>
            <ChevronLeftIcon />
          </Link>
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

//menu?consumptionMethod=DINE_IN
