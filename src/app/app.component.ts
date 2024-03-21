import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { PacienteService } from "../app/services/paciente.service";
import { Paciente } from "../app/interfaces/paciente";
import { RegistroMedico } from './interfaces/registromedico';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  contador: number = 1;
  title = 'leerExcel';
  datosPacientes: Paciente[] = [];
  files: File[] = [];
  processingQueue: File[] = [];
  isProcessing = false;
  ejemplo = '';

  constructor( private pacienteService: PacienteService) { }

  onFileChange(event: any) {
    this.files = event.target.files;
  }


  handleFiles() {
    this.processingQueue = [...this.files];
    this.processNextFile();

  }


  processNextFile() {

    if (!this.isProcessing && this.processingQueue.length > 0) { // Verificar si no hay archivos en proceso actualmente
      let file: any = this.processingQueue.shift();
      this.isProcessing = true

      console.log(file.name);


      const fileReader = new FileReader();
      fileReader.onload = async (e) => {

        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const range1 = { s: { c: 12, r: 4 }, e: { c: 14, r: 10 } }; // Rango M5:O11
        const rangeData1 = XLSX.utils.sheet_to_json(worksheet, { range: range1, header: 1 });


        const range2 = { s: { c: 10, r: 2 }, e: { c: 12, r: 3 } }; // Rango K3:M4
        const rangeData2 = XLSX.utils.sheet_to_json(worksheet, { range: range2, header: 1 });

        const range3 = { s: { c: 0, r: 1 }, e: { c: 1, r: 1 } }; // Rango A2:B2
        const rangeData3 = XLSX.utils.sheet_to_json(worksheet, { range: range3, header: 1 });

        const range4 = { s: { c: 0, r: 2 }, e: { c: 8, r: 2 } }; // Rango A3:I3
        let rangeData4 = XLSX.utils.sheet_to_json(worksheet, { range: range4, header: 1 });

        const range5 = { s: { c: 0, r: 3 }, e: { c: 2, r: 8 } }; // Rango A4:C9
        const rangeData5 = XLSX.utils.sheet_to_json(worksheet, { range: range5, header: 1, defval: '' });

        const range6 = { s: { c: 0, r: 11 }, e: { c: 59, r: 160 } }; // Rango A12:BH161
        const rangeData6 = XLSX.utils.sheet_to_json(worksheet, { range: range6, header: 1, defval: '' });



        // console.log(rangeData1);
        // console.log(rangeData2);
        // console.log(rangeData3);
        // console.log(rangeData4);
        // console.log(rangeData5);
        // console.log(rangeData6);



        // Crear una variable basada en la interfaz Paciente
        let nuevoPaciente: Paciente = {
          nombre_archivo    : file.name,
          sector            : 0,
          nombre            : '',
          apellido_materno  : '',
          apellido_paterno  : '',
          rut               : '',
          sexo              : '',
          direccion         : '',
          telefono          : '',
          fecha_nacimiento  : '',
          fecha_ingreso     : '',
          hta               : '',
          dm2               : '',
          dlp               : '',
          hipot             : '',
          artrosis          : '',
          epilepsia         : '',
          otra              : '',
          poblacion_migrante: '',
          pueblo_originario : ''
        };

        let correlativo = 1

        // console.log("Valores de rangeData1:");
        rangeData1.forEach((row: any, rowIndex: number) => {
          row.forEach((cellValue: any, columnIndex: number) => {
            // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (correlativo) {
              case 2: // Si correlativo es 2, asignar el valor a la propiedad 'hta'
                nuevoPaciente.hta = cellValue;
                break;
              case 4: // Si correlativo es 4, asignar el valor a la propiedad 'dm2'
                nuevoPaciente.dm2 = cellValue;
                break;
              case 6: // Si correlativo es 6, asignar el valor a la propiedad 'dlp'
                nuevoPaciente.dlp = cellValue;
                break;
              case 8: // Si correlativo es 8, asignar el valor a la propiedad 'hipot'
                nuevoPaciente.hipot = cellValue;
                break;
              case 10: // Si correlativo es 10, asignar el valor a la propiedad 'artrosis'
                nuevoPaciente.artrosis = cellValue;
                break;
              case 12: // Si correlativo es 12, asignar el valor a la propiedad 'epilepsia'
                nuevoPaciente.epilepsia = cellValue;
                break;
              case 14: // Si correlativo es 14, asignar el valor a la propiedad 'otra'
                nuevoPaciente.otra = cellValue;
                break;

            }
            correlativo ++;
          });
        });

        correlativo = 1
        // console.log("Valores de rangeData2:");
        rangeData2.forEach((row: any, rowIndex: number) => {
          row.forEach((cellValue: any, columnIndex: number) => {
            // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (correlativo) {
              case 2: // Si correlativo es 2, asignar el valor a la propiedad 'poblacion_migrante'
                nuevoPaciente.poblacion_migrante = cellValue;
                break;
              case 4: // Si correlativo es 4, asignar el valor a la propiedad 'pueblo_originario'
                nuevoPaciente.pueblo_originario = cellValue;
                break;
            }
            correlativo ++;
          });
        });


        rangeData3.forEach((row: any, rowIndex: number) => {
          row.forEach((cellValue: any, columnIndex: number) => {
            // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (columnIndex) {
              case 1: // Si columnIndex es 1, asignar el valor a la propiedad 'sector'
                nuevoPaciente.sector = cellValue;
                break;
            }
          });
        });



        // Dentro del método handleFiles()
        // console.log("Valores de rangeData4:");
        rangeData4.forEach((row: any, rowIndex: number) => {
          row.forEach((cellValue: any, columnIndex: number) => {
            // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (columnIndex) {
              case 1: // Si columnIndex es 1, asignar el valor a la propiedad 'nombre'
                nuevoPaciente.nombre = cellValue;
                break;
              case 5: // Si columnIndex es 5, asignar el valor a la propiedad 'apellido_paterno'
                nuevoPaciente.apellido_paterno = cellValue;
                break;
              case 8: // Si columnIndex es 8, asignar el valor a la propiedad 'apellido_materno'
                nuevoPaciente.apellido_materno = cellValue;
                break;
            }
          });
        });


        correlativo = 1

        // console.log("Valores de rangeData5:", rangeData5);
        rangeData5.forEach((row: any, rowIndex: number) => {
          row.forEach((cellValue: any, columnIndex: number) => {
            // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (correlativo) {
              case 2: // Si correlativo es 2, asignar el valor a la propiedad 'rut'
                nuevoPaciente.rut = cellValue;
                break;
              case 5: // Si correlativo es 5, asignar el valor a la propiedad 'sexo'
                nuevoPaciente.sexo = cellValue;
                break;
              case 8: // Si correlativo es 8, asignar el valor a la propiedad 'direccion'
                nuevoPaciente.direccion = cellValue;
                break;
              case 11: // Si correlativo es 11, asignar el valor a la propiedad 'telefono'
                nuevoPaciente.telefono = cellValue;
                break;
              case 15: // Si correlativo es 15, asignar el valor a la propiedad 'fecha_nacimiento'
                let fechaLegible = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                // nuevoPaciente.fecha_nacimiento= fechaLegible.toLocaleDateString();
                // console.log(fechaLegible.toLocaleDateString(), "Fecha legible 2"); // Imprime la fecha en formato legible
                nuevoPaciente.fecha_nacimiento = cellValue;
                break;
              case 18: // Si correlativo es 18, asignar el valor a la propiedad 'fecha_ingreso'
                nuevoPaciente.fecha_ingreso = cellValue;
                break;

            }
            correlativo ++;
          });
        });

        // console.log("Valores de rangeData6:", rangeData6);
        rangeData6.forEach((row: any, rowIndex: number) => {

          let nuevoRegistroMedico: RegistroMedico = {
            fecha_control_medico: '',
            fecha_control_medico_abrev: '',
            fecha_control_enf: '',
            fecha_control_nutri: '',
            protocolo_hearts: '',
            edad: '',
            peso: '',
            talla: '',
            imc: '',
            dg_nutricional: '',
            cc: '',
            presion_sistolica: '',
            presion_diastolica: '',
            fc: '',
            sedentarismo: '',
            tabaquismo: '',
            amputacion_pie_diabetico: '',
            iam: '',
            acv: '',
            fecha_examen_lab: '',
            glicemia: '',
            col_total: '',
            trigli: '',
            hdl: '',
            ldl: '',
            fecha_crea: '',
            crea: '',
            vfg: '',
            fecha_microalb_rac: '',
            micro_alb: '',
            rac: '',
            fecha_hba1c: '',
            valor_hba1c: '',
            fecha_ptgo: '',
            ptgo_ayunas: '',
            ptgo_post_carga: '',
            fecha_tsh: '',
            valor_tsh: '',
            fecha_ekg: '',
            fecha_pie_diabetico: '',
            resultado_pie_diabetico: '',
            fecha_podologia: '',
            fecha_f_ojo: '',
            resultado_fo: '',
            aas: '',
            atv: '',
            ieca_ara2: '',
            insulina: '',
            erc: '',
            riesgo_cardiovascular: '',
            fecha_rx_cadera: '',
            fecha_rx_rodilla: '',
            nombre_medico: '',
            nombre_enfermera: '',
            nombre_nutricionista: '',
            prox_control_medico: '',
            prox_control_medico_abreviado: '',
            prox_control_enf: '',
            prox_control_nutri: '',
            observaciones: ''

          }

          row.forEach((cellValue: any, columnIndex: number) => {
            // if (rowIndex !== 0) {

              switch(columnIndex) {
                case 0:
                  nuevoRegistroMedico.fecha_control_medico = cellValue;
                  break;

                case 1:
                  nuevoRegistroMedico.fecha_control_medico_abrev = cellValue;
                  break;
                case 2:
                  nuevoRegistroMedico.fecha_control_enf = cellValue;
                  break;
                case 3:
                  nuevoRegistroMedico.fecha_control_nutri = cellValue;
                  break;
                case 4:
                  nuevoRegistroMedico.protocolo_hearts = cellValue;
                  break;
                case 5:
                  nuevoRegistroMedico.edad = cellValue;
                  break;
                case 6:
                  nuevoRegistroMedico.peso = cellValue;
                  break;
                case 7:
                  nuevoRegistroMedico.talla = cellValue;
                  break;
                case 8:
                  nuevoRegistroMedico.imc = cellValue;
                  break;
                case 9:
                  nuevoRegistroMedico.dg_nutricional = cellValue;
                  break;
                case 10:
                  nuevoRegistroMedico.cc = cellValue;
                  break;
                case 11:
                  nuevoRegistroMedico.presion_sistolica = cellValue;
                  break;
                case 12:
                  nuevoRegistroMedico.presion_diastolica = cellValue;
                  break;
                case 13:
                  nuevoRegistroMedico.fc = cellValue;
                  break;
                case 14:
                  nuevoRegistroMedico.sedentarismo = cellValue;
                  break;
                case 15:
                  nuevoRegistroMedico.tabaquismo = cellValue;
                  break;
                case 16:
                  nuevoRegistroMedico.amputacion_pie_diabetico = cellValue;
                  break;
                case 17:
                  nuevoRegistroMedico.iam = cellValue;
                  break;
                case 18:
                  nuevoRegistroMedico.acv = cellValue;
                  break;
                case 19:
                  nuevoRegistroMedico.fecha_examen_lab = cellValue;
                  break;
                case 20:
                  nuevoRegistroMedico.glicemia = cellValue;
                  break;
                case 21:
                  nuevoRegistroMedico.col_total = cellValue;
                  break;
                case 22:
                  nuevoRegistroMedico.trigli = cellValue;
                  break;
                case 23:
                  nuevoRegistroMedico.hdl = cellValue;
                  break;
                case 24:
                  nuevoRegistroMedico.ldl = cellValue;
                  break;
                case 25:
                  nuevoRegistroMedico.fecha_crea = cellValue;
                  break;
                case 26:
                  nuevoRegistroMedico.crea = cellValue;
                  break;
                case 27:
                  nuevoRegistroMedico.vfg = cellValue;
                  break;
                case 28:
                  nuevoRegistroMedico.fecha_microalb_rac = cellValue;
                  break;
                case 29:
                  nuevoRegistroMedico.micro_alb = cellValue;
                  break;
                case 30:
                  nuevoRegistroMedico.rac = cellValue;
                  break;
                case 31:
                  nuevoRegistroMedico.fecha_hba1c = cellValue;
                  break;
                case 32:
                  nuevoRegistroMedico.valor_hba1c = cellValue;
                  break;
                case 33:
                  nuevoRegistroMedico.fecha_ptgo = cellValue;
                  break;
                case 34:
                  nuevoRegistroMedico.ptgo_ayunas = cellValue;
                  break;
                case 35:
                  nuevoRegistroMedico.ptgo_post_carga = cellValue;
                  break;
                case 36:
                  nuevoRegistroMedico.fecha_tsh = cellValue;
                  break;
                case 37:
                  nuevoRegistroMedico.valor_tsh = cellValue;
                  break;
                case 38:
                  nuevoRegistroMedico.fecha_ekg = cellValue;
                  break;
                case 39:
                  nuevoRegistroMedico.fecha_pie_diabetico = cellValue;
                  break;
                case 40:
                  nuevoRegistroMedico.resultado_pie_diabetico = cellValue;
                  break;
                case 41:
                  nuevoRegistroMedico.fecha_podologia = cellValue;
                  break;
                case 42:
                  nuevoRegistroMedico.fecha_f_ojo = cellValue;
                  break;
                case 43:
                  nuevoRegistroMedico.resultado_fo = cellValue;
                  break;
                case 44:
                  nuevoRegistroMedico.aas = cellValue;
                  break;
                case 45:
                  nuevoRegistroMedico.atv = cellValue;
                  break;
                case 46:
                  nuevoRegistroMedico.ieca_ara2 = cellValue;
                  break;
                case 47:
                  nuevoRegistroMedico.insulina = cellValue;
                  break;
                case 48:
                  nuevoRegistroMedico.erc = cellValue;
                  break;
                case 49:
                  nuevoRegistroMedico.riesgo_cardiovascular = cellValue;
                  break;
                case 50:
                  nuevoRegistroMedico.fecha_rx_cadera = cellValue;
                  break;
                case 51:
                  nuevoRegistroMedico.fecha_rx_rodilla = cellValue;
                  break;
                case 52:
                  nuevoRegistroMedico.nombre_medico = cellValue;
                  break;
                case 53:
                  nuevoRegistroMedico.nombre_enfermera = cellValue;
                  break;
                case 54:
                  nuevoRegistroMedico.nombre_nutricionista = cellValue;
                  break;
                case 55:
                  nuevoRegistroMedico.prox_control_medico = cellValue;
                  break;
                case 56:
                  nuevoRegistroMedico.prox_control_medico_abreviado = cellValue;
                  break;
                case 57:
                  nuevoRegistroMedico.prox_control_enf = cellValue;
                  break;
                case 58:
                  nuevoRegistroMedico.prox_control_nutri = cellValue;
                  break;
                case 59:
                  nuevoRegistroMedico.observaciones = cellValue;
                  break;
              }

              // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // }
          });

          if (nuevoRegistroMedico.fecha_control_medico !== '' || nuevoRegistroMedico.fecha_control_medico_abrev !== '' || nuevoRegistroMedico.fecha_control_enf !== '' || nuevoRegistroMedico.fecha_control_nutri !== '') {
            console.log(nuevoRegistroMedico);
          }


        });

        console.log("Antes de llamar al servicio Registro", this.contador);

        this.pacienteService.agregarPaciente(nuevoPaciente).subscribe(
          (response) => {
            console.log('Paciente agregado correctamente:', response);
            this.isProcessing = false;
            this.processNextFile();
          },
          (error) => {
            console.error('Error al agregar paciente:', error);
            this.isProcessing = false;
            this.processNextFile();
          }
        );

        this.contador++;

      };

      fileReader.readAsArrayBuffer(file);
    } else {
      console.log('Proceso de archivos completado');
    }

    // console.log(this.datosPacientes)

  }

}