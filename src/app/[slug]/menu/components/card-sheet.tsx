"use client";

import { useContext, useState } from "react";

import {
  Sheet,
  SheetTitle,
  SheetHeader,
  SheetContent,
  SheetFooter,
} from "@/components/ui/sheet";
import CardItem from "./card-product-item";
import { CardContext } from "../context/card";
import CardProductInfo from "./card-product-info";
import FinishOrderButton from "./finish-order-button";

const CardSheet = () => {
  const { isOpen, setIsOpen, products } = useContext(CardContext);

  const [finishOrderDialogIsOpen, setFinishOrderDialogIsOpen] = useState(false);

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

            <FinishOrderButton
              open={finishOrderDialogIsOpen}
              onOpenChange={setFinishOrderDialogIsOpen}
            />
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default CardSheet;
