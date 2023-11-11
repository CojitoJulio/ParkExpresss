import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-adminparking',
  templateUrl: './adminparking.component.html',
  styleUrls: ['./adminparking.component.css'],
})
export class AdminparkingComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  parkings: Parking[] = [];
  estado: boolean = true;

  ngOnInit() {
    this.getParkings();
  }

  getParkings() {
    this.apiService.getParking().subscribe((Parking) => {
      this.parkings = Parking;
    });
  }

  updateStatus(parking: any, newStatus: boolean, id: number) {
    console.log('hola');
    this.parkings.forEach((park: Parking) => {
      if (id == park.id) {
        const parkingToUpdate: Parking = {
          id: park.id, // El ID del estacionamiento que deseas actualizar
          iddueno: park.iddueno,
          ubicacion: park.ubicacion,
          estado: newStatus, // Aquí actualizas el estado
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
