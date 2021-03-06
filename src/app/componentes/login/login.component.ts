import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConsultaejerciciosService } from '../../servicios/Consultaejercicios.service/consultaejercicios.service';
import { Router } from '@angular/router';
import { AutentiService } from '../../servicios/autenti.service/autenti.service'
import { environment } from '../../../environments/environment'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dia: any = ['Admin', 'User']
  form: FormGroup;
  load: boolean = true;

  constructor(
    public auth: AutentiService,
    private fb: FormBuilder,
    public client: ConsultaejerciciosService,
    private route: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      correo: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    localStorage.clear();
    this.load = false;
    this.client.postRequest(`${environment.BASE_JORGE}/login`, {
      correo: this.form.value.correo,
      password: this.form.value.password,
    })
      .subscribe(
        (response: any) => {

          this.auth.setCurrentUser(response.nombre)
          this.auth.login(response.token)
          this.auth.tipopersona(response.user);
          this.auth.setCureenImage(response.imagen);

          if (this.auth.admin.value == true) {
            this.route.navigate(['/sistema']);
          } else {
            this.route.navigate(['/perfil']);
          }
          setTimeout(() => {
            this.auth.logout()
            Swal.fire({
              position: 'center',
              icon: 'warning',
              title: 'Su sesion expiro',
              showConfirmButton: false,
              timer: 2500
            })
            this.route.navigate(['/']);
          }, 1500000);

        },
        (error) => {

          Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Verifique los datos ingresados',
            showConfirmButton: false,
            timer: 2500
          })
          this.load = true;
          this.route.navigate(['/']);
        });

  }
}

