import { Component, OnInit } from '@angular/core';
import { Boleta } from 'src/app/models/boleta';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-boletas',
  templateUrl: './boletas.component.html',
  styleUrls: ['./boletas.component.css'],
})
export class BoletasComponent implements OnInit {
  boletastotales: Boleta[] = [];
  idboleta!: number;
  boleta!: Boleta;
  tarjeta!: string;

  constructor(private apiservice: ApiService) {}

  ngOnInit() {
    this.getboleta();
  }

  getboleta() {
    var idboleta = localStorage.getItem('idboleta');

    if (idboleta) {
      var boletaid = JSON.parse(idboleta).id;
      this.idboleta = boletaid;
    }

    this.apiservice.getBoletas().subscribe((boletitas: Boleta[]) => {
      this.boletastotales = boletitas;

      this.boletastotales.forEach((boletona) => {
        if (boletona.id == this.idboleta) {
          this.boleta = boletona;
          var number = this.boleta.tarjeta.toString();
          this.tarjeta = number.slice(-4);
        }
      });
    });
  }
}
