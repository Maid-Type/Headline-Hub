import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {NewsComponent} from './news/news.component';
import {AdminDashboardComponent} from './admindashboard/admindashboard.component';
import {UserdashboardComponent} from './userdashboard/userdashboard.component';
import {ChangePasswordComponent} from './change-password/change-password.component';
import {HomeComponent} from './home/home.component';
import {SpecificnewsComponent} from './specificnews/specificnews.component';

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'news', component: NewsComponent},
  {path: 'news/:id', component: SpecificnewsComponent},
  {path: 'admindashboard', component: AdminDashboardComponent},
  {path: 'userdashboard', component: UserdashboardComponent},
  {path: 'change-password', component: ChangePasswordComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
];
