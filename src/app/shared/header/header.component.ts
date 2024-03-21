import { Component, OnInit } from '@angular/core';
import { ScholarshipsService } from '../../services/scholarships.service';
import { RegistrationService } from '../../services/registration.service';
import { MessagingService } from '../../services/messaging.service';
import { Subscription } from 'rxjs';
import { Notifications } from '../../models/notifications';
import { FormControl, FormGroup } from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [MessageService],
})
export class HeaderComponent implements OnInit {
  data: any;
  public isAuth: boolean = false;
  public isAdmin: any;
  public isManager: any;
  public user_id: any;
  public user_name: any;
  public shsmooj: any;

  // notifications:Notifications={} as Notifications;
  notifications: Notifications[] | null = null;
  display: boolean = false;
  displaySideBar: boolean = false;
  drag: boolean = false;
  image: any;
  uImage: any;
  message: any;
  messageSubscription: Subscription | undefined;
  firebase_token: any;
  num: any = 0;
  user_image: any;
  imageForm = new FormGroup({
    image: new FormControl(''),
  });

  constructor(
    private scholarshipService: ScholarshipsService,
    private registrationService: RegistrationService,
    private messageService: MessagingService,
    private messageservice: MessageService
  ) {
    this.isAdmin = localStorage.getItem('isAdmin');
    this.isManager = localStorage.getItem('isManager');

    if (localStorage.getItem('image') === 'null') {
      this.image = 'assets/images/u.jpg';
    } else {
      this.image = localStorage.getItem('image');
    }

    if (localStorage.getItem('token')) {
      this.isAuth = true;
    } else {
      this.isAuth = false;
    }
    this.user_id = localStorage.getItem('user_id');
    this.user_name = localStorage.getItem('user_name');
    setInterval(() => {
      this.num = this.messageService.getCounter();
    }, 10000);
  }

  ngOnInit(): void {
    this.messageService.requestPermission(this.firebase_token);
    this.messageService.receiveMessage();
    this.messageSubscription = this.messageService.currentMessage.subscribe(
      (m) => (this.message = m)
    );
  }

  signOut() {
    localStorage.setItem('logged', '0');
    const token = localStorage.getItem('token');
    this.registrationService.signOut(`Bearer ${token}`).subscribe((res) => {
      localStorage.removeItem('token');
      localStorage.removeItem('isAdmin');
      localStorage.removeItem('user_id');
      localStorage.removeItem('user_name');
      localStorage.removeItem('firebase_token');
      localStorage.removeItem('isManager');
      this.data = res;
    });
  }

  handleClick() {
    this.display = true;
    this.messageService.getNotifications().subscribe((res: any) => {
      this.notifications = res.data;
      this.num = 0;
    });
  }

  uploadImage(event: any) {
    this.messageservice.add({
      key: 'tl',
      severity: 'success',
      summary: 'Success',
      detail: 'Image updated.. please login again',
    });

    this.user_image = event.target.files[0];
    this.shsmooj = event.target.files[0].name;
    const formData = new FormData();
    formData.append('image', this.user_image, this.user_image.name);
    // console.log(this.user_image);

    this.scholarshipService.UserImage(formData).subscribe((res: any) => {
      this.uImage = res;
      localStorage.setItem('image', this.user_image.name);
      // console.log('s', this.user_image.name);
    });
  }
  updateImage(event: any) {
    this.user_image = event.target.files[0];
    // localStorage.setItem('image', this.user_image.name);
    const formData = new FormData();
    formData.append('image', this.user_image, this.user_image.name);
    this.scholarshipService.UserImage(formData).subscribe((res: any) => {
      this.uImage = res;
    });
    // this.messageservice.add({
    //   key: 'tl',
    //   severity: 'success',
    //   summary: 'Success',
    //   detail: 'Image updated.. please login again',
    // });
  }
}
