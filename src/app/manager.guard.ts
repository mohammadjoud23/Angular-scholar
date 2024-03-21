import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  public isManager: any;

  constructor() {
    this.isManager = localStorage.getItem('isManager');
  }

  canActivate(): any {
    if (this.isManager === '2') {
      return true;
    } else {
      return false;
    }
  }
}
