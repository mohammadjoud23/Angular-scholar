import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  public logged: any;

  constructor(private router: Router) {
    this.logged = localStorage.getItem('logged');
  }

  canActivate(): any {
    if (this.logged === '0') {
      return true;
    } else {
      return false;
    }
  }
}
