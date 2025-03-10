"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CardProduct extends Product {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  product: CardProduct[];
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
}

const initialState: ICardContext = {
  isOpen: false,
  product: [],
  setIsOpen: () => {},
  toggleOpen: () => {},
};

export const CardContext = createContext<ICardContext>(initialState);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<CardProduct[]>([]);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  return (
    <CardContext.Provider value={{ isOpen, setIsOpen, product, toggleOpen }}>
      {children}
    </CardContext.Provider>
  );
};
