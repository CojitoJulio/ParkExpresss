import { Component, OnInit } from '@angular/core';
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

  ngOnInit() {
    this.getCars();
  }

  getCars() {
    this.apiService.getCars().subscribe((Autos) => {
      this.cars = Autos;
    });
  }

  formatPatente(patente: string): string {
    return (
      patente.slice(0, 2) + '·' + patente.slice(2, 4) + '·' + patente.slice(4)
    );
  }
}
