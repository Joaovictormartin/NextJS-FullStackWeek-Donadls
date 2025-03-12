"use server";

import { revalidatePath } from "next/cache";
import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";
import { removeCpfPunctuation } from "@/helpers/cpf";
import { getRestaurantBySlug } from "./get-restaurant-by-slug";

interface CreateOrderProps {
  slug: string;
  customerCpf: string;
  customerName: string;
  consumptionMethod: ConsumptionMethod;
  products: Array<{ id: string; quantity: number }>;
}

export const createOrder = async (input: CreateOrderProps) => {
  const restaurant = await getRestaurantBySlug(input.slug);

  if (!restaurant) throw new Error("Restaurante não encontrado");

  const productWithPrices = await db.product.findMany({
    where: { id: { in: input.products.map((product) => product.id) } },
  });

  const productsWithPricesAndQuantity = input.products.map((product) => ({
    productId: product.id,
    quantity: product.quantity,
    price: productWithPrices.find((p) => p.id === product.id)!.price,
  }));

  const totalProducts = productsWithPricesAndQuantity.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0,
  );

  const order = await db.order.create({
    data: {
      status: "PENDING",
      restaurantId: restaurant.id,
      customerName: input.customerName,
      consumptionMethod: input.consumptionMethod,
      customerCpf: removeCpfPunctuation(input.customerCpf),
      orderProducts: {
        createMany: {
          data: productsWithPricesAndQuantity,
        },
      },
      total: totalProducts,
    },
  });

  revalidatePath(`/${input.slug}/orders`);

  return order;
};
