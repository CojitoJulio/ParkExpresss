import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlParking = 'http://localhost:3000/estacionamientos';
  private urlUsers = 'http://localhost:3000/usuarios';
  private urlCars = 'http://localhost:3000/autos';

  constructor(private http: HttpClient) {}

  public getParking(): Observable<any> {
    return this.http.get<any>(this.urlParking);
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.urlUsers);
  }

  public getCars(): Observable<any> {
    return this.http.get<any>(this.urlCars);
  }
}
