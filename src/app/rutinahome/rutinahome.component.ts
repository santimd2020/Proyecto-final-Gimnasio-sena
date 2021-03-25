import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RutinasService } from '../rutinas.service/rutinas.service';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-rutinahome',
  templateUrl: './rutinahome.component.html',
  styleUrls: ['./rutinahome.component.css']
})
export class RutinahomeComponent implements OnInit {
  tablarutinas = true;

  dtOptions: DataTables.Settings = {};

  form: FormGroup;

  rutinas;

  ejercicios: any;

  load: boolean = false;//se muestra


  constructor(
    private route: Router,
    private rutina: RutinasService,
    private fb: FormBuilder) { }

  ngOnInit(): void {

    this.form = this.fb.group({
      id: new FormControl('', Validators.required),
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      }
    };

    this.rutina.getRequestAllRutinas('https://proyectofinalsena.herokuapp.com/consultarRutinas', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          console.log(data)
          this.rutinas = data['ejercicios']
          this.tablarutinas = false;
          this.load = true;
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
  }

  ejercicio(id) {
    this.ejercicios = id;
  }

  editarRutinaPorId(id) {
    localStorage.setItem('id', id)
    this.route.navigate(['/editarrutina']);
  }

  eliminarRutinaPorId(id) {
    Swal.fire({
      title: '¿Seguro desea eliminar?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.tablarutinas = true;
        this.load = false;
        this.rutina.deleteRutinas('https://proyectofinalsena.herokuapp.com/eliminarRutina/' + id, localStorage.getItem('token'))
          .subscribe(
            (data): any => {
              console.log(data)
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
              console.log(error)
              this.load = true;
              this.tablarutinas = false;
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

  irAgregarRutina() {
    this.route.navigate(['/agregarrutinas']);
  }

  GenerarReporte() {
    this.rutina.getReporteAllRutinas('https://proyectofinalsena.herokuapp.com/reporteRutinas', localStorage.getItem('token'))
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
    FileSaver.saveAs(file, 'Informe rutinas.xls')
  }


  asignarRutinaPorId(id) {
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
          let url: string = `https://proyectofinalsena.herokuapp.com/asignarRutina/${identificacion}/${id}`;
          this.rutina.asignarRutinas(url, id, localStorage.getItem('token'))
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
                this.load = true;
                this.tablarutinas = false;
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

}