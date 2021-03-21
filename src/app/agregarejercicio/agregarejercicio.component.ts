import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConsultaejerciciosService } from '../Consultaejercicios.service/consultaejercicios.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
//Se realizan las importaciones necesarias

@Component({
  selector: 'app-agregarejercicio',
  templateUrl: './agregarejercicio.component.html',
  styleUrls: ['./agregarejercicio.component.css']
})
export class AgregarejercicioComponent implements OnInit {

  //Se crean las propiedades necesarias para la clase
  previsualizacion: string;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  archivos: any = []

  constructor(private fb: FormBuilder,
    private ejercicio: ConsultaejerciciosService,
    private route: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    //Se construye el formulario
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required]
    });
  }

  //Metodo que captura las imagenes recibidas
  capturarFile(event): any {
    if (this.archivos.length >= 1) {
      this.archivos.splice(0, 1);
    }
    const archivoCapturado = event.target.files[0]
    this.extraerBase64(archivoCapturado).then((imagen: any) => {
      this.previsualizacion = imagen.base;

    })
    this.archivos.push(archivoCapturado);
  }

  //Se crea el metodo para codificar la imagen en base64
  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };

    } catch (e) {
      return null;
    }
  })

  //Se crea el metodo de enviar para agregar los ejercicios ya con la imagen codificada
  async onSubmit() {
    this.load = false;
    this.registro = true;
    const formularioDeDatos = new FormData();
    // El formData permiten compilar un conjunto de pares clave/valor para enviar mediante XMLHttpRequest

    this.archivos.forEach(archivo => {
      //Se agrega los elementos a la lista formulario de datos.
      formularioDeDatos.append('imagen', archivo, archivo.name);
      formularioDeDatos.append('nombre', this.form.value.nombre);
      formularioDeDatos.append('descripcion', this.form.value.descripcion);
      formularioDeDatos.append('tipo', this.form.value.tipo);
    })

    if (this.form.valid) {
      //Si el formulario es valido, se llama servicio y envia se apunta directamente al serve.
      this.ejercicio.registrarejercicio('https://proyectofinalsena.herokuapp.com/agregarEjercicios', formularioDeDatos, localStorage.getItem('token')).subscribe(
        (response): any => {
          //Se imprime la respuesta del serve y se muestra un mensaje de notificacion al usuario
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se registro el ejercicio',
          })
          this.form.get('nombre').setValue('');
          this.form.get('tipo').setValue('');
          this.form.get('descripcion').setValue('');
          this.load = true;
          this.registro = false;
          this.route.navigate(['/ejercicios']);
        },
        (error) => {
          //En caso de error se imprime el mensaje de error y se limpia el array
          console.log(error)
          this.archivos.splice(0, 1);
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible registrar el ejercicio',
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
}