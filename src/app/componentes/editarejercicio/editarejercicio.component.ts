import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConsultaejerciciosService } from '../../servicios/Consultaejercicios.service/consultaejercicios.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-editarejercicio',
  templateUrl: './editarejercicio.component.html',
  styleUrls: ['./editarejercicio.component.css']
})
export class EditarejercicioComponent implements OnInit {

  numeroid;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  ejerciciosPorId;
  archivos: any = []
  previsualizacion: string;
  imagen: any;

  constructor(private fb: FormBuilder,
    private route: Router,
    public client: ConsultaejerciciosService,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.numeroid = localStorage.getItem('id')
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      descripcion: ['', Validators.required],
      tipo: ['', Validators.required],
      id: ['', Validators.required],
    });
    this.form.get('id').disable();
    this.load = false;
    this.client.getRequestIdEjercicios(`${environment.BASE_EJERCICIOS}/consultaEjercicios/` + this.numeroid, localStorage.getItem('token'))
      .subscribe(
        (data): any => {

          this.load = true;
          this.ejerciciosPorId = data["ejercicio"]
          this.form.get('id').setValue(this.ejerciciosPorId[0]['id']);
          this.form.get('nombre').setValue(this.ejerciciosPorId[0]['nombre']);
          this.form.get('descripcion').setValue(this.ejerciciosPorId[0]['descripcion']);
          this.form.get('tipo').setValue(this.ejerciciosPorId[0]['tipo']);
          this.imagen = this.ejerciciosPorId[0]['imagen']
        },
      );
  }

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

  async onSubmit() {
    this.load = false;
    this.registro = true;

    const formularioDeDatos = new FormData();

    if (this.archivos.length >= 1) {
      this.archivos.forEach(archivo => {
        formularioDeDatos.append('imagen', archivo, archivo.name);
        formularioDeDatos.append('nombre', this.form.value.nombre);
        formularioDeDatos.append('descripcion', this.form.value.descripcion);
        formularioDeDatos.append('tipo', this.form.value.tipo);
      })
    } else {
      formularioDeDatos.append('url', this.imagen);
      formularioDeDatos.append('nombre', this.form.value.nombre);
      formularioDeDatos.append('descripcion', this.form.value.descripcion);
      formularioDeDatos.append('tipo', this.form.value.tipo);
    }

    if (this.form.valid) {
      let numero = this.form.get('id');
      this.client.editarejercicio(`${environment.BASE_EJERCICIOS}/actualizarEjercicio/` + numero.value, formularioDeDatos, localStorage.getItem('token')
      ).subscribe(
        (response): any => {

          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se actualizo el ejercicio',
            timer: 1000
          })
          this.form.get('nombre').setValue('');
          this.form.get('tipo').setValue('');
          this.form.get('descripcion').setValue('');
          this.load = true;
          this.registro = false;
          localStorage.removeItem('id');
          this.route.navigate(['/ejercicios']);
        },
        (error) => {

          this.archivos.splice(0, 1);
          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible actualizar el ejercicio',
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
  cancelar() {
    this.route.navigate(['/ejercicios']);
  }
}