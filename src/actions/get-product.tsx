import { db } from "@/lib/prisma";

export const getProductId = async (productId: string) => {
  const product = await db.product.findFirst({ where: { id: productId } });
  return product;
};
