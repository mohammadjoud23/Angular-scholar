import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Register,Login } from '../models/register';
@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  baseUrl : string = 'http://localhost:8000/api';

  constructor(private http : HttpClient) { }

  // Registration

registerUser(data:any){
  return this.http.post<Register>(`${this.baseUrl}/register`,data);
}

loginUser(data:any){
  return this.http.post<Login>(`${this.baseUrl}/login`,data);
}

signOut(data:any){
  return this.http.post(`${this.baseUrl}/logout`,data);
}

}
