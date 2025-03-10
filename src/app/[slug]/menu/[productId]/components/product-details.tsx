"use client";

import Image from "next/image";
import { Prisma } from "@prisma/client";
import { useContext, useState } from "react";
import { ChefHatIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import CardSheet from "./card-sheet";
import { Button } from "@/components/ui/button";
import { CardContext } from "../../context/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { formatCurrency } from "@/helpers/format-currency";

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
  const { addProduct, toggleOpen } = useContext(CardContext);

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrementQuantity = () => setQuantity((prev) => prev + 1);

  const handleDescrementQuantity = () => {
    setQuantity((prev) => (prev === 1 ? 1 : prev - 1));
  };

  const handleAddToCart = () => {
    const payload = { ...product, quantity };

    addProduct(payload);
    toggleOpen();
  };

  return (
    <div className="z-50 mt-[-1.5rem] flex flex-1 flex-col overflow-hidden rounded-t-3xl p-5">
      <div className="flex-1 overflow-hidden">
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

        <div className="mt-3 flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {formatCurrency(product.price)}
          </h3>

          <div className="flex items-center gap-3 text-center">
            <Button
              variant={"outline"}
              disabled={quantity === 1}
              className="h-8 w-8 rounded-xl"
              onClick={handleDescrementQuantity}
            >
              <ChevronLeftIcon />
            </Button>

            <p className="w-4">{quantity}</p>

            <Button
              variant={"destructive"}
              disabled={quantity === 10}
              className="h-8 w-8 rounded-xl"
              onClick={handleIncrementQuantity}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <ScrollArea className="h-full">
          <div className="mt-6 space-y-3">
            <h4 className="font-semibold">Sobre</h4>
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
          </div>

          {product.ingredients.length > 0 && (
            <div className="mt-6 space-y-3">
              <div className="flex items-center gap-1.5">
                <ChefHatIcon size={18} />
                <h4 className="font-semibold">Ingredientes</h4>
              </div>
              <ul className="list-disc px-5 text-sm text-muted-foreground">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
          )}
        </ScrollArea>
      </div>

      <Button onClick={handleAddToCart} className="mt-3 w-full rounded-full">
        Adicionar à Sacola
      </Button>

      <CardSheet />
    </div>
  );
};

export default ProductDetails;
