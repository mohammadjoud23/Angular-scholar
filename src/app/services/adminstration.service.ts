import { Injectable } from '@angular/core';
import { Requirments, Scholarships, ScholarshipsDto} from '../models/scholarhips';
import {Posts, PostsDto, Post}  from '../models/posts';
import {HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AdminstrationService {
  baseUrl : string = 'http://localhost:8000/api';

  constructor(private http : HttpClient) { }


createScholarship(data:any){
  return this.http.post<Scholarships>(`${this.baseUrl}/create/scholarship`,data);
}

deleteScholarship(data:any, id:number){
  return this.http.delete<Scholarships>(`${this.baseUrl}/delete/scholarship/${id}`,data);
}



}