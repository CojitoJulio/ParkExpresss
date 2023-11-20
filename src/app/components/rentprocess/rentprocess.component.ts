import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Actualrent } from 'src/app/models/actualrent';
import { Parking } from 'src/app/models/parking';
import { ApiService } from 'src/app/services/api.service';
import { payGuard } from 'src/app/guards/pay.guard';

@Component({
  selector: 'app-rentprocess',
  templateUrl: './rentprocess.component.html',
  styleUrls: ['./rentprocess.component.css'],
})
export class RentprocessComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private payGuard: payGuard
  ) {}

  actualparkselectedid!: number;
  firsthour!: number;
  parkings: Parking[] = [];
  tiempototal!: number;
  horatermino!: string;
  total!: number;
  rents: Actualrent[] = [];
  actualrent!: Actualrent;
  actualparkid!: number;
  actualparking!: Parking;

  ngOnInit() {
    this.getactualpark();
    this.getActualRent();
  }

  private getpark() {
    var actualparkselected = localStorage.getItem('idparkselected');
    if (actualparkselected) {
      var actualparkselectedidid = JSON.parse(actualparkselected).id;
      this.actualparkselectedid = actualparkselectedidid;
      var actualhour = JSON.parse(actualparkselected).hora;
      this.firsthour = actualhour;
      console.log(this.firsthour);
    }
    this.getparkmero();
  }

  getactualpark() {
    var actualpark = localStorage.getItem('idparkselected');
    if (actualpark) {
      var actualparkidd = JSON.parse(actualpark).id;
      this.actualparkid = actualparkidd;
    }
  }

  getparkmero() {
    this.apiService.getParking().subscribe((parkings: Parking[]) => {
      this.parkings = parkings;

      this.parkings.forEach((park) => {
        if (park.id == this.actualparkselectedid) {
          this.actualparking = park;
        }
      });
    });
  }

  finalizar() {
    this.calcs();
    this.updaterent();
    this.payGuard.PagoNoRealizado();
    this.router.navigate(['/rentpay']);
  }

  calcs() {
    console.log('por lo menos funciona esta wea?');
    console.log(this.actualrent);
    var tiempo = this.actualrent.tiempo;
    var fecha = new Date();
    var tiemponow = fecha.getTime();
    var horanow =
      fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    this.tiempototal = parseFloat(((tiemponow - tiempo) / 3600000).toFixed(1));
    this.horatermino = horanow;

    if (this.tiempototal == 0) {
      this.tiempototal = 0.1;
    }

    var total = this.actualparking.precio * this.tiempototal;
    this.total = total;
  }

  getActualRent() {
    this.getpark();
    this.apiService.getActualRent().subscribe((rents: Actualrent[]) => {
      this.rents = rents;
      console.log(this.rents);

      this.rents.forEach((rent) => {
        if (rent.idparking == this.actualparkid) {
          this.actualrent = rent;
          console.log(this.actualrent);
        }
      });
    });
  }

  updaterent() {
    const renttoUpdate: Actualrent = {
      id: this.actualrent.id,
      idduenio: this.actualrent.idduenio,
      idcliente: this.actualrent.idcliente,
      idparking: this.actualrent.idparking,
      idauto: this.actualrent.idauto,
      horainicial: this.actualrent.horainicial,
      horatermino: this.horatermino,
      total: this.total,
      fecha: this.actualrent.fecha,
      tiempo: this.tiempototal,
      deuda: this.actualrent.deuda,
    };

    this.apiService.updateRent(renttoUpdate).subscribe(() => {
      console.log('se actualizó');
    });
  }
}
