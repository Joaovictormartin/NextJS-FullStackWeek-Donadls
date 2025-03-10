"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardProduct } from "../../context/card";
import { formatCurrency } from "@/helpers/format-currency";

interface CardProductItemProps {
  product: CardProduct;
}

const CardProductItem = ({ product }: CardProductItemProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => setQuantity((prev) => prev + 1);

  const handleDescrementQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

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
              onClick={handleDescrementQuantity}
            >
              <ChevronLeftIcon size={16} />
            </Button>

            <p className="w-7">{product.quantity}</p>

            <Button
              variant={"destructive"}
              className="h-7 w-7 rounded-xl"
              onClick={handleIncrementQuantity}
              disabled={product.quantity === 10}
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
