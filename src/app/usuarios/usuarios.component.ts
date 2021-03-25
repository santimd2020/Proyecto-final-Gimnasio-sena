import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuario.service/usuarios.service';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import * as FileSaver from 'file-saver';
import { AutentiService } from '../autenti.service'

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  ingreso: any[] = [];
  user: any[] = [];
  load: boolean = true;

  constructor(
    public auth: AutentiService,
    private route: Router,
    private usuarios: UsuariosService) { }

  ngOnInit(): void {
    this.load= false;
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
    },
      this.usuarios.getRequestAllUsuarios('https://gymsenapinzon.herokuapp.com/consultaUsuarios', localStorage.getItem('token'))
        .subscribe(
          (data): any => {
            this.load = true;
            //Se guarda los datos que trae el json del serve, ala propiedad dietas.
            this.user = data['consulta']
            console.log(data)
            //Se imprime el mensaje del serve y se le notifica al usuario.
            if (this.ingreso == null) {
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
                //this.route.navigate(['/']);
              }, 2000);
            }
          },
          error => { console.log(error) })
  }

  RegistrarUsuario() {
      this.route.navigate(['/registrarusuario']);
  }

  RegistrarEntrada() {
    Swal.fire({
      title: "Identificacion del usuario",
      input: "text",
      showCancelButton: true,
      confirmButtonText: "Registrar",
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
      confirmButtonText: "Registrar",
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

  EliminarUsuario(id) {
    console.log(id)
    Swal.fire({
      title: '¿Seguro desea eliminar?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarios.deleteUsuario('https://gymsenapinzon.herokuapp.com/elimnarUsuario/' + id, localStorage.getItem('token'))
          .subscribe(
            (data): any => {
              console.log(data)
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se elimino correctamente',
                timer: 1000
              })
              setTimeout(() => {
                window.location.reload();
              }, 1000);

            },
            (error) => {
              console.log(error)
              Swal.fire({
                icon: 'error',
                title: '¡Atencion!',
                text: 'Error al eliminar',
              })
            }
          )
      } else if (result.isDenied) {
      }
    })

  }

  ConsultarEntrada() {
    this.usuarios.getRequestAllIngreso('https://gymsenapinzon.herokuapp.com/tablaingresos', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          console.log("token estra", localStorage.getItem('token'))
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.ingreso = data['consultaUser']
          console.log(data)
          //Se imprime el mensaje del serve y se le notifica al usuario.
          if (this.ingreso == null) {
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

  ActulizarUsuario(id) {
    localStorage.setItem('id', id)
      //Se navega a la ruta de editar dieta
      this.route.navigate(['/actulizarusuario']);
  }


  DescargarReporte() {
    this.usuarios.getReporteAllIngreso('https://gymsenapinzon.herokuapp.com/reporteIngreso', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          console.log(data)
          this.downloadFile(data)
        })
    error => { console.log(error) }
  }
  downloadFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const file = new File([blob], 'report.xlsx', { type: 'application/vnd.ms-excel' });
    FileSaver.saveAs(file, 'Reporte Ingreso.xls')
  }


  DescargarReporteUsuarios() {
    this.usuarios.getReporteAllUser('https://gymsenapinzon.herokuapp.com/reporteUsuarios', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          console.log(data)
          this.downloadFileUser(data)
        })
    error => { console.log(error) }
  }
  downloadFileUser(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const file = new File([blob], 'report.xlsx', { type: 'application/vnd.ms-excel' });
    FileSaver.saveAs(file, 'Usuarios registrados.xls')
  }

  EnviarSugerencias() {
    Swal.fire({
      title: 'Enviar sugerencias',
      html: `<input type="text" id="asunto" class="swal2-input" placeholder="Asunto">
      <textarea placeholder="Escribe un mensaje" id="mensaje" name="textarea" rows="10" cols="50"></textarea>`,
      confirmButtonText: 'Enviar',
      cancelButtonText: `Cancelar`,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const asunto = Swal.getPopup().querySelector('#asunto').value
        const mensaje = Swal.getPopup().querySelector('#mensaje').value
        if (!asunto || !mensaje) {
          Swal.showValidationMessage(`Debe rellenar todos los campos`)
        }
        return { asunto: asunto, mensaje: mensaje }
      }
    }).then((result) => {
      console.log(result.value.asunto)
      console.log(result.value.mensaje)
      this.usuarios.enviarCorreo('https://gymsenapinzon.herokuapp.com/enviarCorreo', {
        asunto: result.value.asunto,
        mensaje: result.value.mensaje,
      }, localStorage.getItem('token'))
        .subscribe(
          (data): any => {
            console.log(data);
            if (data) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se envio el mensaje correctamente',
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
              text: 'Error al enviar',
            })
          }
        )
    })
  }


}