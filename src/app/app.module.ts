import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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
import { RentselectionComponent } from './components/rentselection/rentselection.component';
import { RentprocessComponent } from './components/rentprocess/rentprocess.component';
import { RentpayComponent } from './components/rentpay/rentpay.component';
import { BoletasComponent } from './components/boletas/boletas.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    CreditcardComponent,
    HomeComponent,
    ErrorComponent,
    DashboardComponent,
    AdmincarComponent,
    AdminparkingComponent,
    AddcarComponent,
    AddparkingComponent,
    MainComponent,
    RentselectionComponent,
    RentprocessComponent,
    RentpayComponent,
    BoletasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
