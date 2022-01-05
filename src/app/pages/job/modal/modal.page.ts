import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { connectListeners } from '@ionic/core/dist/types/utils/overlays';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  public curso;
  public cursoId;
  constructor(private modalController: ModalController, navParams:NavParams) {
   this.curso = navParams.get('curso');
   this.cursoId = navParams.get('crusoId');
   }

  ngOnInit() {
  }
  async closeModal(){
    await this.modalController.dismiss();
  }

}
