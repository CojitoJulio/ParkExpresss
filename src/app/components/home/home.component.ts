import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from 'src/app/services/api.service';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any = {};

  constructor(private apiService: ApiService) {}

  ngOnInit() {
    const map = L.map('map').setView([-33.433157, -70.6157], 17);

    this.llenarParkings(map);
  }

  private markerClick(e: L.LeafletEvent) {
    console.log('Marcador clicado:', e.target);
  }

  llenarParkings(map: L.Map | L.LayerGroup<any>) {
    this.apiService.getParking().subscribe((data) => {
      this.data = data;

      const CustomIcon = L.icon({
        iconUrl: '../../../assets/parking-icon.png',
        iconSize: [40, 40],
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      if (Array.isArray(data)) {
        this.data = data;

        this.data.forEach((item: any) => {
          if (item.estado) {
            L.marker([item.ubicacion.lon, item.ubicacion.lat], {
              icon: CustomIcon,
            })
              .addTo(map)
              .on('click', this.markerClick.bind(this));
          }
        });
      }
    });
  }
}
