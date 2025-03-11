"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { PatternFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { usePathname, useRouter } from "next/navigation";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { isValidCpf, removeCpfPunctuation } from "@/helpers/cpf";

const formSchema = z.object({
  cpf: z
    .string()
    .trim()
    .min(11, { message: "O CPF é obrigatório" })
    .refine((value) => isValidCpf(value), { message: "CPF inválido" }),
});

const CpfForm = () => {
  const pathName = usePathname();
  const { back, push } = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cpf: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    push(`${pathName}?cpf=${removeCpfPunctuation(data.cpf)}`);
  };

  const handleCancel = () => back();

  return (
    <Drawer open={true}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Visualizar Pedidos</DrawerTitle>
          <DrawerDescription>
            Insira seu CPF abaixo para visualizar seus pedidos
          </DrawerDescription>
        </DrawerHeader>

        <div className="p-5">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                  <Button
                    variant="secondary"
                    onClick={handleCancel}
                    className="w-full rounded-full"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>

                <Button
                  type="submit"
                  variant={"destructive"}
                  className="w-full rounded-full"
                >
                  Confirmar
                </Button>
              </DrawerFooter>
            </form>
          </Form>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default CpfForm;
