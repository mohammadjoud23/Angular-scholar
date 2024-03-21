import { Injectable } from '@angular/core';
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Scholarships } from './models/scholarhips';
import { ScholarshipsService } from './services/scholarships.service';

@Injectable({
  providedIn: 'root',
})
export class NewsResolver implements Resolve<any> {
  features: any;
  constructor(private scholarShipsService: ScholarshipsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.scholarShipsService.getFeatures();
  }
}
