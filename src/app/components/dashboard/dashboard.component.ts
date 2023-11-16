import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { switchMap } from 'rxjs/operators';
import { Autos } from 'src/app/models/autos';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  parkings: Parking[] = [];
  parkingstotal: Parking[] = [];
  estado: boolean = true;
  users: Usuario[] = [];
  actualid!: number;

  cars: Autos[] = [];
  carsactual: Autos[] = [];

  //Resumen Cliente
  HorasSemanales!: number;
  TotalTotales!: number;
  RecuentoUsado!: number;

  //Resumen Dueño
  VecesArrendado!: number;
  TotalArriendos!: number;

  ngOnInit() {
    this.getuser();
    this.getCars();
    this.getparkings();
  }

  getparkings() {
    this.apiService
      .getParking()
      .pipe(
        switchMap((parkings: Parking[]) => {
          this.parkings = parkings;
          return this.apiService.getParking();
        })
      )
      .subscribe((parkings: Parking[]) => {
        this.parkingstotal = parkings.filter(
          (park) => park.iddueno === this.actualid
        );
      });
  }

  getCars() {
    this.apiService
      .getCars()
      .pipe(
        switchMap((cars: Autos[]) => {
          this.cars = cars;
          return this.apiService.getCars();
        })
      )
      .subscribe((autos: Autos[]) => {
        this.carsactual = autos.filter((car) => car.idduenio === this.actualid);
      });
  }

  formatPatente(patente: string): string {
    return (
      patente.slice(0, 2) + '·' + patente.slice(2, 4) + '·' + patente.slice(4)
    );
  }

  processParkings() {
    this.parkingstotal = [];

    this.parkings.forEach((park: Parking) => {
      if (this.actualid == park.iddueno) {
        this.parkingstotal.push(park);
      }
    });

    return [];
  }

  getuser() {
    var actualuser = localStorage.getItem('actualuser');
    if (actualuser) {
      var actualidid = JSON.parse(actualuser).id;
      this.actualid = actualidid;
    }
  }

  getResumenClient() {}

  getResumenOwner() {}
}
