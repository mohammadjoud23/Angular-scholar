import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScholarshipsService } from '../../services/scholarships.service';
import { FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegistrationService } from '../../services/registration.service';
import { MessagingService } from '../../services/messaging.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  submitted = false;
  user: any;
  token: any;
  image: any;
  firebase_token: any;
  firebase_token2: any;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private scholarshipService: ScholarshipsService,
    private registrationService: RegistrationService,
    private toastr: ToastrService,
    private messageService: MessagingService
  ) {}

  ngOnInit(): void {}

  collectData() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }

    this.registrationService
      .loginUser(this.loginForm.value)
      .subscribe((res) => {
        this.user = res;
        // console.log(this.user);
        this.token = this.user.token;
        this.image = this.user.user.image;
        localStorage.setItem('user_id', this.user.user.id);
        localStorage.setItem('user_name', this.user.user.name);
        localStorage.setItem('token', this.token);
        localStorage.setItem('logged', '1');
        localStorage.setItem('image', this.image);

        if (this.user.user.role == 1) {
          localStorage.setItem('isAdmin', '1');
        } else {
          localStorage.setItem('isAdmin', '0');
        }
        if (this.user.user.role == 2) {
          localStorage.setItem('isManager', '2');
        } else {
          localStorage.setItem('isManager', '0');
        }
        this.router.navigate(['/scholarships']);
        this.toastr.success('You Are Logged In', '1', {
          timeOut: 3000,
          progressBar: true,
        });

        this.firebase_token = localStorage.getItem('firebase_token');
        // console.log( this.firebase_token);
        this.firebase_token2 = this.messageService.requestPermission(
          this.firebase_token
        );
        this.messageService.req(this.firebase_token).subscribe((res) => {
          this.firebase_token2 = res;
          // console.log(this.firebase_token2)
        });
      });
  }

  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }

  createAccount() {
    this.router.navigate(['/register']);
  }
}
