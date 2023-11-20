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
import { MainComponent } from './components/main/main.component';
import { authGuard } from './guards/auth.guard';
import { LoggedGuard } from './guards/logged.guard';
import { RentselectionComponent } from './components/rentselection/rentselection.component';
import { RentprocessComponent } from './components/rentprocess/rentprocess.component';
import { RentpayComponent } from './components/rentpay/rentpay.component';
import { payGuard } from './guards/pay.guard';
import { BoletasComponent } from './components/boletas/boletas.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoggedGuard] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [LoggedGuard],
  },
  {
    path: 'creditcard',
    component: CreditcardComponent,
  },
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
  { path: 'admincar', component: AdmincarComponent, canActivate: [authGuard] },
  {
    path: 'adminparking',
    component: AdminparkingComponent,
    canActivate: [authGuard],
  },
  { path: 'addcar', component: AddcarComponent, canActivate: [authGuard] },
  { path: 'main', component: MainComponent },
  {
    path: 'addparking',
    component: AddparkingComponent,
    canActivate: [authGuard],
  },
  {
    path: 'rentselection',
    component: RentselectionComponent,
    canActivate: [authGuard, payGuard],
  },
  {
    path: 'rentprocess',
    component: RentprocessComponent,
    canActivate: [authGuard, payGuard],
  },
  {
    path: 'rentpay',
    component: RentpayComponent,
    canActivate: [authGuard],
  },
  {
    path: 'resumen',
    component: BoletasComponent,
    canActivate: [authGuard],
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: ErrorComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
