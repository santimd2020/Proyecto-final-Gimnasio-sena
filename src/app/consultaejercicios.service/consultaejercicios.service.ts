import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConsultaejerciciosService {

  constructor(private http: HttpClient) { }

  getRequestAllEjercicios(route: string, token?: string) {

    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getRequestIdEjercicios(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  deleteEjercicios(route: string, token?: string) {
    let config: any = {}
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = headers
    }
    return this.http.delete(route, config);
  }

  editarejercicio(route: string, data?: any, token?: string) {
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

  registrarejercicio(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      header.append('Content-Type', 'multipart/form-data');
      header.append('Accept', 'application')
      config["headers"] = header;
    }
    return this.http.post(route, data, config,);
  }

  postRequest(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }

    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }

    return this.http.post(route, data);
  }

}