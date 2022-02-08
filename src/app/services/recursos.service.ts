import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleoI } from '../models/Empleo.Interface';
import { TipoEmpleoI } from '../models/complements/TipoEmpleoI';
import { HttpClient, HttpParams } from '@angular/common/http';
import listaMunicipios from 'src/assets/deptosMunicipiosGT.json';


const URL:string = "http://192.168.0.12:9090/backendChance/WS/tipoEmpleo/"
const URL_LUGARES:string = "http://localhost:8100/assets/";
@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  listadoLugares:any = listaMunicipios;

  constructor(private http:HttpClient) { }

  
  
 //crud grados
 getAllTiposEmpleos():Observable<TipoEmpleoI[]>{
  let direccion = URL + "listar";
  return this.http.get<TipoEmpleoI[]>(direccion);
 }

 getTipoEmpleoById(tipoEmpleo: string):Observable<TipoEmpleoI[]>{
  let direccion = URL + "tipoEmpleo";
  const params = new HttpParams()
  .set('idTipoEmpleo' , tipoEmpleo);
  return this.http.get<TipoEmpleoI[]>(direccion, { params});
 } 

 getAllLugares(){
  return this.listadoLugares;
 }
}