import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  miFormulario!: FormGroup;

  constructor(private apiService: ApiService, private fb: FormBuilder) {}

  userName: string = '';
  userPassword: string = '';
  userEmail: string = '';
  userPhone: number = 9;

  isButtonDisabled = false;

  users: Usuario[] = [];

  ngOnInit() {
    this.getusers();

    this.miFormulario = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
    });
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios) => {
      this.users = usuarios;
      console.log(this.users);
    });
  }

  register() {
    if (this.userEmail && this.userName && this.userPassword) {
      const user: Usuario = {
        email: this.userEmail,
        nombre: this.userName,
        telefono: this.userPhone,
        password: this.userPassword,
      };

      this.apiService.insertUser(user).subscribe((data) => {
        this.users.push(data as Usuario);
        this.isButtonDisabled = true;
      });
    }
  }
}
