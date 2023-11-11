import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Parking } from '../models/parking';
import { Autos } from '../models/autos';
import { Tarjeta } from '../models/tarjeta';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlParking = 'http://localhost:3000/estacionamientos';
  private urlUsers = 'http://localhost:3000/usuarios';
  private urlCars = 'http://localhost:3000/autos';
  private urlCards = 'http://localhost:3000/tarjetas';

  constructor(private http: HttpClient) {}

  public getParking(): Observable<any> {
    return this.http.get<any>(this.urlParking);
  }

  public insertParking(parking: Parking): Observable<Parking> {
    return this.http.post<Parking>(this.urlParking, parking);
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
    return this.http.post<Autos>(this.urlCars, car);
  }

  public getCards(): Observable<any> {
    return this.http.get<any>(this.urlCards);
  }

  public insertCards(card: Tarjeta): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(this.urlCards, card);
  }

  public updateParking(parkingtoUpdate: Parking): Observable<any> {
    return this.http.put(
      `${this.urlParking}/${parkingtoUpdate.id}`,
      parkingtoUpdate
    );
  }
}
