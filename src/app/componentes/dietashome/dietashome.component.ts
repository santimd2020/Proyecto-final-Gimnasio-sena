import { Component, OnInit } from '@angular/core';
import { DietasService } from '../../servicios/dietas.service/dietas.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { data } from 'jquery';
import { AutentiService } from '../../servicios/autenti.service/autenti.service';
import {environment} from '../../../environments/environment'
//Se hacen las importaciones necesarias

@Component({
  selector: 'app-dietashome',
  templateUrl: './dietashome.component.html',
  styleUrls: ['./dietashome.component.css']
})
export class DietashomeComponent implements OnInit {

  //Se crean las propiedades necesarias para la clase. 

  tabladietas = true;

  dtOptions: DataTables.Settings = {};

  form: FormGroup;

  dietas;

  load: boolean = false;

  constructor(
    private dieta: DietasService,
    private route: Router,
    private fb: FormBuilder,
    public auth: AutentiService) { }


  ngOnInit(): void {

    this.form = this.fb.group({
      id: new FormControl('', Validators.required),
    });
    //Con la propiedad dtOptions se establecen las configuraciones de la datatable 
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
    };
    //Se llama al servicio de dietas y se apunta directamente al serve, se pasan el token de autenticacion
    this.dieta.getRequestAllDietas(`${environment.BASE_EJERCICIOS}/consultarDietas`, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.dietas = data['dietas']
          this.tabladietas = false;
          this.load = true;

          //Se imprime el mensaje del serve y se le notifica al usuario.
          if (this.dietas == null) {
            //Se hace una validacion, en donde si dietas queda vacio signifca que el token vencio y se debe renovar.
            Swal.fire({
              position: 'center',
              icon: 'warning',
              showConfirmButton: false,
              title: 'Session Expirada',
              timer: 2000
            })
            //Se limpia el localStorga y se redirige al login para generar un nuevo token.
            localStorage.clear()
            setTimeout(() => {
              //Se redireciona a la pantalla principal.
              this.route.navigate(['/']);
            }, 2000);
          }
        },
        error => { })
  }
  //Se crea el metodo de editar dietas
  editarDietaPorId(id) {
    //Se guarda el parmetro que tiene el metodo id en el localStorage.
    localStorage.setItem('id', id)
    //Se navega a la ruta de editar dieta
    this.route.navigate(['/editardieta']);
  }


  eliminarDietaPorId(id) {
    Swal.fire({
      title: '¿Seguro desea eliminar?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.load = false;
        this.tabladietas = true;
        this.dieta.deleteDietas(`${environment.BASE_EJERCICIOS}/eliminarDietas/` + id, localStorage.getItem('token'))
          .subscribe(
            (data): any => {

              this.load = true;
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
              this.load = true;//se oculta el spinner
              this.tabladietas = false;
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

  irAgregarDieta() {
    this.route.navigate(['/agregardietas']);
  }

  GenerarReporte() {
    this.dieta.getReporteAllDietas(`${environment.BASE_EJERCICIOS}/reporteDietas}`, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          this.downloadFile(data)
        })


    error => { }
  }

  downloadFile(data) {
    const blob = new Blob([data], { type: 'text/csv' });
    const file = new File([blob], 'report.xlsx', { type: 'application/vnd.ms-excel' });
    FileSaver.saveAs(file, 'Informe dietas.xls')
  }


  asignarDietaPorId(id) {
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
          let url: string = `${environment.BASE_EJERCICIOS}/asignarDieta/${id}/${identificacion}`;
          this.dieta.asignarDietas(url, id, localStorage.getItem('token'))
            .subscribe(
              (data): any => {

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

                this.load = true;
                this.tabladietas = false;
                Swal.fire({
                  icon: 'error',
                  title: '¡Atencion!',
                  text: 'Error al asignar',
                  footer: 'Verifique que el usuario exista'
                })
              }
            )
        }
      });
  }
}