import { notFound } from "next/navigation";

import { getProductId } from "@/actions/get-product";
import ProductHeader from "./components/product-header";
import ProductDetails from "./components/product-details";

interface ProductPageProps {
  params: Promise<{ slug: string; productId: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug, productId } = await params;

  const product = await getProductId(productId);

  if (!product) return notFound();
  if (product.restaurant.slug.toUpperCase() !== slug.toUpperCase()) {
    return notFound();
  }

  return (
    <div className="flex h-full flex-col">
      <ProductHeader product={product} />
      <ProductDetails product={product} />
    </div>
  );
};

export default ProductPage;
