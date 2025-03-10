import { CardProvider } from "@/app/[slug]/menu/context/card";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return <CardProvider>{children}</CardProvider>;
};
