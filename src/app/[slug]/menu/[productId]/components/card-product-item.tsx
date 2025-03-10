"use client";

import Image from "next/image";
import { useContext } from "react";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { CardContext, CardProduct } from "../../context/card";

interface CardProductItemProps {
  product: CardProduct;
}

const CardProductItem = ({ product }: CardProductItemProps) => {
  const { decreaseProductQuantity, incrementProductQuantity } =
    useContext(CardContext);

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="relative h-20 w-20 rounded-xl bg-gray-200">
          <Image
            fill
            src={product.imageUrl}
            alt={product.name}
            className="object-contain"
          />
        </div>
        <div className="space-y-1">
          <p className="max-w-[90%] truncate text-xs">{product.name}</p>
          <p className="text-sm font-semibold">
            {formatCurrency(product.price)}
          </p>

          <div className="flex items-center gap-1 text-center">
            <Button
              variant={"outline"}
              className="h-7 w-7 rounded-xl"
              disabled={product.quantity === 1}
              onClick={() => decreaseProductQuantity(product.id)}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <p className="w-7">{product.quantity}</p>

            <Button
              variant={"destructive"}
              className="h-7 w-7 rounded-xl"
              disabled={product.quantity === 10}
              onClick={() => incrementProductQuantity(product.id)}
            >
              <ChevronRightIcon size={16} />
            </Button>
          </div>
        </div>
      </div>

      <Button variant={"outline"} className="h-7 w-7 rounded-lg">
        <TrashIcon />
      </Button>
    </div>
  );
};

export default CardProductItem;
