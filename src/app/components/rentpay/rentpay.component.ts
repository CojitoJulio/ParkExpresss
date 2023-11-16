import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { payGuard } from 'src/app/guards/pay.guard';
import { Actualrent } from 'src/app/models/actualrent';
import { Autos } from 'src/app/models/autos';
import { Boleta } from 'src/app/models/boleta';
import { Parking } from 'src/app/models/parking';
import { Tarjeta } from 'src/app/models/tarjeta';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';

type AutosConSeleccionado = Tarjeta & { seleccionado: boolean };

@Component({
  selector: 'app-rentpay',
  templateUrl: './rentpay.component.html',
  styleUrls: ['./rentpay.component.css'],
})
export class RentpayComponent implements OnInit {
  constructor(
    private apiservice: ApiService,
    private router: Router,
    private fb: FormBuilder,
    private payGuard: payGuard
  ) {}

  cards: Tarjeta[] = [];
  cardSeleccionada!: AutosConSeleccionado;
  miFormulario!: FormGroup;
  cardSelectedId!: number;
  Usuarios: Usuario[] = [];
  actualid!: number;
  useractual!: Usuario;
  rents: Actualrent[] = [];
  //Boleta
  actualrent!: Actualrent;
  actualparkid!: number;
  tiempototal!: number;
  duenio!: Usuario;
  parkings: Parking[] = [];
  actualparking!: Parking;
  horatermino!: string;
  total!: number;
  boletas: Boleta[] = [];
  tarjetaactual!: Tarjeta;
  cars: Autos[] = [];
  autoselect!: Autos;

  ngOnInit() {
    this.getActualRent();
    this.getBoletas();
    this.getuseractual();
    this.getcards();
    this.createForm();
  }

  selectCard(card: any) {
    this.cardSeleccionada = this.cardSeleccionada === card ? null : card;
    console.log(this.cardSeleccionada);
  }

  getuseractual() {
    this.getuser();
    this.apiservice.getUsers().subscribe((users: Usuario[]) => {
      this.Usuarios = users;
      this.Usuarios.forEach((user) => {
        if (user.id == this.actualid) {
          this.useractual = user;
        }
      });
    });
  }

  getduenio() {
    this.Usuarios.forEach((user) => {
      if (this.actualrent.idduenio == user.id) {
        this.duenio = user;
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

  getcards() {
    this.apiservice.getCards().subscribe((tarjetas: Tarjeta[]) => {
      this.cards = tarjetas
        .filter((card) => card.idduenio === this.actualid)
        .map((card) => ({ ...card, seleccionado: false }));
    });
  }

  createForm() {
    this.miFormulario = this.fb.group({
      cardSelect: ['', [Validators.required]],
    });
  }

  isFormValid(): boolean {
    const select = this.miFormulario.get('cardSelect')?.value;
    return !!select;
  }

  //Cosas de la Boleta

  generateBoleta() {
    const pago = this.miFormulario.get('cardSelect')?.value;
    this.getcard();
    this.getduenio();

    var vehiculo = this.autoselect.marca + ' ' + this.autoselect.modelo;

    console.log(this.total);

    if (pago) {
      const boletafinal: Boleta = {
        duenio: this.duenio.nombre,
        cliente: this.useractual.nombre,
        auto: vehiculo,
        tarjeta: this.tarjetaactual.nrotarjeta,
        parking: this.actualparking.direccion,
        horainicial: this.actualrent.horainicial,
        horatermino: this.horatermino,
        fecha: this.actualrent.fecha,
        tiempototal: this.tiempototal,
        total: this.total,
        deuda: false,
      };

      this.apiservice.insertBoleta(boletafinal).subscribe((data) => {
        this.boletas.push(data as Boleta);
      });
    }

    localStorage.removeItem('idparkselected');

    this.deleteRent(this.actualrent.id);

    alert('Se completó la transacción');

    this.payGuard.PagoRealizado();

    this.router.navigate(['/home']);
  }

  deleteRent(rentid: number | undefined) {
    if (rentid !== undefined) {
      this.apiservice.deleteRent(rentid).subscribe((response) => {
        console.log('Se borró la renta con ID:', rentid);
      });
    } else {
      console.error('Error: No se puede eliminar renta, el ID es undefined.');
    }
  }

  getactualpark() {
    var actualpark = localStorage.getItem('idparkselected');
    if (actualpark) {
      var actualparkidd = JSON.parse(actualpark).id;
      this.actualparkid = actualparkidd;
    }
  }

  calcs() {
    this.total = this.actualrent.total;
    this.tiempototal = this.actualrent.tiempo;
    this.horatermino = this.actualrent.horatermino;
  }

  getparking() {
    this.apiservice.getParking().subscribe((parkings: Parking[]) => {
      this.parkings = parkings;
      this.parkings.forEach((park) => {
        if (park.id == this.actualparkid) {
          this.actualparking = park;
        }
      });
    });
  }

  getBoletas() {
    this.apiservice.getBoletas().subscribe((boletitas: Boleta[]) => {
      this.boletas = boletitas;
    });
  }

  getcard() {
    const cardId = this.cardSelectedId;

    if (cardId !== undefined) {
      this.tarjetaactual = this.cards.find(
        (card) => card.id === cardId
      ) as Tarjeta;
      console.log(this.tarjetaactual);
    } else {
      console.warn(
        'this.cardSeleccionada.id es undefined. No se puede buscar la tarjeta.'
      );
    }
  }

  getActualRent() {
    this.getactualpark();
    this.getparking();
    this.apiservice.getActualRent().subscribe((rents: Actualrent[]) => {
      this.rents = rents;

      this.rents.forEach((rent) => {
        if (rent.idparking == this.actualparkid) {
          this.actualrent = rent;
          this.calcs();
          this.getCar();
        }
      });
    });
  }

  getCar() {
    this.apiservice.getCars().subscribe((cars: Autos[]) => {
      this.cars = cars;
      this.cars.forEach((car) => {
        console.log(this.actualrent.idauto);
        console.log(car);
        if (this.actualrent.idauto == car.id) {
          this.autoselect = car;
          console.log(this.autoselect);
        }
      });
    });
  }
}
