import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmpleoI } from '../models/Empleo.Interface';
import { TipoEmpleoI } from '../models/complements/TipoEmpleoI';
import { HttpClient, HttpParams } from '@angular/common/http';
import listaMunicipios from 'src/assets/deptosMunicipiosGT.json';
import { environment } from '../../environments/environment';


const URL: string = environment.ws + "tipoEmpleo/";
const URL_LUGARES: string = "http://localhost:8100/assets/";
@Injectable({
  providedIn: 'root'
})
export class RecursosService {

  listadoLugares: any = listaMunicipios;

  constructor(private http: HttpClient) { }



  //crud grados
  getAllTiposEmpleos(): Observable<TipoEmpleoI[]> {
    let direccion = URL + "listar";
    return this.http.get<TipoEmpleoI[]>(direccion);
  }

  getTipoEmpleoById(tipoEmpleo: string): Observable<TipoEmpleoI[]> {
    let direccion = URL + "tipoEmpleo";
    const params = new HttpParams()
      .set('idTipoEmpleo', tipoEmpleo);
    return this.http.get<TipoEmpleoI[]>(direccion, { params });
  }

  getAllLugares() {
    return this.listadoLugares;
  }

  resizeImage(img) {
    let quality = 23500;
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    //----- origin draw ---
    ctx.drawImage(img, 0, 0, img.width, img.height);

    //------ reduced draw ---
    var canvas2 = document.createElement("canvas");
    canvas2.width = img.width * quality;
    canvas2.height = img.height * quality;
    var ctx2 = canvas2.getContext("2d");
    ctx2.drawImage(canvas, 0, 0, img.width * quality, img.height * quality);

    // -- back from reduced draw ---
    ctx.drawImage(canvas2, 0, 0, img.width, img.height);

    var dataURL = canvas.toDataURL("image/png");
    return dataURL;
    // return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
  }

}
