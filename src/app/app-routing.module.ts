import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutinahomeComponent } from './rutinahome/rutinahome.component';
import { DietashomeComponent } from './dietashome/dietashome.component';
import { ConsultaejerciciosComponent } from './consultaejercicios/consultaejercicios.component';
import { AgregarejercicioComponent } from './agregarejercicio/agregarejercicio.component';
import { EditarejercicioComponent } from './editarejercicio/editarejercicio.component';
import { EditarrutinaComponent } from './editarrutina/editarrutina.component';
import { AgregarrutinasComponent } from './agregarrutinas/agregarrutinas.component';
import { AgregardietasComponent } from './agregardietas/agregardietas.component';
import { LoginComponent } from './login/login.component';
import { EditardietaComponent } from './editardieta/editardieta.component';
import { SistemaComponent } from './sistema/sistema.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AgregaranuncioComponent } from './agregaranuncio/agregaranuncio.component';
import { EditaranuncioComponent } from './editaranuncio/editaranuncio.component';
import { RegistrousuarioComponent } from './registrousuario/registrousuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ActulizarusuarioComponent } from './actulizarusuario/actulizarusuario.component';
import { ActualizarperfilComponent } from './actualizarperfil/actualizarperfil.component';
import { PerfilComponent } from './perfil/perfil.component';
import { GuardiaService } from './guardia.service';


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [GuardiaService] },
  { path: 'actulizarperfil', component: ActualizarperfilComponent, canActivate: [GuardiaService] },
  { path: 'actulizarusuario', component: ActulizarusuarioComponent, canActivate: [GuardiaService] },
  { path: 'usuarios', component: UsuariosComponent, canActivate: [GuardiaService] },
  { path: 'registrarusuario', component: RegistrousuarioComponent, canActivate: [GuardiaService] },
  { path: 'sistema', component: SistemaComponent, canActivate: [GuardiaService] },
  { path: 'rutinas', component: RutinahomeComponent, canActivate: [GuardiaService] },
  { path: 'ejercicios', component: ConsultaejerciciosComponent, canActivate: [GuardiaService] },
  { path: 'dietas', component: DietashomeComponent, canActivate: [GuardiaService] },
  { path: 'agregarejercicios', component: AgregarejercicioComponent, canActivate: [GuardiaService] },
  { path: 'agregarrutinas', component: AgregarrutinasComponent, canActivate: [GuardiaService] },
  { path: 'editarejercicios', component: EditarejercicioComponent, canActivate: [GuardiaService] },
  { path: 'editarrutina', component: EditarrutinaComponent, canActivate: [GuardiaService] },
  { path: 'editardieta', component: EditardietaComponent, canActivate: [GuardiaService] },
  { path: 'agregardietas', component: AgregardietasComponent, canActivate: [GuardiaService] },
  { path: 'anuncios', component: AnunciosComponent, canActivate: [GuardiaService] },
  { path: 'agregaranuncios', component: AgregaranuncioComponent, canActivate: [GuardiaService] },
  { path: 'editaranuncio', component: EditaranuncioComponent, canActivate: [GuardiaService] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
