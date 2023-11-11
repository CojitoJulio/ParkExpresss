import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import 'leaflet-control-geocoder';
import 'leaflet-control-geocoder/dist/Control.Geocoder.js';
import { Parking } from 'src/app/models/parking';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-addparking',
  templateUrl: './addparking.component.html',
  styleUrls: ['./addparking.component.css'],
})
export class AddparkingComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  // Variables

  data: any = {};
  miFormulario!: FormGroup;
  parkings: Parking[] = [];
  users: Usuario[] = [];
  actualid!: number;
  latf!: number;
  lonf!: number;

  // Validaciones

  get nroNoValido() {
    return (
      this.miFormulario.get('parkingNro')?.invalid &&
      this.miFormulario.get('parkingNro')?.touched
    );
  }

  get priceNoValido() {
    return (
      this.miFormulario.get('parkingPrice')?.invalid &&
      this.miFormulario.get('parkingPrice')?.touched
    );
  }

  // OnInit

  ngOnInit() {
    this.getParkings();
    this.getusers();
    const map = L.map('map').setView([-33.433157, -70.6157], 17);

    let marker: L.Marker | null = null;

    this.CrearMapa(map);

    const CustomIcon = L.icon({
      iconUrl: '../../../assets/parking-icon.png',
      iconSize: [40, 40],
    });

    const markerOptions = {
      icon: CustomIcon,
      draggable: true,
    };

    map.on('click', (e) => {
      if (marker) {
        map.removeLayer(marker);
      }

      marker = L.marker([e.latlng.lat, e.latlng.lng], markerOptions).addTo(map);

      if (marker) {
        const markerLatLng = marker.getLatLng();
        this.latf = markerLatLng.lat;
        this.lonf = markerLatLng.lng;
      }
    });
  }

  // Funciones de Grabado y todo eso

  guardar() {
    console.log(this.miFormulario);

    if (this.latf) {
      var mapa = document.getElementById('map');
      mapa?.classList.remove('falta');
      this.register();
    } else {
      var mapa = document.getElementById('map');
      mapa?.classList.add('falta');
    }
  }

  register() {
    const nro = this.miFormulario.get('parkingNro')?.value;
    const price = this.miFormulario.get('parkingPrice')?.value;
    const desc = this.miFormulario.get('parkingDesc')?.value;

    if (nro && price) {
      const parkingsite: Parking = {
        iddueno: this.actualid,
        ubicacion: { lon: this.latf, lat: this.lonf },
        estado: false,
        descripcion: desc,
        precio: price,
        nroparking: nro,
      };

      this.apiService.insertParking(parkingsite).subscribe((data) => {
        this.parkings.push(data as Parking);
      });
    }

    this.router.navigate(['/adminparking']);
  }

  // Funciones de localStorage

  getParkings() {
    this.apiService.getParking().subscribe((Parking) => {
      this.parkings = Parking;
      console.log(this.parkings);
    });
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

  // Funciones del Mapa

  CrearMapa(map: L.Map | L.LayerGroup<any>) {
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);
  }

  // Funciones de Formulario y Validaciones

  createForm() {
    this.miFormulario = this.fb.group({
      parkingNro: ['', Validators.required],
      parkingPrice: ['', Validators.required],
      parkingDesc: ['', Validators.required],
    });
  }

  soloNumeros(event: any) {
    const tecla = event.key;
    if (
      !/^[0-9]$/.test(tecla) &&
      tecla !== 'Backspace' &&
      tecla !== 'Delete' &&
      tecla !== 'ArrowLeft' &&
      tecla !== 'ArrowRight' &&
      tecla !== 'Tab'
    ) {
      event.preventDefault();
    }
  }

  isFormValid(): boolean {
    const nro = this.miFormulario.get('parkingNro')?.value;
    const price = this.miFormulario.get('parkingPrice')?.value;

    return !!nro && !!price;
  }
}
