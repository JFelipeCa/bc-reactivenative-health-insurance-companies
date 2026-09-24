import type { Coverage } from '../types/coverage';

// Curated sample data for this learning project; it does not represent an insurer.
const catalog: Coverage[] = [
  { id: 'general', name: 'Medicina general', category: 'Consulta', detail: 'Citas presenciales y virtuales para cuidar tu salud.', monthlyCopay: 12000 },
  { id: 'family', name: 'Medicina familiar', category: 'Consulta', detail: 'Atención integral para todas las personas de tu hogar.', monthlyCopay: 15000 },
  { id: 'pediatrics', name: 'Pediatría', category: 'Especialidad', detail: 'Atención especializada para niños y adolescentes.', monthlyCopay: 18000 },
  { id: 'emergency', name: 'Urgencias', category: 'Atención inmediata', detail: 'Orientación sobre la red de atención de urgencias.', monthlyCopay: 0 },
  { id: 'telehealth', name: 'Telemedicina', category: 'Digital', detail: 'Habla con un profesional de salud desde casa.', monthlyCopay: 10000 },
  { id: 'dental', name: 'Odontología', category: 'Bienestar', detail: 'Servicios dentales preventivos y restaurativos.', monthlyCopay: 16000 },
  { id: 'mental-health', name: 'Salud mental', category: 'Bienestar', detail: 'Orientación y apoyo emocional.', monthlyCopay: 14000 },
  { id: 'labs', name: 'Laboratorio clínico', category: 'Diagnóstico', detail: 'Exámenes con tarifas preferenciales.', monthlyCopay: 9000 },
  { id: 'maternity', name: 'Maternidad', category: 'Especialidad', detail: 'Acompañamiento antes y después del parto.', monthlyCopay: 20000 },
  { id: 'checkup', name: 'Chequeo anual', category: 'Prevención', detail: 'Una revisión preventiva de salud cada año.', monthlyCopay: 0 },
];

export async function fetchCoverages(): Promise<Coverage[]> {
  // Keep an asynchronous boundary so this function can be replaced by a real API.
  return catalog;
}

export const coverageCatalog = catalog;
