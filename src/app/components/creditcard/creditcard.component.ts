import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { Tarjeta } from 'src/app/models/tarjeta';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/usuario';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css'],
})
export class CreditcardComponent implements OnInit {
  cardNumber: string = '';
  cardName: string = '';
  cardMonth: string = '';
  cardYear: string = '';
  cardCVV: string = '';

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {
    this.createForm();
  }

  get nroNoValido() {
    return (
      this.miFormulario.get('cardNumber')?.invalid &&
      this.miFormulario.get('cardNumber')?.touched
    );
  }

  get nameNoValido() {
    return (
      this.miFormulario.get('cardName')?.invalid &&
      this.miFormulario.get('cardName')?.touched
    );
  }

  get monthNoValido() {
    return (
      this.miFormulario.get('cardMonth')?.invalid &&
      this.miFormulario.get('cardMonth')?.touched
    );
  }

  get yearNoValido() {
    return (
      this.miFormulario.get('cardYear')?.invalid &&
      this.miFormulario.get('cardYear')?.touched
    );
  }

  get cvvNoValido() {
    return (
      this.miFormulario.get('cardCVV')?.invalid &&
      this.miFormulario.get('cardCVV')?.touched
    );
  }

  miFormulario!: FormGroup;

  cards: Tarjeta[] = [];
  users: Usuario[] = [];

  actualid!: number;
  isButtonDisabled = false;

  ngOnInit() {
    this.getCards();
    this.getusers();
  }

  createForm() {
    this.miFormulario = this.fb.group({
      cardNumber: ['', [Validators.required, Validators.minLength(16)]],
      cardName: ['', [Validators.required, Validators.minLength(5)]],
      cardMonth: ['', Validators.required],
      cardYear: ['', Validators.required],
      cardCVV: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  guardar() {
    console.log(this.miFormulario);

    if (this.miFormulario.invalid) {
      return Object.values(this.miFormulario.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      // this.getusers();
      // this.register();
    }
  }

  isFormValid(): boolean {
    const nro = this.miFormulario.get('cardNumber')?.value;
    const name = this.miFormulario.get('cardName')?.value;
    const month = this.miFormulario.get('cardMonth')?.value;
    const year = this.miFormulario.get('cardYear')?.value;
    const cvv = this.miFormulario.get('cardCVV')?.value;

    return !!nro && !!name && !!month && !!year && !!cvv;
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

  getCards() {
    this.apiService.getCards().subscribe((tarjetas) => {
      this.cards = tarjetas;
      console.log(this.cards);
    });
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios) => {
      this.users = usuarios;
      this.cargarlocal();
      // console.log(this.users);
      var actualuser = localStorage.getItem('actualuser');
      if (actualuser) {
        var actualidid = JSON.parse(actualuser).id;
        this.actualid = actualidid;
      }
    });
  }

  cargarlocal() {
    var actualuser = localStorage.getItem('actualuser');
    if (actualuser) {
      var actualemail = JSON.parse(actualuser).email;

      this.users.forEach((user) => {
        if (user.email == actualemail) {
          localStorage.setItem(
            'actualuser',
            JSON.stringify({
              email: user.email,
              nombre: user.nombre,
              id: user.id,
            })
          );
        }
      });
    }
  }

  register() {
    const nro = this.miFormulario.get('cardNumber')?.value;
    const name = this.miFormulario.get('cardName')?.value;
    const month = this.miFormulario.get('cardMonth')?.value;
    const year = this.miFormulario.get('cardYear')?.value;
    const cvv = this.miFormulario.get('cardCVV')?.value;

    if (nro && name && month && year && cvv) {
      const card: Tarjeta = {
        nrotarjeta: nro,
        titular: name,
        mes: month,
        anio: year,
        cvv: cvv,
        idduenio: this.actualid,
      };

      this.apiService.insertCards(card).subscribe((data) => {
        this.cards.push(data as Tarjeta);
        this.isButtonDisabled = true;
      });
    }

    this.authservice.login();
    this.router.navigate(['/dashboard']);
  }
}
