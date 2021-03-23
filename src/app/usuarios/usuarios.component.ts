import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { UsuariosService } from '../usuario.service/usuarios.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ingreso;
  tests;

  constructor(
    private route: Router,
    private usuarios: UsuariosService) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
    },

    this.usuarios.getRequestAllIngreso('https://gymsenajorge.herokuapp.com/consultarTest', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.tests = data['test']
          console.log(data)
          //Se imprime el mensaje del serve y se le notifica al usuario.
          if (this.tests == null) {
            //Se hace una validacion, en donde si dietas queda vacio signifca que el token vencio y se debe renovar.
            Swal.fire({
              position: 'center',
              icon: 'warning',
              showConfirmButton: false,
              title: 'Session Expirada',
              timer: 2000
            })
            //Se limpia el localStorga y se redirige al login para generar un nuevo token.
            //localStorage.clear();
            setTimeout(() => {
              //Se redireciona a la pantalla principal.
              this.route.navigate(['/']);
            }, 2000);
          }
        },
        error => { console.log(error) })

  }

  RegistrarUsuario() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      title: 'Cargando',
      timer: 2000
    })
    setTimeout(() => {
      this.route.navigate(['/registrarusuario']);
    }, 2000);
  }

  RegistrarEntrada() {
    Swal.fire({
      title: "Identificacion del usuario",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Asociar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          let identificacion = resultado.value;
          let numero = 0;
          let url: string = `https://gymsenapinzon.herokuapp.com/ingresosistema/${identificacion}`;
          this.usuarios.registrarEntrada(url, numero, localStorage.getItem('token'))
            .subscribe(
              (data): any => {
                console.log(data);
                if (data) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se asgino correctamente',
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
                  text: 'Error al asignar',
                })
              }
            )
        }
      });

  }

  SalidaUsuarios() {
    Swal.fire({
      title: "Identificacion del usuario",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Asociar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          let identificacion = resultado.value;
          let numero = 0;
          let url: string = `https://gymsenapinzon.herokuapp.com/salidaGym/${identificacion}`;
          this.usuarios.registrarSalida(url, numero, localStorage.getItem('token'))
            .subscribe(
              (data): any => {
                console.log(data);
                if (data) {
                  Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Se asgino correctamente',
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
                  text: 'Error al asignar',
                })
              }
            )
        }
      });

  }

  EliminarUsuario() {

  }

  ConsultarEntrada() {

  }

}
