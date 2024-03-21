import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminstrationService } from '../../services/adminstration.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Scholarships } from '../../models/scholarhips';
import { MessagingService } from '../../services/messaging.service';
import { Subscription } from 'rxjs';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [MessageService],
})
export class AdminComponent implements OnInit, OnDestroy {
  scholarship: Scholarships | undefined;
  title = 'notifications';
  message: any;
  firebase_token: any;
  messageSubscription: Subscription | undefined;
  scholarshipForm = new FormGroup({
    name: new FormControl(''),
    salary: new FormControl(''),
    lang_certificate: new FormControl('', [
      Validators.min(0),
      Validators.max(1),
    ]),
    country: new FormControl(''),
    opening: new FormControl(''),
    closing: new FormControl(''),
    duration: new FormControl(''),
    thumpnail: new FormControl(''),
    number_of_seats: new FormControl(''),
    allowed_to_work: new FormControl('', [
      Validators.min(0),
      Validators.max(1),
    ]),
    study_program: new FormControl('master'),
    traveling_costs: new FormControl('', [
      Validators.min(0),
      Validators.max(1),
    ]),
    further_description: new FormControl(''),
    college_score_needed: new FormControl(''),
  });

  constructor(
    private adminService: AdminstrationService,
    private toastr: ToastrService,
    private messageService: MessagingService,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    this.messageService.requestPermission(this.firebase_token);
    this.messageService.receiveMessage();
    this.messageSubscription = this.messageService.currentMessage.subscribe(
      (m) => (this.message = m)
    );
  }

  collectData() {
    this.messageService.requestPermission(this.firebase_token);
    this.messageService.receiveMessage();
    this.message = this.messageService.currentMessage;
    this.adminService
      .createScholarship(this.scholarshipForm.value)
      .subscribe((res) => {
        this.scholarship = res;
        // this.toastr.success(' The Scholarship Has Been Added ', '1', {
        //   timeOut: 4000,
        //   progressBar: true,
        // });
      });
    this.toastr.success(
      'Your scholarship is waiting for manager approval ',
      '',
      {
        timeOut: 4000,
        progressBar: true,
      }
    );
  }

  ngOnDestroy(): void {
    if (this.messageSubscription) this.messageSubscription.unsubscribe();
  }
}
