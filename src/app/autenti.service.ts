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

  login(token: string, usuario: string): void {
    console.log(usuario)
    localStorage.setItem('token', token)
    if (usuario == 'usuario') {
      this.user.next(true);
      this.admin.next(false);
    } else {
      this.admin.next(true);
      this.user.next(false);
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

  getCurrentUser(): string {
    return localStorage.getItem('user')
  }

  isLoggedin(): Observable<boolean> {
    return this.islogin.asObservable();
  }

  isUser(): Observable<boolean> {
    return this.user.asObservable();
  }
  isAdmin(): Observable<boolean> {

    return this.admin.asObservable();
  }

}
