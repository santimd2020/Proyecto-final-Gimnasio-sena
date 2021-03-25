import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { DietasService } from '../dietas.service/dietas.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//Se realizan las importaciones necesarias.

@Component({
  selector: 'app-editardieta',
  templateUrl: './editardieta.component.html',
  styleUrls: ['./editardieta.component.css']
})
export class EditardietaComponent implements OnInit {

  //Se crean las propiedades necesarias para la clase.
  numeroid;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  dietaPorId;
  categoria: any = ['bajar de peso', 'aumento de masa muscular']

  constructor(
    private dieta: DietasService,
    private route: Router,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    //Se extrae el id guardo en el localStorage, para hacer una consulta por id y saber que datos tiene la dieta
    this.numeroid = localStorage.getItem('id')
    //Se construye el formulario
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      categoria: ['', Validators.required],
      id: ['', Validators.required],
    });
    //Se deshabilita el campo id, para que no pueda modificarse.
    this.form.get('id').disable();
    this.load = false;
    //Se llama al servicio y se apunta directamente al serve,pasandole el id y el token para la consulta de dietas.
    this.dieta.getRequestIdDietas('https://proyectofinalsena.herokuapp.com/consultarDietas/' + this.numeroid, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se extrae los datos de las dietas que manda el serve, y se imprime la respuesta del serve
          console.log(data)
          this.load = true;
          this.dietaPorId = data["dietas"]
          this.form.get('id').setValue(this.dietaPorId[0]['id']);
          this.form.get('nombre').setValue(this.dietaPorId[0]['nombre']);
          this.form.get('categoria').setValue(this.dietaPorId[0]['categoria']);
          this.form.get('descripcion').setValue(this.dietaPorId[0]['descripcion']);
        },
      );
  }

  //Se crea el metodo de enviar
  async onSubmit() {
    this.load = false;
    this.registro = true;
    if (this.form.valid) {
      //Si el formulario es valido, se obtiene el id, desde la vista para despues pasarlo en la ruta.
      let numero = this.form.get('id');
      //Se llama al servicio de dietas, y se apunta directamente al serve
      this.dieta.editarDietas('https://proyectofinalsena.herokuapp.com/actualizarDietas/' + numero.value, {
        nombre: this.form.value.nombre,
        categoria: this.form.value.categoria,
        descripcion: this.form.value.descripcion,
      }, localStorage.getItem('token')
      ).subscribe(
        (response): any => {
          console.log(response)
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se actualizo la dieta',
            timer: 1000
          })
          this.load = true;
          this.registro = false;
          localStorage.removeItem('id');
          this.route.navigate(['/dietas']);
        },
        (error) => {
          console.log(error)
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible actualizar la dieta',
            footer: 'Verifique e intenten nuevamente'
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


  cancelar(){
    this.route.navigate(['/dietas']);
  }
}