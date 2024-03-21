import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente } from "../interfaces/paciente";

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private baseUrl = 'http://127.0.0.1:8000/';



  constructor( private http: HttpClient ) { }


  agregarPaciente( datosPaciente: Paciente ):Observable<any>{

    // console.log(datosPaciente, 'desde el servicio');

    return this.http.post(`${this.baseUrl}api/pacientes`,datosPaciente);
  }

  agregarRegistrosMedicos(datosRegistroMedico: any):Observable<any> {
    return this.http.post(`${this.baseUrl}api/registrosmedicos`, datosRegistroMedico);
  }



}
