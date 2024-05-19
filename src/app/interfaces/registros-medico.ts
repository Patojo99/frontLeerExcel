export interface RegistrosMedico {
  id: number
  nombre_archivo: string
  paciente_id: number
  rut?: string
  fecha_control_medico?: string
  fecha_control_medico_abrev?: string
  fecha_control_enf?: string
  fecha_control_nutri?: string
  protocolo_hearts?: string
  edad?: string
  peso?: string
  talla?: string
  imc?: string
  dg_nutricional?: string
  cc?: string
  presion_sistolica?: string
  presion_diastolica?: string
  fc?: string
  sedentarismo?: string
  tabaquismo: string
  amputacion_pie_diabetico: string
  iam?: string
  acv?: string
  fecha_examen_lab?: string
  glicemia?: string
  col_total?: string
  trigli?: string
  hdl?: string
  ldl?: string
  fecha_crea?: string
  crea?: string
  vfg?: string
  fecha_microalb_rac?: string
  micro_alb?: string
  rac?: string
  fecha_hba1c?: string
  valor_hba1c?: string
  fecha_ptgo?: string
  ptgo_ayunas?: string
  ptgo_post_carga?: string
  fecha_tsh?: string
  valor_tsh?: string
  fecha_ekg?: string
  fecha_pie_diabetico?: string
  resultado_pie_diabetico?: string
  fecha_podologia?: string
  fecha_f_ojo?: string
  resultado_fo?: string
  aas?: string
  atv?: string
  ieca_ara2?: string
  insulina?: string
  erc?: string
  riesgo_cardiovascular?: string
  fecha_rx_cadera?: string
  fecha_rx_rodilla?: string
  nombre_medico?: string
  nombre_enfermera?: string
  nombre_nutricionista?: string
  prox_control_medico?: string
  prox_control_medico_abreviado?: string
  prox_control_enf?: string
  prox_control_nutri?: string
  observaciones?: string
  created_at: string
  updated_at: string
}
