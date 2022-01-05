import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  credentials = {
    email: 'admin',
    pw: 'admin'
  };

  constructor(private auth: AuthService, private alertCtrl: AlertController, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(async res => {
      console.log('login return: ', res);
      if (res) {
        this.router.navigateByUrl('/members');
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
