import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AutentiService } from './autenti.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Injectable({
  providedIn: 'root'
})
export class GuardiaService implements CanActivate {

  constructor(public auth: AutentiService, private route: Router,) {
  }
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Promise((resolve, reject) => {

      this.auth.isLoggedin().subscribe(
        login => {
          if (login) {
            resolve(true);
          } else {
           
            this.route.navigate(['/']);
            resolve(false);
          }
        });
    })
  }
}

