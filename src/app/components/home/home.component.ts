import { Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { ApiService } from 'src/app/services/api.service';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import { Router } from '@angular/router';
import { Parking } from 'src/app/models/parking';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  data: any = {};
  actualid!: number;
  parkings: Parking[] = [];
  parkingselect!: Parking;

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    const map = L.map('map').setView([-33.433157, -70.6157], 17);

    this.llenarParkings(map);
  }
  actualparking: any = [];

  private markerClick(e: L.LeafletEvent) {
    this.actualparking = [];

    this.data.forEach((item: any) => {
      if (
        item.ubicacion.lon == e.target._latlng.lat &&
        item.ubicacion.lat == e.target._latlng.lng
      ) {
        this.actualparking.push(item);
      }
    });

    this.apiService.getUsers().subscribe((users) => {
      users.forEach((user: any) => {
        if (this.actualparking[0].iddueno == user.id) {
          this.actualparking.push(user);
        }
      });
    });

    console.log(this.actualparking);
  }

  get actualparkingExists(): boolean {
    return this.actualparking.length > 0;
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
              .bindPopup(item.direccion)
              .on('click', this.markerClick.bind(this));
          }
        });
      }
    });
  }

  getuser() {
    var actualuser = localStorage.getItem('actualuser');
    if (actualuser) {
      var actualidid = JSON.parse(actualuser).id;
      this.actualid = actualidid;
    }
  }

  getparking(parkid: number) {
    this.apiService.getParking().subscribe((parkings: Parking[]) => {
      this.parkings = parkings;
      this.parkings.forEach((park) => {
        if (park.id == parkid) {
          this.parkingselect = park;
        }
      });
    });
  }

  rent(actualpark: number) {
    console.log('hola?');
    this.getuser();

    this.getparking(actualpark);

    if (this.actualid == this.parkingselect.iddueno) {
      const inpago = document.getElementById('inpaga');
      if (inpago) {
        inpago.style.display = 'block';
      }
      return;
    }

    var rent = localStorage.getItem('idparkselected');
    if (rent) {
      this.router.navigate(['/rentpay']);
    } else {
      localStorage.setItem(
        'idparkselected',
        JSON.stringify({
          id: actualpark,
        })
      );
      this.router.navigate(['/rentselection']);
    }
  }
}
