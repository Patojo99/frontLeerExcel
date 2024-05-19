import { RegistrosMedico } from './registros-medico'

export interface Paciente3 {
  id: number
  nombre_archivo: string
  sector: string
  nombre?: string
  apellido_paterno?: string
  apellido_materno?: string
  rut?: string
  sexo?: string
  direccion?: string
  telefono?: string
  fecha_nacimiento?: string
  fecha_ingreso?: string
  hta?: string
  hta2: number
  dm2: string
  dm2_2: number
  dlp: string
  dlp2: number
  hipot: string
  hipot2: number
  artrosis: string
  artrosis2: number
  epilepsia?: string
  epilepsia2: number
  otra?: string
  poblacion_migrante: string
  poblacion_migrante2: number
  pueblo_originario: string
  pueblo_originario2: number
  created_at: string
  updated_at: string
  registros_medicos: RegistrosMedico[]
}
