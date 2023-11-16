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

  prueba(idcar: any) {
    console.log(idcar);
  }

  getrent() {
    this.apiService.getActualRent().subscribe((rents: Actualrent[]) => {
      this.rentas = rents;
      console.log(this.rentas);
    });
  }

  deletecar(idcar?: number) {
    if (this.rentas.length !== 0) {
      for (const renta of this.rentas) {
        if (renta.idauto === idcar) {
          const inpago = document.getElementById('inpaga');
          if (inpago) {
            inpago.style.display = 'block';
          }
          return;
        }
      }
      const inpago = document.getElementById('inpaga');
      if (inpago) {
        inpago.style.display = 'none';
      }
      console.log('esta limpio');
      this.apiService.deleteCar(idcar).subscribe((response) => {
        console.log('Se borró el vehículo con id:', idcar);
        this.getCars();
      });
    } else {
      this.apiService.deleteCar(idcar).subscribe((response) => {
        console.log('Se borró el vehículo con id:', idcar);
        this.getCars();
      });
    }
  }

  formatPatente(patente: string): string {
    return (
      patente.slice(0, 2) + '·' + patente.slice(2, 4) + '·' + patente.slice(4)
    );
  }
}
