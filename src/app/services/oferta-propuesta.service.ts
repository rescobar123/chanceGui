import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OfertaPropuestaI } from '../models/OfertaPropuesta';
import { ComentarioI } from '../models/Comentario.Interface';

const URL: string = environment.ws + "ofertaPropuestaService/";
@Injectable({
  providedIn: 'root'
})

export class OfertaPropuestaService {

  constructor(private http: HttpClient) { }

  getAllPropuestasByOfer(idOferta: any): Observable<OfertaPropuestaI[]> {
    let direccion = URL + "propuestasByOfer";
    const params = new HttpParams()
      .set('idOferta', idOferta);
    return this.http.get<ComentarioI[]>(direccion, { params });
  }

}
