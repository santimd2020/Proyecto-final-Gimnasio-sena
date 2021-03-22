import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private http: HttpClient) { }

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
}
