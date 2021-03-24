import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { SistemaService } from '../sistema.service/sistema.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  anuncios: any = [];
  foto;
  titulos: any = [];
  texto: any = [];

  constructor(private route: Router,
    private sistema: SistemaService) { }

  ngOnInit(): void {
    this.sistema.getRequestAllAnuncios('https://gymsenajorge.herokuapp.com/consultarAnuncios', localStorage.getItem('token'))
      .subscribe(
        (data): any => {

          this.foto = data['anuncios']
          for (const iterator of this.foto) {
            this.anuncios.push(iterator.imagen);
            this.titulos.push(iterator.titulo);
            this.texto.push(iterator.descripcion);
            if (this.anuncios.lenght > 3) {
              break;
            }
          }
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
          console.log(error)
        })

  }

  irInicio() {
    Swal.fire({
      position: 'center',
      icon: 'info',
      title: 'Pagina en construccion',
      footer: 'Disculpe las molestias',
      showConfirmButton: false,
      timer: 2000
    })

  }

  irIngresar() {
    this.route.navigate(['/usuarios']);
  }

  irSistema() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cargando',
      showConfirmButton: false,
      timer: 2000
    })
    setTimeout(() => {
      this.route.navigate(['/sistema']);
    }, 1000);


  }
  irRutinahome() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cargando',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {
      this.route.navigate(['/rutinas']);
    }, 1000);

  }


  irEjercicioshome() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cargando',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {
      this.route.navigate(['/ejercicios']);
    }, 1000);


  }

  irDietashome() {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cargando',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {
      this.route.navigate(['/dietas']);
    }, 1000);

  }
  CerrarSession(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cerrando session',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {
      this.route.navigate(['/']);
    }, 1000);
    localStorage.clear();
  }


  Verperfil(){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Cargando perfil',
      showConfirmButton: false,
      timer: 1000
    })
    setTimeout(() => {
      this.route.navigate(['/perfil']);
    }, 1000);
  }

}
