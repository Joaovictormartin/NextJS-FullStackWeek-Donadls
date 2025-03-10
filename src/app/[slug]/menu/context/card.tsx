"use client";

import { Product } from "@prisma/client";
import { createContext, ReactNode, useState } from "react";

export interface CardProduct
  extends Pick<Product, "id" | "name" | "imageUrl" | "price"> {
  quantity: number;
}

export interface ICardContext {
  total: number;
  isOpen: boolean;
  products: CardProduct[];
  toggleOpen: () => void;
  setIsOpen: (isOpen: boolean) => void;
  addProduct: (product: CardProduct) => void;
  removeProduct: (productId: string) => void;
  decreaseProductQuantity: (productId: string) => void;
  incrementProductQuantity: (productId: string) => void;
}

const initialState: ICardContext = {
  total: 0,
  products: [],
  isOpen: false,
  setIsOpen: () => {},
  toggleOpen: () => {},
  addProduct: () => {},
  removeProduct: () => {},
  decreaseProductQuantity: () => {},
  incrementProductQuantity: () => {},
};

export const CardContext = createContext<ICardContext>(initialState);

export const CardProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [products, setProducts] = useState<CardProduct[]>([]);

  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

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

  const removeProduct = (productId: string) => {
    setProducts((prevProducts) =>
      prevProducts.filter((prevProduct) => prevProduct.id !== productId),
    );
  };

  return (
    <CardContext.Provider
      value={{
        total,
        isOpen,
        setIsOpen,
        toggleOpen,
        products,
        addProduct,
        removeProduct,
        decreaseProductQuantity,
        incrementProductQuantity,
      }}
    >
      {children}
    </CardContext.Provider>
  );
};
