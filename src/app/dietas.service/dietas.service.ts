import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DietasService {

  constructor(private http: HttpClient) { }

  getRequestAllDietas(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getRequestIdDietas(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  deleteDietas(route: string, token?: string) {
    let config: any = {}
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = headers
    }
    return this.http.delete(route, config);
  }

  asignarDietas(route: string, data?: any, token?: string) {
    let config: any = {
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
      console.log(config);
    }
    return this.http.put(route, data, config);
  }

  editarDietas(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    config["headers"] = header;
    console.log(config)
    return this.http.put(route, data, config);
  }

  registrarDietas(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.post(route, data, config);
  }

  getReporteAllDietas(route: string, token?: string) {
    let config: any = { responseType: 'blob' }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }
}