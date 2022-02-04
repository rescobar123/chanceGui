import { Injectable, ɵɵsetComponentScope } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, BehaviorSubject, from, of } from 'rxjs';
import { take, map, switchMap } from 'rxjs/operators';
import { AlertI } from '../models/complements/AlertI';
import { UsuarioI } from '../models/Usuario.Interface';

const helper = new JwtHelperService();
const TOKEN_KEY = 'jwt-token';
const URL:string = "http://192.168.0.12:9090/backendChance/WS/Usuario/"

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public user: Observable<any>;
  private userData = new BehaviorSubject(null);

  constructor(private storage: Storage, private http: HttpClient,
    private plt: Platform, private router: Router) {
      this.loadStoredToken();
  }

  insertarUsuario(form:UsuarioI):Observable<AlertI>{
    let direccion = URL + "insertar";
    console.log(direccion);
    return this.http.put<AlertI>(direccion, form);
   }

  loadStoredToken() {
    let platformObs = from(this.plt.ready());

    this.user = platformObs.pipe(
      switchMap(() => {
        console.log('switch map get storaage')
        return from(this.storage.get(TOKEN_KEY))
      }),
      map(token => {
        console.log('Token from storage: ', token);
        if (token) {
          let decoded = helper.decodeToken(token);
          console.log('decoded: ', decoded);
          this.userData.next(decoded);
          return true;
        } else {
          return null;
        }
      })
    );
  }

  login(credentials: {email: string, pw: string}): Observable<any> {
    let url = URL + 'login';
    let usuario = '{"email": "'+credentials.email + '", "password": "'+credentials.pw +'"}';
    usuario = JSON.parse(usuario);

    return this.http.put<AlertI>(url,usuario).pipe(
      take(1),
      map(res => {
        if (res.tipo == "success"){
          return res.jwt.jwt;
        }else{
          return "null";
        }
      }),
      switchMap(token => {
        let decoded = helper.decodeToken(token);
          console.log('Token docoded: ', decoded);
          this.userData.next(decoded);

          let storageObs = from(this.storage.set(TOKEN_KEY, token));
          return storageObs;
      })
    );
  }

  getUser() {
    let infoUser:any;
    infoUser=this.userData.getValue();   
    return infoUser;
  }

  logout() {
    this.storage.remove(TOKEN_KEY).then(() => {
      this.router.navigateByUrl('/');
      this.userData.next(null);
    });
  }

  
}
