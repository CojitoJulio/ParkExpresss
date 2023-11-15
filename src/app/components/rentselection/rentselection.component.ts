import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Actualrent } from 'src/app/models/actualrent';
import { Autos } from 'src/app/models/autos';
import { Parking } from 'src/app/models/parking';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';

type AutosConSeleccionado = Autos & { seleccionado: boolean };

@Component({
  selector: 'app-rentselection',
  templateUrl: './rentselection.component.html',
  styleUrls: ['./rentselection.component.css'],
})
export class RentselectionComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  cars: Autos[] = [];
  carsactual: Autos[] = [];
  parkings: Parking[] = [];
  Usuarios: Usuario[] = [];
  Rentas: Actualrent[] = [];
  actualid!: number;
  carSelectedId!: number;
  autoSeleccionado!: AutosConSeleccionado;
  actualparkselectedid!: number;
  parkingselect!: Parking;
  useractual!: Usuario;
  miFormulario!: FormGroup;

  ngOnInit() {
    this.getuser();
    this.getCars();
    this.getpark();
    this.getparkmero();
    this.getuseractual();
    this.createForm();
  }

  selectCar(car: any) {
    this.autoSeleccionado = this.autoSeleccionado === car ? null : car;
    console.log('este es el auto: ' + this.autoSeleccionado);
  }

  getuser() {
    var actualuser = localStorage.getItem('actualuser');
    if (actualuser) {
      var actualidid = JSON.parse(actualuser).id;
      this.actualid = actualidid;
    }
  }

  getuseractual() {
    this.apiService.getUsers().subscribe((users: Usuario[]) => {
      this.Usuarios = users;
      this.Usuarios.forEach((user) => {
        if (user.id == this.actualid) {
          this.useractual = user;
        }
      });
    });
  }

  getCars() {
    this.apiService.getCars().subscribe((autos: Autos[]) => {
      this.carsactual = autos
        .filter((car) => car.idduenio === this.actualid)
        .map((car) => ({ ...car, seleccionado: false }));
    });
  }

  formatPatente(patente: string): string {
    return (
      patente.slice(0, 2) + '·' + patente.slice(2, 4) + '·' + patente.slice(4)
    );
  }

  private getpark() {
    var actualparkselected = localStorage.getItem('idparkselected');
    if (actualparkselected) {
      var actualparkselectedidid = JSON.parse(actualparkselected).id;
      this.actualparkselectedid = actualparkselectedidid;
    }
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

  isFormValid(): boolean {
    const select = this.miFormulario.get('carSelect')?.value;
    return !!select;
  }

  createForm() {
    this.miFormulario = this.fb.group({
      carSelect: ['', [Validators.required]],
    });
  }

  confirm() {
    var fecha = new Date();
    var horaactual =
      fecha.getHours() + ':' + fecha.getMinutes() + ':' + fecha.getSeconds();
    var fechaactual =
      fecha.getDate() +
      '-' +
      (fecha.getMonth() + 1) +
      '-' +
      fecha.getFullYear();
    var tiempo = fecha.getTime();

    this.insertRent(horaactual, fechaactual, tiempo);

    localStorage.setItem(
      'idparkselected',
      JSON.stringify({
        id: this.actualparkselectedid,
        hora: horaactual,
        fecha: fechaactual,
      })
    );
    this.router.navigate(['/rentprocess']);
  }

  insertRent(hora: string, fecha: string, tiempo: number) {
    var carid: number = this.autoSeleccionado.id ?? 0;

    const rent: Actualrent = {
      idduenio: this.parkingselect.iddueno,
      idcliente: this.actualid,
      idparking: this.actualparkselectedid,
      idauto: carid,
      horainicial: hora,
      fecha: fecha,
      tiempo: tiempo,
      deuda: true,
    };

    this.apiService.insertActualRent(rent).subscribe((data) => {
      this.Rentas.push(data as Actualrent);
    });
  }

  getRent() {
    this.apiService.getActualRent().subscribe((rents) => {
      this.Rentas = rents;
    });
  }
}
