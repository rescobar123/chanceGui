import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsuarioI } from '../models/Usuario.Interface';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
  public user:UsuarioI;
  constructor(private auth: AuthService,) {
    let data = this.auth.getUser();
    this.user = data.usuario;;
    console.log(this.user);
  }
}
