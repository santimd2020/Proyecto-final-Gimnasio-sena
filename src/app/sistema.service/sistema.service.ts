import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SistemaService {

  constructor(private http: HttpClient) { }

  registraTest(route: string, data?: any, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.post(route, data, config);
  }

  getReporteAllTest(route: string, token?: string) {
    let config: any = { responseType: 'blob' }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getRequestAllTest(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  getRequestAllAnuncios(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }


  deleteAnuncios(route: string, token?: string) {
    let config: any = {}
    if (token) {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = headers
    }
    return this.http.delete(route, config);
  }


  registraranuncio(route: string, data?: any, token?: string) {
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



  getRequestIdAnuncio(route: string, token?: string) {
    let config: any = {
      responseType: "json"
    }
    if (token) {
      const header = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      config["headers"] = header;
    }
    return this.http.get(route, config);
  }

  editaranuncio(route: string, data?: any, token?: string) {
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

  getRequestAllestadisticas(route: string, token?: string) {
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