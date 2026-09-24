export type RemoteCoverage = {
  id: string;
  name: string;
  category: string;
  detail: string;
};

const catalog: RemoteCoverage[] = [
  { id: 'general', name: 'Medicina general', category: 'Consulta', detail: 'Citas presenciales y virtuales para cuidar tu salud.' },
  { id: 'family', name: 'Medicina familiar', category: 'Consulta', detail: 'Atenci\u00f3n integral para las personas de tu hogar.' },
  { id: 'pediatrics', name: 'Pediatr\u00eda', category: 'Especialidad', detail: 'Atenci\u00f3n especializada para ni\u00f1os y adolescentes.' },
  { id: 'emergency', name: 'Urgencias', category: 'Atenci\u00f3n inmediata', detail: 'Consulta la red de atenci\u00f3n de urgencias.' },
  { id: 'telehealth', name: 'Telemedicina', category: 'Digital', detail: 'Habla con un profesional de salud desde casa.' },
  { id: 'dental', name: 'Odontolog\u00eda', category: 'Bienestar', detail: 'Servicios dentales preventivos y restaurativos.' },
  { id: 'mental-health', name: 'Salud mental', category: 'Bienestar', detail: 'Orientaci\u00f3n y apoyo emocional.' },
  { id: 'labs', name: 'Laboratorio cl\u00ednico', category: 'Diagn\u00f3stico', detail: 'Ex\u00e1menes con tarifas ilustrativas.' },
  { id: 'maternity', name: 'Maternidad', category: 'Especialidad', detail: 'Acompa\u00f1amiento antes y despu\u00e9s del parto.' },
  { id: 'checkup', name: 'Chequeo anual', category: 'Prevenci\u00f3n', detail: 'Una revisi\u00f3n preventiva cada a\u00f1o.' },
];

function isCoverage(value: unknown): value is RemoteCoverage {
  if (value === null || typeof value !== 'object') return false;
  const item = value as Record<string, unknown>;
  return typeof item.id === 'string' && typeof item.name === 'string'
    && typeof item.category === 'string' && typeof item.detail === 'string';
}

export async function fetchCoverages(): Promise<RemoteCoverage[]> {
  const baseUrl = process.env.EXPO_PUBLIC_API_URL?.replace(/\/$/, '');
  if (!baseUrl) return catalog;

  const response = await fetch(`${baseUrl}/coverages`);
  if (!response.ok) throw new Error('No se pudieron cargar las coberturas.');
  const payload: unknown = await response.json();
  if (!Array.isArray(payload) || !payload.every(isCoverage)) {
    throw new Error('La API devolvi\u00f3 un cat\u00e1logo de coberturas inv\u00e1lido.');
  }
  return payload;
}
