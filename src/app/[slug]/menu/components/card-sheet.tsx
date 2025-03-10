"use client";

import { useContext } from "react";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import CardItem from "./card-product-item";
import { CardContext } from "../context/card";
import { Button } from "@/components/ui/button";
import CardProductInfo from "./card-product-info";
import FinishOrderButton from "./finish-order-button";

const CardSheet = () => {
  const { isOpen, setIsOpen, products } = useContext(CardContext);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-[80%] p-5">
        <SheetHeader>
          <SheetTitle className="text-start">Sacola</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col py-5">
          <div className="flex flex-auto flex-col gap-4">
            {products.map((product) => (
              <CardItem key={product.id} product={product} />
            ))}
          </div>

          <SheetFooter className="flex flex-col gap-4">
            <CardProductInfo />

            <FinishOrderButton />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CardSheet;
