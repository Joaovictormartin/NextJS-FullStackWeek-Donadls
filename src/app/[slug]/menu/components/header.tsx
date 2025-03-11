"use client";

import Image from "next/image";

import { Restaurant } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";
import { ChevronLeftIcon, ScrollTextIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface RestaurantHeaderProps {
  restaurant: Pick<Restaurant, "name" | "coverImageUrl">;
}

const RestaurantHeader = ({ restaurant }: RestaurantHeaderProps) => {
  const { back, push } = useRouter();
  const { slug } = useParams<{ slug: string }>();

  const handleBackClick = () => back();
  const handleNavigateOrder = () => push(`/${slug}/orders`);

  return (
    <div className="relative h-[250px] w-full">
      <Button
        size="icon"
        variant="secondary"
        onClick={handleBackClick}
        className="absolute left-4 top-4 z-50 rounded-full"
      >
        <ChevronLeftIcon />
      </Button>

      <Image
        fill
        alt={restaurant.name}
        className="object-cover"
        src={restaurant.coverImageUrl}
      />

      <Button
        size="icon"
        variant="secondary"
        onClick={handleNavigateOrder}
        className="absolute right-4 top-4 z-50 rounded-full"
      >
        <ScrollTextIcon />
      </Button>
    </div>
  );
};

export default RestaurantHeader;
