import Link from "next/link";
import Image from "next/image";
import { ConsumptionMethod } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ConsumptionMethodOptionProps {
  slug: string;
  imageUrl: string;
  imageAlt: string;
  buttonText: string;
  option: ConsumptionMethod;
}

const ConsumptionMethodOption = ({
  slug,
  option,
  imageAlt,
  imageUrl,
  buttonText,
}: ConsumptionMethodOptionProps) => {
  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-8 py-8">
        <div className="relative h-[80px] w-[80px]">
          <Image
            fill
            src={imageUrl}
            alt={imageAlt}
            className="object-contain"
          />
        </div>
        <Button variant="secondary" className="rounded-full" asChild>
          <Link href={`/${slug}/menu?consumptionMethod=${option}`}>
            {buttonText}
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default ConsumptionMethodOption;
