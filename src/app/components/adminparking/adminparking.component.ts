import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { switchMap } from 'rxjs/operators';
import { Actualrent } from 'src/app/models/actualrent';

@Component({
  selector: 'app-adminparking',
  templateUrl: './adminparking.component.html',
  styleUrls: ['./adminparking.component.css'],
})
export class AdminparkingComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  parkings: Parking[] = [];
  parkingstotal: Parking[] = [];
  estado: boolean = true;
  users: Usuario[] = [];
  actualid!: number;

  ngOnInit() {
    this.getuser();
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

  updateStatus(newStatus: boolean, id: number) {
    console.log('hola');
    this.parkings.forEach((park: Parking) => {
      if (id == park.id) {
        const parkingToUpdate: Parking = {
          id: park.id,
          ubicacion: park.ubicacion,
          iddueno: park.iddueno,
          estado: newStatus,
          descripcion: park.descripcion,
          precio: park.precio,
          nroparking: park.nroparking,
          direccion: park.direccion,
        };

        this.apiService.updateParking(parkingToUpdate).subscribe(() => {
          console.log('se realizo');
        });
      }
    });
  }
}
