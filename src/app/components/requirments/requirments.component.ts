import { Component, Input, OnInit } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Scholarships, Requirments } from '../../models/scholarhips';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-requirments',
  templateUrl: './requirments.component.html',
  styleUrls: ['./requirments.component.scss'],
  providers: [MessageService],
})
export class RequirmentsComponent implements OnInit {
  scholarship: Scholarships | null = null;
  requirments: any = [];
  public isAdmin: any;
  requirmentForm = new FormGroup({
    description: new FormControl(''),
  });
  @Input() items: Requirments[] = [];

  constructor(
    private scholarshipsService: ScholarshipsService,
    private route: ActivatedRoute,
    private messageservice: MessageService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
  }

  ngOnInit(): void {
    this.route.params.subscribe(({ id }) => {
      this.getScholarshipRequirments(id);
    });
  }

  getScholarshipRequirments(id: string) {
    this.scholarshipsService.getRequirments(id).subscribe((requirmentsData) => {
      this.requirments = requirmentsData;
    });
  }

  deleteRequirment(id: number, index: number) {
    this.scholarshipsService
      .deleteRequirment(this.requirmentForm.value, id)
      .subscribe(
        () => {
          this.items.splice(index, 1);
        },
        (err) => {}
      );

    this.messageservice.add({
      key: 't2',
      severity: 'warn',
      summary: 'Warn',
      detail: 'The requirment is deleted.',
    });
  }
}
