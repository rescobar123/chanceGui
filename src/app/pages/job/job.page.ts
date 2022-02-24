
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { IonSlides, ModalController } from '@ionic/angular';




@Component({
  selector: 'app-job',
  templateUrl: './job.page.html',
  styleUrls: ['./job.page.scss'],
})
export class JobPage implements OnInit {
  @ViewChild('mySlider',null)  slides: IonSlides;
  public job:string;
  user = null;
  constructor(private auth: AuthService, private modalController: ModalController) { 
    
  }

  ngOnInit() {
    this.job = "propuesta";
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
