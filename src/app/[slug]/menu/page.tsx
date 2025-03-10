import { notFound } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";

import RestaurantHeader from "./components/header";
import RestaurantCategories from "./components/categories";
import { getRestaurantAndMenuCategories } from "@/actions/get-restaurant-and-menu-categories";

interface RestaurantMenuPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ consumptionMethod: string }>;
}

const isConsumptionMethodValid = (consumptionMethod: string) => {
  return Object.values(ConsumptionMethod).includes(
    consumptionMethod.toUpperCase() as ConsumptionMethod,
  );
};

const RestaurantMenuPage = async ({
  params,
  searchParams,
}: RestaurantMenuPageProps) => {
  const { slug } = await params;
  const { consumptionMethod } = await searchParams;

  if (!isConsumptionMethodValid(consumptionMethod)) return notFound();

  const restaurant = await getRestaurantAndMenuCategories(slug);

  if (!restaurant) return notFound();

  return (
    <div>
      <RestaurantHeader restaurant={restaurant} />
      <RestaurantCategories restaurant={restaurant} />
    </div>
  );
};

export default RestaurantMenuPage;
