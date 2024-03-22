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
  title = 'leerExcel';
  datosPacientes: Paciente[] = [];
  files: File[] = [];
  processingQueue: File[] = [];
  isProcessing = false;
  contador: number = 1;

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

      // console.log(file.name);


      const fileReader = new FileReader();
      fileReader.onload = async (e) => {

        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        const range1 = { s: { c: 12, r: 4 }, e: { c: 14, r: 10 } }; // Rango M5:O11
        const rangeData1 = XLSX.utils.sheet_to_json(worksheet, { range: range1, header: 1, defval: '' });


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
            // console.log(`Posición: ${correlativo} Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (correlativo) {
              case 3: // Si correlativo es 2, asignar el valor a la propiedad 'hta'
                nuevoPaciente.hta = cellValue;
                break;
              case 6: // Si correlativo es 4, asignar el valor a la propiedad 'dm2'
                nuevoPaciente.dm2 = cellValue;
                break;
              case 9: // Si correlativo es 6, asignar el valor a la propiedad 'dlp'
                nuevoPaciente.dlp = cellValue;
                break;
              case 12: // Si correlativo es 8, asignar el valor a la propiedad 'hipot'
                nuevoPaciente.hipot = cellValue;
                break;
              case 15: // Si correlativo es 10, asignar el valor a la propiedad 'artrosis'
                nuevoPaciente.artrosis = cellValue;
                break;
              case 18: // Si correlativo es 12, asignar el valor a la propiedad 'epilepsia'
                nuevoPaciente.epilepsia = cellValue;
                break;
              case 21: // Si correlativo es 14, asignar el valor a la propiedad 'otra'
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
                if (cellValue !== '') {
                  let fechaLegible = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                  nuevoPaciente.fecha_nacimiento= fechaLegible.toLocaleDateString();
                }
                break;
              case 18: // Si correlativo es 18, asignar el valor a la propiedad 'fecha_ingreso'
                if (cellValue !== '') {
                  let fechaLegible2= new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                  nuevoPaciente.fecha_ingreso = fechaLegible2.toLocaleDateString();
                }
                break;

            }
            correlativo ++;
          });
        });


        this.pacienteService.agregarPaciente(nuevoPaciente).subscribe(
          (response) => {
            // console.log('Paciente agregado correctamente:', response);

            rangeData6.forEach((row: any, rowIndex: number) => {

              // Inicializa el registro medico
              let nuevoRegistroMedico: RegistroMedico = {
                nombre_archivo                : '',
                paciente_id                   : 0,
                rut                           : '',
                fecha_control_medico          : '',
                fecha_control_medico_abrev    : '',
                fecha_control_enf             : '',
                fecha_control_nutri           : '',
                protocolo_hearts              : '',
                edad                          : '',
                peso                          : '',
                talla                         : '',
                imc                           : '',
                dg_nutricional                : '',
                cc                            : '',
                presion_sistolica             : '',
                presion_diastolica            : '',
                fc                            : '',
                sedentarismo                  : '',
                tabaquismo                    : '',
                amputacion_pie_diabetico      : '',
                iam                           : '',
                acv                           : '',
                fecha_examen_lab              : '',
                glicemia                      : '',
                col_total                     : '',
                trigli                        : '',
                hdl                           : '',
                ldl                           : '',
                fecha_crea                    : '',
                crea                          : '',
                vfg                           : '',
                fecha_microalb_rac            : '',
                micro_alb                     : '',
                rac                           : '',
                fecha_hba1c                   : '',
                valor_hba1c                   : '',
                fecha_ptgo                    : '',
                ptgo_ayunas                   : '',
                ptgo_post_carga               : '',
                fecha_tsh                     : '',
                valor_tsh                     : '',
                fecha_ekg                     : '',
                fecha_pie_diabetico           : '',
                resultado_pie_diabetico       : '',
                fecha_podologia               : '',
                fecha_f_ojo                   : '',
                resultado_fo                  : '',
                aas                           : '',
                atv                           : '',
                ieca_ara2                     : '',
                insulina                      : '',
                erc                           : '',
                riesgo_cardiovascular         : '',
                fecha_rx_cadera               : '',
                fecha_rx_rodilla              : '',
                nombre_medico                 : '',
                nombre_enfermera              : '',
                nombre_nutricionista          : '',
                prox_control_medico           : '',
                prox_control_medico_abreviado : '',
                prox_control_enf              : '',
                prox_control_nutri            : '',
                observaciones                 : ''

              }

              // Llena el registro medico
              row.forEach((cellValue: any, columnIndex: number) => {
                if (rowIndex !== 0) {

                  switch(columnIndex) {
                    case 0:
                      if (cellValue !== '') {
                        let fecha0 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_control_medico = fecha0.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_control_medico = cellValue;
                      break;

                    case 1:
                      if (cellValue !== '') {
                        let fecha1 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_control_medico_abrev = fecha1.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_control_medico_abrev = cellValue;
                      break;
                    case 2:
                      if (cellValue !== '') {
                        let fecha2 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_control_enf = fecha2.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_control_enf = cellValue;
                      break;
                    case 3:
                      if (cellValue !== '') {
                        let fecha3 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_control_nutri = fecha3.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_control_nutri = cellValue;
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
                      if (cellValue !== '') {
                        let fecha4 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_examen_lab = fecha4.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_examen_lab = cellValue;
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
                      if (cellValue !== '') {
                        let fecha5 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_crea = fecha5.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_crea = cellValue;
                      break;
                    case 26:
                      nuevoRegistroMedico.crea = cellValue;
                      break;
                    case 27:
                      nuevoRegistroMedico.vfg = cellValue;
                      break;
                    case 28:
                      if (cellValue !== '') {
                        let fecha6 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_microalb_rac = fecha6.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_microalb_rac = cellValue;
                      break;
                    case 29:
                      nuevoRegistroMedico.micro_alb = cellValue;
                      break;
                    case 30:
                      nuevoRegistroMedico.rac = cellValue;
                      break;
                    case 31:
                      if (cellValue !== '') {
                        let fecha7 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_hba1c = fecha7.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_hba1c = cellValue;
                      break;
                    case 32:
                      nuevoRegistroMedico.valor_hba1c = cellValue;
                      break;
                    case 33:
                      if (cellValue !== '') {
                        let fecha8 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_ptgo = fecha8.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_ptgo = cellValue;
                      break;
                    case 34:
                      nuevoRegistroMedico.ptgo_ayunas = cellValue;
                      break;
                    case 35:
                      nuevoRegistroMedico.ptgo_post_carga = cellValue;
                      break;
                    case 36:
                      if (cellValue !== '') {
                        let fecha9 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_tsh = fecha9.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_tsh = cellValue;
                      break;
                    case 37:
                      nuevoRegistroMedico.valor_tsh = cellValue;
                      break;
                    case 38:
                      if (cellValue !== '') {
                        let fecha10 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_ekg = fecha10.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_ekg = cellValue;
                      break;
                    case 39:
                      if (cellValue !== '') {
                        let fecha11 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_pie_diabetico = fecha11.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_pie_diabetico = cellValue;
                      break;
                    case 40:
                      nuevoRegistroMedico.resultado_pie_diabetico = cellValue;
                      break;
                    case 41:
                      if (cellValue !== '') {
                        let fecha12 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_podologia = fecha12.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_podologia = cellValue;
                      break;
                    case 42:
                      if (cellValue !== '') {
                        let fecha13 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_f_ojo = fecha13.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_f_ojo = cellValue;
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
                      if (cellValue !== '') {
                        let fecha14 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_rx_cadera = fecha14.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_rx_cadera = cellValue;
                      break;
                    case 51:
                      if (cellValue !== '') {
                        let fecha15 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.fecha_rx_rodilla = fecha15.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.fecha_rx_rodilla = cellValue;
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
                      if (cellValue !== '') {
                        let fecha16 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.prox_control_medico = fecha16.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.prox_control_medico = cellValue;
                      break;
                    case 56:
                      if (cellValue !== '') {
                        let fecha17 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.prox_control_medico_abreviado = fecha17.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.prox_control_medico_abreviado = cellValue;
                      break;
                    case 57:
                      if (cellValue !== '') {
                        let fecha18 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.prox_control_enf = fecha18.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.prox_control_enf = cellValue;
                      break;
                    case 58:
                      if (cellValue !== '') {
                        let fecha19 = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                        nuevoRegistroMedico.prox_control_nutri = fecha19.toLocaleDateString();
                      }
                      // nuevoRegistroMedico.prox_control_nutri = cellValue;
                      break;
                    case 59:
                      nuevoRegistroMedico.observaciones = cellValue;
                      break;
                  }

                  // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

                }
              });

              nuevoRegistroMedico.nombre_archivo = response.data.nombre_archivo;
              nuevoRegistroMedico.paciente_id    = response.data.id;
              nuevoRegistroMedico.rut            = response.data.rut;

              // Si se cumple la condición graba el registro medico
              if (nuevoRegistroMedico.fecha_control_medico !== '' ||
                  nuevoRegistroMedico.fecha_control_medico_abrev !== '' ||
                  nuevoRegistroMedico.fecha_control_enf !== '' ||
                  nuevoRegistroMedico.fecha_control_nutri !== '') {

                // console.log(nuevoRegistroMedico);

                this.procesarRegistroMedico(nuevoRegistroMedico);

              }

            });

            this.isProcessing = false;
            this.processNextFile();
          },
          (error) => {
            console.error('Error al agregar paciente:', error);
            this.isProcessing = false;
            this.processNextFile();
          }
        );

        console.log(`Registro: ${this.contador} Grabado`);

        this.contador++;

      };

      fileReader.readAsArrayBuffer(file);
    } else {
      console.log('Proceso de archivos completado');
    }

    // console.log(this.datosPacientes)

  }

  async procesarRegistroMedico(nuevoRegistroMedico: RegistroMedico) {

    const response2 = await this.pacienteService.agregarRegistrosMedicos(nuevoRegistroMedico).toPromise();
    // console.log('Registro Médico agregado correctamente:', response2);

  }

}
