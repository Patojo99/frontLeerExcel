import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import * as XLSX from 'xlsx';
import { PacienteService } from "../app/services/paciente.service";
import { Paciente } from "../app/interfaces/paciente";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'leerExcel';
  // public datosPaciente : [] = [];
  datosPacientes: Paciente[] = [];


  constructor( private pacienteService: PacienteService) { }



  files: File[] = [];

  onFileChange(event: any) {
    this.files = event.target.files;
  }

  async handleFiles() {
    let contador = 1;
    for (let i = 0; i < this.files.length; i++) {
      const fileReader = new FileReader();
      fileReader.onload = async (e) => {

        const data = new Uint8Array(e.target!.result as ArrayBuffer);
        const workbook = XLSX.read(data, { type: 'array' });
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];

        // const range1 = { s: { c: 12, r: 4 }, e: { c: 14, r: 9 } }; // Rango M5:O10
        // const rangeData1 = XLSX.utils.sheet_to_json(worksheet, { range: range1, header: 1 });

        const range1 = { s: { c: 12, r: 4 }, e: { c: 14, r: 10 } }; // Rango M5:O11
        const rangeData1 = XLSX.utils.sheet_to_json(worksheet, { range: range1, header: 1 });


        const range2 = { s: { c: 10, r: 2 }, e: { c: 12, r: 3 } }; // Rango K3:M4
        const rangeData2 = XLSX.utils.sheet_to_json(worksheet, { range: range2, header: 1 });

        const range3 = { s: { c: 0, r: 1 }, e: { c: 1, r: 1 } }; // Rango A2:B2
        const rangeData3 = XLSX.utils.sheet_to_json(worksheet, { range: range3, header: 1 });

        const range4 = { s: { c: 0, r: 2 }, e: { c: 8, r: 2 } }; // Rango A3:I3
        let rangeData4 = XLSX.utils.sheet_to_json(worksheet, { range: range4, header: 1 });

        const range5 = { s: { c: 0, r: 3 }, e: { c: 2, r: 8 } }; // Rango A4:C9
        const rangeData5 = XLSX.utils.sheet_to_json(worksheet, { range: range5, header: 1 });

        const range6 = { s: { c: 0, r: 11 }, e: { c: 59, r: 160 } }; // Rango A12:BH161
        const rangeData6 = XLSX.utils.sheet_to_json(worksheet, { range: range6, header: 1 });



        // console.log(rangeData1);
        // console.log(rangeData2);
        // console.log(rangeData3);
        // console.log(rangeData4);
        // console.log(rangeData5);
        // console.log(rangeData6);

        console.log('corte de archivo', contador);
        contador++;

        // Crear una variable basada en la interfaz Paciente
        let nuevoPaciente: Paciente = {
          sector            : 0,
          nombre            : '',
          apellido_materno  : '',
          apellido_paterno  : '',
          rut               : '',
          sexo              : '',
          direccion         : '',
          telefono          : '',
          fecha_nacimiento  : '',
          fecha_ingreso     : '01/01/1901',
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

        // console.log("Valores de rangeData5:");
        rangeData5.forEach((row: any, rowIndex: number) => {
          row.forEach((cellValue: any, columnIndex: number) => {
            // console.log(`Valor en la fila ${rowIndex}, columna ${columnIndex}: ${cellValue}`);

            // Dependiendo del índice de la columna, asignar el valor correspondiente a la variable nuevoPaciente
            switch (correlativo) {
              case 2: // Si correlativo es 2, asignar el valor a la propiedad 'rut'
                nuevoPaciente.rut = cellValue;
                break;
              case 4: // Si correlativo es 2, asignar el valor a la propiedad 'sexo'
                nuevoPaciente.sexo = cellValue;
                break;
              case 6: // Si correlativo es 2, asignar el valor a la propiedad 'direccion'
                nuevoPaciente.direccion = cellValue;
                break;
              case 8: // Si correlativo es 2, asignar el valor a la propiedad 'telefono'
                nuevoPaciente.telefono = cellValue;
                break;
              case 10: // Si correlativo es 10, asignar el valor a la propiedad 'fecha_nacimiento'
                let fechaLegible = new Date((cellValue - 1) * 24 * 60 * 60 * 1000 + (new Date("1900-01-01")).getTime());
                nuevoPaciente.fecha_nacimiento= fechaLegible.toLocaleDateString();
                // console.log(fechaLegible.toLocaleDateString(), "Fecha legible 2"); // Imprime la fecha en formato legible
                break;
              case 12: // Si correlativo es 2, asignar el valor a la propiedad 'fecha_ingreso'
                nuevoPaciente.fecha_ingreso = cellValue;
                break;

            }
            correlativo ++;
          });
        });

        this.pacienteService.agregarPaciente(nuevoPaciente)
          .subscribe(data => {
            // console.log(data.data,data.msg);
            // this.messageService.add({severity:'info', summary:'Confirmed', detail:data.msg});
            // this.cargarBancos();
          });

        this.datosPacientes.push(nuevoPaciente);

      };

      fileReader.readAsArrayBuffer(this.files[i]);
    }

    // console.log(this.datosPacientes)

  }

}
