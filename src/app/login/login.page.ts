import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AdmobService } from '../services/publicidad/admob.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: 'robinsolises@hotmail.com',
    pw: 'admin'
  };

  constructor(private auth: AuthService,
     private alertCtrl: AlertController,
      private router: Router,
      private admobService:AdmobService) { }

  ngOnInit() {
    this.admobService.MostrarBanner();
  }

  login() {
    this.auth.login(this.credentials).subscribe(async res => {
      console.log('login return: ', res);
      if (res) {
        this.router.navigateByUrl('/chance');
      } else {
        const alert = await this.alertCtrl.create({
          header: 'Fallo al iniciar Sesion',
          message: 'Credenciales Incorrectas o credenciales vacias',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }

}
