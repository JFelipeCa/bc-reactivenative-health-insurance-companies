export type RemoteCoberturas = {
  id: string;
  name: string;
  category: string;
  detail: string;
};

type ProductResponse = {
  products: Array<{ id: number; title: string; description: string }>;
};

const coverageNames = ['Consulta general', 'Medicina familiar', 'pediatría', 'Urgencias', 'Telemedicina', 'odontología', 'Salud mental', 'Laboratorio clinico', 'Maternidad', 'Chequeo anual'];
const categories = ['Consulta', 'Especialidad', 'prevención', 'Bienestar'];

export async function fetchCoberturass(): Promise<RemoteCoberturas[]> {
  const response = await fetch('https://dummyjson.com/products?limit=10');
  if (!response.ok) {
    throw new Error('No se pudieron cargar los datos de cobertura.');
  }

  const payload = (await response.json()) as ProductResponse;
  return payload.products.map((product, index) => ({
    id: String(product.id),
    name: coverageNames[index] ?? product.title,
    category: categories[index % categories.length],
    detail: `Servicio disponible en la red EPS e IPS.`,
  }));
}

