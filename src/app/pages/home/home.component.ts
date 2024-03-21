import { Component, OnInit } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { Scholarships } from '../../models/scholarhips';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  scholarships: Scholarships[] = [] ;

  constructor(private scolarshipsService: ScholarshipsService) { }

  ngOnInit(): void {
    this.scolarshipsService.getScholarships().subscribe((response : any)=>{
    this.scholarships = response;
    });
  }


}
