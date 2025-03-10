"use client";

import Image from "next/image";
import { useState } from "react";
import { Prisma } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/helpers/format-currency";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true;
          avatarImageUrl: true;
        };
      };
    };
  }>;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => setQuantity((prev) => prev + 1);
  const handleDescrementQuantity = () =>
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));

  return (
    <div className="z-50 mt-[-1.5rem] flex flex-1 flex-col rounded-t-3xl p-5">
      <div className="flex-1">
        <div className="flex items-center gap-1.5">
          <Image
            width={16}
            height={16}
            className="rounded-full"
            alt={product.restaurant.name}
            src={product.restaurant.avatarImageUrl}
          />

          <p className="text-xs text-muted-foreground">
            {product.restaurant.name}
          </p>
        </div>

        <h1 className="text-xl font-semibold">{product.name}</h1>

        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>

          <div className="flex items-center gap-3 text-center">
            <Button
              variant={"outline"}
              className="h-8 w-8 rounded-xl"
              onClick={handleDescrementQuantity}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="w-4">{quantity}</p>

            <Button
              variant={"destructive"}
              className="h-8 w-8 rounded-xl"
              onClick={handleIncrementQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <h4 className="font-semibold">Sobre</h4>
          <p className="text-sm text-muted-foreground">{product.description}</p>
        </div>

        <div className="mt-6 space-y-3">
          <div className="flex items-center gap-1.5">
            <ChefHatIcon />
            <h4 className="font-semibold">Ingredientes</h4>
          </div>
          <ul>
            {product.ingredients.map((ingredient) => (
              <li key={ingredient} className="text-sm text-muted-foreground">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <Button className="mt-6 w-full rounded-full">Adicionar à Sacola</Button>
    </div>
  );
};

export default ProductDetails;
