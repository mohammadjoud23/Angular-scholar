import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { ScholarshipsService } from './services/scholarships.service';
import { Users } from '../app/models/posts';
@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  public isAdmin: any;
  public isManager: any;
  user: Users[] = [];
  constructor(private scholarshipService: ScholarshipsService) {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.isManager = localStorage.getItem('isManager');
  }

  canActivate(): any {
    if (this.isAdmin === '1' || this.isManager === '2') {
      return true;
    } else {
      return false;
    }
  }
}
