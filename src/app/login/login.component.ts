import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { ConsultaejerciciosService } from '../Consultaejercicios.service/consultaejercicios.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  dia: any = ['Admin', 'User']
  form: FormGroup;
  load: boolean = true;

  constructor(private fb: FormBuilder,
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
          localStorage.setItem('token', response.token)
          this.route.navigate(['/sistema']);
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

