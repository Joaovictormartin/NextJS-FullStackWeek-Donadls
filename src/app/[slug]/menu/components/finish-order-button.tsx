"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { Loader2Icon } from "lucide-react";
import { useContext, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { ConsumptionMethod } from "@prisma/client";
import { PatternFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useSearchParams } from "next/navigation";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { isValidCpf } from "@/helpers/cpf";
import { Input } from "@/components/ui/input";
import { CardContext } from "../context/card";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/actions/create-order";
import { createStripeCheckout } from "@/actions/create-stripe-checkout";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

interface FinishOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const formSchema = z.object({
  name: z.string().trim().min(2, { message: "O nome é obrigatório" }),
  cpf: z
    .string()
    .trim()
    .min(11, { message: "O CPF é obrigatório" })
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

const FinishOrderButton = ({ open, onOpenChange }: FinishOrderDialogProps) => {
  const searchParams = useSearchParams();
  const { products } = useContext(CardContext);
  const { slug } = useParams<{ slug: string }>();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    shouldUnregister: true,
    defaultValues: {
      cpf: "",
      name: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const consumptionMethod = searchParams.get(
        "consumptionMethod",
      ) as ConsumptionMethod;

      const { id: orderId } = await createOrder({
        slug,
        products,
        consumptionMethod,
        customerCpf: data.cpf,
        customerName: data.name,
      });

      if (!stripePublicKey) return;

      const { sessionId } = await createStripeCheckout({
        slug,
        orderId,
        products,
        cpf: data.cpf,
        consumptionMethod,
      });
      const stripe = await loadStripe(stripePublicKey);
      stripe?.redirectToCheckout({ sessionId });
    } catch (error) {
      console.error("🚀 ~ onSubmit ~ error:", error);
    } finally {
      onOpenChange(false);
      setIsLoading(false);
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerTrigger asChild>
        <Button className="w-full rounded-full">Finalizar pedido</Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Quase lá!</DrawerTitle>
          <DrawerDescription>
            Para finalizar o seu pedido, insira os seus dados abaixo.
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                name="name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Digite seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                name="cpf"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Seu CPF</FormLabel>
                    <FormControl>
                      <PatternFormat
                        customInput={Input}
                        format="###.###.###-##"
                        placeholder="Digite seu CPF"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DrawerFooter className="flex flex-row justify-between p-0">
                <DrawerClose asChild>
                  <Button className="w-full rounded-full" variant="secondary">
                    Cancel
                  </Button>
                </DrawerClose>

                <Button
                  type="submit"
                  disabled={isLoading}
                  variant={"destructive"}
                  className="w-full rounded-full"
                >
                  {isLoading && <Loader2Icon className="animate-spin" />}
                  Finalizar
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default FinishOrderButton;
