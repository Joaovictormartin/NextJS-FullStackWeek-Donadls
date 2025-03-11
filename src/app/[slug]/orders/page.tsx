import { isValidCpf } from "@/helpers/cpf";
import CpfForm from "./components/cpf-form";
import OrderList from "./components/order-list";
import { getOrdersByCpf } from "@/actions/get-orders-by-cpf";

interface OrdersPageProps {
  searchParams: Promise<{ cpf: string }>;
}

const OrdersPage = async ({ searchParams }: OrdersPageProps) => {
  const { cpf } = await searchParams;

  if (!cpf) return <CpfForm />;
  if (!isValidCpf(cpf)) return <CpfForm />;

  const orders = await getOrdersByCpf(cpf);

  return <OrderList orders={orders} />;
};

export default OrdersPage;
