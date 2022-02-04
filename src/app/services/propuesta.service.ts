import { Injectable } from '@angular/core';
import { EmpleoI } from '../models/Empleo.Interface';
import { AlertI } from '../models/complements/AlertI';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


const URL:string = "http://192.168.0.12:9090/backendChance/WS/propuesta/"
@Injectable({
  providedIn: 'root'
})
export class PropuestaService {

  constructor(private http:HttpClient) { }

  postPropuesta(form:EmpleoI):Observable<AlertI>{
    let direccion = URL + "insertar";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
   }
}
