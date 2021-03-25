import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinasService } from '../rutinas.service/rutinas.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';


@Component({
  selector: 'app-editarrutina',
  templateUrl: './editarrutina.component.html',
  styleUrls: ['./editarrutina.component.css']
})
export class EditarrutinaComponent implements OnInit {

  tablarutinas = true;
  rutinas;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  repeticiones: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
  series: any = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 60, 61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100]
  dificultad: any = ['facil', 'intermedio', 'dificil']
  categoria: any = ['aerobico', 'anaerobico']
  dia: any = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes']
  numero: number = 1;
  ejercicio2 = false;
  ejercicio3 = false;
  ejercicio4 = false;
  ejercicio5 = false;
  ejercicio6 = false;
  ejerci: number = 1;
  list: any = [];
  id: any;
  ejercicios: any;


  constructor(private route: Router,
    private rutina: RutinasService,
    private fb: FormBuilder) { }


  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      id: ['', Validators.required],
      intensidad: ['', Validators.required],
      categoria: ['', Validators.required],
      dificultad: ['', Validators.required],
      descripcion: ['', Validators.required],

      id_ejercicio: ['', Validators.required],
      repeticiones: ['', Validators.required],
      series: ['', Validators.required],
      ejecucion: ['', Validators.required],
      dia: ['', Validators.required],

      id_ejercicio2: ['', Validators.required],
      repeticiones2: ['', Validators.required],
      series2: ['', Validators.required],
      ejecucion2: ['', Validators.required],
      dia2: ['', Validators.required],

      id_ejercicio3: ['', Validators.required],
      repeticiones3: ['', Validators.required],
      series3: ['', Validators.required],
      ejecucion3: ['', Validators.required],
      dia3: ['', Validators.required],

      id_ejercicio4: ['', Validators.required],
      repeticiones4: ['', Validators.required],
      series4: ['', Validators.required],
      ejecucion4: ['', Validators.required],
      dia4: ['', Validators.required],

      id_ejercicio5: ['', Validators.required],
      repeticiones5: ['', Validators.required],
      series5: ['', Validators.required],
      ejecucion5: ['', Validators.required],
      dia5: ['', Validators.required],

      id_ejercicio6: ['', Validators.required],
      repeticiones6: ['', Validators.required],
      series6: ['', Validators.required],
      ejecucion6: ['', Validators.required],
      dia6: ['', Validators.required],
    });
    this.form.get('id').disable();
    this.form.get('id_ejercicio').disable();
    this.form.get('id_ejercicio2').disable();
    this.form.get('id_ejercicio3').disable();
    this.form.get('id_ejercicio4').disable();
    this.form.get('id_ejercicio5').disable();
    this.form.get('id_ejercicio6').disable();

    this.id = localStorage.getItem('id')
    this.rutina.getRequestIdRutinas('https://proyectofinalsena.herokuapp.com/consultarRutinas' + '/' + this.id, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          console.log(data)
          this.rutinas = data['ejercicios']
          this.tablarutinas = false;//se muestra la tabla
          this.load = true;//se muestra el spinner

          this.form.get('nombre').setValue(this.rutinas[0]['nombre']);
          this.form.get('id').setValue(this.rutinas[0]['id']);
          this.form.get('intensidad').setValue(this.rutinas[0]['intensidad']);
          this.form.get('categoria').setValue(this.rutinas[0]['categoria']);
          this.form.get('dificultad').setValue(this.rutinas[0]['dificultad']);
          this.form.get('descripcion').setValue(this.rutinas[0]['descripcion']);

          if (this.rutinas == null) {
            Swal.fire({
              position: 'center',
              icon: 'warning',
              showConfirmButton: false,
              title: 'Session Expirada',
              timer: 2000
            })
            localStorage.clear()
            setTimeout(() => {
              this.route.navigate(['/']);
            }, 2000);
          }
        },
        (error) => {
          console.log(error)
        })
  }

  ejercicio(id) {
    this.ejercicios = id;

    if (this.ejercicios.length === 1) {
      this.form.get('id_ejercicio').setValue(this.ejercicios[0]['nombre']);
      this.form.get('repeticiones').setValue(this.ejercicios[0]['repeticiones']);
      this.form.get('series').setValue(this.ejercicios[0]['series']);
      this.form.get('ejecucion').setValue(this.ejercicios[0]['ejecucion']);
      this.form.get('dia').setValue(this.ejercicios[0]['dia']);

    } else if (this.ejercicios.length === 2) {

      this.ejercicio2 = true;

      this.form.get('id_ejercicio').setValue(this.ejercicios[0]['nombre']);
      this.form.get('repeticiones').setValue(this.ejercicios[0]['repeticiones']);
      this.form.get('series').setValue(this.ejercicios[0]['series']);
      this.form.get('ejecucion').setValue(this.ejercicios[0]['ejecucion']);
      this.form.get('dia').setValue(this.ejercicios[0]['dia']);

      this.form.get('id_ejercicio2').setValue(this.ejercicios[1]['nombre']);
      this.form.get('repeticiones2').setValue(this.ejercicios[1]['repeticiones']);
      this.form.get('series2').setValue(this.ejercicios[1]['series']);
      this.form.get('ejecucion2').setValue(this.ejercicios[1]['ejecucion']);
      this.form.get('dia2').setValue(this.ejercicios[1]['dia']);

    } else if (this.ejercicios.length === 3) {

      this.ejercicio2 = true;
      this.ejercicio3 = true;

      this.form.get('id_ejercicio').setValue(this.ejercicios[0]['nombre']);
      this.form.get('repeticiones').setValue(this.ejercicios[0]['repeticiones']);
      this.form.get('series').setValue(this.ejercicios[0]['series']);
      this.form.get('ejecucion').setValue(this.ejercicios[0]['ejecucion']);
      this.form.get('dia').setValue(this.ejercicios[0]['dia']);

      this.form.get('id_ejercicio2').setValue(this.ejercicios[1]['nombre']);
      this.form.get('repeticiones2').setValue(this.ejercicios[1]['repeticiones']);
      this.form.get('series2').setValue(this.ejercicios[1]['series']);
      this.form.get('ejecucion2').setValue(this.ejercicios[1]['ejecucion']);
      this.form.get('dia2').setValue(this.ejercicios[1]['dia']);

      this.form.get('id_ejercicio3').setValue(this.ejercicios[2]['nombre']);
      this.form.get('repeticiones3').setValue(this.ejercicios[2]['repeticiones']);
      this.form.get('series3').setValue(this.ejercicios[2]['series']);
      this.form.get('ejecucion3').setValue(this.ejercicios[2]['ejecucion']);
      this.form.get('dia3').setValue(this.ejercicios[2]['dia']);

    } else if (this.ejercicios.length == 4) {

      this.ejercicio2 = true;
      this.ejercicio3 = true;
      this.ejercicio4 = true;

      this.form.get('id_ejercicio').setValue(this.ejercicios[0]['nombre']);
      this.form.get('repeticiones').setValue(this.ejercicios[0]['repeticiones']);
      this.form.get('series').setValue(this.ejercicios[0]['series']);
      this.form.get('ejecucion').setValue(this.ejercicios[0]['ejecucion']);
      this.form.get('dia').setValue(this.ejercicios[0]['dia']);

      this.form.get('id_ejercicio2').setValue(this.ejercicios[1]['nombre']);
      this.form.get('repeticiones2').setValue(this.ejercicios[1]['repeticiones']);
      this.form.get('series2').setValue(this.ejercicios[1]['series']);
      this.form.get('ejecucion2').setValue(this.ejercicios[1]['ejecucion']);
      this.form.get('dia2').setValue(this.ejercicios[1]['dia']);

      this.form.get('id_ejercicio3').setValue(this.ejercicios[2]['nombre']);
      this.form.get('repeticiones3').setValue(this.ejercicios[2]['repeticiones']);
      this.form.get('series3').setValue(this.ejercicios[2]['series']);
      this.form.get('ejecucion3').setValue(this.ejercicios[2]['ejecucion']);
      this.form.get('dia3').setValue(this.ejercicios[2]['dia']);

      this.form.get('id_ejercicio4').setValue(this.ejercicios[3]['nombre']);
      this.form.get('repeticiones4').setValue(this.ejercicios[3]['repeticiones']);
      this.form.get('series4').setValue(this.ejercicios[3]['series']);
      this.form.get('ejecucion4').setValue(this.ejercicios[3]['ejecucion']);
      this.form.get('dia4').setValue(this.ejercicios[3]['dia']);

    } else if (this.ejercicios.length == 5) {

      this.ejercicio2 = true;
      this.ejercicio3 = true;
      this.ejercicio4 = true;
      this.ejercicio5 = true;

      this.form.get('id_ejercicio').setValue(this.ejercicios[0]['nombre']);
      this.form.get('repeticiones').setValue(this.ejercicios[0]['repeticiones']);
      this.form.get('series').setValue(this.ejercicios[0]['series']);
      this.form.get('ejecucion').setValue(this.ejercicios[0]['ejecucion']);
      this.form.get('dia').setValue(this.ejercicios[0]['dia']);

      this.form.get('id_ejercicio2').setValue(this.ejercicios[1]['nombre']);
      this.form.get('repeticiones2').setValue(this.ejercicios[1]['repeticiones']);
      this.form.get('series2').setValue(this.ejercicios[1]['series']);
      this.form.get('ejecucion2').setValue(this.ejercicios[1]['ejecucion']);
      this.form.get('dia2').setValue(this.ejercicios[1]['dia']);

      this.form.get('id_ejercicio3').setValue(this.ejercicios[2]['nombre']);
      this.form.get('repeticiones3').setValue(this.ejercicios[2]['repeticiones']);
      this.form.get('series3').setValue(this.ejercicios[2]['series']);
      this.form.get('ejecucion3').setValue(this.ejercicios[2]['ejecucion']);
      this.form.get('dia3').setValue(this.ejercicios[2]['dia']);

      this.form.get('id_ejercicio4').setValue(this.ejercicios[3]['nombre']);
      this.form.get('repeticiones4').setValue(this.ejercicios[3]['repeticiones']);
      this.form.get('series4').setValue(this.ejercicios[3]['series']);
      this.form.get('ejecucion4').setValue(this.ejercicios[3]['ejecucion']);
      this.form.get('dia4').setValue(this.ejercicios[3]['dia']);

      this.form.get('id_ejercicio5').setValue(this.ejercicios[4]['nombre']);
      this.form.get('repeticiones5').setValue(this.ejercicios[4]['repeticiones']);
      this.form.get('series5').setValue(this.ejercicios[4]['series']);
      this.form.get('ejecucion5').setValue(this.ejercicios[4]['ejecucion']);
      this.form.get('dia5').setValue(this.ejercicios[4]['dia']);
    }
    else if (this.ejercicios.length == 6) {

      this.ejercicio2 = true;
      this.ejercicio3 = true;
      this.ejercicio4 = true;
      this.ejercicio5 = true;
      this.ejercicio6 = true;

      this.form.get('id_ejercicio').setValue(this.ejercicios[0]['nombre']);
      this.form.get('repeticiones').setValue(this.ejercicios[0]['repeticiones']);
      this.form.get('series').setValue(this.ejercicios[0]['series']);
      this.form.get('ejecucion').setValue(this.ejercicios[0]['ejecucion']);
      this.form.get('dia').setValue(this.ejercicios[0]['dia']);

      this.form.get('id_ejercicio2').setValue(this.ejercicios[1]['nombre']);
      this.form.get('repeticiones2').setValue(this.ejercicios[1]['repeticiones']);
      this.form.get('series2').setValue(this.ejercicios[1]['series']);
      this.form.get('ejecucion2').setValue(this.ejercicios[1]['ejecucion']);
      this.form.get('dia2').setValue(this.ejercicios[1]['dia']);

      this.form.get('id_ejercicio3').setValue(this.ejercicios[2]['nombre']);
      this.form.get('repeticiones3').setValue(this.ejercicios[2]['repeticiones']);
      this.form.get('series3').setValue(this.ejercicios[2]['series']);
      this.form.get('ejecucion3').setValue(this.ejercicios[2]['ejecucion']);
      this.form.get('dia3').setValue(this.ejercicios[2]['dia']);

      this.form.get('id_ejercicio4').setValue(this.ejercicios[3]['nombre']);
      this.form.get('repeticiones4').setValue(this.ejercicios[3]['repeticiones']);
      this.form.get('series4').setValue(this.ejercicios[3]['series']);
      this.form.get('ejecucion4').setValue(this.ejercicios[3]['ejecucion']);
      this.form.get('dia4').setValue(this.ejercicios[3]['dia']);

      this.form.get('id_ejercicio5').setValue(this.ejercicios[4]['nombre']);
      this.form.get('repeticiones5').setValue(this.ejercicios[4]['repeticiones']);
      this.form.get('series5').setValue(this.ejercicios[4]['series']);
      this.form.get('ejecucion5').setValue(this.ejercicios[4]['ejecucion']);
      this.form.get('dia5').setValue(this.ejercicios[4]['dia']);

      this.form.get('id_ejercicio6').setValue(this.ejercicios[5]['nombre']);
      this.form.get('repeticiones6').setValue(this.ejercicios[5]['repeticiones']);
      this.form.get('series6').setValue(this.ejercicios[5]['series']);
      this.form.get('ejecucion6').setValue(this.ejercicios[5]['ejecucion']);
      this.form.get('dia6').setValue(this.ejercicios[5]['dia']);
    }

  }

  async onSubmit() {
    this.load = false;
    this.registro = true;

    if (this.ejercicios.length >= 1) {

      let idx = 0;

      for (let element in this.ejercicios) {
        console.log(element);

        if (parseInt(element) === 0) {
          let ejercicios = {
            id_ejercicio: this.ejercicios[element]['idejercicio'],
            repeticiones: this.form.value.repeticiones,
            series: this.form.value.series,
            ejecucion: this.form.value.ejecucion,
            dia: this.form.value.dia,
          }
          this.list.push(ejercicios);
        }


        if (parseInt(element) === 1) {
          let ejercicios = {
            id_ejercicio: this.ejercicios[element]['idejercicio'],
            repeticiones: this.form.value.repeticiones2,
            series: this.form.value.series2,
            ejecucion: this.form.value.ejecucion2,
            dia: this.form.value.dia2,
          }
          this.list.push(ejercicios);

        }

        if (parseInt(element) === 2) {
          let ejercicios = {
            id_ejercicio: this.ejercicios[element]['idejercicio'],
            repeticiones: this.form.value.repeticiones3,
            series: this.form.value.series3,
            ejecucion: this.form.value.ejecucion3,
            dia: this.form.value.dia3,
          }
          this.list.push(ejercicios);

        }

        if (parseInt(element) === 3) {
          let ejercicios = {
            id_ejercicio: this.ejercicios[element]['idejercicio'],
            repeticiones: this.form.value.repeticiones4,
            series: this.form.value.series4,
            ejecucion: this.form.value.ejecucion4,
            dia: this.form.value.dia4,
          }
          this.list.push(ejercicios);

        }

        if (parseInt(element) === 4) {
          let ejercicios = {
            id_ejercicio: this.ejercicios[element]['idejercicio'],
            repeticiones: this.form.value.repeticiones5,
            series: this.form.value.series5,
            ejecucion: this.form.value.ejecucion5,
            dia: this.form.value.dia5,
          }
          this.list.push(ejercicios);

        }

        if (parseInt(element) === 5) {
          let ejercicios = {
            id_ejercicio: this.ejercicios[element]['idejercicio'],
            repeticiones: this.form.value.repeticiones6,
            series: this.form.value.series6,
            ejecucion: this.form.value.ejecucion6,
            dia: this.form.value.dia6,
          }
          this.list.push(ejercicios);

        }


      }

      let numero = this.form.get('id');
      this.rutina.editarrutinas('https://proyectofinalsena.herokuapp.com/actualizarRutina/' + numero.value, {

        nombre: this.form.value.nombre,
        intensidad: this.form.value.intensidad,
        dificultad: this.form.value.dificultad,
        categoria: this.form.value.categoria,
        descripcion: this.form.value.descripcion,

        ejercicios: this.list


      }, localStorage.getItem('token')
      ).subscribe(
        (response): any => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se actualizo la rutina',
            timer: 1000
          })
          this.load = true;
          this.registro = false;
          localStorage.removeItem('id');
          this.route.navigate(['/rutinas']);
        },
        (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible actualizar la rutina',
            footer: 'Verifique e intenten nuevamente'
          })
          this.load = true;
          this.registro = false;
        })


    }
  }

  cancelar() {
    localStorage.removeItem('id');
    this.route.navigate(['/rutinas']);
  }
}