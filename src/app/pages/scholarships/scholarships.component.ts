import { Component, OnInit } from '@angular/core';
import { Scholarships } from '../../models/scholarhips';
import { ScholarshipsService } from '../../services/scholarships.service';
import { RegistrationService } from '../../services/registration.service';
interface Country {
  name: string;
}
@Component({
  selector: 'app-scholarships',
  templateUrl: './scholarships.component.html',
  styleUrls: ['./scholarships.component.scss'],
})
export class ScholarshipsComponent implements OnInit {
  data: any;
  scholarships: Scholarships[] = [];
  token: any;
  user: any;
  searchValue: string | null = null;
  feature: any;
  countries: any;
  cities: Country[];
  constructor(
    private scholarshipsService: ScholarshipsService,
    private registrationService: RegistrationService
  ) {
    this.cities = [
      { name: 'All Countries' },
      { name: 'Peru' },
      { name: 'Australia' },
      { name: 'Italy' },
      { name: 'Netherlands' },
      { name: 'Sweden' },
      { name: 'Spain' },
      { name: 'France' },
      { name: 'Austria' },
      { name: 'Germany' },
      { name: 'Turkey' },
      { name: 'Belgium' },
      { name: 'Brazil' },
      { name: 'Switzerland' },
      { name: 'Egypt' },
      { name: 'India' },
      { name: 'Denmark' },
      { name: 'Sudan' },
      { name: 'Hungary' },
      { name: 'United Kingdom' },
      { name: 'United States' },
      { name: 'United Arab Emirates' },
      { name: 'Qatar' },
      { name: 'Russia' },
      { name: 'China' },
    ];
  }

  ngOnInit(): void {
    this.getPagedScholarships(1);
  }

  getPagedScholarships(page: number, searchKeyword?: string, country?: string) {
    this.scholarshipsService
      .searchScholarship(page, searchKeyword, country)
      .subscribe((response: any) => {
        this.scholarships = response;
      });
  }

  paginate(event: any) {
    if (this.searchValue) {
      this.scholarshipsService
        .search(this.searchValue)
        .subscribe((response: any) => {
          this.scholarships = response;
        });
    } else {
      this.getPagedScholarships(event.page + 1);
    }
  }

  searchChanged() {
    if (this.searchValue) {
      this.scholarshipsService
        .search(this.searchValue)
        .subscribe((response: any) => {
          this.scholarships = response;
        });
    } else if (this.countries) {
      if (this.countries.name == 'All Countries') {
        this.getPagedScholarships(1);
      } else {
        this.scholarshipsService
          .country(this.countries.name)
          .subscribe((res: any) => {
            this.scholarships = res;
            // console.log(this.countries);
          });
      }
    } else {
      this.getPagedScholarships(1);
    }
  }

  // filter() {
  //   this.scolarshipsService.country('Peru').subscribe((res: any) => {
  //     this.countries = res;
  //     console.log(this.countries);
  //   });
  // }

  signOut() {
    this.token = localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.registrationService.signOut(this.token).subscribe((res) => {
      this.user = res;
    });
  }
}
