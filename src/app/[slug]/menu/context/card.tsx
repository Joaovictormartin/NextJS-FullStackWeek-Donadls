"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

interface CardProduct
  extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  product: CardProduct[];
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  addProduct: (product: CardProduct) => void;
}

const initialState: ICardContext = {
  isOpen: false,
  product: [],
  setIsOpen: () => {},
  toggleOpen: () => {},
  addProduct: () => {},
};

export const CardContext = createContext<ICardContext>(initialState);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [product, setProduct] = useState<CardProduct[]>([]);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const addProduct = (product: CardProduct) => {
    setProduct((prev) => [...prev, product]);
  };

  return (
    <CardContext.Provider
      value={{ isOpen, setIsOpen, product, addProduct, toggleOpen }}
    >
      {children}
    </CardContext.Provider>
  );
};
