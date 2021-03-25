import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutentiService {

  islogin = new BehaviorSubject<boolean>(this.checkToken());
  admin = new BehaviorSubject<boolean>(null);
  user = new BehaviorSubject<boolean>(null);

  private checkToken(): boolean { return !!localStorage.getItem('token') }

  constructor() { }

  tipopersona(usuario: string): void {
    localStorage.setItem('usuario', usuario);
  }

  login(token: string): void {
    localStorage.setItem('token', token)
    if (localStorage.getItem('usuario') == 'usuario') {
      this.isUser();
    } else {
      this.isAdmin();
    }
    this.islogin.next(true);
  }

  logout(): void {
    this.admin.next(null)
    this.user.next(null);
    localStorage.clear();
    this.islogin.next(false);
  }

  setCurrentUser(user: string): void {
    localStorage.setItem('user', user);
  }

  setCureenImage(imagen:string):void{
    localStorage.setItem('imagen',imagen);

  }

  getCurrentImagen(): string {
    return localStorage.getItem('imagen')
  }


  getCurrentUser(): string {
    return localStorage.getItem('user')
  }

  isLoggedin(): Observable<boolean> {
    return this.islogin.asObservable();
  }

  isUser(): Observable<boolean> {
    if (localStorage.getItem('usuario') == 'usuario') {
      this.user.next(true);
      this.admin.next(false);
    }
    return this.user.asObservable();

  }
  isAdmin(): Observable<boolean> {
    if (localStorage.getItem('usuario') == 'admin') {
      this.user.next(false);
      this.admin.next(true);
    }
    return this.admin.asObservable();
  }
}
