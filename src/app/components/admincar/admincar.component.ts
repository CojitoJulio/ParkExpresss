import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { Actualrent } from 'src/app/models/actualrent';
import { Autos } from 'src/app/models/autos';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admincar',
  templateUrl: './admincar.component.html',
  styleUrls: ['./admincar.component.css'],
})
export class AdmincarComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  cars: Autos[] = [];
  carsactual: Autos[] = [];
  actualid!: number;
  rentas: Actualrent[] = [];

  ngOnInit() {
    this.getuser();
    this.getCars();
    this.getrent();
  }

  getuser() {
    var actualuser = localStorage.getItem('actualuser');
    if (actualuser) {
      var actualidid = JSON.parse(actualuser).id;
      this.actualid = actualidid;
    }
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

  getrent() {
    this.apiService.getActualRent().subscribe((rents: Actualrent[]) => {
      this.rentas = rents;
      console.log(this.rentas);
    });
  }

  deletecar(idcar?: number) {
    if (this.rentas) {
      this.rentas.forEach((renta) => {
        console.log('hola?');
        if (renta.idauto == idcar) {
          console.log('esta con deuda este qlo');
          return;
        } else {
          console.log('no papito, tamos al dia');
        }
      });
    }
  }

  formatPatente(patente: string): string {
    return (
      patente.slice(0, 2) + '·' + patente.slice(2, 4) + '·' + patente.slice(4)
    );
  }
}
