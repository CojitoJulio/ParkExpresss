import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class payGuard implements CanActivate {
  private pagado = true;

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (this.pagado) {
      return true;
    } else {
      this.router.navigate(['/rentpay']);
      return false;
    }
  }

  PagoRealizado() {
    this.pagado = true;
  }

  PagoNoRealizado() {
    this.pagado = false;
  }
}
