import {
  AfterViewChecked,
  Component,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Posts, Post } from '../../models/posts';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { RegistrationService } from '../../services/registration.service';
import { MessagingService } from '../../services/messaging.service';
import { Subscription } from 'rxjs';
import { Scholarships } from '../../models/scholarhips';
import { MessageService } from 'primeng/api';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [MessageService],
})
export class DashboardComponent implements OnInit, OnDestroy, AfterViewChecked {
  data: any;
  piedata: Array<any> = [];
  user: any;
  posts: Posts[] = [];
  display1: boolean = false;
  display: boolean = false;
  postBody: Post = {} as Post;
  drag: boolean = false;
  firebase_token: any;
  firebase_token2: any;
  public message: any;
  postDetail!: FormGroup;
  messageSubscription: Subscription | undefined;
  features: Scholarships[] = [];
  chartArray: Array<{ id: number; description: string }> = [];
  public cArray: Array<string> = [];
  public hArray: Array<number> = [];
  @ViewChildren(BaseChartDirective) chart:
    | QueryList<BaseChartDirective>
    | undefined;
  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };
  public pieChartData: ChartData<'pie', number[], string | string[]>[] = [];
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];
  image: any;
  constructor(
    private scholarshipsService: ScholarshipsService,
    private registrationService: RegistrationService,
    private formBuilder: FormBuilder,
    private messageService: MessagingService,
    private messageservice: MessageService,
    private route: ActivatedRoute
  ) {
    if (localStorage.getItem('image') === 'null') {
      this.image = 'assets/images/u.jpg';
    } else {
      this.image = localStorage.getItem('image');
    }
  }
  ngAfterViewChecked(): void {}
  ngOnInit(): void {
    this.getUserPosts();
    // console.log(this.route.snapshot.data);
    this.route.snapshot.data['features'].forEach((item: Scholarships[]) => {
      this.features.push(item[0]);
    });
    this.postDetail = this.formBuilder.group({
      body: [''],
    });
    this.features.forEach((data) => {
      this.pieChartData.push({
        labels: ['Not Ready'],
        datasets: [
          {
            data: [100],
          },
        ],
      });
    });
  }
  addSlice(leng: number, index: number): void {
    console.log(this.pieChartData[index].datasets);

    // console.log(this.pieChartData);
    let count = 0;
    if (this.pieChartData[index].labels) {
      this.pieChartData[index].labels?.push('Ready');
      this.pieChartData[index].datasets[0].backgroundColor = '#1088f1';
      // this.pieChartData[index].datasets[0].hoverBackgroundColor = [
      //   '#e76a84',
      //   '#ffffff',
      // ];
    }
    this.pieChartData[index].datasets[0].data.push(100 / leng);
    this.pieChartData[index].datasets[0].data.forEach((data, key) => {
      if (key > 0) {
        count = count + data;
      }
      this.pieChartData[index].datasets[0].data[0] = 100 - count;
    });
    this.chart?.forEach((child) => {
      child.chart?.update();
    });
  }

  removeSlice(index: number, leng: number): void {
    if (this.pieChartData[index].labels) {
      this.pieChartData[index].labels?.pop();
    }
    let count = 100;
    this.pieChartData[index].datasets[0].backgroundColor = '#1088f1';
    this.pieChartData[index].datasets[0].data.forEach((data, key) => {
      if (key > 0) {
        this.pieChartData[index].datasets[0].data[0] = 100 / leng;
      }
    });
    this.pieChartData[index].datasets[0].data.pop();
    this.chart?.forEach((child) => {
      child.chart?.update();
    });
  }
  add(event: any, index1: number, leng: number, index: number, item: any) {
    if (event.checked.length !== 0) {
      this.addSlice(leng, index);
    } else {
      this.removeSlice(index, leng);
    }
  }

  getUserPosts() {
    this.scholarshipsService.getUserPosts().subscribe((res: any) => {
      this.posts = res;
    });
  }

  showDialog() {
    this.display = true;
  }
  showDialogg(id: number, post: Post) {
    this.display1 = true;
    this.postBody = post;
  }

  submitPost() {
    this.firebase_token = localStorage.getItem('firebase_token');
    this.firebase_token2 = this.messageService.requestPermission(
      this.firebase_token
    );
    this.messageService.req(this.firebase_token).subscribe((res) => {
      this.firebase_token2 = res;
      // console.log(this.firebase_token2);
    });
    this.messageService.receiveMessage();
    this.messageSubscription = this.messageService.currentMessage.subscribe(
      (m) => (this.message = m)
    );

    this.postBody = this.postDetail.value;
    this.messageservice.add({
      key: 'tl',
      severity: 'success',
      summary: 'Success',
      detail: 'Your Post Is Published In Community',
    });
    if (this.postBody)
      this.scholarshipsService.createPost(this.postBody).subscribe((res) => {
        this.postBody = res;
      });
  }

  deletePost(id: number, index: number) {
    this.posts.splice(index, 1);
    this.scholarshipsService.deletePost(this.postDetail.value, id).subscribe(
      () => {
        // console.log(this.posts);
      },
      (err) => {}
    );
    this.messageservice.add({
      key: 'tl',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Your Post Is Deleted.',
    });
  }

  editPost(id: number) {
    this.postBody = this.postDetail.value;
    if (this.postBody)
      this.scholarshipsService
        .updatePost(this.postBody, id)
        .subscribe((res) => {
          this.postBody = res;
        });
    this.messageservice.add({
      key: 'tl',
      severity: 'info',
      summary: 'Info',
      detail: 'Your Post Is Edited. Please Refresh The Page',
    });
  }

  signOut() {
    const token = localStorage.getItem('token');
    this.registrationService.signOut(`Bearer ${token}`).subscribe((res) => {
      this.data = res;
    });
  }

  getFeatured() {
    this.scholarshipsService.getFeatures().subscribe((res: any) => {
      res.forEach((item: Scholarships[]) => {
        this.features.push(item[0]);
      });
    });
  }

  removeFeature(id: number, data: Scholarships, index: number) {
    this.scholarshipsService.removeFeature(id, data).subscribe(
      () => {
        // console.log(this.features);
        this.features.splice(index, 1);
      },
      (err) => {}
    );
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'The Scholarship Is Removed',
    });
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
