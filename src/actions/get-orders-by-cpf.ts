"use server";

import { db } from "@/lib/prisma";
import { removeCpfPunctuation } from "@/helpers/cpf";

export const getOrdersByCpf = async (cpf: string) => {
  const orders = await db.order.findMany({
    where: { customerCpf: removeCpfPunctuation(cpf) },
    include: {
      restaurant: {
        select: { name: true, avatarImageUrl: true },
      },
      orderProducts: {
        include: { product: true },
      },
    },
  });
  return orders;
};
