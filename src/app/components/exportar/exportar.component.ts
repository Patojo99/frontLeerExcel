import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { Paciente } from '../../interfaces/paciente';
import { PacienteService } from "../../services/paciente.service";
import { PacienteService2 } from '../../services/paciente2.service';
import { Paciente2 } from '../../interfaces/paciente2';
import { RespuestaPaciente } from '../../interfaces/respuesta-paciente';

@Component({
  selector: 'app-exportar',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './exportar.component.html',
  styleUrl: './exportar.component.css'
})
export class ExportarComponent implements OnInit {

  // public pacientes: Paciente[] = [];
  public pacientes: RespuestaPaciente[] = [];

  constructor(private pacienteService: PacienteService,
              private pacienteService2: PacienteService2
  ) {

  }

  ngOnInit(): void {

  }

  async exportar() {
    console.log('Exportar 1');

    await this.cargaPacientes();

    console.log('los pacientes 2', this.pacientes);

    // const arreglo = Object.entries(this.pacientes);
    // console.log('Arreglo:', arreglo);

    // console.log(typeof this.pacientes);

    const json = JSON.stringify(this.pacientes);

    const data = JSON.parse(json);

    // console.log(typeof data);
    // console.log(data);

    // Iterar sobre cada paciente
    data.data.forEach((paciente: any) => {

      // Convertir el RUT
      var rut: any = paciente.rut;
      if (paciente.rut !== null) {
        var rutPaso = paciente.rut.trim();
        var rut = rutPaso.substring(0, 10);
      }


      // Convertir la fecha de nacimiento a formato MySQL
      var fechaNacimientoMySQL: any = paciente.fecha_nacimiento;
      if (paciente.fecha_nacimiento !== null) {
        var partesFecha = paciente.fecha_nacimiento.split("/");
        var fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
        var fechaNacimientoMySQL: any = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2);
        // console.log(fechaNacimientoMySQL); // Salida: '1961-08-23'
      } else {
          // console.log("La fecha es nula, se insertará null en la base de datos.");
      }

      // Convertir la fecha de ingreso a formato MySQL
      var fechaIngresoMySQL: any = paciente.fecha_ingreso;
      if (paciente.fecha_ingreso !== null) {
        var partesFecha = paciente.fecha_nacimiento.split("/");
        var fecha = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
        var fechaIngresoMySQL: any = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2);
        // console.log(fechaIngresoMySQL); // Salida: '1961-08-23'
      } else {
          // console.log("La fecha es nula, se insertará null en la base de datos.");
      }


      let paciente2: Paciente2 = {
        sector           : paciente.sector,
        rut              : rut,
        sexo             : paciente.sexo,
        nombre           : paciente.nombre,
        apellido_p       : paciente.apellido_paterno,
        apellido_m       : paciente.apellido_materno,
        direccion        : paciente.direccion,
        fono             : paciente.telefono,
        fecha_nacimiento : fechaNacimientoMySQL,
        fecha_ingreso    : fechaIngresoMySQL
      }

      this.grabaPaciente2_2(paciente2);

      // this.pacienteService2.agregarPaciente2(paciente2).subscribe(
      //   (response) => {
      //     console.log('Respuesta:', response);
      //   },
      //   (error) => {
      //     console.log('Error:', error);
      //   }
      // );



      // console.log("Registros Médicos:");
      // Iterar sobre cada registro médico del paciente
      paciente.registros_medicos.forEach((registro: any) => {
        // console.log(`   ID: ${registro.id}`);
        // console.log(`   Fecha Control Médico: ${registro.fecha_control_medico}`);
        // Puedes imprimir más información de cada registro aquí
      });
    });

    console.log('Exportar 2');

  }

  async cargaPacientes() {
    return new Promise<void>(async (resolve, reject) => {
      try {
          this.pacientes = await this.pacienteService.obtenerPacientes().toPromise();
          console.log('los pacientes 1',this.pacientes);
          resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  async grabaPaciente2_2(paciente2: Paciente2) {

    await this.grabaPaciente2(paciente2);


  }

  async grabaPaciente2(paciente2: Paciente2) {

    return new Promise<void>(async (resolve, reject) => {
      try {
        await this.pacienteService2.agregarPaciente2(paciente2).toPromise();
        console.log('Paciente grabado:', paciente2);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }


}




