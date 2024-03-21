import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { from, of } from 'rxjs';
import {
  Requirments,
  Scholarships,
  ScholarshipsDto,
} from '../models/scholarhips';
import { Comments, ScholarshipsComments } from '../models/scholarshipcomments';
import { Posts, PostsDto, Post, PostComments } from '../models/posts';
import { PostsReports, ScholarshipsReports } from '../models/reports';

@Injectable({
  providedIn: 'root',
})
export class ScholarshipsService {
  baseUrl: string = 'http://localhost:8000/api';
  // baseUrl : string = 'http://77d7-138-199-7-185.ngrok.io/api';

  constructor(private http: HttpClient) {}

  getScholarships(count: number = 12) {
    return this.http.get<ScholarshipsDto>(`${this.baseUrl}/scholarships`).pipe(
      switchMap((res) => {
        return of(res.data.slice(0, count));
      })
    );
  }

  getScholarship(id: string) {
    return this.http.get<Scholarships>(`${this.baseUrl}/scholarships/${id}`);
  }

  searchScholarship(page: number, search?: string, country?: string) {
    const uri = search
      ? '/scholarships/search/${search}'
      : country
      ? '/scholarships/filter/${country}`'
      : '/scholarships/';
    return this.http
      .get<ScholarshipsDto>(`${this.baseUrl}${uri}?page=${page}`)
      .pipe(
        switchMap((res) => {
          return of(res.data);
        })
      );
  }
  // search for scholarship
  search(search: string) {
    return this.http.get<Scholarships>(
      `${this.baseUrl}/scholarships/search/${search}`
    );
  }

  country(country: string) {
    return this.http.get<Scholarships>(
      `${this.baseUrl}/scholarships/filter/${country}`
    );
  }

  // scholarships requirments
  getRequirments(id: string) {
    return this.http.get<Requirments>(`${this.baseUrl}/requirments/${id}`);
  }

  // scholarships comments
  getScholarshipsComments(id: string) {
    return this.http.get<Comments>(`${this.baseUrl}/scholarshipcomments/${id}`);
  }

  addScholarshipsComments(id: number, data: any) {
    // const formData = new FormData();
    // formData.append('body',data)
    // return this.http.post<any>(`${this.baseUrl}/create/scholarshipcomment/${id}`,formData);
    return this.http.post<ScholarshipsComments>(
      `${this.baseUrl}/create/scholarshipcomment/${id}`,
      data
    );
  }

  deleteComment(data: ScholarshipsComments, id: number) {
    return this.http.delete<ScholarshipsComments>(
      `${this.baseUrl}/delete/scholarshipcomment/${id}`,
      data
    );
  }

  addFeature(id: number, data: any) {
    return this.http.post<Scholarships>(
      `${this.baseUrl}/add/featuredscholarship/${id}`,
      data
    );
  }

  getFeatures() {
    return this.http.get<Scholarships>(`${this.baseUrl}/featuredscholarships`);
  }
  removeFeature(id: number, data: any) {
    return this.http.delete<Scholarships>(
      `${this.baseUrl}/delete/featuredscholarship/${id}`,
      data
    );
  }

  addRequirment(id: number, data: Requirments) {
    return this.http.post<Requirments>(
      `${this.baseUrl}/create/requirment/${id}`,
      data
    );
  }

  deleteRequirment(data: any, id: number) {
    return this.http.delete<Requirments>(
      `${this.baseUrl}/delete/requirment/${id}`,
      data
    );
  }

  // manager APIs
  getManagerScholarships() {
    return this.http.get<Scholarships>(
      `${this.baseUrl}/show/manager/scholaships`
    );
  }
  approveScholarships(id: number, data: Scholarships) {
    return this.http.post<Scholarships>(
      `${this.baseUrl}/approve/scholarship/${id}`,
      data
    );
  }
  declineScholarships(id: number, data: Scholarships) {
    return this.http.post<Scholarships>(
      `${this.baseUrl}/decline/scholarship/${id}`,
      data
    );
  }
  getScholarshipsReports() {
    return this.http.get<ScholarshipsReports>(
      `${this.baseUrl}/show/scholarship/reports`
    );
  }
  getPostsReports() {
    return this.http.get<PostsReports>(`${this.baseUrl}/show/posts/reports`);
  }
  deleteScholarshipsReports(id: number, data: ScholarshipsReports) {
    return this.http.delete<ScholarshipsReports>(
      `${this.baseUrl}/delete/scholarship/report/${id}`,
      data
    );
  }
  deletePostsReports(id: number, data: PostsReports) {
    return this.http.delete<PostsReports>(
      `${this.baseUrl}/delete/post/report/${id}`,
      data
    );
  }
  reportScholarship(id: number, data: ScholarshipsReports) {
    return this.http.post<ScholarshipsReports>(
      `${this.baseUrl}/create/scholaship/report/${id}`,
      data
    );
  }
  reportPost(id: number, data: PostsReports) {
    return this.http.post<PostsReports>(
      `${this.baseUrl}/create/post/report/${id}`,
      data
    );
  }
  showScholarshipInfo(id: number) {
    return this.http.get<Scholarships>(
      `${this.baseUrl}/show/manager/scholaship/${id}`
    );
  }
  ScholarshipNotify(id: number, data: any) {
    return this.http.post<any>(`${this.baseUrl}/notify1/user/${id}`, data);
  }
  PostNotify(id: number, data: any) {
    return this.http.post<any>(`${this.baseUrl}/notify2/user/${id}`, data);
  }
  UserImage(data: any) {
    return this.http.post<any>(`${this.baseUrl}/user/image/upload`, data);
  }
  sameInterest() {
    return this.http.get<any>(`${this.baseUrl}/same/interest`);
  }

  // Posts APIs

  getAllPosts() {
    return this.http.get<Posts>(`${this.baseUrl}/showallposts`);
  }

  searchPosts(page: number) {
    return this.http
      .get<PostsDto>(`${this.baseUrl}/showallposts/?page=${page}`)
      .pipe(
        switchMap((res) => {
          return of(res.data);
        })
      );
  }

  getUserPosts() {
    return this.http.get<Posts>(`${this.baseUrl}/posts`);
  }

  createPost(data: Post) {
    return this.http.post<Post>(`${this.baseUrl}/create/post`, data);
  }

  updatePost(data: Post, id: number) {
    return this.http.put<Post>(`${this.baseUrl}/update/post/${id}`, data);
  }

  deletePost(data: Post, id: number) {
    return this.http.delete<Post>(`${this.baseUrl}/delete/post/${id}`, data);
  }

  postsComments(id: number) {
    return this.http.get<PostComments>(`${this.baseUrl}/postcomments/${id}`);
  }

  addPostComment(id: number, data: PostComments) {
    return this.http.post<PostComments>(
      `${this.baseUrl}/create/postcomment/${id}`,
      data
    );
  }

  deletePostComment(id: number, data: PostComments) {
    return this.http.delete<PostComments>(
      `${this.baseUrl}/delete/postcomment/${id}`,
      data
    );
  }
}
