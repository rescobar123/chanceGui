import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { OfertaI } from '../models/Oferta.Interface';
import { AlertI } from '../models/complements/AlertI';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

const URL: string = environment.ws + "OfertaService/"
@Injectable({
  providedIn: 'root'
})
export class OfertaService {

  constructor(private http:HttpClient,
    private auth:AuthService) { }

  postOferta(form: OfertaI): Observable<AlertI> {
    let direccion = URL + "insertar";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  postOfertaPublicar(form: OfertaI): Observable<AlertI> {
    let direccion = URL + "insertarOferta";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  getAllOfertasByIdUser(): Observable<OfertaI[]> {
    let direccion = URL + "ofertas";
    let user:any = this.auth.getUser();
    let idUserCache:string = user.usuario.idUsuario;
    const params = new HttpParams()
      .set('idUsuarioCreo', idUserCache);
    return this.http.get<OfertaI[]>(direccion, { params });
  }

  getAllOfertasByIdUserCreoOferta(): Observable<OfertaI[]> {
    let direccion = URL + "ofertasByIdUsuarioOferta";
    let user:any = this.auth.getUser();
    let idUserCache:string = user.usuario.idUsuario;
    const params = new HttpParams()
      .set('idUsuarioCreo', idUserCache);
    return this.http.get<OfertaI[]>(direccion, { params });
  }

  getAllOfertasPublic(tipoEmpleo:string): Observable<OfertaI[]> {
    let direccion = URL + "ofertasAll";
    const params = new HttpParams()
      .set('tipoEmpleo', tipoEmpleo);
    return this.http.get<OfertaI[]>(direccion, { params });
  }


  getAllOfertaByIdUsuario(idUsuarioCreoOferta:string): Observable<OfertaI[]> {
    let direccion = URL + "ofertasAllByIdUsuario";
    const params = new HttpParams()
      .set('idUsuarioCreoOferta', idUsuarioCreoOferta);
    return this.http.get<OfertaI[]>(direccion, { params });
  }

  deleteOferta(form: OfertaI): Observable<AlertI> {
    let direccion = URL + "delete";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  actualizarOferta(form: OfertaI): Observable<AlertI> {
    let direccion = URL + "actualizar";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
  }

  getAllOfertaById(idOferta:string): Observable<OfertaI> {
    let direccion = URL + "ofertaById";
    const params = new HttpParams()
      .set('idOferta', idOferta);
    return this.http.get<OfertaI>(direccion, { params });
  }
  
}
