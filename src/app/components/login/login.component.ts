import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userEmail: string = '';
  userPass: string = '';

  users: Usuario[] = [];

  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.getusers();
  }

  getusers() {
    this.apiService.getUsers().subscribe((usuarios) => {
      this.users = usuarios;
      console.log(this.users);
    });
  }

  ingresar() {
    this.users.forEach((registro) => {
      if (
        this.userEmail == registro.email &&
        this.userPass == registro.password
      ) {
        console.log('ta bien');

        localStorage.setItem(
          'actualuser',
          JSON.stringify({ email: this.userEmail, password: this.userPass })
        );

        this.router.navigate(['/dashboard']);
      } else {
        console.log(' ta malo');
      }
    });
  }
}
