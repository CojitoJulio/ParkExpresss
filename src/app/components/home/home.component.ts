import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const estacionamientos = [
      {
        lon: -33.433157,
        lat: -70.6157,
        name: 'Santa Isabel',
      },
      {
        lon: -33.431923,
        lat: -70.616467,
        name: 'General del Canto',
      },
      {
        lon: -33.43314,
        lat: -70.613058,
        name: 'Fernández Concha',
      },
      {
        lon: -33.434816,
        lat: -70.616431,
        name: 'Luis Carrera',
      },
    ];

    const CustomIcon = L.icon({
      iconUrl: '../../../assets/parking-icon.png',
      iconSize: [40, 40],
    });

    const map = L.map('map').setView([-33.433157, -70.6157], 17);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    estacionamientos.forEach((parking) => {
      L.marker([parking.lon, parking.lat], {
        title: parking.name,
        icon: CustomIcon,
      })
        .bindPopup(parking.name)
        .addTo(map);
    });
  }
}
