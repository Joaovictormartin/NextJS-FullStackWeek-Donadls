"use client";

import Link from "next/link";
import { Prisma } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon, ScrollTextIcon, RefreshCcw } from "lucide-react";

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
  const { refresh } = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const handleRefreshClick = () => refresh();

  return (
    <div className="mx-auto max-w-1200 space-y-6 p-6">
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

        <Button
          size={"icon"}
          variant={"secondary"}
          className="rounded-full"
          onClick={handleRefreshClick}
        >
          <RefreshCcw />
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
