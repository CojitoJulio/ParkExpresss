import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';

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
    this.getParkings();
    this.getusers();
  }

  // getParkings() {
  //   this.apiService.getParking().subscribe((Parking) => {
  //     this.parkings = Parking;
  //   });
  // }

  // getParkings2() {
  //   this.parkings.forEach((park: Parking) => {
  //     console.log(park.iddueno);
  //     if (this.actualid == park.iddueno) {
  //       this.parkingstotal.push(park);
  //     }
  //   });
  // }

  getParkings() {
    this.apiService
      .getParking()
      .pipe(
        switchMap((parkings) => {
          this.parkings = parkings;
          return forkJoin(this.processParkings());
        })
      )
      .subscribe(() => {
        // En este punto, ambos getParking y processParkings se han completado.
        console.log(this.parkingstotal);
      });
  }

  processParkings() {
    this.parkingstotal = [];

    this.parkings.forEach((park: Parking) => {
      if (this.actualid == park.iddueno) {
        this.parkingstotal.push(park);
      }
    });

    return []; // Retorna un observable vacío para usar con forkJoin.
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios) => {
      this.users = usuarios;
      // console.log(this.users);
      var actualuser = localStorage.getItem('actualuser');
      if (actualuser) {
        var actualidid = JSON.parse(actualuser).id;
        this.actualid = actualidid;
      }
    });
  }

  updateStatus(parking: any, newStatus: boolean, id: number) {
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
          // La actualización se ha realizado con éxito, puedes manejar la respuesta aquí
          console.log('se realizo');
        });
      }
    });
  }

  prueba() {
    console.log('momazo');
  }
}
