import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  user = null;
  constructor(private auth: AuthService, private alertCtrl: AlertController,) { }

 /* ionViewWillEnter() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }
*/
  ngOnInit() {
  }
  unread(){
    this.presentAlertMultipleButtons("Ya", "Estuvo", "Suave");
  }
  async presentAlertMultipleButtons(titulo:string, mensaje:string, error:string) {
    const alert = await this.alertCtrl.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar']
    });
    await alert.present();
  }
}
