import { Component, OnDestroy, OnInit } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Posts, Post, PostComments } from '../../models/posts';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { PostsReports } from '../../models/reports';
import { MessagingService } from '../../services/messaging.service';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
  providers: [MessageService],
})
export class PostsComponent implements OnInit, OnDestroy {
  public isAdmin: any;
  public isManager: any;
  posts: Posts[] = [];
  postBody: Post = {} as Post;
  comm: any;
  display: boolean = false;
  reports: PostsReports = {} as PostsReports;
  commentForm = new FormGroup({
    body: new FormControl(''),
  });
  reportForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });
  coms: PostComments[] = [];
  uId = localStorage.getItem('user_id');
  user_name = localStorage.getItem('user_name');
  postsSubscription: Subscription | undefined;
  firebase_token: any;
  firebase_token2: any;
  image: any;
  messageSubscription: Subscription | undefined;
  public message: any;

  constructor(
    private scholarshipsService: ScholarshipsService,
    private messageservice: MessageService,
    private messageService: MessagingService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.isManager = localStorage.getItem('isManager');
    this.image = localStorage.getItem('image');
  }

  ngOnInit(): void {
    this.getPagedPosts(1);
  }

  getPagedPosts(page: number) {
    this.postsSubscription = this.scholarshipsService
      .searchPosts(page)
      .subscribe((response: any) => {
        this.posts = response;
      });
  }
  paginate(event: any) {
    this.getPagedPosts(event.page + 1);
  }

  deletePost(id: number) {
    this.scholarshipsService.deletePost(this.postBody, id).subscribe(() => {});
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Your Post Is Deleted. Please Refresh The Page',
    });
  }
  submitReport(id: number) {
    this.firebase_token = localStorage.getItem('firebase_token');
    this.firebase_token2 = this.messageService.requestPermission(
      this.firebase_token
    );
    this.messageService.req(this.firebase_token).subscribe((res) => {
      this.firebase_token2 = res;
    });
    this.messageService.receiveMessage();
    this.messageSubscription = this.messageService.currentMessage.subscribe(
      (m) => (this.message = m)
    );

    this.scholarshipsService
      .reportPost(id, this.reportForm.value)
      .subscribe((res: any) => {
        this.reports = res;
      });
    this.messageservice.add({
      key: 't2',
      severity: 'success',
      summary: 'Success',
      detail: 'Your report now is going under review.. thank you.',
    });
  }
  showDialog() {
    this.display = true;
  }
  ngOnDestroy(): void {
    if (this.postsSubscription) this.postsSubscription.unsubscribe();
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
