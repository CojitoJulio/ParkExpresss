import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { CreditcardComponent } from './components/creditcard/creditcard.component';
import { HomeComponent } from './components/home/home.component';
import { ErrorComponent } from './components/error/error.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AdmincarComponent } from './components/admincar/admincar.component';
import { AdminparkingComponent } from './components/adminparking/adminparking.component';
import { AddcarComponent } from './components/addcar/addcar.component';
import { AddparkingComponent } from './components/addparking/addparking.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'creditcard', component: CreditcardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'admincar', component: AdmincarComponent },
  { path: 'adminparking', component: AdminparkingComponent },
  { path: 'addcar', component: AddcarComponent },
  { path: 'addparking', component: AddparkingComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
