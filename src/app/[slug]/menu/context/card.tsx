"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CardProduct
  extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

export interface ICardContext {
  isOpen: boolean;
  products: CardProduct[];
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  addProduct: (product: CardProduct) => void;
  decreaseProductQuantity: (productId: string) => void;
  incrementProductQuantity: (productId: string) => void;
}

const initialState: ICardContext = {
  isOpen: false,
  products: [],
  setIsOpen: () => {},
  toggleOpen: () => {},
  addProduct: () => {},
  decreaseProductQuantity: () => {},
  incrementProductQuantity: () => {},
};

export const CardContext = createContext<ICardContext>(initialState);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CardProduct[]>([]);

  const toggleOpen = () => setIsOpen((prevState) => !prevState);

  const addProduct = (product: CardProduct) => {
    const productIsAlreadyOnTheCart = products.some(
      (prevProduct) => prevProduct.id === product.id,
    );
    if (!productIsAlreadyOnTheCart) {
      return setProducts((prevProducts) => [...prevProducts, product]);
    }

    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id === product.id) {
          return {
            ...prevProduct,
            quantity: prevProduct.quantity + product.quantity,
          };
        }
        return prevProduct;
      });
    });
  };

  const decreaseProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) return prevProduct;
        if (prevProduct.quantity === 1) return prevProduct;

        return { ...prevProduct, quantity: prevProduct.quantity - 1 };
      });
    });
  };

  const incrementProductQuantity = (productId: string) => {
    setProducts((prevProducts) => {
      return prevProducts.map((prevProduct) => {
        if (prevProduct.id !== productId) return prevProduct;

        return { ...prevProduct, quantity: prevProduct.quantity + 1 };
      });
    });
  };

  return (
    <CardContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toggleOpen,
        products,
        addProduct,
        decreaseProductQuantity,
        incrementProductQuantity,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
