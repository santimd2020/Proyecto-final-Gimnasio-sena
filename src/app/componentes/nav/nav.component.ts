import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { SistemaService } from '../../servicios/sistema.service/sistema.service';
import { AutentiService } from '../../servicios/autenti.service/autenti.service'
import { environment } from '../../../environments/environment'

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

  constructor(
    private route: Router,
    private sistema: SistemaService,
    public auth: AutentiService) { }

  ngOnInit(): void {
    this.sistema.getRequestAllAnuncios(`${environment.BASE_JORGE}/consultarAnuncios`, localStorage.getItem('token'))
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
  CerrarSession() {
    this.auth.logout();
    this.route.navigate(['/']);
  }


  Verperfil() {
    this.route.navigate(['/perfil']);
  }

}
