import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DietasService } from '../../servicios/dietas.service/dietas.service';
import {environment} from '../../../environments/environment'
//Se realizan las importaciones necesarias
@Component({
  selector: 'app-agregardietas',
  templateUrl: './agregardietas.component.html',
  styleUrls: ['./agregardietas.component.css']
})
export class AgregardietasComponent implements OnInit {

  //Se crean las propiedades necesarias de la clase
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  categoria: any = ['bajar de peso', 'aumento de masa muscular']

  constructor(
    private fb: FormBuilder,
    private dietas: DietasService,
    private route: Router) { }

  ngOnInit(): void {
    //Se construye el formulario en metodo inicial de la clase
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: ['', Validators.required],

    });
  }

  async onSubmit() {
    //Se crea el metodo de enviar los datos para registrar las dietas
    this.load = false;
    this.registro = true;
    if (this.form.valid) {
      //Si el formulario es valido se llama al servicio y se apunta al serve para enviar los datos
      this.dietas.registrarDietas(`${environment.BASE_EJERCICIOS}/registrarDietas`, {
        nombre: this.form.value.nombre,
        categoria: this.form.value.categoria,
        descripcion: this.form.value.descripcion,
        //Se envia el token de autenticacion
      }, localStorage.getItem('token')).subscribe(
        (response): any => {
          //Se imprima la respuesta del serve, y mensaje de confirmacion al usuario.
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se registro la dieta',
          })
          this.registro = false;
          //Se redireciona a la pagina principal de dietas
          this.route.navigate(['/dietas']);
        },
        (error) => {
          //En caso de error se imprime el mensaje del serve y se notifica al usuario
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible registrar la dieta',
            footer: 'Verifique que el nombre no este registrado'
          })
          this.load = true;
          this.registro = false;
        })
    }
    else {
      Swal.fire({
        icon: 'warning',
        title: '¡Atencion!',
        text: 'Verifique los datos de ingreso',
        footer: 'Todos los campos deben estar completos'
      })
      this.load = true;
      this.registro = false;
    }

  }

  cancelar() {
    this.route.navigate(['/dietas']);
  }
}