import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  miFormulario!: FormGroup;

  constructor(
    private apiService: ApiService,
    private fb: FormBuilder,
    private router: Router,
    private authservice: AuthService
  ) {
    this.createForm();
  }

  // NoValidos

  get nombreNoValido() {
    return (
      this.miFormulario.get('name')?.invalid &&
      this.miFormulario.get('name')?.touched
    );
  }

  get correoNoValido() {
    return (
      this.miFormulario.get('email')?.invalid &&
      this.miFormulario.get('email')?.touched
    );
  }

  get telefonoNoValido() {
    return (
      this.miFormulario.get('phone')?.invalid &&
      this.miFormulario.get('phone')?.touched
    );
  }

  get passNoValido() {
    return (
      this.miFormulario.get('pass')?.invalid &&
      this.miFormulario.get('pass')?.touched
    );
  }

  get pass2NoValido() {
    return (
      this.miFormulario.get('pass2')?.invalid &&
      this.miFormulario.get('pass2')?.touched
    );
  }

  // Funcion para solo numeros

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

  // Variables varias

  isButtonDisabled = false;

  users: Usuario[] = [];

  // Oninit

  ngOnInit() {
    this.getusers();
  }

  createForm() {
    this.miFormulario = this.fb.group(
      {
        name: ['', Validators.required],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        phone: [
          '',
          [
            Validators.required,
            Validators.maxLength(9),
            Validators.minLength(9),
          ],
        ],
        pass: ['', [Validators.required, Validators.minLength(6)]],
        pass2: ['', Validators.required],
      },
      {
        Validators: this.samePassword('pass', 'pass2'),
      }
    );
  }

  guardar() {
    console.log(this.miFormulario);

    this.passNotvalid();

    if (this.miFormulario.invalid) {
      return Object.values(this.miFormulario.controls).forEach((control) => {
        control.markAllAsTouched();
      });
    } else {
      // this.register();
    }
  }

  isFormValid(): boolean {
    const name = this.miFormulario.get('name')?.value;
    const email = this.miFormulario.get('email')?.value;
    const phone = this.miFormulario.get('phone')?.value;
    const pass1 = this.miFormulario.get('pass')?.value;
    const pass2 = this.miFormulario.get('pass2')?.value;

    return !!name && !!email && !!phone && !!pass1 && !!pass2;
  }

  samePassword(pass1: string, pass2: string) {
    return (FormGroup: FormGroup) => {
      const pass1Control = FormGroup.get(pass1);
      const pass2Control = FormGroup.get(pass2);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ notSame: true });
      }
    };
  }

  passNotvalid() {
    const pass1 = this.miFormulario.get('pass')?.value;
    const pass2 = this.miFormulario.get('pass2')?.value;

    if (pass1 !== pass2) {
      return true;
    } else {
      return false;
    }
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios) => {
      this.users = usuarios;
    });
  }

  register() {
    const name = this.miFormulario.get('name')?.value;
    const email = this.miFormulario.get('email')?.value;
    const phone = this.miFormulario.get('phone')?.value;
    const pass1 = this.miFormulario.get('pass')?.value;

    if (email && name && pass1 && phone) {
      const user: Usuario = {
        email: email,
        nombre: name,
        telefono: phone,
        password: pass1,
      };

      this.apiService.insertUser(user).subscribe((data) => {
        this.users.push(data as Usuario);
      });
    }
    this.authservice.login();

    localStorage.setItem(
      'actualuser',
      JSON.stringify({ email: email, nombre: name })
    );

    this.router.navigate(['/creditcard']);
  }
}
