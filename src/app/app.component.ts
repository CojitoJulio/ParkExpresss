import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoggedIn = false;

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {
    this.authservice.isLogged$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });

    console.log(this.isLoggedIn);
  }

  logout() {
    localStorage.removeItem('actualuser');
    this.router.navigate(['/main']);
    this.authservice.logout();
  }
}
