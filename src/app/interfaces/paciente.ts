import { Timestamp } from "rxjs"

export interface Paciente {
  id?               : number
  nombre_archivo    : string
  sector            : number
  nombre            : string
  apellido_materno  : string
  apellido_paterno  : string
  rut               : string
  sexo              : string
  direccion         : string
  telefono          : string
  fecha_nacimiento  : string
  fecha_ingreso     : string
  hta               : boolean
  dm2               : boolean
  dlp               : boolean
  hipot             : boolean
  artrosis          : boolean
  epilepsia         : boolean
  otra              : string
  poblacion_migrante: boolean
  pueblo_originario : boolean
}
