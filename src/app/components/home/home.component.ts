import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    this.llenarParkings();
  }

  llenarParkings() {
    this.apiService.getParking().subscribe((data) => {
      this.data = data;

      const CustomIcon = L.icon({
        iconUrl: '../../../assets/parking-icon.png',
        iconSize: [40, 40],
      });

      const map = L.map('map').setView([-33.433157, -70.6157], 17);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (Array.isArray(data)) {
        this.data = data;

        this.data.forEach((item: any) => {
          L.marker([item.lon, item.lat], {
            title: item.name,
            icon: CustomIcon,
          })
            .bindPopup(item.name)
            .addTo(map);
        });
      }
    });
  }
}
