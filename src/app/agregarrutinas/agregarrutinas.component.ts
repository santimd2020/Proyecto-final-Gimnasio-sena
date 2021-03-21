import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RutinasService } from '../rutinas.service/rutinas.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
//Se realizan las importaciones necesarias

@Component({
  selector: 'app-agregarrutinas',
  templateUrl: './agregarrutinas.component.html',
  styleUrls: ['./agregarrutinas.component.css']
})
export class AgregarrutinasComponent implements OnInit {

  //Se crean las propiedades necesarias para trabajar en las clases

  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  ejercicios: [{}]
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

  constructor(
    private fb: FormBuilder,
    private rutina: RutinasService,
    private route: Router) { }

  ngOnInit(): void {
    //Se construye el formulario al iniciar la clase
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      intensidad: ['', Validators.required],
      dificultad: ['', Validators.required],
      categoria: ['', Validators.required],
      id_ejercicio: ['', Validators.required],
      repeticiones: ['', Validators.required],
      series: ['', Validators.required],
      ejecucion: ['', Validators.required],
      dia: ['', Validators.required],
    });
  }

  n_ejercicios() {
    //Se crea metodo que permite agregar los ejercicios a la lista.
    Swal.fire({
      title: '¿Desea agregar otro ejercicio?',
      showCancelButton: true,
      confirmButtonText: `Agregar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.ejerci++ + 1;

        if (this.list.length <= 5) {
          let ejercicios = {
            id_ejercicio: this.form.value.id_ejercicio,
            repeticiones: this.form.value.repeticiones,
            series: this.form.value.series,
            ejecucion: this.form.value.ejecucion,
            dia: this.form.value.dia
          }
          this.list.push(ejercicios);
          console.log(this.list);
        }
        if (this.ejerci === 2) {
          this.ejercicio2 = true;

        } else if (this.ejerci === 3) {
          this.ejercicio3 = true;
        }
        else if (this.ejerci === 4) {
          this.ejercicio4 = true;
        }
        else if (this.ejerci === 5) {
          this.ejercicio5 = true;
        }
        else if (this.ejerci === 6) {
          this.ejercicio6 = true;
        }
        else if (this.ejerci === 7) {
          Swal.fire({
            icon: 'question',
            title: '¡Atencion!',
            showConfirmButton: false,
            text: 'Solo puede registrar 6 ejercicios maximo por rutina',
            timer: 3000
          })
        }
      } else if (result.isDenied) {
        Swal.fire('Cancelado', '', 'info')
      }
    })
  }


  async onSubmit() {
    //Se crea el metodo de enviar los datos de rutinas

    if (this.list.length <= 5) {
      let ejercicios = {
        id_ejercicio: this.form.value.id_ejercicio,
        repeticiones: this.form.value.repeticiones,
        series: this.form.value.series,
        ejecucion: this.form.value.ejecucion,
        dia: this.form.value.dia
      }
      this.list.push(ejercicios);
      console.log(this.list);

      for (let element in this.list) {
        if (this.list[element] == this.list[element + 1]) {
          this.list.delete(element);
        }
      }
    }
    this.load = false;
    this.registro = true;
    if (this.form.valid) {
      //Si el formulario es valido se llama al servicio y se apunta direcamente al serve.
      this.rutina.registrarrutinas('https://proyectofinalsena.herokuapp.com/registrarRutinas', {
        nombre: this.form.value.nombre,
        descripcion: this.form.value.descripcion,
        intensidad: this.form.value.intensidad,
        dificultad: this.form.value.dificultad,
        categoria: this.form.value.categoria,
        ejercicios: this.list

      }, localStorage.getItem('token')).subscribe(
        (response): any => {
          //Se imprime el mensaje del serve y se muestra la notificacion al usuario aceptada.
          console.log(response)

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se registro la rutina',
            showConfirmButton: false,
            timer: 1000
          })

          this.load = true;
          this.registro = false;
          this.route.navigate(['/rutinas']);
        },
        (error) => {
           //Se imprime el mensaje del serve y se muestra la notificacion al usuario rechazada.
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible registrar la rutina, el nombre puede existir',
            footer: 'Verifique el ID y los datos ingresados\n'
          })
          this.load = true;
          this.registro = false;
        })
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: '¡Atencion!',
        text: 'Verifique los datos de ingreso\nel nombre puede existir',
        footer: 'Todos los campos deben estar completos'
      })
      this.load = true;
      this.registro = false;
    }

  }

}
