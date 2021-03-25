import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuario.service/usuarios.service';
import { RutinasService } from '../rutinas.service/rutinas.service';
import { AutentiService } from '../autenti.service'

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  dtOptions: DataTables.Settings = {};
  previsualizacion: string;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  archivos: any = []
  numeroid;
  usuario: any[] = [];
  imagen: any;
  tablarutinas = true;
  rutinas;
  ejercicios: any;

  constructor(
    private fb: FormBuilder,
    private usuarios: UsuariosService,
    private route: Router,
    private rutina: RutinasService,
    public auth: AutentiService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      id: ['', Validators.required],
      intensidad: ['', Validators.required],
      categoria: ['', Validators.required],
      dificultad: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      }
    };
    this.rutina.getRequestAllRutinas('https://gymsenapinzon.herokuapp.com/consultarRutina', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          console.log("asdsdf", data['ejercicios'][0])
          this.rutinas = data['ejercicios']
          this.ejercicios = data['ejercicios'][0]
          this.load = true;
          this.tablarutinas = false
          this.form.get('nombre').setValue(this.rutinas[0]['nombre']);
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
        error => { console.log(error); })
    this.load = false;
    this.usuarios.getRequestIdUsuario('https://gymsenapinzon.herokuapp.com/perfil', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se extrae los datos de las dietas que manda el serve, y se imprime la respuesta del serve
          this.load = true;
          this.usuario = data["consulta"]
        },
      );    
  }

  ejercicio(id) {
    this.ejercicios = id;
  }

  actulizar() {
    this.route.navigate(['/actulizarperfil']);
  }

  cambiarcontrasena() {
    Swal.fire({
      title: "Introduzca la nueva contraseña",
      html: `<input type="text" id="pass" class="swal2-input" placeholder="Nueva contraseña">`,
      showCancelButton: true,
      confirmButtonText: "Cambiar",
      cancelButtonText: "Cancelar",
      preConfirm: () => {
        const identificacion = Swal.getPopup().querySelector('#pass').value
        if (!identificacion) {
          Swal.showValidationMessage(`Debe rellenar todos los campos`)
        }
        if (identificacion.length<6) {
          Swal.showValidationMessage(`Debe tener minimo 6 caracteres`)
        }
        return { identificacion: identificacion}
      }
    })
      .then(resultado => {
        if (resultado.value) {
          console.log(resultado.value);
          this.usuarios.cambiarpassword('https://gymsenapinzon.herokuapp.com/cambiarPassword', {
            password: resultado.value,
          }, localStorage.getItem('token'))
            .subscribe(
              (data): any => {
                
                console.log(data);
                if (data) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se actualizo correctamente',
                    timer: 1000
                  })
                } else {
                  Swal.fire({
                    position: 'center',
                    icon: 'warnig',
                    title: 'Se sesion expirada',
                    timer: 1000
                  })
                  setTimeout(() => {
                    this.route.navigate(['/']);
                  }, 1000);
                }

              },
              (error) => {
                console.log(error);
                Swal.fire({
                  icon: 'error',
                  title: '¡Atencion!',
                  text: 'Error al cambiar',
                  footer: 'Verifique que sea valida',
                })
              }
            )
        }
      });
  }
}