import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuario.service/usuarios.service';
import { DomSanitizer } from '@angular/platform-browser';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-actulizarusuario',
  templateUrl: './actulizarusuario.component.html',
  styleUrls: ['./actulizarusuario.component.css']
})
export class ActulizarusuarioComponent implements OnInit {

  previsualizacion: string;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  archivos: any = []
  numeroid;
  usuario;
  imagen: any;

  constructor(
    private fb: FormBuilder,
    private usuarios: UsuariosService,
    private route: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.numeroid = localStorage.getItem('id')
    //Se construye el formulario
    this.form = this.fb.group({
      correo: ['', Validators.required],
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      telefono: ['', Validators.required],
      edad: ['', Validators.required],
    });
    //Se deshabilita el campo id, para que no pueda modificarse.
    this.load = false;
    //Se llama al servicio y se apunta directamente al serve,pasandole el id y el token para la consulta de dietas.
    this.usuarios.getRequestIdUsuario(`${environment.BASE_PINZON}/consultaUsuarios/` + this.numeroid, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se extrae los datos de las dietas que manda el serve, y se imprime la respuesta del serve
          this.load = true;
          this.usuario = data["consulta"]
          this.form.get('correo').setValue(this.usuario[0]['correo']);
          this.form.get('nombres').setValue(this.usuario[0]['nombres']);
          this.form.get('apellidos').setValue(this.usuario[0]['apellidos']);
          this.form.get('telefono').setValue(this.usuario[0]['telefono']);
          this.form.get('edad').setValue(this.usuario[0]['edad']);
        },
      );
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
    this.numeroid = localStorage.getItem('id')
    this.load = false;
    this.registro = true;

    const formularioDeDatos = new FormData();

    if (this.archivos.length >= 1) {
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('imagen', archivo, archivo.name);
        formularioDeDatos.append('correo', this.form.value.correo);
        formularioDeDatos.append('nombres', this.form.value.nombres);
        formularioDeDatos.append('apellidos', this.form.value.apellidos);
        formularioDeDatos.append('telefono', this.form.value.telefono);
        formularioDeDatos.append('edad', this.form.value.edad);
      })
    } else {
      formularioDeDatos.append('url', this.imagen);
      formularioDeDatos.append('correo', this.form.value.correo);
      formularioDeDatos.append('nombres', this.form.value.nombres);
      formularioDeDatos.append('apellidos', this.form.value.apellidos);
      formularioDeDatos.append('telefono', this.form.value.telefono);
      formularioDeDatos.append('edad', this.form.value.edad);
    }
    if (this.form.valid) {
      //Si el formulario es valido, se llama servicio y envia se apunta directamente al serve.
      this.usuarios.editarusuario(`${environment.BASE_PINZON}/actualizar/` + this.numeroid, formularioDeDatos, localStorage.getItem('token')).subscribe(
        (response): any => {
          //Se imprime la respuesta del serve y se muestra un mensaje de notificacion al usuario
          console.log(response);
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            timer: 1000,
            text: 'Se actualizaron los datos',
          })
          this.load = true;
          this.registro = false;
          this.route.navigate(['/usuarios']);
        },
        (error) => {
          //En caso de error se imprime el mensaje de error y se limpia el array
          this.archivos.splice(0, 1);
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible actualizar el usuario',
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
    this.route.navigate(['/usuarios']);
  }

}
