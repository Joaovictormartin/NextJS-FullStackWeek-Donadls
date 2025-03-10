import Image from "next/image";
import { notFound } from "next/navigation";
import { ConsumptionMethod } from "@prisma/client";

import { getRestaurantBySlug } from "@/actions/get-restaurant-by-slug";
import ConsumptionMethodOption from "./components/consumption-method-option";

interface RestaurantPageProps {
  params: Promise<{ slug: string }>;
}

const RestaurantPage = async ({ params }: RestaurantPageProps) => {
  const { slug } = await params;
  const restaurant = await getRestaurantBySlug(slug);

  if (!restaurant) return notFound();

  return (
    <div className="flex h-screen flex-col items-center justify-center px-6 pt-24">
      <div className="flex flex-col items-center gap-2">
        <Image
          width={82}
          height={82}
          alt={restaurant.name}
          src={restaurant.avatarImageUrl}
        />
        <h2 className="font-semibold">{restaurant.name}</h2>
      </div>

      <div className="space-y-2 pt-24 text-center">
        <h3 className="text-2xl font-semibold">Seja bem-vindo!</h3>
        <p className="opacity-55">
          Escolha como prefere aproveitar sua refeição. Estamos aqui para
          oferecer praticidade e sabor em cada detalhe!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 pt-14">
        <ConsumptionMethodOption
          slug={slug}
          imageAlt="Comer aqui"
          imageUrl="/dine_in.png"
          buttonText="Para comer aqui"
          option={ConsumptionMethod.DINE_IN}
        />
        <ConsumptionMethodOption
          slug={slug}
          imageAlt="Para levar"
          buttonText="Para levar"
          imageUrl="/takeaway.png"
          option={ConsumptionMethod.TAKEAWAY}
        />
      </div>
    </div>
  );
};

export default RestaurantPage;
