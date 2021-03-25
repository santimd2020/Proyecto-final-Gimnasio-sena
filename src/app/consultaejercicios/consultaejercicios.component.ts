import { Component, OnInit } from '@angular/core';
import { ConsultaejerciciosService } from '../Consultaejercicios.service/consultaejercicios.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
//Se realizan las importaciones necesarias

@Component({
  selector: 'app-consultaejercicios',
  templateUrl: './consultaejercicios.component.html',
  styleUrls: ['./consultaejercicios.component.css']
})
export class ConsultaejerciciosComponent implements OnInit {

  //Se crean propiedades necesarias de las clase

  dtOptions: DataTables.Settings = {};

  id;

  form: FormGroup;

  load: boolean = false;//se muestra

  ejercicios: any[];

  tablaejercicios: boolean = true;//no se muestra

  tablaejerciciosPorId: boolean = true;//no se muestra

  ejerciciosPorId;


  constructor(

    public client: ConsultaejerciciosService,
    private fb: FormBuilder,
    private route: Router

  ) { }

  ngOnInit(): void {
    //Se obtiene el token cuando se inica el componente
    localStorage.getItem('token')
    this.dtOptions = {
      //Se utiliza la propiedad dtOptions para la configuracion de las datatable. 
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: "//cdn.datatables.net/plug-ins/1.10.21/i18n/Spanish.json"
      }
    };
    this.form = this.fb.group({
      id: new FormControl('', Validators.required),
    });
    //Se llama al servicio de ejercicios y se apunta directamente al serve.
    this.client.getRequestAllEjercicios('https://proyectofinalsena.herokuapp.com/consultaEjercicios', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guardan el json que llega del serve a lista
          this.ejercicios = data["ejercicios"]
          this.tablaejercicios = false;
          this.load = true;
          //Se imprime la respuesta del serve.
          console.log(data)
          if (this.ejercicios == null) {
            //Se realiza una validacion donde si la lista esta vacia, signigica que la session de token vencio.
            Swal.fire({
              position: 'center',
              icon: 'warning',
              showConfirmButton: false,
              title: 'Session Expirada',
              timer: 2000
            })
            //Se limpia el localStorage y se redireciona al login para generar otro token de session.
            localStorage.clear()
            setTimeout(() => {
              this.route.navigate(['/']);
            }, 2000);
          }
        },
        error => {
          //Igualemnte si el serve arroja un error, se redireciona al login para volver a inicar session
          console.log(error)
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
        })
  }

  //Metodo que elimina los ejercicios
  eliminarEjerciciosPorId(id) {





    Swal.fire({
      title: '¿Seguro desea eliminar?',
      showCancelButton: true,
      confirmButtonText: `Eliminar`,
      cancelButtonText: `Cancelar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.load = false;
        this.tablaejerciciosPorId = true;
        this.load = false;
        this.tablaejercicios = true;
        //Se llama al servicio y se apunta directamente al serve, Se le envia id del ejercicios y token de autenticacion
        this.client.deleteEjercicios('https://proyectofinalsena.herokuapp.com/eliminarEjercicios/' + id, localStorage.getItem('token'))
          .subscribe(
            (data): any => {
              //Se imprime el mensaje del serve y se muestran la notificacion al usuario.
              console.log(data)
              this.tablaejerciciosPorId = true;
              this.load = true;//se oculta el spinner
              this.tablaejercicios = false;
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Se elimino correctamente',
                timer: 1000
              })
              window.location.reload();
            },
            (error) => {
              //En caso de error se imprime el mensaje de error del serve y se le notifica al usuario.
              console.log(error)
              this.load = true;//se oculta el spinner
              this.form.get('id').setValue('');
              this.tablaejerciciosPorId = true;
              this.tablaejercicios = false;
              Swal.fire({
                icon: 'warning',
                title: '¡Atencion!',
                text: 'El id no se encuentra registrado',
                footer: 'Verifique el id ingresado'
              })
            }
          )
      } else if (result.isDenied) {
      }
    })
  }

  //Se crea el metodo de editar ejercicio, con un parametro.
  editarEjerciciosPorId(id) {
    //Se le notifica al usuario y se redireccionamient
    //Se guarda el parametro id en el localStorage para pasarlo para la consulta de ejercicio por id
    localStorage.setItem('id', id)
    //Se navega a la ruta de editar ejercicios
    this.route.navigate(['/editarejercicios']);
  }
  //Metodo de agregar ejercicios
  irAgregarEjercicios() {
    //Se muestra el mensaje de notificacion al usuario.
    //Se redireciona a la pagina de aregagar ejercicios
    this.route.navigate(['/agregarejercicios']);

  }
}