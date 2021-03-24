import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { SistemaService } from '../sistema.service/sistema.service';
import { Router } from '@angular/router';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-sistema',
  templateUrl: './sistema.component.html',
  styleUrls: ['./sistema.component.css']
})
export class SistemaComponent implements OnInit {

  tablatest = true;
  dtOptions: DataTables.Settings = {};
  tests: any[] = [];
  load = false;
  estadisticas;

  constructor(
    private sistema: SistemaService,
    private route: Router) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      },
    };

    this.sistema.getRequestAllTest('https://gymsenajorge.herokuapp.com/consultarTest', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.tests = data['test']
          this.tablatest = false;
          this.load = true;
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
              //this.route.navigate(['/']);
            }, 2000);
          }
        },
        error => { console.log(error) 
          this.load = true;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            showConfirmButton: false,
            title: 'No existen test asignados al usuario',
            timer: 2000
          })
        })
  }

  CalcularTest() {
    Swal.fire({
      title: 'Calcular Test',
      html: `<input type="number" id="identificacion" class="swal2-input" placeholder="Identificacion">
      <input type="number" id="peso" class="swal2-input" placeholder="peso">
      <input type="number" id="altura" class="swal2-input" placeholder="altura">`,
      cancelButtonText: `Cancelar`,
      confirmButtonText: `Calcular`,
      showCancelButton: true,
      focusConfirm: false,
      preConfirm: () => {
        const identificacion = Swal.getPopup().querySelector('#identificacion').value
        const peso = Swal.getPopup().querySelector('#peso').value
        const altura = Swal.getPopup().querySelector('#altura').value
        if (!identificacion || !peso) {
          Swal.showValidationMessage(`Debe rellenar todos los campos`)
        }
        return { identificacion: identificacion, peso: peso, altura: altura }
      }
    }).then((result) => {
      console.log(result.value.identificacion)
      console.log(result.value.peso)
      console.log(result.value.altura)
      this.sistema.registraTest('https://gymsenajorge.herokuapp.com/calcularimc/' + result.value.identificacion, {
        peso: result.value.peso,
        altura: result.value.altura,
      }, localStorage.getItem('token'))
        .subscribe(
          (data): any => {
            console.log(data);
            if (data) {
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se calculo correctamente',
                timer: 1000
              })
              window.location.reload();
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
    })

  }

  DescargarReporte() {
    this.sistema.getReporteAllTest('https://gymsenajorge.herokuapp.com/generarReporte', localStorage.getItem('token'))
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
    FileSaver.saveAs(file, 'Informe Test.xls')
  }


  IrAnuncios() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      showConfirmButton: false,
      title: 'Cargando',
      timer: 2000
    })
    setTimeout(() => {
      this.route.navigate(['/anuncios']);
    }, 2000);
  }


  Estadisticas() {
    this.sistema.getRequestAllestadisticas('https://gymsenajorge.herokuapp.com/estadisticas', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.estadisticas = data['estadisticas']
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
}