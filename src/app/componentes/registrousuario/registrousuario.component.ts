import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import { Router } from '@angular/router';
import { UsuariosService } from '../../servicios/usuario.service/usuarios.service';
import { environment } from '../../../environments/environment'

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.component.html',
  styleUrls: ['./registrousuario.component.css']
})
export class RegistrousuarioComponent implements OnInit {
  form: FormGroup;
  load: boolean = true;
  registro: boolean = false;
  idprogramas: any = []
  jornada: any = ['mixta', 'diurna', 'nocturna']
  tipouser: any = ['Usuario', 'Admin']
  tipopersona: any = ['Aprendiz', 'Funcionario']


  constructor(
    private fb: FormBuilder,
    private route: Router,
    private usuarios: UsuariosService) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombres: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      apellidos: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      documento: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(15)]],
      ficha: ['', [Validators.minLength(6), Validators.maxLength(15), Validators.required]],
      idprograma: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]],
      edad: ['', [Validators.required, Validators.min(14), Validators.max(60)]],
      jornada: ['', [Validators.required]],
      tipopersona: ['', [Validators.required]],
      tipouser: ['', [Validators.required]],
      correo: ['', [Validators.email, Validators.maxLength(50), Validators.required]],
    });
    this.programas();
  }


  cambioRol() {
    //si al cambiar el selct el nuevo valor es Funcionario,
    //deshabilitamos el campo jornada
    if (this.form.value.tipopersona == "Funcionario") {
      this.form.controls['jornada'].disable()
      this.form.controls['idprograma'].disable()
      this.form.controls['ficha'].disable()
    } else {
      this.form.controls['jornada'].enable()
      this.form.controls['idprograma'].enable()
      this.form.controls['ficha'].enable()
    }
    //si, al cambiar el select el nuevo valor es Aprendiz,
    //hay que habilitar el campo jornada
  }


  onSubmit() {
    this.load = false;
    this.registro = true;
    if (this.form.valid) {
      //Si el formulario es valido se llama al servicio y se apunta al serve para enviar los datos
      this.usuarios.registrarUsuarios(`${environment.BASE_PINZON}/registrarusuario`, {
        nombres: this.form.value.nombres,
        apellidos: this.form.value.apellidos,
        documento: this.form.value.documento,
        ficha: this.form.value.ficha,
        correo: this.form.value.correo,
        idprograma: this.form.value.idprograma,
        telefono: this.form.value.telefono,
        edad: this.form.value.edad,
        jornada: this.form.value.jornada,
        tipopersona: this.form.value.tipopersona,
        tipouser: this.form.value.tipouser.toLowerCase()
        //Se envia el token de autenticacion
      }, localStorage.getItem('token')).subscribe(
        (response): any => {
          //Se imprima la respuesta del serve, y mensaje de confirmacion al usuario.
          Swal.fire({
            icon: 'success',
            title: 'Exito',
            text: 'Se registro el usuario',
          })
          //if (response==400) {

          //}
          this.registro = false;
          //Se redireciona a la pagina principal de dietas
          this.route.navigate(['/usuarios']);
        },
        (error) => {
          //En caso de error se imprime el mensaje del serve y se notifica al usuario

          Swal.fire({
            icon: 'error',
            title: '¡Atencion!',
            text: 'No fue posible registrar la persona',
            footer: 'Verifique que el correo o el documento, no este registrado'
          })
          this.load = true;
          this.registro = false;
        })
    }
    else {

      Swal.fire({
        icon: 'warning',
        title: '¡Atencion!',
        text: 'Verifique los datos de ingreso',
        footer: 'Todos los campos deben estar completos'
      })
      this.load = true;
      this.registro = false;
    }
  }


  programas() {
    this.usuarios.getRequestAllProgramas(`${environment.BASE_PINZON}/programas`, localStorage.getItem('token'))
      .subscribe(
        (data): any => {
          //Se guarda los datos que trae el json del serve, ala propiedad dietas.
          this.idprogramas = data['consulta']

          //Se imprime el mensaje del serve y se le notifica al usuario.
        },
        error => { })
  }




  cancelar() {
    this.route.navigate(['/usuarios']);
  }

}
