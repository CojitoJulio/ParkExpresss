import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { switchMap } from 'rxjs/operators';
import { Autos } from 'src/app/models/autos';
import { Boleta } from 'src/app/models/boleta';

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
  usuario!: Usuario;
  actualid!: number;

  cars: Autos[] = [];
  carsactual: Autos[] = [];

  boletastotales: Boleta[] = [];

  //Resumen Cliente
  boletasCliente: Boleta[] = [];
  HorasSemanales: number = 0;
  TotalTotales: number = 0;
  RecuentoUsado: number = 0;

  //Resumen Dueño
  boletasDuenio: Boleta[] = [];
  VecesArrendado: number = 0;
  TotalArriendos: number = 0;

  ngOnInit() {
    this.getResumen();
    this.getuser();
    this.getparkings();
  }

  calcs() {
    this.boletasCliente.map((boletona) => {
      this.HorasSemanales += boletona.tiempototal;
      this.TotalTotales += boletona.total;
      this.RecuentoUsado += 1;
    });
    this.boletasDuenio.map((boletona) => {
      this.VecesArrendado += 1;
      this.TotalArriendos += boletona.total;
    });
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
    this.getCars();
  }

  getResumen() {
    this.getusers();
    this.apiService.getBoletas().subscribe((boletas: Boleta[]) => {
      this.boletastotales = boletas;

      this.boletastotales.forEach((boletita) => {
        if (boletita.cliente == this.usuario.nombre) {
          this.boletasCliente.push(boletita);
        }

        if (boletita.duenio == this.usuario.nombre) {
          this.boletasDuenio.push(boletita);
        }
      });

      this.calcs();
    });
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios: Usuario[]) => {
      this.users = usuarios;
      this.users.forEach((user) => {
        if (user.id == this.actualid) {
          this.usuario = user;
        }
      });
    });
  }
}
