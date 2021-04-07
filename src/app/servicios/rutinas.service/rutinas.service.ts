import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  constructor(private http: HttpClient) { }

  getRequestAllRutinas(route: string, token?: string) {

    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getRequestIdRutinas(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  deleteRutinas(route: string, token?: string) {
    let config: any = {}
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = headers
    }
    return this.http.delete(route, config);
  }

  asignarRutinas(route: string, data?: any, token?: string) {
    let config: any = {
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;

    }
    return this.http.put(route, data, config);
  }

  editarrutinas(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    config["headers"] = header;

    return this.http.put(route, data, config);
  }

  registrarrutinas(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.post(route, data, config);
  }

  getReporteAllRutinas(route: string, token?: string) {
    let config: any = { responseType: 'blob' }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getReporteAllEjercicios(route: string, token?: string) {
    let config: any = { responseType: 'json' }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }
}
