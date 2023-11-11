import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { Router } from '@angular/router';
import { Autos } from 'src/app/models/autos';

@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css'],
})
export class AddcarComponent implements OnInit {
  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.createForm();
  }

  // Variables

  miFormulario!: FormGroup;
  cars: Autos[] = [];
  users: Usuario[] = [];
  actualid!: number;

  // Validaciones

  get brandNoValido() {
    return (
      this.miFormulario.get('carBrand')?.invalid &&
      this.miFormulario.get('carBrand')?.touched
    );
  }

  get modelNoValido() {
    return (
      this.miFormulario.get('carModel')?.invalid &&
      this.miFormulario.get('carModel')?.touched
    );
  }

  get patenteNoValido() {
    return (
      this.miFormulario.get('carPatente')?.invalid &&
      this.miFormulario.get('carPatente')?.touched
    );
  }

  get yearNoValido() {
    return (
      this.miFormulario.get('carAnio')?.invalid &&
      this.miFormulario.get('carAnio')?.touched
    );
  }

  // OnInit

  ngOnInit() {
    this.getCars();
    this.getusers();
  }

  // Funciones de Grabado y todo eso

  guardar() {
    console.log(this.miFormulario);

    if (this.miFormulario.invalid) {
      return Object.values(this.miFormulario.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      this.register();
    }
  }

  register() {
    const brand = this.miFormulario.get('carBrand')?.value;
    const model = this.miFormulario.get('carModel')?.value;
    const patente = this.miFormulario.get('carPatente')?.value;
    const year = this.miFormulario.get('carAnio')?.value;

    if (brand && model && patente && year) {
      const selectcar: Autos = {
        marca: brand,
        modelo: model,
        patente: patente,
        anio: year,
        idduenio: this.actualid,
      };

      this.apiService.insertCar(selectcar).subscribe((data) => {
        this.cars.push(data as Autos);
      });
    }

    this.router.navigate(['/admincar']);
  }

  // Funciones de localStorage

  getCars() {
    this.apiService.getCars().subscribe((Autos) => {
      this.cars = Autos;
    });
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios) => {
      this.cars = usuarios;
      // console.log(this.users);
      var actualuser = localStorage.getItem('actualuser');
      if (actualuser) {
        var actualidid = JSON.parse(actualuser).id;
        this.actualid = actualidid;
      }
    });
  }

  // Funciones de Formulario y Validaciones

  createForm() {
    this.miFormulario = this.fb.group({
      carBrand: ['', [Validators.required, Validators.minLength(2)]],
      carModel: ['', Validators.required],
      carPatente: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          Validators.pattern(/^(?:[a-zA-Z]{4}\d{2}|[a-zA-Z]{2}\d{4})$/),
        ],
      ],
      carAnio: [
        '',
        [Validators.required, Validators.minLength(4), Validators.min(1950)],
      ],
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

  soloNumerosYLetras(event: any) {
    const tecla = event.key;
    if (
      !/^[0-9a-zA-Z]$/.test(tecla) && // Solo números y letras
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
    const brand = this.miFormulario.get('carBrand')?.value;
    const model = this.miFormulario.get('carModel')?.value;
    const patente = this.miFormulario.get('carPatente')?.value;
    const year = this.miFormulario.get('carAnio')?.value;

    return !!brand && !!model && !!patente && !!year;
  }
}
