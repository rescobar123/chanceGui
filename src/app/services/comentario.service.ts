import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ComentarioI } from '../models/Comentario.Interface';
import { AlertI } from '../models/complements/AlertI';

const URL: string = environment.ws + "ComentarioService/"
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  constructor(private http: HttpClient) { }

  getAllComentarios(idPropuesta: any, idOferta:any): Observable<ComentarioI[]> {
    let direccion = URL + "comentarios";
    const params = new HttpParams()
    .set('idPropuesta', idPropuesta)
    .set('idOferta', idOferta);
    return this.http.get<ComentarioI[]>(direccion, {params});
  }

  postComentario(form: ComentarioI): Observable<AlertI> {
    form.idComentario = form.propuesta.idPropuesta;
    let direccion = URL + "insertar";
    console.log(form);
    return this.http.put<AlertI>(direccion, form);
  }
}
