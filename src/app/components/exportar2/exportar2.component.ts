import { Component } from '@angular/core';
import { PacienteService } from '../../services/paciente.service';
import { PacienteService2 } from '../../services/paciente2.service';
import { RespuestaPaciente } from '../../interfaces/respuesta-paciente';
import { Paciente3 } from '../../interfaces/paciente3';
import { Paciente2 } from '../../interfaces/paciente2';

@Component({
  selector: 'app-exportar2',
  standalone: true,
  imports: [],
  templateUrl: './exportar2.component.html',
  styleUrl: './exportar2.component.css'
})
export class Exportar2Component {

  public pacientes: Paciente3[] = [];

  public message: string = '';

  constructor(private pacienteService: PacienteService,
              private pacienteService2: PacienteService2
  ) {

  }

  ngOnInit(): void {
    this.pacienteService.obtenerPacientes().subscribe( (data: RespuestaPaciente)  => {
      this.pacientes = data.data;
      this.message = data.message;

      // console.log(data)
    });
  }

  async exportar() {
    // console.log(typeof this.pacientes);
    // console.log( this.pacientes[0].nombre_archivo);
    // console.log(this.message);

    this.pacientes.forEach(paciente => {
    // for (const paciente of this.pacientes: Paciente3) {
      // Haz algo con cada paciente
      // console.log(`${paciente.rut}  ${paciente.fecha_nacimiento} ${paciente.fecha_ingreso}`);

      // Convertir el RUT
      var rut: any = paciente.rut;
      if (paciente.rut !== null && paciente.rut !== undefined) {
        var rutPaso = paciente.rut.trim();
        var rut: any = rutPaso.substring(0, 10);
      }


      // Convertir la fecha de nacimiento a formato MySQL
      if (paciente.fecha_nacimiento !== null && paciente.fecha_nacimiento !== undefined) {
        var partesFecha = paciente.fecha_nacimiento.split("/");
        var fecha = new Date(Number(partesFecha[2]), Number(partesFecha[1]) - 1, Number(partesFecha[0]));
        var fechaNacimientoMySQL: any = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2);
        // console.log(fechaNacimientoMySQL); // Salida: '1961-08-23'
      } else {
        // console.log("La fecha es nula, se insertará null en la base de datos.");
      }

      // Convertir la fecha de ingreso a formato MySQL
      if (paciente.fecha_ingreso !== null && paciente.fecha_ingreso !== undefined) {
        var partesFecha = paciente.fecha_ingreso.split("/");
        var fecha = new Date(Number(partesFecha[2]), Number(partesFecha[1]) - 1, Number(partesFecha[0]));
        var fechaIngresoMySQL: any = fecha.getFullYear() + "-" + ("0" + (fecha.getMonth() + 1)).slice(-2) + "-" + ("0" + fecha.getDate()).slice(-2);
        // console.log(fechaIngresoMySQL); // Salida: '1961-08-23'
      } else {
        // console.log("La fecha es nula, se insertará null en la base de datos.");
      }


      let paciente2: Paciente2 = {
        sector           : parseInt(paciente.sector),
        rut              : rut,
        sexo             : paciente.sexo !== undefined ? paciente.sexo : null,
        nombre           : paciente.nombre !== undefined ? paciente.nombre : null,
        apellido_p       : paciente.apellido_paterno !== undefined ? paciente.apellido_paterno : null,
        apellido_m       : paciente.apellido_materno !== undefined ? paciente.apellido_materno : null,
        direccion        : paciente.direccion !== undefined ? paciente.direccion : null,
        fono             : paciente.telefono !== undefined ? paciente.telefono : null,
        fecha_nacimiento : fechaNacimientoMySQL,
        fecha_ingreso    : fechaIngresoMySQL
      }

      this.grabaPaciente2(paciente2);


    });

  }

  async grabaPaciente2(paciente2: Paciente2) {

    // try {
    //   await this.pacienteService2.agregarPaciente2(paciente2).toPromise();
    //   console.log('Paciente grabado:', paciente2);
    // } catch (error) {
    //   // console.error('Error al grabar el paciente:', error);
    //   console.error('Error al grabar el paciente:', paciente2, 'Error:', error);
    // }

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
