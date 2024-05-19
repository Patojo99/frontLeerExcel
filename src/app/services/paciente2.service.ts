import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paciente2 } from "../interfaces/paciente2";

@Injectable({
  providedIn: 'root'
})
export class PacienteService2 {

  private baseUrl = 'http://127.0.0.1:8000/';



  constructor( private http: HttpClient ) { }


  agregarPaciente2( datosPaciente: Paciente2 ):Observable<any>{
    return this.http.post(`${this.baseUrl}api/pacientes2`,datosPaciente);
  }





}
