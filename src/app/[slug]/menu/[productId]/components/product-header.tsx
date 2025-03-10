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
      <Button
        size="icon"
        variant="secondary"
        onClick={handleBackClick}
        className="absolute left-4 top-4 z-50 rounded-full"
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        fill
        alt={product.name}
        src={product.imageUrl}
        className="min-w-[300px] object-contain"
      />

      <Button
        size="icon"
        variant="secondary"
        onClick={handleOpenCart}
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default ProductHeader;
