import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ScholarshipsComponent } from './pages/scholarships/scholarships.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ScholarshipComponent } from './pages/scholarship/scholarship.component';
import { RequirmentsComponent } from './components/requirments/requirments.component';
import { RegisterComponent } from './registeration/register/register.component';
import { LoginComponent } from './registeration/login/login.component';
import { CommunityComponent } from './pages/community/community.component';
import { AuthGuard } from './auth.guard';
import { AdminGuard } from './admin.guard';
import { AppComponent } from './app.component';
import { AuthLayoutComponent } from './layout/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AdminComponent } from './adminstration/admin/admin.component';
import { NewsResolver } from './news.resolver';
import { ManagerComponent } from './adminstration/manager/manager.component';
import { ManagerGuard } from './manager.guard';
import { ReportsComponent } from './adminstration/reports/reports.component';
import { ManagingComponent } from './adminstration/managing/managing.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   component: HomeComponent
  // },
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'scholarships',
        component: ScholarshipsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'scholarship/:id',
        component: ScholarshipComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'requirments/:id',
        component: RequirmentsComponent,
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
        resolve: {
          features: NewsResolver,
        },
      },
      {
        path: 'community',
        component: CommunityComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin',
        component: AdminComponent,
        canActivate: [AdminGuard],
      },
      {
        path: 'manager',
        component: ManagerComponent,
        canActivate: [ManagerGuard],
      },
      {
        path: 'reports',
        component: ReportsComponent,
        canActivate: [ManagerGuard],
      },
      {
        path: 'managing',
        component: ManagingComponent,
        canActivate: [ManagerGuard],
      },
      {
        path: '',
        component: HomeComponent,
        // canActivate:[AuthGuard]
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [
      {
        path: 'register',
        component: RegisterComponent,
        canActivate: [LoginGuard],
      },
      {
        path: 'login',
        component: LoginComponent,
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
