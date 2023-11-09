import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Parking } from '../models/parking';
import { Autos } from '../models/autos';

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

  public insertParking(parking: Parking): Observable<Parking> {
    return this.http.post<Parking>(this.urlUsers, parking);
  }

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.urlUsers);
  }

  public insertUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlUsers, user);
  }

  public getCars(): Observable<any> {
    return this.http.get<any>(this.urlCars);
  }

  public insertCar(car: Autos): Observable<Autos> {
    return this.http.post<Autos>(this.urlUsers, car);
  }
}
