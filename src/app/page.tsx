import { notFound } from "next/navigation";

import CardRestaurant from "./[slug]/components/card-restaurant";
import { getAllRestaurants } from "@/actions/get-all-rrestaurants";

const HomePage = async () => {
  const restaurants = await getAllRestaurants();

  if (!restaurants) return notFound();

  return (
    <div className="max-w-1200 mx-auto flex h-full w-full flex-col items-center justify-center space-y-6 px-5 pt-4">
      <h1 className="text-3xl font-semibold">Selecione um restaurante</h1>
      <div className="overflow- grid w-full grid-cols-1 gap-3 sm:w-auto md:grid-cols-2">
        {restaurants.map((restaurant) => (
          <CardRestaurant key={restaurant.id} restaurant={restaurant} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
