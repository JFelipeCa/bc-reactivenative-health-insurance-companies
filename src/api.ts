export type RemoteCoverage = {
  id: string;
  name: string;
  category: string;
  detail: string;
};

type ProductResponse = {
  products: Array<{ id: number; title: string; description: string }>;
};

const categories = ['Consulta', 'Especialidad', 'Prevencion', 'Bienestar'];

export async function fetchCoverages(): Promise<RemoteCoverage[]> {
  const response = await fetch('https://dummyjson.com/products?limit=10');
  if (!response.ok) {
    throw new Error('Coverage data could not be loaded.');
  }

  const payload = (await response.json()) as ProductResponse;
  return payload.products.map((product, index) => ({
    id: String(product.id),
    name: product.title,
    category: categories[index % categories.length],
    detail: product.description,
  }));
}
