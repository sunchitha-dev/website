import ProductDetailClient from "./ProductDetailClient";

const products = [
  "ethiopian-yirgacheffe",
  "kenyan-aa",
  "colombian-huila",
  "guatemalan-antigua",
  "sumatran-mandheling",
  "costa-rican-tarrazu",
];

export function generateStaticParams() {
  return products.map((slug) => ({ slug }));
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <ProductDetailClient params={params} />;
}
