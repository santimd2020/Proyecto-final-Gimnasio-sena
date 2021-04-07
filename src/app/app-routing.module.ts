import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RutinahomeComponent } from './componentes/rutinahome/rutinahome.component';
import { DietashomeComponent } from './componentes/dietashome/dietashome.component';
import { ConsultaejerciciosComponent } from './componentes/consultaejercicios/consultaejercicios.component';
import { AgregarejercicioComponent } from './componentes/agregarejercicio/agregarejercicio.component';
import { EditarejercicioComponent } from './componentes/editarejercicio/editarejercicio.component';
import { EditarrutinaComponent } from './componentes/editarrutina/editarrutina.component';
import { AgregarrutinasComponent } from './componentes/agregarrutinas/agregarrutinas.component';
import { AgregardietasComponent } from './componentes/agregardietas/agregardietas.component';
import { LoginComponent } from './componentes/login/login.component';
import { EditardietaComponent } from './componentes/editardieta/editardieta.component';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { AnunciosComponent } from './componentes/anuncios/anuncios.component';
import { AgregaranuncioComponent } from './componentes/agregaranuncio/agregaranuncio.component';
import { EditaranuncioComponent } from './componentes/editaranuncio/editaranuncio.component';
import { RegistrousuarioComponent } from './componentes/registrousuario/registrousuario.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ActulizarusuarioComponent } from './componentes/actulizarusuario/actulizarusuario.component';
import { ActualizarperfilComponent } from './componentes/actualizarperfil/actualizarperfil.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { GuardiaService } from './servicios/guardia.service/guardia.service';



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
