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


const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'sistema', component: SistemaComponent },
  { path: 'rutinas', component: RutinahomeComponent },
  { path: 'ejercicios', component: ConsultaejerciciosComponent },
  { path: 'dietas', component: DietashomeComponent },
  { path: 'agregarejercicios', component: AgregarejercicioComponent },
  { path: 'agregarrutinas', component: AgregarrutinasComponent },
  { path: 'editarejercicios', component: EditarejercicioComponent },
  { path: 'editarrutina', component: EditarrutinaComponent },
  { path: 'editardieta', component: EditardietaComponent },
  { path: 'agregardietas', component: AgregardietasComponent },
  { path: 'anuncios', component: AnunciosComponent },
  { path: 'agregaranuncios', component: AgregaranuncioComponent },
  { path: 'editaranuncio', component: EditaranuncioComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
