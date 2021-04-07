import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { SistemaService } from '../../servicios/sistema.service/sistema.service';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-editaranuncio',
  templateUrl: './editaranuncio.component.html',
  styleUrls: ['./editaranuncio.component.css']
})
export class EditaranuncioComponent implements OnInit {

  previsualizacion: string;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  archivos: any = []
  anuncios;
  numeroid;
  imagen;

  constructor(
    private sistema: SistemaService,
    private route: Router,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.numeroid = localStorage.getItem('id')

    this.form = this.fb.group({
      id: ['', Validators.required],
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required]
    });

    this.form.get('id').disable();
    this.sistema.getRequestIdAnuncio(`${environment.BASE_JORGE}/consultarAnuncios/` + this.numeroid, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.anuncios = data['anuncios']
          this.load = true;

          this.form.get('id').setValue(this.anuncios[0]['id']);
          this.form.get('titulo').setValue(this.anuncios[0]['titulo']);
          this.form.get('descripcion').setValue(this.anuncios[0]['descripcion']);
          this.imagen = this.anuncios[0]['imagen']


          //Se imprime el mensaje del serve y se le notifica al usuario.
          if (this.anuncios == null) {
            //Se hace una validacion, en donde si dietas queda vacio signifca que el token vencio y se debe renovar.
            Swal.fire({
              position: 'warning',
              icon: 'warning',
              showConfirmButton: false,
              title: 'Error verifique el serve',
              timer: 2000
            })

          }
        },
        error => {
          Swal.fire({
            position: 'warning',
            icon: 'warning',
            showConfirmButton: false,
            title: 'No hay anuncios registrados',
            timer: 2000
          })

        })
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

    if (this.archivos.length >= 1) {
      this.archivos.forEach(archivo => {
        //Se agrega los elementos a la lista formulario de datos.
        formularioDeDatos.append('imagen', archivo, archivo.name);
        formularioDeDatos.append('titulo', this.form.value.titulo);
        formularioDeDatos.append('descripcion', this.form.value.descripcion);
      })
    }
    else {
      formularioDeDatos.append('url', this.imagen);
      formularioDeDatos.append('titulo', this.form.value.titulo);
      formularioDeDatos.append('descripcion', this.form.value.descripcion);

    }

    if (this.form.valid) {
      //Si el formulario es valido, se llama servicio y envia se apunta directamente al serve.
      this.sistema.editaranuncio(`${environment.BASE_JORGE}/editarAnuncio/` + this.numeroid, formularioDeDatos, localStorage.getItem('token')).subscribe(
        (response): any => {
          //Se imprime la respuesta del serve y se muestra un mensaje de notificacion al usuario

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se actualizo el anuncio',
          })
          this.load = true;
          this.registro = false;
          this.route.navigate(['/anuncios']);
        },
        (error) => {
          //En caso de error se imprime el mensaje de error y se limpia el array

          this.archivos.splice(0, 1);
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible actualizar el anuncio',
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
    this.route.navigate(['/anuncios']);
  }


}
