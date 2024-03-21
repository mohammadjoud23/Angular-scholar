import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { MessageService } from 'primeng/api';
import { FormGroup, FormControl } from '@angular/forms';
import { Posts, Post, PostComments } from '../../models/posts';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  providers: [MessageService],
})
export class CommentsComponent implements OnInit, OnDestroy {
  @Input() post_id: number = 0;
  commentForm = new FormGroup({
    body: new FormControl(''),
  });
  public isAdmin: any;
  public isManager: any;
  posts: Posts[] = [];
  postBody: Post = {} as Post;
  comm: any;
  coms: PostComments[] = [];
  uId = localStorage.getItem('user_id');
  commentsSubscription: Subscription | undefined;
  image: any;
  constructor(
    private scholarshipsService: ScholarshipsService,
    private messageservice: MessageService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.isManager = localStorage.getItem('isManager');
    this.image = localStorage.getItem('image');
  }

  ngOnInit(): void {
    this.postComments(this.post_id);
  }

  addComment(id: number) {
    this.scholarshipsService
      .addPostComment(id, this.commentForm.value)
      .subscribe((res: any) => {
        this.comm = res;
        console.log(this.comm);
      });
    this.messageservice.add({
      key: 't2',
      severity: 'success',
      summary: 'Success',
      detail: 'Your Comment Is Submitted. Please Refresh The Page',
    });
  }

  deletePostComment(id: number, index: number) {
    // this.posts.postcomments.splice(index, 1);
    this.scholarshipsService
      .deletePostComment(id, this.commentForm.value)
      .subscribe(
        () => {},
        (err) => {}
      );
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Your Comment Is Deleted. Please Refresh The Page',
    });
  }

  postComments(id: number) {
    this.commentsSubscription = this.scholarshipsService
      .postsComments(id)
      .subscribe((res: any) => {
        this.coms = res;
      });
  }

  ngOnDestroy(): void {
    if (this.commentsSubscription) this.commentsSubscription.unsubscribe();
  }
}
