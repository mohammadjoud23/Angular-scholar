import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../../services/registration.service';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { ScholarshipsService } from '../../services/scholarships.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [MessageService],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  user: any;
  token: any;
  loginForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.pattern('[a-zA-Z]*'),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password_confirmation: new FormControl('', Validators.required),
  });

  constructor(
    private router: Router,
    private scholarshipService: ScholarshipsService,
    private messageservice: MessageService,
    private toastr: ToastrService,
    private registrationService: RegistrationService
  ) {}

  ngOnInit(): void {}

  collectData() {
    this.registrationService
      .registerUser(this.loginForm.value)
      .subscribe((res) => {
        this.user = res;
        this.submitted = true;
        this.token = this.user.token;
        localStorage.setItem('token', this.token);
        this.toastr.success('You Are Sucsessfuly Registered', '1', {
          timeOut: 3000,
          progressBar: true,
        });
        // this.messageservice.add({
        //   key: 't2',
        //   severity: 'success',
        //   summary: 'Success',
        //   detail: 'You are sucsessfuly registered',
        // });
        this.router.navigate(['/login']);
        console.log(this.user);
      });

    this.submitted = false;
    this.loginForm.get('name')?.reset();
    this.loginForm.get('email')?.reset();
    this.loginForm.get('password')?.reset();
    this.loginForm.get('password_confirmation')?.reset();
  }

  get email() {
    return this.loginForm.get('email');
  }
  get name() {
    return this.loginForm.get('name');
  }
  get password() {
    return this.loginForm.get('password');
  }
  get password_confirmation() {
    return this.loginForm.get('password_confirmation');
  }
}
