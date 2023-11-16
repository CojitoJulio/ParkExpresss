import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
import { Parking } from '../models/parking';
import { Autos } from '../models/autos';
import { Tarjeta } from '../models/tarjeta';
import { Actualrent } from '../models/actualrent';
import { Boleta } from '../models/boleta';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private urlParking = 'http://localhost:3000/estacionamientos';
  private urlUsers = 'http://localhost:3000/usuarios';
  private urlCars = 'http://localhost:3000/autos';
  private urlCards = 'http://localhost:3000/tarjetas';
  private urlRent = 'http://localhost:3000/actualrent';
  private urlBoletas = 'http://localhost:3000/boletas';

  constructor(private http: HttpClient) {}

  // Parkings

  public getParking(): Observable<any> {
    return this.http.get<any>(this.urlParking);
  }

  public insertParking(parking: Parking): Observable<Parking> {
    return this.http.post<Parking>(this.urlParking, parking);
  }

  public updateParking(parkingtoUpdate: Parking): Observable<any> {
    return this.http.put(
      `${this.urlParking}/${parkingtoUpdate.id}`,
      parkingtoUpdate
    );
  }

  // Usuarios

  public getUsers(): Observable<any> {
    return this.http.get<any>(this.urlUsers);
  }

  public insertUser(user: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.urlUsers, user);
  }

  // Autos

  public getCars(): Observable<any> {
    return this.http.get<any>(this.urlCars);
  }

  public insertCar(car: Autos): Observable<Autos> {
    return this.http.post<Autos>(this.urlCars, car);
  }

  // Tarjetas

  public getCards(): Observable<any> {
    return this.http.get<any>(this.urlCards);
  }

  public insertCards(card: Tarjeta): Observable<Tarjeta> {
    return this.http.post<Tarjeta>(this.urlCards, card);
  }

  //Renta Actual

  public getActualRent(): Observable<any> {
    return this.http.get<any>(this.urlRent);
  }

  public insertActualRent(rent: Actualrent): Observable<Actualrent> {
    return this.http.post<Actualrent>(this.urlRent, rent);
  }

  public deleteRent(actualrentid: number): Observable<any> {
    const deleteUrl = `${this.urlRent}/${actualrentid}`;
    return this.http.delete(deleteUrl);
  }

  public updateRent(renttoUpdate: Actualrent): Observable<any> {
    return this.http.put(`${this.urlRent}/${renttoUpdate.id}`, renttoUpdate);
  }

  // Boletas

  public getBoletas(): Observable<any> {
    return this.http.get<any>(this.urlBoletas);
  }

  public insertBoleta(boleta: Boleta): Observable<Boleta> {
    return this.http.post<Boleta>(this.urlBoletas, boleta);
  }
}
