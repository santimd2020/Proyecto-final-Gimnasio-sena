import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RutinahomeComponent } from './rutinahome/rutinahome.component';
import {HttpClientModule} from '@angular/common/http';
import { ConsultaejerciciosComponent } from './consultaejercicios/consultaejercicios.component';
import { AgregarejercicioComponent } from './agregarejercicio/agregarejercicio.component';
import { DietashomeComponent } from './dietashome/dietashome.component';
import { EditarejercicioComponent } from './editarejercicio/editarejercicio.component';
import { AgregarrutinasComponent } from './agregarrutinas/agregarrutinas.component';
import { DataTablesModule } from "angular-datatables";
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { EditarrutinaComponent } from './editarrutina/editarrutina.component';
import { AgregardietasComponent } from './agregardietas/agregardietas.component';
import { EditardietaComponent } from './editardieta/editardieta.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SistemaComponent } from './sistema/sistema.component';
import { AnunciosComponent } from './anuncios/anuncios.component';
import { AgregaranuncioComponent } from './agregaranuncio/agregaranuncio.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditaranuncioComponent } from './editaranuncio/editaranuncio.component';
import { RegistrousuarioComponent } from './registrousuario/registrousuario.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ActulizarusuarioComponent } from './actulizarusuario/actulizarusuario.component';
import { PerfilComponent } from './perfil/perfil.component';


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
