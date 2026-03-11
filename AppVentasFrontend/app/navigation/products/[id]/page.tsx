import ProductDetailPage from "../../../../src/features/product-detail/ProductDetailPage";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const productId = Number(id);

  return <ProductDetailPage productId={Number.isFinite(productId) ? productId : null} />;
}