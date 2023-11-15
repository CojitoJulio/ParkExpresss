import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { Usuario } from 'src/app/models/usuario';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userEmail: string = '';
  userPass: string = '';

  users: Usuario[] = [];

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authservice: AuthService
  ) {}

  ngOnInit() {
    this.getusers();
  }

  isFormValid(): boolean {
    return !!this.userEmail && !!this.userPass;
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
        localStorage.setItem(
          'actualuser',
          JSON.stringify({
            email: this.userEmail,
            password: this.userPass,
            id: registro.id,
          })
        );
        this.authservice.login();

        this.router.navigate(['/dashboard']);
      } else {
        var alerta = document.getElementById('incorrecto');
        if (alerta) {
          alerta.style.display = 'block';
        }
      }
    });
  }
}
