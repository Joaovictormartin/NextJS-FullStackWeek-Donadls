"use client";

import Image from "next/image";
import { Restaurant } from "@prisma/client";
import { useRouter } from "next/navigation";

import {
  Card,
  CardTitle,
  CardFooter,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CardRestaurantProps {
  restaurant: Restaurant;
}

const CardRestaurant = ({ restaurant }: CardRestaurantProps) => {
  const { push } = useRouter();

  const handleNavigate = () => push(`/${restaurant.slug}`);

  return (
    <Card key={restaurant.id} className="h-auto w-full p-5 sm:w-[350px]">
      <CardHeader className="flex items-center justify-center p-0">
        <div className="relative h-10 w-10">
          <Image
            fill
            alt={restaurant.slug}
            className="object-contain"
            src={restaurant.avatarImageUrl}
          />
        </div>
        <CardTitle className="text-center">{restaurant.name}</CardTitle>
        <CardDescription className="overflow-hidden truncate text-center">
          {restaurant.description}
        </CardDescription>
      </CardHeader>

      <CardFooter className="mt-4 p-0">
        <Button
          className="w-full"
          onClick={handleNavigate}
          disabled={restaurant.slug !== "fsw-donalds"}
        >
          Acessar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardRestaurant;
