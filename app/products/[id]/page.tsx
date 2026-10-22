import { notFound } from "next/navigation";
import { getProductById } from "@/services/productService";
import ProductDetail from "@/features/products/ProductDetails";
import { Product } from "@/features/products/types/products";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  try {
    const res = await getProductById(id);
    const product: Product = res?.data ?? res;

    if (!product?.id) {
      notFound();
    }

    return <ProductDetail product={product} />;
  } catch {
    notFound();
  }
}