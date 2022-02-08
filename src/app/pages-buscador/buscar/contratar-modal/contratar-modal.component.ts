import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-contratar-modal',
  templateUrl: './contratar-modal.component.html',
  styleUrls: ['./contratar-modal.component.scss'],
})
export class ContratarModalComponent implements OnInit {
  private idPropuesta:number;
  constructor(
    private navParams: NavParams,
    private modal: ModalController,) { 
    
      this.idPropuesta = navParams.get('idPropuesta');
    console.log(this.idPropuesta);
  }

  ngOnInit() {}
  closeModal(){
    this.modal.dismiss();
  }
}
