import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

  registrarUsuarios(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.post(route, data, config);
  }

  registrarEntrada(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.post(route, data, config);
  }

  registrarSalida(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.put(route, data, config);
  }

  getRequestAllIngreso(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getReporteAllIngreso(route: string, token?: string) {
    let config: any = { responseType: 'blob' }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }


  getReporteAllUser(route: string, token?: string) {
    let config: any = { responseType: 'blob' }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }


  getRequestAllUsuarios(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  deleteUsuario(route: string, token?: string) {
    let config: any = {}
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = headers
    }
    return this.http.delete(route, config);
  }

  enviarCorreo(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.post(route, data, config);
  }

  getRequestIdUsuario(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  editarusuario(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      header.append('Content-Type', 'multipart/form-data');
      header.append('Accept', 'application')
      config["headers"] = header;
    }
    return this.http.put(route, data, config);
  }

  getRequestAllProgramas(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

}