import { Injectable } from '@angular/core';
import { EmpleoI } from '../models/Empleo.Interface';
import { AlertI } from '../models/complements/AlertI';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(public alertController: AlertController) { }
  async presentAlertMultipleButtons(titulo:string, mensaje:string, error:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }

}
