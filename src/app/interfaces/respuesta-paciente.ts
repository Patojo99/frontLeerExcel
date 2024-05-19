import { Paciente3 } from './paciente3';

export interface RespuestaPaciente {
  message: string
  statusCode: number
  error: boolean
  data: Paciente3[]
}
