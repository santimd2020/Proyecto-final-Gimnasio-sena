import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from '../usuario.service/usuarios.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  previsualizacion: string;
  form: FormGroup;
  registro: boolean = false;
  load: boolean = true;
  archivos: any = []
  numeroid;
  usuario: any[] = [];
  imagen: any;


  constructor(
    private fb: FormBuilder,
    private usuarios: UsuariosService,
    private route: Router,
    private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.usuarios.getRequestIdUsuario('https://gymsenapinzon.herokuapp.com/perfil', localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se extrae los datos de las dietas que manda el serve, y se imprime la respuesta del serve
          this.load = true;
          this.usuario = data["consulta"]
          console.log("aaaa", this.usuario)
        },
      );
  }

}
