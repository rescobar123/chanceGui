import { Injectable } from '@angular/core';
import { EmpleoI } from '../models/Empleo.Interface';
import { AlertI } from '../models/complements/AlertI';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';


const URL: string = "http://192.168.0.12:9090/backendChance/WS/propuesta/"
@Injectable({
  providedIn: 'root'
})
export class PropuestaService {

  constructor(private http: HttpClient) { }

  postPropuesta(form: EmpleoI): Observable<AlertI> {
    let direccion = URL + "insertar";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  deletePropuesta(form: EmpleoI): Observable<AlertI> {
    let direccion = URL + "delete";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  updatePropuesta(form: EmpleoI): Observable<AlertI> {
    let direccion = URL + "actualizar";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  getAllPropuestasByIdUser(idUser: string): Observable<EmpleoI[]> {
    let direccion = URL + "listar";
    const params = new HttpParams()
      .set('idUser', idUser);
    return this.http.get<EmpleoI[]>(direccion, { params });
  }

  getPropuestaById(idPropuesta: any): Observable<EmpleoI[]> {
    let direccion = URL + "propById";
    const params = new HttpParams()
      .set('idPropuesta', idPropuesta);
    return this.http.get<EmpleoI[]>(direccion, { params });
  }

  getAllPropuestasWithUserTipoEmpleo(): Observable<EmpleoI[]> {
    let direccion = URL + "propCreadas";
    return this.http.get<EmpleoI[]>(direccion);
  }
}
