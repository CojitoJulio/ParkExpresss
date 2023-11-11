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

  ngOnInit() {
    this.getParkings();
  }

  getParkings() {
    this.apiService.getParking().subscribe((Parking) => {
      this.parkings = Parking;
    });
  }
}
