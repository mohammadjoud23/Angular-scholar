import { Component, OnInit } from '@angular/core';
import { PostsReports, ScholarshipsReports } from '../../models/reports';
import { ScholarshipsService } from '../../services/scholarships.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  providers: [MessageService],
})
export class ReportsComponent implements OnInit {
  scholarshipsReports: ScholarshipsReports[] = [];
  postsReports: PostsReports[] = [];
  constructor(
    private scholarshipsService: ScholarshipsService,
    private messageservice: MessageService
  ) {}

  ngOnInit(): void {
    this.getScholarshipsReports();
    this.getpostsReports();
  }

  getScholarshipsReports() {
    this.scholarshipsService.getScholarshipsReports().subscribe((res: any) => {
      this.scholarshipsReports = res;
    });
  }
  getpostsReports() {
    this.scholarshipsService.getPostsReports().subscribe((res: any) => {
      this.postsReports = res;
    });
  }
  deleteScholarshipReport(
    id: number,
    data: ScholarshipsReports,
    index: number
  ) {
    this.scholarshipsService
      .deleteScholarshipsReports(id, data)
      .subscribe(() => {
        this.scholarshipsReports.splice(index, 1);
      });
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'The Report is deleted.',
    });
  }
  deletePostReport(id: number, data: PostsReports, index: number) {
    this.scholarshipsService.deletePostsReports(id, data).subscribe(() => {
      this.postsReports.splice(index, 1);
    });
    this.messageservice.add({
      key: 't2',
      severity: 'success',
      summary: 'Success',
      detail: 'The Report is deleted.',
    });
  }
  notifyPostsReport(id: number, data: any) {
    this.scholarshipsService.PostNotify(id, data).subscribe(() => {});
    this.messageservice.add({
      key: 't2',
      severity: 'success',
      summary: 'Success',
      detail: 'Notification is sent to user.',
    });
  }
  notifyScholarshipsReport(id: number, data: any) {
    this.scholarshipsService.ScholarshipNotify(id, data).subscribe(() => {});
    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'Notification is sent to user.',
    });
  }
}
