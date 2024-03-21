import { Component, Input, OnInit } from '@angular/core';
import { Scholarships } from '../../models/scholarhips';
import { AdminstrationService } from '../../services/adminstration.service';
import { ToastrService } from 'ngx-toastr';
import { ScholarshipsService } from '../../services/scholarships.service';
import { MessageService } from 'primeng/api';
import { MessagingService } from '../../services/messaging.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-scholarship-item',
  templateUrl: './scholarship-item.component.html',
  styleUrls: ['./scholarship-item.component.scss'],
  providers: [MessageService],
})
export class ScholarshipItemComponent implements OnInit {
  public isAdmin: any;
  public isManager: any;
  data: any;
  @Input() itemData: Scholarships | null = null;
  @Input() buttons: boolean = false;
  @Input() icon: boolean = false;
  feature: any;
  firebase_token: any;
  firebase_token2: any;
  messageSubscription: Subscription | undefined;
  public message: any;

  constructor(
    private adminService: AdminstrationService,
    private toastr: ToastrService,
    private scolarshipsService: ScholarshipsService,
    private messageservice: MessageService,
    private messageService: MessagingService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.isManager = localStorage.getItem('isManager');
  }

  ngOnInit(): void {}

  deleteScholarship(id: number) {
    this.adminService.deleteScholarship(this.itemData, id).subscribe(() => {});
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'The Scholarship Has Been Deleted',
    });
  }

  featureScholarship(id: number, data: Scholarships) {
    this.scolarshipsService.addFeature(id, data).subscribe((res) => {
      this.feature = res;
      this.messageservice.add({
        key: 't2',
        severity: 'success',
        summary: 'Success',
        detail: 'The Scholarship Is Added To Your Dashboard',
      });
    });
  }

  approveScholarship(id: number, data: Scholarships) {
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

    this.scolarshipsService
      .approveScholarships(id, data)
      .subscribe((res: any) => {});
    this.messageservice.add({
      key: 't2',
      severity: 'success',
      summary: 'Success',
      detail: 'The scholarship is approved.',
    });
  }

  declineScholarship(id: number, data: Scholarships) {
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

    this.scolarshipsService
      .declineScholarships(id, data)
      .subscribe((res: any) => {});
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'The scholarship is declined.',
    });
  }
}
