"use server";

import { db } from "@/lib/prisma";

export const getAllRestaurants = async () => {
  const restaurants = await db.restaurant.findMany({
    orderBy: { createdAt: "desc" },
  });
  return restaurants;
};
