"use client";

import { useRouter } from "next/navigation";
import { ChevronLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

const ButtonBack = () => {
  const { push } = useRouter();
  const handleBackClick = () => push("/");

  return (
    <Button
      size="icon"
      variant="secondary"
      onClick={handleBackClick}
      className="absolute left-4 top-4 z-50 rounded-full"
    >
      <ChevronLeftIcon />
    </Button>
  );
};

export default ButtonBack;
