import { notFound } from "next/navigation";

import { getProductId } from "@/actions/get-product";
import ProductHeader from "./components/product-header";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const product = await getProductId(productId);

  if (!product) return notFound();

  return (
    <>
      <ProductHeader product={product} />
    </>
  );
};

export default ProductPage;
