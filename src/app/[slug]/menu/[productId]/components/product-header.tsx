"use client";

import Image from "next/image";
import { useContext } from "react";
import { Product } from "@prisma/client";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CardContext } from "../../context/card";

interface ProductHeaderProps {
  product: Pick<Product, "name" | "imageUrl">;
}

const ProductHeader = ({ product }: ProductHeaderProps) => {
  const { back } = useRouter();
  const { toggleOpen } = useContext(CardContext);

  const handleBackClick = () => back();

  const handleOpenCart = () => toggleOpen();

  return (
    <div className="relative h-[300px] w-full">
      <Image
        fill
        alt={product.name}
        src={product.imageUrl}
        className="min-w-[300px] object-contain"
      />

      <div className="max-w-1200 relative mx-auto">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleBackClick}
          className="absolute left-4 top-4 z-50 rounded-full"
        >
          <ChevronLeftIcon />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={handleOpenCart}
          className="absolute right-4 top-4 z-50 rounded-full"
        >
          <ScrollTextIcon />
        </Button>
      </div>
    </div>
  );
};

export default ProductHeader;
