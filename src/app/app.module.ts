import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './componentes/nav/nav.component';
import { RutinahomeComponent } from './componentes/rutinahome/rutinahome.component';
import {HttpClientModule} from '@angular/common/http';
import { ConsultaejerciciosComponent } from './componentes/consultaejercicios/consultaejercicios.component';
import { AgregarejercicioComponent } from './componentes/agregarejercicio/agregarejercicio.component';
import { DietashomeComponent } from './componentes/dietashome/dietashome.component';
import { EditarejercicioComponent } from './componentes/editarejercicio/editarejercicio.component';
import { AgregarrutinasComponent } from './componentes/agregarrutinas/agregarrutinas.component';
import { DataTablesModule } from "angular-datatables";
import { LoginComponent } from './componentes/login/login.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { EditarrutinaComponent } from './componentes/editarrutina/editarrutina.component';
import { AgregardietasComponent } from './componentes/agregardietas/agregardietas.component';
import { EditardietaComponent } from './componentes/editardieta/editardieta.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SistemaComponent } from './componentes/sistema/sistema.component';
import { AnunciosComponent } from './componentes/anuncios/anuncios.component';
import { AgregaranuncioComponent } from './componentes/agregaranuncio/agregaranuncio.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditaranuncioComponent } from './componentes/editaranuncio/editaranuncio.component';
import { RegistrousuarioComponent } from './componentes/registrousuario/registrousuario.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { ActulizarusuarioComponent } from './componentes/actulizarusuario/actulizarusuario.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { ActualizarperfilComponent } from './componentes/actualizarperfil/actualizarperfil.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    RutinahomeComponent,
    ConsultaejerciciosComponent,
    AgregarejercicioComponent,
    DietashomeComponent,
    EditarejercicioComponent,
    AgregarrutinasComponent,
    LoginComponent,
    FooterComponent,
    EditarrutinaComponent,
    AgregardietasComponent,
    EditardietaComponent,
    SistemaComponent,
    AnunciosComponent,
    AgregaranuncioComponent,
    EditaranuncioComponent,
    RegistrousuarioComponent,
    UsuariosComponent,
    ActulizarusuarioComponent,
    PerfilComponent,
    ActualizarperfilComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
