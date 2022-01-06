
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  public job:string;
  user = null;
  constructor(private auth: AuthService, private modalController: ModalController) { 
    
  }

  ngOnInit() {
    this.job = "niniera";
  }
  ionViewWillEnter() {
    this.user = this.auth.getUser();
  }
  logout() {
    console.log("Cerrrando sesino...")
    this.auth.logout();
  }
  public changeJob(jobSegment:string){
    this.job = jobSegment;
    console.log(jobSegment);
  }



}
