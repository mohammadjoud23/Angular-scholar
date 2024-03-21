import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgZone } from '@angular/core';
import { Notifications } from '../models/notifications';
@Injectable({
  providedIn: 'root',
})
export class MessagingService {
  baseUrl: string = 'http://localhost:8000/api';
  firebase_token: any;
  token: any;
  currentMessage = new BehaviorSubject(null);
  counter = 0;
  constructor(
    private angularFireMessaging: AngularFireMessaging,
    private http: HttpClient,
    private router: Router,
    private zone: NgZone
  ) {
    this.angularFireMessaging.messages.subscribe((_messaging: any) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    });
  }

  requestPermission(firebase_token: any) {
    this.angularFireMessaging.requestToken.subscribe(
      (firebase_token) => {
        this.firebase_token = firebase_token;
        this.counter = Number(localStorage.getItem('counter')) + 1;
      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
    localStorage.setItem('counter', String(this.counter));
  }
  getCounter() {
    return localStorage.getItem('counter');
  }
  req(firebase_token: string) {
    // localStorage.getItem('token');
    // console.log(firebase_token )
    const formData = new FormData();
    formData.append('firebase_token', firebase_token);
    return this.http.post<any>(`${this.baseUrl}/updatefcmtoken`, {
      firebase_token: firebase_token,
    });
  }
  receiveMessage() {
    this.angularFireMessaging.messages.subscribe((payload: any) => {
      // console.log("new message received. ", payload);
      this.currentMessage.next(payload);
      this.showNotification(payload);
    });
  }

  showNotification(payload: any) {
    let notify_data = payload['notification'];
    let title = notify_data['title'];
    let options = {
      body: notify_data['body'],
      icon: '../../assets/images/logo.png',
      badge: '../../assets/images/logo.png',
      image: '../../assets/images/logo.png',
    };
    let notify: Notification = new Notification(title, options);
    notify.onclick = (event) => {
      event.preventDefault();
      // window.location.href= 'https://www.google.com';

      this.zone.run(() => {
        this.router.navigate(['/community']);
      });
    };
  }

  getNotifications() {
    return this.http.get<Notifications>(`${this.baseUrl}/notifications`);
  }
}
