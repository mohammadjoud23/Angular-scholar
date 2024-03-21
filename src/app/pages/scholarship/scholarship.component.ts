import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Scholarships } from '../../models/scholarhips';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Requirments } from '../../models/scholarhips';
import { RegistrationService } from '../../services/registration.service';
import {
  Comments,
  ScholarshipsComments,
} from '../../models/scholarshipcomments';
import { FormGroup, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ScholarshipsReports } from 'src/app/models/reports';
@Component({
  selector: 'app-scholarship',
  templateUrl: './scholarship.component.html',
  styleUrls: ['./scholarship.component.scss'],
  providers: [MessageService],
})
export class ScholarshipComponent implements OnInit, OnDestroy {
  comments: Comments[] = [];
  scholarship: Scholarships | null = null;
  commentss: ScholarshipsComments = {} as ScholarshipsComments;
  requirments: Requirments[] = [];
  reqs: Requirments = {} as Requirments;
  reports: ScholarshipsReports = {} as ScholarshipsReports;
  data: any;
  token: any;
  user: any;
  subscription: Subscription | undefined;
  uId = localStorage.getItem('user_id');
  public isAdmin: any;
  public isManager: any;
  commentForm = new FormGroup({
    body: new FormControl(''),
  });
  requirmentForm = new FormGroup({
    description: new FormControl(''),
  });
  reportForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl(''),
  });
  feature: any;
  display: boolean = false;
  image: any;

  constructor(
    private route: ActivatedRoute,
    private scholarshipsService: ScholarshipsService,
    private registrationService: RegistrationService,
    private messageservice: MessageService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.isManager = localStorage.getItem('isManager');
    this.image = localStorage.getItem('image');
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      if (this.isManager === '0' || this.isAdmin === '1') {
        this.getScholarship(id);
      }
      this.getScholarshipRequirments(id);
      this.getScholarshipsComments(id);

      if (this.isManager === '2') {
        this.getScholarshipInfo(id);
      }
    });
  }

  getScholarship(id: string) {
    this.scholarshipsService
      .getScholarship(id)
      .subscribe((scholarshipData: any) => {
        this.scholarship = scholarshipData;
        console.log(this.scholarship);
      });
  }
  getScholarshipInfo(id: number) {
    this.scholarshipsService.showScholarshipInfo(id).subscribe((res: any) => {
      this.scholarship = res;
      console.log(this.scholarship);
    });
  }
  getScholarshipRequirments(id: string) {
    this.scholarshipsService.getRequirments(id).subscribe((response: any) => {
      this.requirments = response;
    });
  }

  getScholarshipsComments(id: string) {
    this.subscription = this.scholarshipsService
      .getScholarshipsComments(id)
      .subscribe((res: any) => {
        this.comments = res;
      });
  }

  addComment(id: number) {
    this.subscription = this.scholarshipsService
      .addScholarshipsComments(id, this.commentForm.value)
      .subscribe((res: any) => {
        this.commentss = res;
        this.messageservice.add({
          key: 't2',
          severity: 'success',
          summary: 'Success',
          detail: 'Your Comment Is Submitted.',
        });
      });
  }

  deleteComment(id: number, index: number) {
    this.comments.splice(index, 1);
    this.scholarshipsService
      .deleteComment(this.commentForm.value, id)
      .subscribe(() => {});
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Your Comment Is Deleted.',
    });
  }

  submitRequiment(id: number) {
    this.scholarshipsService
      .addRequirment(id, this.requirmentForm.value)
      .subscribe((res: any) => {
        this.reqs = res;
        this.messageservice.add({
          key: 't2',
          severity: 'success',
          summary: 'Success',
          detail: 'The requirment is added.',
        });
      });
  }
  submitReport(id: number) {
    this.scholarshipsService
      .reportScholarship(id, this.reportForm.value)
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
  deleteRequirment(id: number, index: number) {
    this.requirments.splice(index, 1);
    this.scholarshipsService
      .deleteRequirment(this.commentForm.value, id)
      .subscribe(() => {});
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Your Comment Is Deleted.',
    });
  }
  approveScholarship(id: number, data: Scholarships) {
    this.scholarshipsService
      .approveScholarships(id, data)
      .subscribe((res: any) => {});
    this.messageservice.add({
      key: 't2',
      severity: 'success',
      summary: 'Success',
      detail: 'The scholarship is approved.',
    });
  }
  // declineScholarship(id: number, data: Scholarships) {
  //   this.scholarshipsService
  //     .declineScholarships(id, data)
  //     .subscribe((res: any) => {});
  // this.messageservice.add({
  //   key: 't2',
  //   severity: 'warn',
  //   summary: 'Warn',
  //   detail: 'The scholarship is declined.',
  // });
  // }

  signOut() {
    localStorage.removeItem('token');
    this.registrationService.signOut(this.user.token).subscribe((res) => {
      this.data = res;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
