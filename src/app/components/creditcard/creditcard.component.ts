import { Component } from '@angular/core';

@Component({
  selector: 'app-creditcard',
  templateUrl: './creditcard.component.html',
  styleUrls: ['./creditcard.component.css'],
})
export class CreditcardComponent {
  cardNumber: string = '';
  cardName: string = '';
  cardMonth: string = '';
  cardYear: string = '';
  cardCVV: string = '';

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
}
