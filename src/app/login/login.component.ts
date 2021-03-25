import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConsultaejerciciosService } from '../Consultaejercicios.service/consultaejercicios.service';
import { Router } from '@angular/router';
import { AutentiService } from '../autenti.service'
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
    console.log("entro login")
    localStorage.clear();
    this.load = false;
    this.client.postRequest('https://gymsenajorge.herokuapp.com/login', {
      correo: this.form.value.correo,
      password: this.form.value.password,
    })
      .subscribe(
        (response: any) => {
          console.log(response);
          this.auth.setCurrentUser(response.nombre)
          this.auth.login(response.token, response.user)
          console.log(this.auth.isAdmin())
          if (this.auth.admin.value==true) {
            this.route.navigate(['/sistema']);
          } else {
            this.route.navigate(['/perfil']);
          }
        },
        (error) => {
          console.log(error);
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

