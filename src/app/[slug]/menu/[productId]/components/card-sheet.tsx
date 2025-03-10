"use client";

import { useContext } from "react";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
} from "@/components/ui/sheet";
import CardItem from "./card-product-item";
import { CardContext } from "../../context/card";

const CardSheet = () => {
  const { isOpen, setIsOpen, products } = useContext(CardContext);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[80%] p-5">
        <SheetHeader>
          <SheetTitle className="text-start">Sacola</SheetTitle>
        </SheetHeader>

        <div className="py-5">
          {products.map((product) => (
            <CardItem key={product.id} product={product} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CardSheet;
