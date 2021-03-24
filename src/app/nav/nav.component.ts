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

  irIngresar() {
    this.route.navigate(['/usuarios']);
  }

  irSistema() {
      this.route.navigate(['/sistema']);
  }
  irRutinahome() {
      this.route.navigate(['/rutinas']);
  }


  irEjercicioshome() {
      this.route.navigate(['/ejercicios']);
  }

  irDietashome() {
      this.route.navigate(['/dietas']);
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
