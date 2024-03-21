import { Component, OnInit } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { RegistrationService } from '../../services/registration.service';
import { MessagingService } from '../../services/messaging.service';
@Component({
  selector: 'app-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  data: any;
  token: any;
  user: any;
  title = 'notifications';
  message: any;
  constructor(
    private scolarshipsService: ScholarshipsService,
    private registrationService: RegistrationService,
    private messageService: MessagingService
  ) {}

  ngOnInit(): void {}

  signOut() {
    localStorage.removeItem('token');
    this.registrationService.signOut(this.user.token).subscribe((res) => {
      this.data = res;
    });
  }
}
