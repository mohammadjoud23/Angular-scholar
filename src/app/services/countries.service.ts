import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http
      .get('showcase/resources/data/countries.json')
      .toPromise()
      .then((res: any) => <any[]>res.json().data)
      .then((data) => {
        return data;
      });
  }
}
