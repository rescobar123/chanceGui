import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.page.html',
  styleUrls: ['./offers.page.scss'],
})
export class OffersPage implements OnInit {
  user = null;
  constructor(private auth: AuthService) { }

  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }

  logout() {
    this.auth.logout();
  }

  ngOnInit() {
  }

}
