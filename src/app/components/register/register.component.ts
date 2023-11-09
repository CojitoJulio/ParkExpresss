import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private apiService: ApiService) {}

  userName: string = '';
  userPassword: string = '';
  userEmail: string = '';
  userPhone: number = 9;

  isButtonDisabled = false;

  users: Usuario[] = [];

  ngOnInit() {
    this.getusers();
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
