import {
  NgModule,
  APP_INITIALIZER,
  CUSTOM_ELEMENTS_SCHEMA,
} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { ScholarshipsComponent } from './pages/scholarships/scholarships.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SliderComponent } from './components/slider/slider.component';
import { ItemsBannerComponent } from './components/items-banner/items-banner.component';
import { ScholarshipItemComponent } from './components/scholarship-item/scholarship-item.component';
import { PaginatorModule } from 'primeng/paginator';
import { TabViewModule } from 'primeng/tabview';
import { ScholarshipComponent } from './pages/scholarship/scholarship.component';
import { SkeletonModule } from 'primeng/skeleton';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RequirmentsComponent } from './components/requirments/requirments.component';
import { YesNoPipe } from './yes-no.pipe';
import { RegisterComponent } from './registeration/register/register.component';
import { LoginComponent } from './registeration/login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { DialogModule } from 'primeng/dialog';
import { CommunityComponent } from './pages/community/community.component';
import { PostsComponent } from './components/posts/posts.component';
import { TokenInterceptorService } from './token-interceptor.service';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AdminComponent } from './adminstration/admin/admin.component';
import { PanelModule } from 'primeng/panel';
import { SidebarModule } from 'primeng/sidebar';
import { BadgeModule } from 'primeng/badge';
import { CheckboxModule } from 'primeng/checkbox';
import { ToastModule } from 'primeng/toast';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FileUploadModule } from 'primeng/fileupload';

// firebase
import { MessagingService } from './services/messaging.service';
import { environment } from '../environments/environment';
import { AsyncPipe } from '@angular/common';
import { AngularFireMessagingModule } from '@angular/fire/compat/messaging';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { CommentsComponent } from './components/comments/comments.component';
import { NgChartsModule } from 'ng2-charts';
import { ManagerComponent } from './adminstration/manager/manager.component';
import { ReportsComponent } from './adminstration/reports/reports.component';
import { ManagingComponent } from './adminstration/managing/managing.component';
import { UserImagePipe } from './user-image.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ScholarshipsComponent,
    DashboardComponent,
    SliderComponent,
    ItemsBannerComponent,
    ScholarshipItemComponent,
    ScholarshipComponent,
    RequirmentsComponent,
    YesNoPipe,
    RegisterComponent,
    LoginComponent,
    CommunityComponent,
    PostsComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    AdminComponent,
    CommentsComponent,
    ManagerComponent,
    ReportsComponent,
    ManagingComponent,
    UserImagePipe,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    PaginatorModule,
    TabViewModule,
    SkeletonModule,
    ProgressSpinnerModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    DialogModule,
    TableModule,
    InputTextModule,
    InputTextareaModule,
    ButtonModule,
    PanelModule,
    SidebarModule,
    BadgeModule,
    CheckboxModule,
    ToastModule,
    ChartModule,
    DropdownModule,
    AvatarModule,
    AvatarGroupModule,
    FileUploadModule,

    AngularFireMessagingModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    NgChartsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    MessagingService,
    AsyncPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
