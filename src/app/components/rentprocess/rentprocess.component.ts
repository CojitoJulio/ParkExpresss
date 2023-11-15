import { Component, OnInit } from '@angular/core';
import { Parking } from 'src/app/models/parking';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-rentprocess',
  templateUrl: './rentprocess.component.html',
  styleUrls: ['./rentprocess.component.css'],
})
export class RentprocessComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  actualparkselectedid!: number;
  parkings: Parking[] = [];
  parkingselect!: Parking;

  ngOnInit() {
    this.getpark();
  }

  private getpark() {
    var actualparkselected = localStorage.getItem('idparkselected');
    if (actualparkselected) {
      var actualparkselectedidid = JSON.parse(actualparkselected).id;
      this.actualparkselectedid = actualparkselectedidid;
    }
    this.getparkmero();
  }

  getparkmero() {
    this.apiService.getParking().subscribe((parkings: Parking[]) => {
      this.parkings = parkings;

      this.parkings.forEach((park) => {
        if (park.id == this.actualparkselectedid) {
          this.parkingselect = park;
        }
      });
    });
  }
}
