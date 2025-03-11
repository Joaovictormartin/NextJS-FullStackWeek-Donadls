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
      <Image
        fill
        alt={restaurant.name}
        src={restaurant.coverImageUrl}
        className="hidden object-fill opacity-30 blur-xl md:block"
      />

      <Image
        fill
        alt={restaurant.name}
        src={restaurant.coverImageUrl}
        className="max-w-1200 relative z-10 mx-auto object-cover md:object-contain"
      />

      <div className="max-w-1200 relative mx-auto">
        <Button
          size="icon"
          variant="secondary"
          onClick={handleBackClick}
          className="absolute left-4 top-4 z-50 rounded-full"
        >
          <ChevronLeftIcon />
        </Button>

        <Button
          size="icon"
          variant="secondary"
          onClick={handleNavigateOrder}
          className="absolute right-4 top-4 z-50 rounded-full"
        >
          <ScrollTextIcon />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantHeader;
