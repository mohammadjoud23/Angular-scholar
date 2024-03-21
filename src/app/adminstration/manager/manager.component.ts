import { Component, OnInit } from '@angular/core';
import { Scholarships } from '../../models/scholarhips';
import { ScholarshipsService } from '../../services/scholarships.service';
import { ActivatedRoute } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss'],
})
export class ManagerComponent implements OnInit {
  scholarships: Scholarships[] = [];
  scholarshipsInfo: Scholarships[] = [];

  constructor(
    private scholarshipsService: ScholarshipsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getPendingScholarships();
      // this.getScholarshipInfo(id);
    });
  }

  getPendingScholarships() {
    this.scholarshipsService.getManagerScholarships().subscribe((res: any) => {
      this.scholarships = res;
    });
  }
  // getScholarshipInfo(id: number) {
  //   this.scholarshipsService.showScholarshipInfo(id).subscribe((res: any) => {
  //     this.scholarshipsInfo = res;
  //   });
  // }
}
